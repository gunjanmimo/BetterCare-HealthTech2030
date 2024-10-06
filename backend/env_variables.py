from pydantic_settings import BaseSettings


class EnvironmentSettings(BaseSettings):

    # Database
    DATABASE_URL: str
    DB_ECHO: str

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = EnvironmentSettings()
settings.DB_ECHO = eval(settings.DB_ECHO)
