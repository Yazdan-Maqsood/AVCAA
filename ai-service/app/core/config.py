from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    PROJECT_NAME: str = "ACVAA AI Service"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    PORT: int = 8000
    
    # OpenAI settings
    OPENAI_API_KEY: str = "dummy_key_if_not_set"
    OPENAI_API_BASE: str = "https://api.openai.com/v1"
    LLM_MODEL: str = "gpt-3.5-turbo"
    
    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()