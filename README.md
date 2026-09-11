# 🌍 PrithviX

> **AI-Based Early Warning & Landslide Risk Monitoring System for the North Eastern Region (NER)**

PrithviX is an AI-powered disaster intelligence platform that predicts landslide risks before they occur by integrating satellite imagery, weather data, terrain analysis, and historical disaster records. The system provides real-time risk assessment, early warnings, explainable AI insights, and decision support for government agencies, emergency responders, and citizens.

---

## 🚀 Project Overview

Landslides are one of the most frequent natural disasters in the North Eastern Region (NER) of India, causing significant loss of life, infrastructure damage, and disruption to transportation.

PrithviX transforms disaster management from **reactive** to **predictive** by continuously monitoring environmental conditions and estimating landslide probability using Artificial Intelligence and GIS technologies.

---

## ✨ Key Features

- 🛰️ AI-based landslide risk prediction
- 🌧️ Real-time weather & rainfall integration
- 🗺️ Interactive GIS dashboard
- 🌿 Satellite-based vegetation analysis (NDVI)
- ⛰️ Terrain analysis using DEM & Slope
- 📍 Historical landslide hotspot mapping
- 🏥 Infrastructure impact assessment
- 📧 Smart alerts via Dashboard, Email & SMS
- 📄 Downloadable risk assessment reports
- 🧠 Explainable AI (XAI) for transparent predictions
- 📈 72-hour landslide risk forecasting

---

# 🏗️ Technology Stack

### Artificial Intelligence
- Python
- Scikit-learn
- XGBoost
- LightGBM
- SHAP (Explainable AI)

### GIS & Remote Sensing
- GeoPandas
- Rasterio
- GDAL
- Shapely
- Folium
- Leaflet
- Sentinel-2
- Google Earth Engine
- QGIS

### Backend
- FastAPI

### Frontend
- React.js
- Tailwind CSS

### Database
- PostgreSQL + PostGIS

### APIs
- OpenWeather API
- NASA POWER API
- OpenStreetMap
- GeoBoundaries
- Microsoft Planetary Computer
- ESA WorldCover

---

# 📂 Project Structure

```text
PrithviX/
│
├── backend/
├── frontend/
├── notebooks/
├── models/
├── data/
│   ├── rainfall/
│   ├── boundaries/
│   ├── osm/
│   ├── dem/
│   ├── ndvi/
│   ├── soil/
│   ├── geology/
│   ├── lulc/
│   ├── processed/
│   └── raw/
│
├── outputs/
├── reports/
├── docs/
├── requirements.txt
├── .env.example
└── README.md
```

---

# 📊 Datasets Used

| Dataset | Source |
|----------|--------|
| Historical Rainfall | IMD |
| Weather Forecast | OpenWeather API |
| DEM | NASA SRTM |
| Sentinel-2 Imagery | Copernicus |
| NDVI | Sentinel-2 |
| Land Use Land Cover | ESA WorldCover |
| Soil | SoilGrids |
| Historical Landslides | ISRO Landslide Atlas |
| Roads & Infrastructure | OpenStreetMap |
| Population | WorldPop |
| District Boundaries | GeoBoundaries |

---

# 🤖 AI Workflow

```text
User Location
        │
        ▼
Collect Environmental Data
        │
        ▼
Feature Engineering
        │
        ▼
Machine Learning Model
        │
        ▼
Risk Score Prediction
        │
        ▼
Explainable AI (SHAP)
        │
        ▼
Early Warning
        │
        ▼
Dashboard + Alerts + PDF Report
```

---

# 📌 Inputs

- Historical Rainfall
- Live Weather
- Weather Forecast
- DEM
- Slope
- NDVI
- Land Use Land Cover
- Soil
- Historical Landslides
- Population
- Roads
- Hospitals
- Schools
- Villages

---

# 📤 Outputs

- Landslide Risk Score
- Risk Classification
- Confidence Score
- AI Explanation
- 72-Hour Forecast
- Infrastructure Impact Assessment
- Interactive GIS Map
- Dashboard Alerts
- Email Alerts
- SMS Alerts
- Downloadable PDF Report

---

# 🛠️ Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/PrithviX.git
```

Go into the project

```bash
cd PrithviX
```

Create a virtual environment

```bash
python -m venv venv
```

Activate it

### Windows

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

# ▶️ Running the Project

Backend

```bash
cd backend
uvicorn main:app --reload
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🌍 Study Area

The current implementation focuses on **20 landslide-prone districts** across:

- West Bengal
- Sikkim
- Meghalaya
- Mizoram
- Nagaland
- Uttarakhand
- Himachal Pradesh
- Kerala

---

# 📈 Future Scope

- Mobile Application
- Drone-based Damage Assessment
- Multi-Hazard Prediction
- Flood & Earthquake Risk Integration
- Multilingual Alerts
- Offline Emergency Mode

--
---

## ⭐ If you find this project useful, consider giving it a star!
