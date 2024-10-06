from pydantic_settings import BaseSettings
from typing import List


class FamilyMemberPayload(BaseSettings):
    name: str
    age: int
    relation: str


class PatientRegistrationPayload(BaseSettings):
    name: str
    age: int
    family_members: List[FamilyMemberPayload]
