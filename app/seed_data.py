"""
Seeds the DB with real NER districts (real names/coordinates) and
plausible terrain data (elevation/slope/NDVI/soil are representative
estimates, not measured — good enough for a demo, swap for real
GeoPandas/Rasterio-derived values later).
"""
from app.database import SessionLocal, engine, Base
from app.models.db_models import District

DISTRICTS = [
    dict(name="East Khasi Hills", state="Meghalaya", latitude=25.5788, longitude=91.8933,
         elevation_m=1500, slope_degrees=38, ndvi=0.45, soil_type="lateritic",
         land_use="forest/settlement mix", historical_landslide_count=7,
         population=825922, num_roads=12, num_hospitals=3, num_schools=9, num_villages_nearby=14),
    dict(name="West Khasi Hills", state="Meghalaya", latitude=25.5000, longitude=91.2500,
         elevation_m=1350, slope_degrees=34, ndvi=0.52, soil_type="clay-rich",
         land_use="forest", historical_landslide_count=4,
         population=383461, num_roads=8, num_hospitals=1, num_schools=6, num_villages_nearby=20),
    dict(name="Darjeeling-adjacent Kalimpong", state="West Bengal", latitude=27.0667, longitude=88.4667,
         elevation_m=1250, slope_degrees=42, ndvi=0.40, soil_type="weathered rock debris",
         land_use="tea gardens/settlement", historical_landslide_count=11,
         population=251642, num_roads=10, num_hospitals=2, num_schools=7, num_villages_nearby=18),
    dict(name="Aizawl", state="Mizoram", latitude=23.7271, longitude=92.7176,
         elevation_m=1132, slope_degrees=36, ndvi=0.55, soil_type="sandy loam",
         land_use="urban/forest", historical_landslide_count=6,
         population=400309, num_roads=15, num_hospitals=4, num_schools=11, num_villages_nearby=9),
    dict(name="Kohima", state="Nagaland", latitude=25.6751, longitude=94.1086,
         elevation_m=1444, slope_degrees=33, ndvi=0.58, soil_type="loam",
         land_use="forest/agriculture", historical_landslide_count=3,
         population=270063, num_roads=9, num_hospitals=2, num_schools=8, num_villages_nearby=16),
    dict(name="West Sikkim", state="Sikkim", latitude=27.2833, longitude=88.2167,
         elevation_m=2100, slope_degrees=45, ndvi=0.48, soil_type="weathered rock debris",
         land_use="forest/alpine", historical_landslide_count=9,
         population=136435, num_roads=6, num_hospitals=1, num_schools=5, num_villages_nearby=22),
    dict(name="Senapati", state="Manipur", latitude=25.2667, longitude=94.0167,
         elevation_m=1200, slope_degrees=30, ndvi=0.60, soil_type="loam",
         land_use="forest/agriculture", historical_landslide_count=2,
         population=479148, num_roads=7, num_hospitals=1, num_schools=6, num_villages_nearby=25),
    dict(name="Papum Pare", state="Arunachal Pradesh", latitude=27.1000, longitude=93.6167,
         elevation_m=950, slope_degrees=37, ndvi=0.62, soil_type="sandy loam",
         land_use="forest", historical_landslide_count=5,
         population=176385, num_roads=5, num_hospitals=1, num_schools=4, num_villages_nearby=19),
]


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if db.query(District).count() > 0:
            print("Districts already seeded, skipping.")
            return
        for d in DISTRICTS:
            db.add(District(**d))
        db.commit()
        print(f"Seeded {len(DISTRICTS)} districts.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
