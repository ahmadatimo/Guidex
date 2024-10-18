from supabase import create_client
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from schemas import UserCreate, UserResponse
import os

# Load environment variables from .env
load_dotenv()

# Get Supabase credentials
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

if not url or not key:
    raise ValueError("SUPABASE_URL or SUPABASE_KEY is not set")

# Initialize Supabase client
supabase = create_client(url, key)

# Initialize FastAPI app
app = FastAPI()

@app.post("/register", response_model=UserResponse)
async def register_user(user: UserCreate):
    try:
        # Insert user into the Supabase 'users' table
        response = supabase.table("users").insert({
            "username": user.username,
            "email": user.email,
            "hashed_password": user.password  # Add hashing if needed
        }).execute()

        if response == None:
            raise HTTPException(status_code=400, detail=f"Error: {response.json()}")

        new_user = response.data[0]
        return UserResponse(**new_user)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")



