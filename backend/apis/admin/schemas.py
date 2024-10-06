from pydantic_settings import BaseSettings
from typing import List


class AdminLoginPayload(BaseSettings):
    username: str
    password: str

    # class Config:
    #     schema_extra = {
    #         "example": {
    #             "name": "John Doe",
    #             "age": 35,
    #             "family_members": [
    #                 {"name": "Jane Doe", "age": 32, "relation": "spouse"},
    #                 {"name": "Jimmy Doe", "age": 10, "relation": "child"},
    #             ],
    #         }
    #     }
