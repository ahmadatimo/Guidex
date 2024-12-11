from fastapi import APIRouter, HTTPException, Depends, status
from typing import List, Annotated
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.routers.auth import get_current_user  # Import JWT auth dependency
from app.models import User,UserBase

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

@router.get("/user/info", response_model = UserBase)
async def get_user(
    db: db_dependency, 
    current_user: dict = Depends(get_current_user)):
    """
    Get everything about the user.
    """
    # Validate the current_user payload
    if not current_user or "user_id" not in current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials"
        )
    
    user_id = current_user['user_id']

    # Query the database to fetch user details
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Return user data
    return {
        "user_id": user.id,
        "name": user.name,
        "user_email": user.user_email,
        "role": user.role,
        "school_name": user.school_name
    }

@router.get("/user/role")
async def get_user_role(
    db: db_dependency, 
    current_user: dict = Depends(get_current_user)):
    """
    Get the role of a user by their ID.
    """
    user_id = current_user['user_id']
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"role": user.role}
