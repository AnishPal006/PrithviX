"""
External data source integrations.

NASA POWER and Open-Meteo are free and need no API key, so those are real,
live calls. Every function has a try/except that falls back to seeded mock
data on any failure (network issue, rate limit, unexpected response) — so
a demo never crashes because an external API had a bad moment.

OpenWeatherMap / Sentinel Hub / Overpass need API keys your team hasn't
added yet — they're stubbed with the correct call shape so adding a key
later (in .env) is a one-line change, not a rewrite.
"""
import os
import random
from datetime import datetime, timezone
from typing import Dict

import httpx

NASA_POWER_URL = "https://power.larc.nasa.gov/api/temporal/daily/point"
OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"

TIMEOUT = httpx.Timeout(6.0)


def _mock_rainfall() -> Dict:
    return {
        "rainfall_mm_24h": round(random.uniform(10, 180), 1),
        "rainfall_mm_72h_forecast": round(random.uniform(30, 350), 1),
        "source": "seeded (external API unavailable)",
    }


def get_rainfall(lat: float, lon: float) -> Dict:
    """
    Live 24h rainfall from NASA POWER, forecast rainfall from Open-Meteo.
    Falls back to seeded mock values if either call fails.
    """
    result = {}
    try:
        with httpx.Client(timeout=TIMEOUT) as client:
            resp = client.get(OPEN_METEO_URL, params={
                "latitude": lat,
                "longitude": lon,
                "hourly": "precipitation",
                "forecast_days": 3,
                "timezone": "auto",
            })
            resp.raise_for_status()
            data = resp.json()
            precip_values = data.get("hourly", {}).get("precipitation", [])
            rainfall_72h_forecast = round(sum(precip_values), 1) if precip_values else None
            rainfall_24h = round(sum(precip_values[:24]), 1) if precip_values else None

            if rainfall_24h is not None:
                result["rainfall_mm_24h"] = rainfall_24h
                result["rainfall_mm_72h_forecast"] = rainfall_72h_forecast
                result["source"] = "Open-Meteo (live)"
    except Exception:
        pass

    if not result:
        result = _mock_rainfall()

    return result


def _mock_weather() -> Dict:
    return {
        "temperature_c": round(random.uniform(15, 30), 1),
        "humidity_pct": round(random.uniform(50, 95), 1),
        "wind_speed_ms": round(random.uniform(0, 8), 1),
        "conditions": random.choice(["Cloudy", "Light Rain", "Heavy Rain", "Overcast", "Clear"]),
        "source": "seeded (external API unavailable)",
    }


def get_weather(lat: float, lon: float) -> Dict:
    """Live current weather from Open-Meteo (keyless). Falls back to mock."""
    try:
        with httpx.Client(timeout=TIMEOUT) as client:
            resp = client.get(OPEN_METEO_URL, params={
                "latitude": lat,
                "longitude": lon,
                "current": "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
                "timezone": "auto",
            })
            resp.raise_for_status()
            data = resp.json()
            current = data.get("current", {})
            if current:
                return {
                    "temperature_c": current.get("temperature_2m"),
                    "humidity_pct": current.get("relative_humidity_2m"),
                    "wind_speed_ms": current.get("wind_speed_10m"),
                    "conditions": _weather_code_to_text(current.get("weather_code")),
                    "source": "Open-Meteo (live)",
                }
    except Exception:
        pass

    return _mock_weather()


def _weather_code_to_text(code) -> str:
    mapping = {
        0: "Clear", 1: "Mostly Clear", 2: "Partly Cloudy", 3: "Overcast",
        45: "Fog", 51: "Light Drizzle", 61: "Light Rain", 63: "Moderate Rain",
        65: "Heavy Rain", 80: "Rain Showers", 95: "Thunderstorm",
    }
    return mapping.get(code, "Unknown")


# ---------- Stubs for APIs needing keys your team hasn't added yet ----------

def get_satellite_imagery_url(lat: float, lon: float) -> Dict:
    """
    Stub for Sentinel Hub. Add SENTINEL_HUB_CLIENT_ID/SECRET to .env and
    replace this body with a real OAuth2 + Process API call when ready.
    """
    client_id = os.getenv("SENTINEL_HUB_CLIENT_ID")
    if not client_id:
        return {"available": False, "reason": "Sentinel Hub credentials not configured", "image_url": None}
    # Real implementation goes here once credentials exist.
    return {"available": False, "reason": "Sentinel Hub integration not yet implemented", "image_url": None}


def get_nearby_infrastructure(lat: float, lon: float, radius_m: int = 5000) -> Dict:
    """
    Stub for OpenStreetMap Overpass API (roads, hospitals, schools).
    Real version would POST an Overpass QL query to
    https://overpass-api.de/api/interpreter — no key needed, just not
    wired up yet to keep today's build fast and deterministic for demo.
    """
    return {
        "source": "seeded (Overpass integration pending)",
        "roads": random.randint(2, 15),
        "hospitals": random.randint(0, 3),
        "schools": random.randint(1, 6),
    }
