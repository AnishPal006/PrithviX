from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.db_models import District
from app.models.schemas import WeatherOut, RainfallOut
from app.services import external_apis

router = APIRouter(tags=["Weather & Rainfall"])


def _get_district_or_404(district_id: int, db: Session) -> District:
    district = db.query(District).filter(District.id == district_id).first()
    if not district:
        raise HTTPException(status_code=404, detail="District not found")
    return district


@router.get("/weather/{district_id}", response_model=WeatherOut)
def get_weather(district_id: int, db: Session = Depends(get_db)):
    district = _get_district_or_404(district_id, db)
    data = external_apis.get_weather(district.latitude, district.longitude)
    return WeatherOut(
        district_id=district.id,
        source=data.get("source", "unknown"),
        temperature_c=data.get("temperature_c"),
        humidity_pct=data.get("humidity_pct"),
        wind_speed_ms=data.get("wind_speed_ms"),
        conditions=data.get("conditions"),
        fetched_at=datetime.now(timezone.utc),
    )


@router.get("/rainfall/{district_id}", response_model=RainfallOut)
def get_rainfall(district_id: int, db: Session = Depends(get_db)):
    district = _get_district_or_404(district_id, db)
    data = external_apis.get_rainfall(district.latitude, district.longitude)
    return RainfallOut(
        district_id=district.id,
        source=data.get("source", "unknown"),
        rainfall_mm_24h=data.get("rainfall_mm_24h", 0.0),
        rainfall_mm_72h_forecast=data.get("rainfall_mm_72h_forecast", 0.0),
        fetched_at=datetime.now(timezone.utc),
    )
