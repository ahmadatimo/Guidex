from sqlalchemy import Column, Integer, String, ForeignKey, Date, Time, Text, DateTime, Enum, Boolean
from app.database import Base
from sqlalchemy.orm import relationship
from datetime import date, time, datetime
from typing import Optional
from pydantic import BaseModel, Field
import enum


class AppointmentStatus(enum.Enum):
    CREATED = "created"       # Appointment created by user
    PENDING_ADMIN = "pending_admin"  # Pending admin approval
    APPROVED = "approved"     # Approved by admin
    ACCEPTED = "accepted"     # Accepted by a guide
    REJECTED = "rejected"     # Rejected by admin
    DECLINED = "declined"     # Declined by a guide
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
    notifications = relationship("Notification", back_populates="recipient")

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
    notifications = relationship("Notification", back_populates="appointment")



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

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)  # Unique notification ID
    recipient_id = Column(Integer, ForeignKey("user.id"), nullable=False)  # User to whom the notification belongs
    appointment_id = Column(Integer, ForeignKey("appointment.id"), nullable=True)  # Associated appointment, if any
    message = Column(Text, nullable=False)  # Notification message
    type = Column(String(50), nullable=False)  # Notification type (e.g., "admin", "guide", "user")
    is_read = Column(Boolean, default=False)  # Whether the notification is read
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)  # Creation timestamp

    # Relationships
    recipient = relationship("User", back_populates="notifications")
    appointment = relationship("Appointment", back_populates="notifications")


class NotificationCreate(BaseModel):
    recipient_id: int
    appointment_id: int | None = None
    message: str
    type: str

class NotificationResponse(BaseModel):
    id: int
    recipient_id: int
    appointment_id: Optional[int]  # Optional if nullable in the database
    message: str
    type: str
    is_read: bool
    created_at: datetime
    class Config:
        from_attributes=True
    
