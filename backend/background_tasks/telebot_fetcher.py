import asyncio
import httpx

from backend.database.database_connector import engine, get_db
from backend.database.models import FamilyMember, Message

# Replace with your actual bot token
BOT_TOKEN = "7702172009:AAHwqcS2nLsXWZ5BjW16cgGnM0So4DUQ94s"
API_URL = f"https://api.telegram.org/bot{BOT_TOKEN}/getUpdates"
PERIODIC_CHECK_TIME = 5

ALL_UPDATE_IDS = set()


def is_register_message(message: str):
    if message.startswith("/register"):
        return True, message.split(" ")[1]
    return False, None


async def send_greeting_message(chat_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
            json={
                "chat_id": chat_id,
                "text": "Welcome to CareLink AI! We're here to help you stay connected with your loved one in the ICU. \
                    Whether you need updates or a direct call to the ICU doctors, we're here to support you every step of the way. Let’s get started.",
            },
        )
        print(f"Greeting message sent. Response: {response.json()}")


async def fetch_updates():
    print("Fetching updates")
    global ALL_UPDATE_IDS
    async with httpx.AsyncClient() as client:
        response = await client.get(API_URL)
        data = response.json()

        if data["ok"] and "result" in data:
            for update in data["result"]:
                update_id = update["update_id"]
                if update_id not in ALL_UPDATE_IDS:
                    ALL_UPDATE_IDS.add(update_id)
                else:
                    continue

                text_message = update["message"]["text"]
                chat_id = update["message"]["from"]["id"]

                is_registration_message, family_member_id = is_register_message(
                    text_message
                )
                print(
                    f"Is registration message: {is_registration_message} | family_member_id: {family_member_id}"
                )

                db = next(get_db())

                if is_registration_message:
                    try:
                        family_member_id = int(family_member_id)
                    except ValueError:
                        print(f"Invalid family_member_id: {family_member_id}")
                        continue

                    print("Sending greeting message")

                    family_member = (
                        db.query(FamilyMember)
                        .filter(FamilyMember.id == family_member_id)
                        .first()
                    )
                    if not family_member:
                        print("Family member not found")
                        continue
                    family_member.chat_id = chat_id
                    db.commit()
                    await send_greeting_message(chat_id)
                    print(f"Family member chat_id updated to {chat_id}")
                else:
                    family_member = (
                        db.query(FamilyMember)
                        .filter(FamilyMember.chat_id == chat_id)
                        .first()
                    )
                    if not family_member:
                        print("Family member not found")
                        continue

                    message = Message(
                        message=text_message,
                        chat_id=chat_id,
                        sender_name=family_member.name,
                        family_member_id=family_member.id,
                        patient_id=family_member.patient_id,
                    )
                    db.add(message)
                    db.commit()
                    print("Message saved to database")


async def periodic_update_check():
    while True:
        await fetch_updates()
        await asyncio.sleep(PERIODIC_CHECK_TIME)


# if __name__ == "__main__":
#     asyncio.run(periodic_update_check())
