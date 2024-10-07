from pydantic_settings import BaseSettings
from typing import List


class PostMessagePayload(BaseSettings):
    message: str
