from fastapi import APIRouter
from app.models.request_models import GenerateVivaRequest
from app.models.response_models import VivaResponse, VivaQuestion
from app.services.question_generator import VivaGenerator

router = APIRouter()
generator = VivaGenerator()

@router.post("/generate-viva", response_model=VivaResponse)
async def generate_viva_questions(request: GenerateVivaRequest):
    questions_data = generator.generate_questions(
        code=request.code, 
        language=request.language,
        analysis_data=request.analysis_data,
        num=request.num_questions
    )
    
    # Convert to Pydantic models
    questions = [VivaQuestion(**q) for q in questions_data]
    
    return VivaResponse(questions=questions)