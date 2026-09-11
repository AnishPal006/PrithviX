"""
Risk-scoring engine.

WHAT THIS IS TODAY:
A real, weighted-feature scoring formula (not random numbers) that combines
rainfall, slope, NDVI, soil, and historical landslide data into a genuine
0-100 risk score, plus a human-readable explanation of which factors drove
the score. This makes every endpoint fully functional right now.

WHAT YOUR FRIEND SWAPS IN LATER:
Replace the body of `predict()` with the trained XGBoost model, keeping the
same function signature (same inputs in, same tuple out). Nothing else in
the codebase — no router, no schema — needs to change. Something like:

    import joblib
    _model = joblib.load("model.pkl")

    def predict(features: dict) -> tuple[float, float, list[dict]]:
        X = _features_to_vector(features)
        risk_score = float(_model.predict_proba([X])[0][1]) * 100
        confidence = ...  # e.g. from model's predict_proba margin
        explanation = _shap_explanation(_model, X)  # via SHAP
        return risk_score, confidence, explanation

That's the entire integration — everything downstream (API responses,
alerts, reports) already expects exactly this shape.
"""
from typing import Tuple, List, Dict


# Feature weights — reflects how much each factor drives landslide risk.
# These are reasonable domain-informed defaults for a demo; the trained
# model will learn its own weights from real historical data.
WEIGHTS = {
    "rainfall": 0.30,
    "slope": 0.25,
    "ndvi": 0.15,        # inverse — low vegetation = higher risk
    "soil": 0.10,
    "history": 0.20,
}

RISKY_SOIL_TYPES = {"lateritic", "sandy loam", "weathered rock debris", "clay-rich"}


def _normalize_rainfall(mm_24h: float, mm_72h_forecast: float) -> float:
    """0-1 score. >150mm/24h or >300mm/72h forecast is severe in NER terrain."""
    score_24h = min(mm_24h / 150.0, 1.0)
    score_72h = min(mm_72h_forecast / 300.0, 1.0)
    return max(score_24h, score_72h * 0.8)


def _normalize_slope(degrees: float) -> float:
    """0-1 score. Slopes above ~35° are highly landslide-prone."""
    return min(degrees / 45.0, 1.0)


def _normalize_ndvi(ndvi: float) -> float:
    """0-1 risk score. Lower vegetation health = higher risk, so invert."""
    ndvi = max(0.0, min(ndvi, 1.0))
    return 1.0 - ndvi


def _normalize_soil(soil_type: str) -> float:
    return 0.8 if (soil_type or "").strip().lower() in RISKY_SOIL_TYPES else 0.3


def _normalize_history(landslide_count: int) -> float:
    """0-1 score, saturating — 5+ past events is treated as maximum history risk."""
    return min(landslide_count / 5.0, 1.0)


def predict(features: Dict) -> Tuple[float, float, List[Dict]]:
    """
    features expects:
        rainfall_mm_24h, rainfall_mm_72h_forecast,
        slope_degrees, ndvi, soil_type, historical_landslide_count

    Returns: (risk_score 0-100, confidence_score 0-100, explanation list)
    """
    rainfall_score = _normalize_rainfall(
        features.get("rainfall_mm_24h", 0) or 0,
        features.get("rainfall_mm_72h_forecast", 0) or 0,
    )
    slope_score = _normalize_slope(features.get("slope_degrees", 0) or 0)
    ndvi_score = _normalize_ndvi(features.get("ndvi", 0.5) if features.get("ndvi") is not None else 0.5)
    soil_score = _normalize_soil(features.get("soil_type", ""))
    history_score = _normalize_history(features.get("historical_landslide_count", 0) or 0)

    weighted_sum = (
        rainfall_score * WEIGHTS["rainfall"]
        + slope_score * WEIGHTS["slope"]
        + ndvi_score * WEIGHTS["ndvi"]
        + soil_score * WEIGHTS["soil"]
        + history_score * WEIGHTS["history"]
    )
    risk_score = round(weighted_sum * 100, 1)

    # Confidence: higher when we have real (non-default) values for more
    # inputs — a simple stand-in for what SHAP/model uncertainty will give.
    known_inputs = sum(
        1 for k in ("rainfall_mm_24h", "slope_degrees", "ndvi", "soil_type", "historical_landslide_count")
        if features.get(k) not in (None, "")
    )
    confidence_score = round(60 + (known_inputs / 5.0) * 35, 1)  # 60-95 range

    explanation = _build_explanation(
        rainfall_score, slope_score, ndvi_score, soil_score, history_score, features
    )

    return risk_score, confidence_score, explanation


def _severity(score: float) -> str:
    if score >= 0.7:
        return "high"
    if score >= 0.4:
        return "moderate"
    return "low"


def _build_explanation(rainfall_score, slope_score, ndvi_score, soil_score, history_score, features) -> List[Dict]:
    items = [
        {
            "factor": "Rainfall",
            "contribution": _severity(rainfall_score),
            "detail": f"{features.get('rainfall_mm_24h', 0):.0f}mm in last 24h, "
                      f"{features.get('rainfall_mm_72h_forecast', 0):.0f}mm forecast over next 72h",
        },
        {
            "factor": "Slope",
            "contribution": _severity(slope_score),
            "detail": f"Terrain slope of {features.get('slope_degrees', 0):.0f}°",
        },
        {
            "factor": "Vegetation cover (NDVI)",
            "contribution": _severity(ndvi_score),
            "detail": f"NDVI index of {features.get('ndvi', 0.5):.2f} "
                      f"({'sparse' if ndvi_score > 0.6 else 'healthy'} vegetation)",
        },
        {
            "factor": "Soil type",
            "contribution": _severity(soil_score),
            "detail": f"Soil classified as {features.get('soil_type', 'unknown')}",
        },
        {
            "factor": "Historical landslides",
            "contribution": _severity(history_score),
            "detail": f"{features.get('historical_landslide_count', 0)} recorded past landslide event(s) in this area",
        },
    ]
    # Most significant factors first
    return sorted(items, key=lambda i: {"high": 0, "moderate": 1, "low": 2}[i["contribution"]])


def risk_level_from_score(score: float) -> str:
    if score <= 25:
        return "Safe"
    if score <= 50:
        return "Moderate"
    if score <= 75:
        return "High"
    return "Critical"


def color_for_level(level: str) -> str:
    return {"Safe": "green", "Moderate": "yellow", "High": "orange", "Critical": "red"}.get(level, "green")
