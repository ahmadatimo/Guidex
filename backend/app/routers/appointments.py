from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database import  SessionLocal
from sqlalchemy.orm import Session
from typing import Annotated

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

class AppointmentBase(BaseModel):
    user_id: int

router = APIRouter()

@router.get("/get_appointment/{appointment_id}")
async def get_appointment(appointment_id : int):
    return {"here is your appointment" : appointment_id}
