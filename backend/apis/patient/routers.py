from fastapi import Depends
from fastapi import APIRouter, HTTPException

# ------------------------------ LOCAL IMPORTS ------------------------------#
from backend.database import Admin, get_db, Patient, FamilyMember
from backend.apis.patient.schemas import PatientRegistrationPayload

patient_router = APIRouter()


@patient_router.post("/api/patient/patient_registration")
async def patient_registration(payload: PatientRegistrationPayload, db=Depends(get_db)):

    patient = Patient(name=payload.name, age=payload.age)
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


# get all patient list -> name and id
@patient_router.get("/api/patient")
async def get_all_patients(db=Depends(get_db)):
    # TODO: ADD PAGINATION
    try:
        patients = db.query(Patient).all()
        return [{"id": patient.id, "name": patient.name} for patient in patients]
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
