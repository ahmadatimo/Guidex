from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client
from gotrue.errors import AuthApiError
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from schemas import UserCreate, UserResponse, LoginUser
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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify domains here instead of "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    try:
        response = supabase.auth.sign_up(
            {"email": user.email, "password": user.password}
        )
        new_user = response.user
        return UserResponse(id=new_user.id, email=new_user.email)
    except AuthApiError as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


@app.post("/login", response_model=UserResponse)
async def login_user(user: LoginUser):
    try:
        response = supabase.auth.sign_in_with_password(
            {"email": user.email, "password": user.password}
        )
        logged_in_user = response.user
        
        return UserResponse(id=logged_in_user.id, email=logged_in_user.email)
    
    except AuthApiError as e:
        if "Invalid login credentials" in str(e):
            raise HTTPException(status_code=401, detail="Invalid email or password.")
        else:
            raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

