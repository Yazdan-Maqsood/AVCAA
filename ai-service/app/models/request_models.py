from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class AnalyzeCodeRequest(BaseModel):
    code: str
    language: str = "python"

class GenerateVivaRequest(BaseModel):
    code: str
    language: str = "python"
    analysis_data: Optional[Dict[str, Any]] = None
    num_questions: int = 3

class EvaluateAnswerRequest(BaseModel):
    question: str
    student_answer: str
    code_context: str

class ModificationChallengeRequest(BaseModel):
    code: str
    language: str