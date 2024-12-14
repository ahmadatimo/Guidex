import json
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import School

# Load the JSON file
def load_schools_from_json(json_file: str):
    with open(json_file, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data['highschools']

# Insert data into the database
def populate_schools(db: Session, schools: list):
    for school_data in schools:
        # Check if the school already exists
        existing_school = db.query(School).filter_by(name=school_data['name'], city=school_data['city']).first()
        if not existing_school:
            new_school = School(name=school_data['name'], city=school_data['city'])
            db.add(new_school)
    db.commit()

# Main function
def main():
    db = SessionLocal()
    try:
        schools = load_schools_from_json('schools.json')
        populate_schools(db, schools)
        print("Schools have been successfully populated!")
    finally:
        db.close()

if __name__ == "__main__":
    main()
