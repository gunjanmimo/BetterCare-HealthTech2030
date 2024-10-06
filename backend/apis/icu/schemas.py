from pydantic import BaseModel


class Patient(BaseModel):
    # todo: add a patient id field
    patientName: str
    familyContact: str
    whatsappNumber: str
