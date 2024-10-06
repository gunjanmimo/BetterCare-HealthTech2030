from apis.icu.schemas import Patient
from fastapi import APIRouter, HTTPException


icu_router = APIRouter()


@icu_router.post("/api/icu/register_icu_patient")
async def register_icu_patient(patient: Patient):
    try:

        # TODO 1: SAVE THE DATA TO DATABASE
        # TODO 2: SEND A WHATSAPP MESSAGE TO THE FAMILY CONTACT

        return {
            "message": "Patient registered successfully",
            "patient_data": patient.dict(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
