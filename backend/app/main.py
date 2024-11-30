from fastapi import FastAPI
import app.models as models
from app.database import engine
from app.routers import auth, appointments

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(appointments.router)


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
