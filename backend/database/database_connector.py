from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from backend.env_variables import settings


# create database engine
engine = create_engine(
    settings.DATABASE_URL,
    echo=False,
)
# database session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """
    Helper function to return DB session.

    Only Admin user can read, write, update and delete in public schema table.
    Other user can only read and write data from User table.

    Yields:
        _type_: DB session
    """

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
