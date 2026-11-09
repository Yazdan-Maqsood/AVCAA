from fastapi import APIRouter
from app.models.request_models import AnalyzeCodeRequest
from app.models.response_models import AnalysisResponse, CodeStructure
from app.services.ast_parser import CodeParser
from app.services.authorship import AuthorshipVerifier
import time

router = APIRouter()
parser = CodeParser()
verifier = AuthorshipVerifier()

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_code(request: AnalyzeCodeRequest):
    # 1. Parse Structure
    structure = parser.extract_structure(request.code, request.language)
    
    # 2. Authorship Verification
    ai_prob = verifier.calculate_ai_probability(request.code)
    authorship_score = 100 - ai_prob # If AI probability is high, authorship is low
    
    # 3. Mock Complexity
    complexity = len(request.code) / 100.0 + structure["loops_count"] * 2

    return AnalysisResponse(
        language=request.language,
        structure=CodeStructure(**structure),
        authorship_score=round(authorship_score, 2),
        complexity_score=round(complexity, 2),
        ai_generated_probability=round(ai_prob, 2)
    )