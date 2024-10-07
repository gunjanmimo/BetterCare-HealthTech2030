import time
from fastapi import Depends
from fastapi import APIRouter, HTTPException

# ------------------------------ LOCAL IMPORTS ------------------------------#
from backend.database import Admin, get_db, Patient, FamilyMember
from backend.apis.patient.schemas import PatientRegistrationPayload

patient_router = APIRouter()


@patient_router.post("/api/patient/patient_registration")
async def patient_registration(payload: PatientRegistrationPayload, db=Depends(get_db)):

    patient = Patient(
        name=payload.name,
        age=payload.age,
        icu_admitted=True,
    )
    db.add(patient)
    db.flush()

    # Create family members records
    for family_member in payload.family_members:
        member = FamilyMember(
            name=family_member.name,
            age=family_member.age,
            relation=family_member.relation,
            patient_id=patient.id,
        )
        db.add(member)

    db.commit()

    return {"message": "Patient registered successfully", "patient_id": patient.id}


@patient_router.post("/api/patient/{patient_id}/update_icu_status")
async def update_icu_status(patient_id: int, db=Depends(get_db)):
    try:
        patient = db.query(Patient).filter(Patient.id == patient_id).first()
        if not patient:
            raise HTTPException(status_code=400, detail="Patient not found")

        patient.icu_admitted = not patient.icu_admitted

        db.commit()

        return {"message": "ICU status updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# get all patient list -> name and id
@patient_router.get("/api/patients")
async def get_all_patients(db=Depends(get_db)):
    # TODO: ADD PAGINATION
    try:
        patients = db.query(Patient).all()
        return [
            {
                "id": patient.id,
                "name": patient.name,
                "age": patient.age,
                "icu_admitted": patient.icu_admitted,
                "family_members": [
                    {
                        "name": member.name,
                        "age": member.age,
                        "relation": member.relation,
                        "id": member.id,
                    }
                    for member in patient.family_members
                ],
            }
            for patient in patients
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# get patient details -> name, age, family members
@patient_router.get("/api/patient/{patient_id}")
async def get_patient_details(patient_id: int, db=Depends(get_db)):
    try:
        patient = db.query(Patient).filter(Patient.id == patient_id).first()
        if not patient:
            raise HTTPException(status_code=400, detail="Patient not found")

        family_members = (
            db.query(FamilyMember).filter(FamilyMember.patient_id == patient_id).all()
        )

        return {
            "name": patient.name,
            "age": patient.age,
            "family_members": [
                {
                    "name": member.name,
                    "age": member.age,
                    "relation": member.relation,
                }
                for member in family_members
            ],
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
