from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logger import logger

# Import Routers
from app.routers import health, analysis, viva, evaluation

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI Microservice for Code Analysis, Authorship Verification, and Viva Generation",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS (Allow Node backend to connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(analysis.router, prefix="/api", tags=["Analysis"])
app.include_router(viva.router, prefix="/api", tags=["Viva"])
app.include_router(evaluation.router, prefix="/api", tags=["Evaluation"])

@app.on_event("startup")
async def startup_event():
    logger.info(f"Starting {settings.PROJECT_NAME} v{settings.VERSION}")
    # You can load heavy ML models here if needed

@app.get("/")
async def root():
    return {"message": "Welcome to ACVAA AI Service. Go to /docs for API documentation."}