from pydantic import BaseModel, Field
from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Annotated
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.routers.auth import get_current_user  # Import JWT auth dependency
import app.models as models
from datetime import date, time
from typing import Optional
from app.models import AppointmentStatus
# Create the APIRouter instance
router = APIRouter()

# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

class AppointmentBase(BaseModel):
    date: date  # Appointment date
    time: time  # Appointment time
    city: str = Field(..., max_length=50)  # City of the appointment
    visitors_number: int = Field(..., ge=1)  # Minimum 1 visitor
    note: Optional[str] = None  # Optional note
    status: AppointmentStatus = AppointmentStatus.CREATED  # Default status

    class Config:
        orm_mode = True


    
# Get all appointments (for the current user)
@router.get("/", response_model=List[AppointmentBase])
async def get_appointments(
    db: db_dependency, 
    current_user: dict = Depends(get_current_user), 
    skip: int = 0, 
    limit: int = 10
):
    user_id = current_user['user_id']
    appointments = db.query(models.Appointment).filter(
        models.Appointment.user_id == user_id
    ).offset(skip).limit(limit).all()
    return appointments

# Get appointment by ID
@router.get("/{appointment_id}", response_model=AppointmentBase)
async def get_appointment(
    appointment_id: int, 
    db: db_dependency, 
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user['user_id']
    appointment = db.query(models.Appointment).filter(
        models.Appointment.id == appointment_id,
        models.Appointment.user_id == user_id
    ).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment

# Create a new appointment
@router.post("/", status_code=201)
async def create_appointment(
    appointment: AppointmentBase, 
    db: db_dependency, 
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user['user_id']
    db_appointment = models.Appointment(
        **appointment.dict(), user_id=user_id
    )
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment


# Update appointment
@router.put("/{appointment_id}", response_model=AppointmentBase)
async def update_appointment(
    appointment_id: int, 
    updated_data: AppointmentBase, 
    db: db_dependency, 
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user['user_id']
    appointment = db.query(models.Appointment).filter(
        models.Appointment.id == appointment_id,
        models.Appointment.user_id == user_id
    ).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    for key, value in updated_data.model_dump(exclude_unset=True).items():
        setattr(appointment, key, value)
    db.commit()
    db.refresh(appointment)
    return appointment

# Delete appointment
@router.delete("/{appointment_id}", status_code=204)
async def delete_appointment(
    appointment_id: int, 
    db: db_dependency, 
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user['user_id']
    appointment = db.query(models.Appointment).filter(
        models.Appointment.id == appointment_id,
        models.Appointment.user_id == user_id
    ).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    db.delete(appointment)
    db.commit()
    return {"detail": "Appointment deleted successfully"}
