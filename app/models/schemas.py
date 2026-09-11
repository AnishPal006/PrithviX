"""
Pydantic schemas — these define the exact JSON shape the frontend sends
and receives. FastAPI auto-generates /docs from these, so your frontend
dev can see the exact contract without asking you.
"""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr


# ---------- District ----------

class DistrictBase(BaseModel):
    name: str
    state: str
    latitude: float
    longitude: float


class DistrictCreate(DistrictBase):
    elevation_m: Optional[float] = None
    slope_degrees: Optional[float] = None
    ndvi: Optional[float] = None
    soil_type: Optional[str] = None
    land_use: Optional[str] = None
    historical_landslide_count: Optional[int] = 0
    population: Optional[int] = 0
    num_roads: Optional[int] = 0
    num_hospitals: Optional[int] = 0
    num_schools: Optional[int] = 0
    num_villages_nearby: Optional[int] = 0


class DistrictOut(DistrictBase):
    id: int
    elevation_m: Optional[float]
    slope_degrees: Optional[float]
    ndvi: Optional[float]
    soil_type: Optional[str]
    land_use: Optional[str]
    historical_landslide_count: int
    population: int
    num_roads: int
    num_hospitals: int
    num_schools: int
    num_villages_nearby: int

    class Config:
        from_attributes = True


# ---------- Weather / Rainfall ----------

class WeatherOut(BaseModel):
    district_id: int
    source: str
    temperature_c: Optional[float] = None
    humidity_pct: Optional[float] = None
    wind_speed_ms: Optional[float] = None
    conditions: Optional[str] = None
    fetched_at: datetime


class RainfallOut(BaseModel):
    district_id: int
    source: str
    rainfall_mm_24h: float
    rainfall_mm_72h_forecast: float
    fetched_at: datetime


# ---------- Prediction ----------

class PredictRequest(BaseModel):
    district_id: int
    # Optional overrides — if omitted, live/mock data is fetched automatically
    rainfall_mm_24h: Optional[float] = None
    rainfall_mm_72h_forecast: Optional[float] = None


class RiskFactor(BaseModel):
    factor: str
    contribution: str   # e.g. "high", "moderate" — human-readable severity
    detail: str


class PredictResponse(BaseModel):
    district_id: int
    district_name: str
    timestamp: datetime
    risk_score: float
    risk_level: str
    confidence_score: float
    explanation: List[RiskFactor]


class ForecastPoint(BaseModel):
    hours_ahead: int
    risk_score: float
    risk_level: str


class ForecastOut(BaseModel):
    district_id: int
    generated_at: datetime
    forecast: List[ForecastPoint]


class ImpactOut(BaseModel):
    district_id: int
    population_exposed: int
    roads_affected: int
    villages_nearby: int
    hospitals: int
    schools: int


class RiskZone(BaseModel):
    district_id: int
    name: str
    latitude: float
    longitude: float
    risk_score: float
    risk_level: str
    color: str


class RecommendationOut(BaseModel):
    district_id: int
    role: str
    recommendations: List[str]


# ---------- Alerts ----------

class AlertTriggerRequest(BaseModel):
    district_id: int
    risk_assessment_id: Optional[int] = None
    channels: List[str] = ["dashboard"]   # sms / email / dashboard
    recipient_type: str = "citizen"       # citizen / government / road_authority


class AlertOut(BaseModel):
    id: int
    district_id: int
    channel: str
    recipient_type: str
    message: str
    status: str
    timestamp: datetime

    class Config:
        from_attributes = True


# ---------- Auth ----------

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None
    role: str = "citizen"


class UserOut(BaseModel):
    id: int
    email: str
    full_name: Optional[str]
    role: str

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
