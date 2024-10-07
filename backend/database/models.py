import random
from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Boolean,
    DateTime,
    func,
    BigInteger,
)

from sqlalchemy.orm import relationship
from .database_connector import Base


def generate_id():
    return random.randint(100000, 999999)


class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, default=generate_id)
    username = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, default=generate_id)
    message = Column(String, nullable=False)
    created_at = Column(
        DateTime, default=func.now(), nullable=False
    )  # Automatically set to current timestamp
    family_member_id = Column(Integer, ForeignKey("family_members.id"), nullable=False)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    chat_id = Column(BigInteger, nullable=False)  # Added chat_id for each message
    sender_name = Column(String, nullable=False)
    # Relationships
    family_member = relationship("FamilyMember", back_populates="messages")
    patient = relationship("Patient", back_populates="messages")


class FamilyMember(Base):
    __tablename__ = "family_members"

    id = Column(Integer, primary_key=True, default=generate_id)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    relation = Column(String, nullable=False)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    chat_id = Column(BigInteger, nullable=True)  # Added chat_id for each family member

    # Relationships
    patient = relationship("Patient", back_populates="family_members")
    messages = relationship("Message", back_populates="family_member")


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, default=generate_id)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    icu_admitted = Column(Boolean, nullable=False, default=False)

    # Relationships
    family_members = relationship(
        "FamilyMember", back_populates="patient", cascade="all, delete-orphan"
    )
    messages = relationship("Message", back_populates="patient")
