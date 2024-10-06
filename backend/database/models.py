import random
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database_connector import Base


def generate_id():
    return random.randint(100000, 999999)


class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, default=generate_id)
    username = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)


class FamilyMember(Base):
    __tablename__ = "family_members"

    id = Column(Integer, primary_key=True, default=generate_id)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    relation = Column(String, nullable=False)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)

    # Relationship to Patient
    patient = relationship("Patient", back_populates="family_members")


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, default=generate_id)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)

    # Relationship to FamilyMember
    family_members = relationship(
        "FamilyMember", back_populates="patient", cascade="all, delete-orphan"
    )
