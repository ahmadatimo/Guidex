from fastapi import APIRouter, HTTPException
from app.models import Feedback  # Define a Feedback model

router = APIRouter()

feedbacks = []  # Temporary in-memory storage

@router.post("/feedback")
async def submit_feedback(message: str):
    feedback_id = len(feedbacks) + 1
    feedbacks.append({"id": feedback_id, "message": message})
    return {"success": True, "message": "Feedback submitted successfully."}

@router.get("/feedback")
async def get_feedback():
    return feedbacks
