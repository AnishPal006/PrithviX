# PrithviX Backend

AI-Based Early Warning & Landslide Risk Monitoring System for the North Eastern Region — backend + DBMS.

## Quick Start

```bash
# 1. Create a virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. (Optional) copy env file — works fine with defaults, no keys needed to run
cp .env.example .env

# 4. Run the server
uvicorn main:app --reload
```

Then open **http://127.0.0.1:8000/docs** — full interactive API docs (Swagger UI), auto-generated from the code. Your frontend dev can test every endpoint directly from there.

The database (SQLite, `prithvix.db`) and 8 seeded North Eastern Region districts are created automatically on first run — no manual setup needed.

## Project Structure

```
prithvix-backend/
├── main.py                      # App entry point, wires up all routers
├── requirements.txt
├── .env.example                 # Copy to .env, fill in keys as your team gets them
├── app/
│   ├── database.py               # DB connection (SQLite now → Postgres later, 1-line change)
│   ├── seed_data.py               # Seeds 8 real NER districts on first run
│   ├── models/
│   │   ├── db_models.py           # SQLAlchemy ORM — the actual DBMS schema
│   │   └── schemas.py             # Pydantic request/response shapes (API contract)
│   ├── routers/                   # One file per feature area
│   │   ├── districts.py
│   │   ├── weather.py
│   │   ├── prediction.py          # /predict, /risk-score, /explain, /forecast, /impact, /map
│   │   ├── alerts.py
│   │   ├── reports.py             # PDF generation
│   │   └── auth.py                # register/login (JWT)
│   └── services/                  # Business logic, external API calls
│       ├── risk_model.py          # Risk-scoring engine — see note below
│       ├── external_apis.py       # NASA POWER, Open-Meteo (live), Sentinel/Overpass (stubbed)
│       ├── alerts_service.py      # SMS/Email dispatch (mocked until Twilio/SendGrid keys added)
│       └── report_service.py      # PDF report generation
```

## API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/district` | GET | List all districts |
| `/district/{id}` | GET | Single district details |
| `/weather/{district_id}` | GET | Live current weather (Open-Meteo) |
| `/rainfall/{district_id}` | GET | Live/forecast rainfall (Open-Meteo) |
| `/predict` | POST | Run a new risk prediction for a district |
| `/risk-score/{district_id}` | GET | Latest risk score (or runs a fresh one) |
| `/explain/{district_id}` | GET | AI explanation for latest prediction |
| `/forecast/{district_id}` | GET | 72-hour risk forecast |
| `/impact/{district_id}` | GET | Population/infrastructure exposure |
| `/map/risk-zones` | GET | All districts with risk level, for the GIS map |
| `/recommendation/{district_id}?role=` | GET | Role-specific recommendations (citizen/government/road_authority) |
| `/alerts/trigger` | POST | Trigger SMS/email/dashboard alert |
| `/alerts/district/{id}` | GET | Alert history for a district |
| `/report/{district_id}` | GET | Download PDF risk report |
| `/register`, `/login`, `/me` | POST/GET | Basic auth |

Full request/response shapes are in `/docs` once the server is running.

## Important Notes

**⚠️ Not test-run in a live server yet.** This was built without internet access in the build environment, so FastAPI/SQLAlchemy couldn't be installed or executed there. Every file passed a static syntax check, and the parts with no FastAPI dependency (risk-scoring math, PDF generation) were actually run and verified correct. **Run `uvicorn main:app --reload` yourself and check `/docs` before sending this to your teammate for integration**, in case anything surfaces on first real run.

**ML model:** `app/services/risk_model.py` currently uses a real weighted-feature formula (rainfall, slope, NDVI, soil, historical data) — not random numbers — so every endpoint works correctly today. When your teammate's trained XGBoost model is ready, they replace the `predict()` function body with `joblib.load()` + model inference, keeping the same input/output shape. Nothing else in the codebase changes. See the comment at the top of that file.

**External APIs:**
- NASA POWER / Open-Meteo: real, live calls (no API key needed) — will work as soon as the server has internet access.
- Sentinel Hub, Overpass, Twilio, SendGrid: stubbed with the correct function shape. Add API keys to `.env` and uncomment the real implementation (marked in each file) when your team gets them.

**Database:** SQLite by default (`prithvix.db`, auto-created). To switch to PostgreSQL, install `psycopg2-binary`, then set in `.env`:
```
DATABASE_URL=postgresql://user:password@localhost:5432/prithvix
```
No other code changes needed — the app is written entirely against SQLAlchemy's ORM.
