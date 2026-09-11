import json
from datetime import datetime, timezone
from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.db_models import District, RiskAssessment
from app.models.schemas import (
    PredictRequest, PredictResponse, RiskFactor,
    ForecastOut, ForecastPoint, ImpactOut, RiskZone, RecommendationOut,
)
from app.services import risk_model, external_apis, alerts_service

router = APIRouter(tags=["Prediction"])


def _get_district_or_404(district_id: int, db: Session) -> District:
    district = db.query(District).filter(District.id == district_id).first()
    if not district:
        raise HTTPException(status_code=404, detail="District not found")
    return district


def _run_prediction(district: District, rainfall_24h: float, rainfall_72h: float):
    features = {
        "rainfall_mm_24h": rainfall_24h,
        "rainfall_mm_72h_forecast": rainfall_72h,
        "slope_degrees": district.slope_degrees,
        "ndvi": district.ndvi,
        "soil_type": district.soil_type,
        "historical_landslide_count": district.historical_landslide_count,
    }
    score, confidence, explanation = risk_model.predict(features)
    level = risk_model.risk_level_from_score(score)
    return score, confidence, explanation, level


@router.post("/predict", response_model=PredictResponse)
def predict(payload: PredictRequest, db: Session = Depends(get_db)):
    district = _get_district_or_404(payload.district_id, db)

    if payload.rainfall_mm_24h is not None and payload.rainfall_mm_72h_forecast is not None:
        rainfall_24h = payload.rainfall_mm_24h
        rainfall_72h = payload.rainfall_mm_72h_forecast
    else:
        live = external_apis.get_rainfall(district.latitude, district.longitude)
        rainfall_24h = live.get("rainfall_mm_24h", 0.0)
        rainfall_72h = live.get("rainfall_mm_72h_forecast", 0.0)

    score, confidence, explanation, level = _run_prediction(district, rainfall_24h, rainfall_72h)

    record = RiskAssessment(
        district_id=district.id,
        rainfall_mm_24h=rainfall_24h,
        rainfall_mm_72h_forecast=rainfall_72h,
        risk_score=score,
        risk_level=level,
        confidence_score=confidence,
        explanation=json.dumps(explanation),
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    # Auto-trigger a dashboard alert if risk is High/Critical — matches PS
    # Step 6 ("if risk exceeds threshold, alerts are sent immediately")
    if level in ("High", "Critical"):
        message = alerts_service.build_alert_message(district.name, level, score, "citizen")
        alerts_service.send_dashboard_notification(district.id, message)

    return PredictResponse(
        district_id=district.id,
        district_name=district.name,
        timestamp=record.timestamp.replace(tzinfo=timezone.utc) if record.timestamp.tzinfo is None else record.timestamp,
        risk_score=score,
        risk_level=level,
        confidence_score=confidence,
        explanation=[RiskFactor(**e) for e in explanation],
    )


@router.get("/risk-score/{district_id}", response_model=PredictResponse)
def get_latest_risk_score(district_id: int, db: Session = Depends(get_db)):
    """Returns the most recent assessment for a district, or runs a fresh one if none exists."""
    district = _get_district_or_404(district_id, db)
    latest = (
        db.query(RiskAssessment)
        .filter(RiskAssessment.district_id == district_id)
        .order_by(RiskAssessment.timestamp.desc())
        .first()
    )
    if not latest:
        return predict(PredictRequest(district_id=district_id), db)

    explanation = json.loads(latest.explanation) if latest.explanation else []
    return PredictResponse(
        district_id=district.id,
        district_name=district.name,
        timestamp=latest.timestamp,
        risk_score=latest.risk_score,
        risk_level=latest.risk_level,
        confidence_score=latest.confidence_score,
        explanation=[RiskFactor(**e) for e in explanation],
    )


@router.get("/explain/{district_id}", response_model=List[RiskFactor])
def explain(district_id: int, db: Session = Depends(get_db)):
    result = get_latest_risk_score(district_id, db)
    return result.explanation


@router.get("/forecast/{district_id}", response_model=ForecastOut)
def forecast(district_id: int, db: Session = Depends(get_db)):
    """72-hour risk forecast in 12-hour steps, using forecast rainfall decayed/ramped over time."""
    district = _get_district_or_404(district_id, db)
    live = external_apis.get_rainfall(district.latitude, district.longitude)
    base_72h = live.get("rainfall_mm_72h_forecast", 0.0)

    points = []
    for step in range(0, 73, 12):
        # Simple ramp: assume forecast rainfall accumulates roughly linearly
        fraction = step / 72.0
        projected_72h_from_here = base_72h * (1 - fraction * 0.5)  # tapering assumption
        projected_24h = min(projected_72h_from_here, base_72h / 3 + (base_72h * fraction * 0.3))
        score, _, _, level = _run_prediction(district, projected_24h, projected_72h_from_here)
        points.append(ForecastPoint(hours_ahead=step, risk_score=score, risk_level=level))

    return ForecastOut(
        district_id=district.id,
        generated_at=datetime.now(timezone.utc),
        forecast=points,
    )


@router.get("/impact/{district_id}", response_model=ImpactOut)
def impact(district_id: int, db: Session = Depends(get_db)):
    district = _get_district_or_404(district_id, db)
    return ImpactOut(
        district_id=district.id,
        population_exposed=district.population,
        roads_affected=district.num_roads,
        villages_nearby=district.num_villages_nearby,
        hospitals=district.num_hospitals,
        schools=district.num_schools,
    )


@router.get("/map/risk-zones", response_model=List[RiskZone])
def map_risk_zones(db: Session = Depends(get_db)):
    """All districts with their latest (or freshly computed) risk level, for the GIS map."""
    districts = db.query(District).all()
    zones = []
    for d in districts:
        latest = (
            db.query(RiskAssessment)
            .filter(RiskAssessment.district_id == d.id)
            .order_by(RiskAssessment.timestamp.desc())
            .first()
        )
        if latest:
            score, level = latest.risk_score, latest.risk_level
        else:
            live = external_apis.get_rainfall(d.latitude, d.longitude)
            score, _, _, level = _run_prediction(
                d, live.get("rainfall_mm_24h", 0), live.get("rainfall_mm_72h_forecast", 0)
            )
        zones.append(RiskZone(
            district_id=d.id, name=d.name, latitude=d.latitude, longitude=d.longitude,
            risk_score=score, risk_level=level, color=risk_model.color_for_level(level),
        ))
    return zones


@router.get("/recommendation/{district_id}", response_model=RecommendationOut)
def recommendation(district_id: int, role: str = Query("citizen", enum=["citizen", "government", "road_authority"]),
                    db: Session = Depends(get_db)):
    from app.services.alerts_service import ROLE_MESSAGES
    _get_district_or_404(district_id, db)
    return RecommendationOut(
        district_id=district_id,
        role=role,
        recommendations=ROLE_MESSAGES.get(role, ROLE_MESSAGES["citizen"]),
    )
