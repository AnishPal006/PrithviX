"""
PrithviX Backend — AI-Based Early Warning & Landslide Risk Monitoring
for the North Eastern Region.

Run with:
    uvicorn main:app --reload

Then open http://127.0.0.1:8000/docs for interactive API docs.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import districts, weather, prediction, alerts, reports, auth
from app.seed_data import seed

app = FastAPI(
    title="PrithviX API",
    description="AI-Based Early Warning & Landslide Risk Monitoring System for the North Eastern Region (NER)",
    version="0.1.0",
)

# Allow the Next.js frontend (any origin, for hackathon speed — tighten before real deployment)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(districts.router)
app.include_router(weather.router)
app.include_router(prediction.router)
app.include_router(alerts.router)
app.include_router(reports.router)


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    seed()


@app.get("/")
def root():
    return {
        "service": "PrithviX Backend",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
def health():
    return {"status": "ok"}
