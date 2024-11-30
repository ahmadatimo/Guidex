from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from typing import Annotated
import app.models as models
from app.database import engine, SessionLocal
from sqlalchemy.orm import Session
from passlib.context import CryptContext

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

class AppointmentBase(BaseModel):
    user_id: int


class UserBase(BaseModel):
    user_email: EmailStr 
    password: str
    role:     str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

# Imported hashing function
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

@app.post("/users/", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserBase, db: db_dependency):
    db_user = models.User(**user.model_dump())
    
    # Password hashed before storing
    db_user.password = hash_password(user.password)
    db.add(db_user)
    db.commit()


# Appointments func

# Create new appointment
@app.post("/appointments/", status_code=201, tags=["Appointments"])
async def create_appointment(appointment: AppointmentBase, db: db_dependency):
    db_appointment = models.Appointment(**appointment.model_dump())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

# Get all appointments
@app.get("/appointments/", response_model=List[AppointmentBase], tags=["Appointments"])
async def get_appointments(db: db_dependency, skip: int = 0, limit: int = 10):
    appointments = db.query(models.Appointment).offset(skip).limit(limit).all()
    return appointments

# Get appointment by ID
@app.get("/appointments/{appointment_id}", response_model=AppointmentBase, tags=["Appointments"])
async def get_appointment(appointment_id: int, db: db_dependency):
    appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment

# Update appointment
@app.put("/appointments/{appointment_id}", response_model=AppointmentBase, tags=["Appointments"])
async def update_appointment(appointment_id: int, updated_data: AppointmentBase, db: db_dependency):
    appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    for key, value in updated_data.model_dump(exclude_unset=True).items():
        setattr(appointment, key, value)
    db.commit()
    db.refresh(appointment)
    return appointment

# Delete appointment
@app.delete("/appointments/{appointment_id}", status_code=204, tags=["Appointments"])
async def delete_appointment(appointment_id: int, db: db_dependency):
    appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    db.delete(appointment)
    db.commit()
    return {"detail": "Appointment deleted successfully"}
