import asyncio
import httpx

from backend.database.database_connector import engine, get_db
from backend.database.models import FamilyMember, Message

# Replace with your actual bot token
BOT_TOKEN = "7702172009:AAHwqcS2nLsXWZ5BjW16cgGnM0So4DUQ94s"
API_URL = f"https://api.telegram.org/bot{BOT_TOKEN}/getUpdates"
PERIODIC_CHECK_TIME = 30


ALL_UPDATE_IDS = set()


def is_register_message(message: str):
    if message.startswith("/register"):
        return True, message.split(" ")[1]
    return False, None


async def fetch_updates():
    print("Fetching updates")
    global last_update_id
    async with httpx.AsyncClient() as client:
        response = await client.get(API_URL)
        data = response.json()

        # Check for new updates
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
                if is_registration_message:
                    with get_db() as db:
                        # check if family member exists
                        family_member = (
                            db.query(FamilyMember)
                            .filter(FamilyMember.id == family_member_id)
                            .first()
                        )
                        if family_member is None:
                            print(f"Family member {family_member_id} does not exist")
                            continue
                        else:
                            family_member.chat_id = chat_id
                            db.commit()

                else:
                    # save the message to the database
                    with get_db() as db:
                        message = Message(
                            message=text_message,
                            family_member_id=family_member_id,
                            chat_id=chat_id,
                        )
                        db.add(message)
                        db.commit()


async def periodic_update_check():
    while True:
        await fetch_updates()
        await asyncio.sleep(PERIODIC_CHECK_TIME)
