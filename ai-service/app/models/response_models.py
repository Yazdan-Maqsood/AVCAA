from pydantic import BaseModel
from typing import List, Dict, Any

class CodeStructure(BaseModel):
    functions: List[str]
    classes: List[str]
    loops_count: int
    conditionals_count: int
    imports: List[str]

class AnalysisResponse(BaseModel):
    language: str
    structure: CodeStructure
    authorship_score: float # 0-100 (100 = original human)
    complexity_score: float
    ai_generated_probability: float

class VivaQuestion(BaseModel):
    text: str
    difficulty: str # Basic, Intermediate, Advanced
    topic: str

class VivaResponse(BaseModel):
    questions: List[VivaQuestion]

class EvaluationResponse(BaseModel):
    score: float # 0-100
    feedback: str
    is_consistent: bool