from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import School
from pydantic import BaseModel
from typing import List

# FastAPI Router
router = APIRouter()

# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic Models
class SchoolBase(BaseModel):
    name: str
    city: str

class SchoolResponse(SchoolBase):
    id: int

    class Config:
        from_attributes = True

@router.get("/schools", response_model=List[SchoolResponse])
def get_all_schools(db: Session = Depends(get_db)):
    """
    Get all schools from the database.
    """
    schools = db.query(School).all()
    return schools

@router.get("/schools/{school_id}", response_model=SchoolResponse)
def get_school(school_id: int, db: Session = Depends(get_db)):
    """
    Get a single school by ID.
    """
    school = db.query(School).filter(School.id == school_id).first()
    if not school:
        raise HTTPException(status_code=404, detail="School not found")
    return school

@router.post("/schools", response_model=SchoolResponse, status_code=status.HTTP_201_CREATED)
def create_school(school: SchoolBase, db: Session = Depends(get_db)):
    """
    Create a new school in the database.
    """
    # Check for duplicates
    existing_school = db.query(School).filter(School.name == school.name, School.city == school.city).first()
    if existing_school:
        raise HTTPException(status_code=400, detail="School with the same name and city already exists")

    new_school = School(name=school.name, city=school.city)
    db.add(new_school)
    db.commit()
    db.refresh(new_school)
    return new_school

@router.put("/schools/{school_id}", response_model=SchoolResponse)
def update_school(school_id: int, school: SchoolBase, db: Session = Depends(get_db)):
    """
    Update an existing school by ID.
    """
    db_school = db.query(School).filter(School.id == school_id).first()
    if not db_school:
        raise HTTPException(status_code=404, detail="School not found")

    db_school.name = school.name
    db_school.city = school.city
    db.commit()
    db.refresh(db_school)
    return db_school

@router.delete("/schools/{school_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_school(school_id: int, db: Session = Depends(get_db)):
    """
    Delete a school by ID.
    """
    db_school = db.query(School).filter(School.id == school_id).first()
    if not db_school:
        raise HTTPException(status_code=404, detail="School not found")
    db.delete(db_school)
    db.commit()
    return
