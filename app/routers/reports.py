import json
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.db_models import District, RiskAssessment
from app.services.report_service import generate_risk_report_pdf

router = APIRouter(prefix="/report", tags=["Reports"])


@router.get("/{district_id}")
def get_report(district_id: int, db: Session = Depends(get_db)):
    district = db.query(District).filter(District.id == district_id).first()
    if not district:
        raise HTTPException(status_code=404, detail="District not found")

    latest = (
        db.query(RiskAssessment)
        .filter(RiskAssessment.district_id == district_id)
        .order_by(RiskAssessment.timestamp.desc())
        .first()
    )
    if not latest:
        raise HTTPException(status_code=404, detail="No risk assessment yet for this district — call /predict first")

    explanation = json.loads(latest.explanation) if latest.explanation else []

    pdf_bytes = generate_risk_report_pdf(
        district_name=district.name,
        state=district.state,
        risk_score=latest.risk_score,
        risk_level=latest.risk_level,
        confidence_score=latest.confidence_score,
        explanation=explanation,
        timestamp=latest.timestamp,
    )

    filename = f"PrithviX_Report_{district.name.replace(' ', '_')}.pdf"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )
