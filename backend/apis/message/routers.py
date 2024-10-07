from fastapi import Depends, APIRouter, HTTPException

from sqlalchemy.orm import aliased
from sqlalchemy import func, desc, asc

# ------------------------------ LOCAL IMPORTS ------------------------------#
from backend.database import get_db, Message, Patient
from backend.apis.message.schemas import PostMessagePayload

message_router = APIRouter()


@message_router.get("/api/messages/")
async def get_message_list(db=Depends(get_db)):
    try:

        MessageAlias = aliased(Message)

        # Subquery to get the latest message ID for each patient
        latest_message_subquery = (
            db.query(
                Message.patient_id, func.max(Message.created_at).label("max_created_at")
            )
            .group_by(Message.patient_id)
            .subquery()
        )

        # Main query to join the subquery and get the latest message for each patient
        latest_messages = (
            db.query(MessageAlias)
            .join(
                latest_message_subquery,
                (MessageAlias.patient_id == latest_message_subquery.c.patient_id)
                & (MessageAlias.created_at == latest_message_subquery.c.max_created_at),
            )
            .order_by(desc(MessageAlias.created_at))
            .all()
        )

        messages = [
            {
                "id": message.id,
                "patientName": message.patient.name,
                "message": message.message,
                "timestamp": message.created_at,
                "patient_id": message.patient_id,
            }
            for message in latest_messages
        ]

        return messages
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@message_router.get("/api/post_messages/{patient_id}")
async def post_message(
    patient_id: int, payload: PostMessagePayload, db=Depends(get_db)
):

    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    message = Message(
        message=payload.message,
        sender_name="AI Interpeter",
        chat_id=0,
        patient_id=patient_id,
    )
    db.add(message)
    db.commit()

    return {"message": "Message sent successfully"}


@message_router.get("/api/messages/{patient_id}")
async def get_conversation_by_patient_id(patient_id: int, db=Depends(get_db)):

    try:

        # todo: check if patient_id exists
        patient = db.query(Patient).filter(Patient.id == patient_id).first()
        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")

        messages = (
            db.query(Message)
            .filter(Message.patient_id == patient_id)
            .order_by(Message.created_at.desc())  # Order by latest first
            .all()
        )

        # RETURN LIST OF MESSAGES WITH DETAILS
        """
        id: 1,
        patientName: "John Doe",
        message: "Patient is stable",
        timestamp: "2021-08-01T12:00:00Z",
        """
        messages = [
            {
                "id": message.id,
                "sender_name": message.sender_name,
                "message": message.message,
                "timestamp": message.created_at,
            }
            for message in messages
        ]

        return messages
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
