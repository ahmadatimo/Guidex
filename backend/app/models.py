from sqlalchemy import Column, Integer, String, ForeignKey, Date, Time, Text, DateTime, Enum, event
from app.database import Base, SessionLocal
from sqlalchemy.orm import relationship, Session
from datetime import date, time, datetime
from typing import Optional
from pydantic import BaseModel, Field
import enum
import bcrypt

class AppointmentStatus(enum.Enum):
    CREATED = "created"       # Appointment created by user
    PENDING_ADMIN = "pending_admin"  # Pending admin approval
    APPROVED = "approved"     # Approved by admin
    AVAILABLE = "available"   # Available for guides
    ACCEPTED = "accepted"     # Accepted by a guide
    COMPLETED = "completed"   # Completed
    CANCELED = "canceled"     # Canceled (if applicable)


#Database tables
class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    user_email = Column(String(50), unique=True, nullable=False)
    role = Column(String(50), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    school_name = Column(String(225), nullable=True)

    # Relationships
    created_appointments = relationship("Appointment", foreign_keys="Appointment.user_id", back_populates="user")
    assigned_appointments = relationship("Appointment", foreign_keys="Appointment.guide_id", back_populates="guide")

class Appointment(Base):
    __tablename__ = "appointment"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)  # User who created the appointment
    guide_id = Column(Integer, ForeignKey("user.id"), nullable=True)  # Assigned guide/staff
    date = Column(Date, nullable=False)  # Appointment date
    time = Column(Time, nullable=False)  # Appointment time
    city = Column(String(50), nullable=False)  # City for the appointment
    visitors_number = Column(Integer, nullable=False)  # Number of visitors
    note = Column(Text, nullable=True)  # Optional note
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)  # Timestamp of appointment creation
    status = Column(Enum(AppointmentStatus), default=AppointmentStatus.CREATED, nullable=False)  # Status of the appointment

    # Relationships
    user = relationship("User", foreign_keys=[user_id])
    guide = relationship("User", foreign_keys=[guide_id], back_populates="assigned_appointments")



#pydantic models
class AppointmentBase(BaseModel):
    date: date  # Appointment date
    time: time  # Appointment time
    city: str 
    visitors_number: int
    note: Optional[str] = None  # Optional note
    status: AppointmentStatus = AppointmentStatus.CREATED  # Default status

class AppointmentResponse(BaseModel):
    id: int
    user_id: int
    guide_id: Optional[int] = None
    date: date
    time: time
    city: str
    visitors_number: int
    note: Optional[str] = None
    status: AppointmentStatus
    created_at: datetime

class AppointmentStatusUpdate(BaseModel):
    status: str


#--------------------------------------------------------------- These code has to  be changed later--------------------------------------- 


# Function to create admin user (explicitly passing the DB session)
def create_admin_user(db: Session):
    # Check if an admin user already exists
    admin_user = db.query(User).filter(User.role == "admin").first()
    if not admin_user:
        # Create the admin user
        admin_user = User(
            name="Admin",
            user_email="admin@example.com",
            role="admin",
            hashed_password="admin1234",
            school_name=None,
        )
        db.add(admin_user)
        db.commit()
        print("Admin user created.")
    else:
        print("Admin user already exists.")

# Event listener for after creating the table
def after_create_listener(target, connection, **kwargs):
    # Create a session from the sessionmaker
    db = SessionLocal()
    create_admin_user(db)
    db.close()

# Attach the event listener
event.listen(User.__table__, 'after_create', after_create_listener)