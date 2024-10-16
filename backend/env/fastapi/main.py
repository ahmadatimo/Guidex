from fastapi import FastAPI, HTTPException
from database import DB

# Initialize FastAPI
app = FastAPI()

# Initialize the DB instance
db = DB()

@app.post("/students/")
def create_student(name: str, email: str, password: str, school: str):
    try:
        student = db.create_student(name=name, email=email, password=password, school=school)
        return student
    except Exception as e:
        raise HTTPException(status_code=400, detail="Error creating student")

@app.post("/admins/")
def create_admin(name: str, email: str, password: str, authorization_level: str):
    try:
        admin = db.create_admin(name=name, email=email, password=password, authorization_level=authorization_level)
        return admin
    except Exception as e:
        raise HTTPException(status_code=400, detail="Error creating admin")

@app.get("/students/")
def get_students():
    return db.get_students()

@app.get("/admins/")
def get_admins():
    return db.get_admins()

# Ensure the database connection is closed after each request
@app.on_event("shutdown")
def shutdown():
    db.close()
