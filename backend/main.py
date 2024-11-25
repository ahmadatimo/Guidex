from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from typing import Generator
from mysql.connector import connect, Error
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Database configuration
DATABASE_HOST = os.getenv("DATABASE_HOST", "localhost")
DATABASE_PORT = os.getenv("DATABASE_PORT", "3306")
DATABASE_USER = os.getenv("DATABASE_USER", "root")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD", "password")
DATABASE_NAME = os.getenv("DATABASE_NAME", "guidex")

# Create database connection
def get_db_connection() -> Generator:
    try:
        connection = connect(
            host=DATABASE_HOST,
            port=DATABASE_PORT,
            user=DATABASE_USER,
            password=DATABASE_PASSWORD,
            database=DATABASE_NAME
        )
        yield connection
    finally:
        connection.close()

# FastAPI app
app = FastAPI()

# Pydantic Schema for User
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

# API Endpoint to add a user
@app.post("/users/", status_code=201)
def create_user(user: UserCreate, db=Depends(get_db_connection)):
    try:
        # Check if user with the same email exists
        check_user_query = "SELECT * FROM users WHERE email = %s"
        with db.cursor(dictionary=True) as cursor:
            cursor.execute(check_user_query, (user.email,))
            existing_user = cursor.fetchone()
            if existing_user:
                raise HTTPException(status_code=400, detail="Email already registered")

        # Insert new user
        insert_user_query = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)"
        with db.cursor() as cursor:
            cursor.execute(insert_user_query, (user.name, user.email, user.password))
            db.commit()
            new_user_id = cursor.lastrowid

        return {"id": new_user_id, "name": user.name, "email": user.email}

    except Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
