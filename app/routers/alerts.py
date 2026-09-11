from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.db_models import District, Alert, RiskAssessment
from app.models.schemas import AlertTriggerRequest, AlertOut
from app.services import alerts_service

router = APIRouter(prefix="/alerts", tags=["Alerts"])


@router.post("/trigger", response_model=List[AlertOut])
def trigger_alert(payload: AlertTriggerRequest, db: Session = Depends(get_db)):
    district = db.query(District).filter(District.id == payload.district_id).first()
    if not district:
        raise HTTPException(status_code=404, detail="District not found")

    latest = (
        db.query(RiskAssessment)
        .filter(RiskAssessment.district_id == district.id)
        .order_by(RiskAssessment.timestamp.desc())
        .first()
    )
    risk_level = latest.risk_level if latest else "Moderate"
    risk_score = latest.risk_score if latest else 50.0

    message = alerts_service.build_alert_message(district.name, risk_level, risk_score, payload.recipient_type)

    created = []
    for channel in payload.channels:
        if channel == "sms":
            status = alerts_service.send_sms("+91XXXXXXXXXX", message)
        elif channel == "email":
            status = alerts_service.send_email("recipient@example.com", "PrithviX Landslide Alert", message)
        else:
            status = alerts_service.send_dashboard_notification(district.id, message)

        alert = Alert(
            district_id=district.id,
            risk_assessment_id=latest.id if latest else None,
            channel=channel,
            recipient_type=payload.recipient_type,
            message=message,
            status=status,
        )
        db.add(alert)
        created.append(alert)

    db.commit()
    for a in created:
        db.refresh(a)

    return created


@router.get("/district/{district_id}", response_model=List[AlertOut])
def get_district_alerts(district_id: int, db: Session = Depends(get_db)):
    return (
        db.query(Alert)
        .filter(Alert.district_id == district_id)
        .order_by(Alert.timestamp.desc())
        .limit(50)
        .all()
    )
