"""
Database connection setup.

Defaults to SQLite so the app runs the instant it's unzipped, with zero
external setup. To move to PostgreSQL (as originally planned in the team's
stack doc), just set DATABASE_URL in .env to a postgres:// URL — nothing
else in the codebase needs to change, since everything goes through
SQLAlchemy's ORM layer.
"""
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./prithvix.db")

# check_same_thread is only needed for SQLite
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """FastAPI dependency — yields a DB session and always closes it."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
