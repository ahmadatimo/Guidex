from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Annotated
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.routers.auth import get_current_user  # Import JWT auth dependency
from app.models import Notification, NotificationCreate

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



@router.get("/notifications", response_model=List[Notification])
async def get_notifications(
    db: db_dependency,
    current_user: dict = Depends(get_current_user)
):
    """
    Fetch all notifications for the authenticated user.
    """
    notifications = db.query(Notification).filter(
        Notification.recipient_id == current_user["user_id"]
    ).order_by(Notification.created_at.desc()).all()
    return notifications


@router.put("/notifications/{notification_id}/read")
async def mark_notification_as_read(
    db: db_dependency,
    notification_id: int,
    current_user: dict = Depends(get_current_user)
):
    """
    Mark a specific notification as read for the authenticated user.
    """
    notification = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.recipient_id == current_user["user_id"]
    ).first()

    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found.")

    notification.is_read = True
    db.commit()
    return {"detail": "Notification marked as read."}


@router.put("/notifications/read-all")
async def mark_all_notifications_as_read(
    db: db_dependency,
    current_user: dict = Depends(get_current_user)
):
    """
    Mark all notifications as read for the authenticated user.
    """
    notifications = db.query(Notification).filter(
        Notification.recipient_id == current_user["user_id"],
        Notification.is_read == False
    ).all()

    for notification in notifications:
        notification.is_read = True

    db.commit()
    return {"detail": f"{len(notifications)} notifications marked as read."}


@router.post("/notifications", response_model=Notification)
async def create_notification(
    db: db_dependency,
    notification: NotificationCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Create a notification for a specific user (Admin only).
    """
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Only admins can create notifications.")

    new_notification = Notification(
        recipient_id=notification.recipient_id,
        appointment_id=notification.appointment_id,
        message=notification.message,
        type=notification.type,
    )

    db.add(new_notification)
    db.commit()
    db.refresh(new_notification)
    return new_notification

@router.delete("/notifications/{notification_id}")
async def delete_notification(
    db: db_dependency,
    notification_id: int,
    current_user: dict = Depends(get_current_user)
):
    """
    Delete a specific notification for the authenticated user.
    """
    notification = db.query(Notification).filter(
        Notification.id == notification_id,
        Notification.recipient_id == current_user["user_id"]
    ).first()

    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found.")

    db.delete(notification)
    db.commit()
    return {"detail": "Notification deleted successfully."}


@router.get("/notifications/filter", response_model=List[Notification])
async def filter_notifications(
    db: db_dependency,
    type: str | None = None,
    is_read: bool | None = None,
    current_user: dict = Depends(get_current_user)
):
    """
    Filter notifications by type or read status.
    """
    query = db.query(Notification).filter(Notification.recipient_id == current_user["user_id"])

    if type:
        query = query.filter(Notification.type == type)

    if is_read is not None:
        query = query.filter(Notification.is_read == is_read)

    notifications = query.order_by(Notification.created_at.desc()).all()
    return notifications
