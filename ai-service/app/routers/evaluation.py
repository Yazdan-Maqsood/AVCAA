from fastapi import APIRouter
from app.models.request_models import EvaluateAnswerRequest
from app.models.response_models import EvaluationResponse
from app.services.evaluator import AnswerEvaluator

router = APIRouter()
evaluator = AnswerEvaluator()

@router.post("/evaluate-answer", response_model=EvaluationResponse)
async def evaluate_answer(request: EvaluateAnswerRequest):
    result = evaluator.evaluate(
        question=request.question,
        student_answer=request.student_answer,
        code_context=request.code_context
    )
    return EvaluationResponse(**result)