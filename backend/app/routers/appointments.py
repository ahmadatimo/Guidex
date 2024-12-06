from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Annotated
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.routers.auth import get_current_user  # Import JWT auth dependency
from app.models import AppointmentBase, Appointment, AppointmentResponse, AppointmentStatus, AppointmentStatusUpdate, User

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




#CRUD functions
# Get all appointments (for the current user)
@router.get("/", response_model=List[AppointmentBase])
async def get_appointments(
    db: db_dependency, 
    current_user: dict = Depends(get_current_user), 
    skip: int = 0, 
    limit: int = 10
):
    user_id = current_user['user_id']
    appointments = db.query(Appointment).filter(
        Appointment.user_id == user_id
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
    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id,
        Appointment.user_id == user_id
    ).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment

# Create a new appointment
@router.post("/appointment", status_code=201)
async def create_appointment(
    appointment: AppointmentBase, 
    db: db_dependency, 
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user['user_id']
    db_appointment = Appointment(
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
    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id,
        Appointment.user_id == user_id
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
    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id,
        Appointment.user_id == user_id
    ).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    db.delete(appointment)
    db.commit()
    return {"detail": "Appointment deleted successfully"}



# Managing Status


# Utils
@router.get("/user/appointments", response_model=List[AppointmentResponse])
async def get_appointments_for_user(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)  # Use JWT to get current user
):
    """
    Fetch all appointments created by a user (user_id).
    """
    user_id = current_user['user_id']
    appointments = db.query(Appointment).filter(Appointment.user_id == user_id).all()
    if not appointments:
        raise HTTPException(status_code=404, detail="No appointments found for this user.")
    return appointments


@router.get("/guides/available-appointments", response_model=List[AppointmentResponse])
async def get_available_appointments_for_guides(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Fetch all appointments available for guides to accept.
    """

    appointments = (
        db.query(Appointment)
        .filter(Appointment.status == "APPROVED", Appointment.guide_id == None)
        .all()
    )
    if not appointments:
        raise HTTPException(status_code=404, detail="No available appointments for guides.")
    return appointments


@router.get("/guide/appointments", response_model=List[AppointmentResponse])
async def get_assigned_appointments_for_guide(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Fetch all appointments assigned to a specific guide.
    """
    guide_id = current_user['user_id']   
    appointments = db.query(Appointment).filter(Appointment.guide_id == guide_id).all()
    if not appointments:
        raise HTTPException(status_code=404, detail="No appointments found for this guide.")
    return appointments

# Getters and Setters for Appointments

@router.get("/appointments/{appointment_id}", response_model=AppointmentResponse)
async def get_appointment_by_id(
    appointment_id: int,
    db: Session = Depends(get_db),
):
    """
    Fetch an appointment by its ID.
    """
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found.")
    return appointment

@router.get("/appointments/status/{status}", response_model=List[AppointmentResponse])
async def get_appointments_by_status(status: str, db: Session = Depends(get_db)):
    """
    Fetch appointments with a specific status.
    """
    appointments = db.query(Appointment).filter(Appointment.status == status).all()
    return appointments

@router.put("/appointments/{appointment_id}/status")
async def set_appointment_status(appointment_id: int, update: AppointmentStatusUpdate, db: Session = Depends(get_db)):
    """
    Update the status of an appointment.
    """
    appointment = await get_appointment_by_id(appointment_id, db)
    appointment.status = update.status
    db.commit()
    db.refresh(appointment)
    return appointment

@router.put("/appointments/{appointment_id}/assign-guide")
async def assign_guide_to_appointment(appointment_id: int, guide_id: int, db: Session = Depends(get_db)):
    """
    Assign a guide to an appointment.
    """
    appointment = await get_appointment_by_id(appointment_id, db)
    
    if appointment.status != AppointmentStatus.APPROVED:
        raise HTTPException(status_code=400, detail="Only approved appointments can be assigned." + str(appointment.status))
    if appointment.guide_id is not None:
        raise HTTPException(status_code=400, detail="Appointment already assigned to a guide.")
    appointment.guide_id = guide_id
    appointment.status = AppointmentStatus.ACCEPTED  # Update status to accepted
    db.commit()
    db.refresh(appointment)
    return appointment

@router.put("/appointments/{appointment_id}/unassign-guide")
async def unassign_guide_from_appointment(appointment_id: int, db: Session = Depends(get_db)):
    """
    Remove a guide from an appointment.
    """
    appointment = await get_appointment_by_id(appointment_id, db)
    if appointment.guide_id is None:
        raise HTTPException(status_code=400, detail="No guide is assigned to this appointment.")
    appointment.guide_id = None
    appointment.status = "APPROVED"  # Revert status to approved
    db.commit()
    db.refresh(appointment)
    return appointment

@router.put("/appointments/{appointment_id}")
async def update_appointment_details(appointment_id: int, updates: dict, db: Session = Depends(get_db)):
    """
    Update specific details of an appointment.
    :param updates: Dictionary of fields to update and their new values.
    """
    appointment = await get_appointment_by_id(appointment_id, db)
    for key, value in updates.items():
        if hasattr(appointment, key):
            setattr(appointment, key, value)
    db.commit()
    db.refresh(appointment)
    return appointment


@router.get("/appointments/available-times/{date}", response_model=List[str])
async def get_available_times_for_date(
    date: str,
    db: Session = Depends(get_db)
):
    """
    Get a list of available times for a specific date.
    """
    # Query booked times for the date
    appointments = db.query(Appointment).filter(Appointment.date == date).all()
    booked_times = [appointment.time.strftime("%H:%M:%S") for appointment in appointments]

    # Define all possible time slots in HH:mm:ss format
    all_times = ["10:00:00", "13:00:00", "15:00:00"]
    
    # Find available times
    available_times = [time for time in all_times if time not in booked_times]
    return available_times


@router.get("/appointment/{appointment_id}/school")
def get_school_name(appointment_id: int, db: Session = Depends(get_db)):
    try:
        school_name = get_school_name_by_user_id(db, appointment_id)
        return {"appointment_id": appointment_id, "school_name": school_name}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


def get_school_name_by_user_id(db: Session, appointment_id: int) -> str:
    """
    Retrieve the school name associated with the user in an appointment.

    :param db: SQLAlchemy session object
    :param appointment_id: ID of the appointment
    :return: School name associated with the user
    :raises: ValueError if the appointment or user is not found
    """
    # Join Appointment with User table to retrieve the school name
    appointment = (
        db.query(Appointment)
        .join(User, Appointment.user_id == User.id)
        .filter(Appointment.id == appointment_id)
        .first()
    )

    if not appointment:
        raise ValueError("Appointment not found.")

    if not appointment.user or not appointment.user.school_name:
        raise ValueError("School name not found for this user.")

    return appointment.user.school_name