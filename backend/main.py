from supabase import create_client
from gotrue.errors import AuthApiError
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

# Register user endpoint
@app.post(
    "/register",
    response_model=UserResponse,
    summary="Register a new user",
    description="Registers a new user with email and password using Supabase Auth.",
    responses={
        400: {
            "description": "Invalid input data.",
            "content": {"application/json": {"example": {"detail": "Invalid input."}}},
        },
        409: {
            "description": "User already registered.",
            "content": {"application/json": {"example": {"detail": "User already registered. Please log in or enter another email."}}},
        },
        429: {
            "description": "Rate limit exceeded.",
            "content": {"application/json": {"example": {"detail": "Rate limit exceeded. Try again later."}}},
        },
        500: {
            "description": "Internal server error.",
            "content": {"application/json": {"example": {"detail": "Internal Server Error: <error_message>"}}},
        },
    },
)
async def register_user(user: UserCreate):
    """
    Register a new user with Supabase authentication.
    """
    try:
        # Call Supabase sign-up method
        response = supabase.auth.sign_up(
            {"email": user.email, "password": user.password}
        )

        # Access the user object from the response
        new_user = response.user

        # Return the UserResponse schema
        return UserResponse(id=new_user.id, email=new_user.email)

    except AuthApiError as e:
        # Handle 'User already registered' error
        if "User already registered" in str(e):
            raise HTTPException(
                status_code=409,
                detail="User already registered. Please log in or enter another email.",
            )
        elif "rate limit" in str(e).lower():
            raise HTTPException(
                status_code=429, detail="Rate limit exceeded. Try again later."
            )
        # Handle other internal errors
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
