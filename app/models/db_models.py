"""
DBMS schema for PrithviX.

Written against plain lat/lng columns (Float) so it runs on SQLite today.
When you move to PostgreSQL + PostGIS, swap the `latitude`/`longitude`
Float columns for a single `geometry(Point, 4326)` column via GeoAlchemy2 —
everything else (relationships, queries elsewhere in the app) stays the same
since routers filter by district_id, not raw coordinates.
"""
from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Float, DateTime, ForeignKey, Text, Boolean
)
from sqlalchemy.orm import relationship
from app.database import Base


class District(Base):
    __tablename__ = "districts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    state = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

    # Static/slow-changing terrain data (seeded; real deployment would pull
    # this from GeoPandas/Rasterio processing of DEM + soil + LULC rasters)
    elevation_m = Column(Float)
    slope_degrees = Column(Float)
    ndvi = Column(Float)  # vegetation index, 0-1
    soil_type = Column(String)
    land_use = Column(String)
    historical_landslide_count = Column(Integer, default=0)

    # Exposure data, for impact assessment
    population = Column(Integer, default=0)
    num_roads = Column(Integer, default=0)
    num_hospitals = Column(Integer, default=0)
    num_schools = Column(Integer, default=0)
    num_villages_nearby = Column(Integer, default=0)

    risk_assessments = relationship("RiskAssessment", back_populates="district")
    alerts = relationship("Alert", back_populates="district")


class RiskAssessment(Base):
    """One prediction run for a district at a point in time."""
    __tablename__ = "risk_assessments"

    id = Column(Integer, primary_key=True, index=True)
    district_id = Column(Integer, ForeignKey("districts.id"), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    # Inputs used for this specific assessment (rainfall/weather change often,
    # so we snapshot them here even though terrain data lives on District)
    rainfall_mm_24h = Column(Float)
    rainfall_mm_72h_forecast = Column(Float)

    # Outputs
    risk_score = Column(Float, nullable=False)       # 0-100
    risk_level = Column(String, nullable=False)       # Safe/Moderate/High/Critical
    confidence_score = Column(Float)                  # 0-100
    explanation = Column(Text)                        # JSON-encoded list of factors

    district = relationship("District", back_populates="risk_assessments")


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    district_id = Column(Integer, ForeignKey("districts.id"), nullable=False)
    risk_assessment_id = Column(Integer, ForeignKey("risk_assessments.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)

    channel = Column(String)          # sms / email / dashboard
    recipient_type = Column(String)   # citizen / government / road_authority
    message = Column(Text)
    status = Column(String, default="sent")  # sent / failed / mocked

    district = relationship("District", back_populates="alerts")


class User(Base):
    """Minimal auth for role-based views (citizen / government / road_authority)."""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="citizen")  # citizen / government / road_authority
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
