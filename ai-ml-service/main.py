from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
import logging
from typing import Dict, Any

from model import model

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Student Success AI Engine",
    description="ML-powered prediction service for academic performance and risk analysis.",
    version="1.0.0"
)

class StudentFeatures(BaseModel):
    student_id: int
    attendance_rate: float = Field(..., description="Percentage of classes attended (0-100)")
    average_score: float = Field(..., description="Average marks across all subjects (0-100)")
    score_std: float = Field(..., description="Standard deviation of marks (variability)")
    total_courses: int = Field(..., description="Total number of courses enrolled")
    total_assessments: int = Field(..., description="Total number of assessments taken")
    min_score: float = Field(..., description="Lowest score in any subject")
    max_score: float = Field(..., description="Highest score in any subject")
    score_trend: float = Field(..., description="Trend score (positive = improving)")

class PredictionResponse(BaseModel):
    student_id: int
    risk_category: str
    risk_probability: float
    predicted_performance: float
    class_probabilities: Dict[str, float]
    feature_importance: Dict[str, float]
    model_version: str

@app.on_event("startup")
async def startup_event():
    logger.info("Initializing ML models...")
    model._load_or_train()

@app.post("/api/v1/predict", response_model=PredictionResponse)
async def predict_student_success(features: StudentFeatures):
    try:
        # Convert to dictionary and remove student_id before passing to model
        feature_dict = features.dict()
        student_id = feature_dict.pop("student_id")
        
        # Make prediction
        prediction = model.predict(feature_dict)
        
        return PredictionResponse(
            student_id=student_id,
            **prediction
        )
    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error during prediction")

@app.get("/health")
async def health_check():
    return {"status": "ok", "model_loaded": model.is_trained}
