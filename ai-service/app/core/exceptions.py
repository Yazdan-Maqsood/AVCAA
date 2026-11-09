from fastapi import HTTPException

class CodeParsingError(HTTPException):
    def __init__(self, detail: str = "Failed to parse code"):
        super().__init__(status_code=422, detail=detail)

class AIServiceError(HTTPException):
    def __init__(self, detail: str = "AI Service encountered an error"):
        super().__init__(status_code=500, detail=detail)