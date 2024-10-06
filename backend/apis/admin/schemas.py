from pydantic_settings import BaseSettings


class AdminLoginPayload(BaseSettings):
    username: str
    password: str
