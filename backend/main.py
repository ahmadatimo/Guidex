from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client
from supabase.lib.client_options import ClientOptions
from gotrue.errors import AuthApiError
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import EmailStr
from schemas import *
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

admin_auth_client = supabase.auth.admin

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register user endpoint
@app.post(
    "/register",
    response_model=UserResponse,
    summary="Register a new user",
    description="Registers a new user with email and password using Supabase Auth."
)
async def register_user(user: UserCreate):
    try:
        response = supabase.auth.sign_up(
            {"email": user.email, "password": user.password}
        )
        new_user = response.user
        return UserResponse(id=new_user.id, email=new_user.email)
    except AuthApiError as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}") # TODO: Handle if user already exists


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


@app.delete("/delete", response_model=DeleteUserResponse)
async def delete_user(user: LoginUser):
    
    # Authenticate the user
    response = supabase.auth.sign_in_with_password({
        "email": user.email,
        "password": user.password
    })

    logged_in_user = response.user
    out  = supabase.auth.sign_out()

    print(logged_in_user.id)
    # Delete the user
    delete_response = supabase.auth.admin.delete_user(logged_in_user.id)

    return DeleteUserResponse(message="User deleted successfully.")


        


@app.post("/reset-password")
async def reset_password(request: ResetPasswordRequest):
    response = supabase.auth.reset_password_for_email(request.email)
    
    return {"message": "Password reset email sent successfully"}


@app.post("/update-password")
async def update_password(request: UpdatePasswordRequest):
    response = supabase.auth.update_user({
        "email": request.email,
        "password": request.new_password
    })
    return {"message": "Password updated successfully"}

