from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.db_models import District
from app.models.schemas import DistrictOut, DistrictCreate

router = APIRouter(prefix="/district", tags=["District"])


@router.get("", response_model=List[DistrictOut])
def list_districts(db: Session = Depends(get_db)):
    return db.query(District).all()


@router.get("/{district_id}", response_model=DistrictOut)
def get_district(district_id: int, db: Session = Depends(get_db)):
    district = db.query(District).filter(District.id == district_id).first()
    if not district:
        raise HTTPException(status_code=404, detail="District not found")
    return district


@router.post("", response_model=DistrictOut)
def create_district(payload: DistrictCreate, db: Session = Depends(get_db)):
    district = District(**payload.model_dump())
    db.add(district)
    db.commit()
    db.refresh(district)
    return district
