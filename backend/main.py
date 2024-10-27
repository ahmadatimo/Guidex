from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client
from gotrue.errors import AuthApiError
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
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
    "/auth/register",
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
async def register_user(user: UserParameter):
    """
    Register a new user with Supabase authentication. Returns access_token, access_token expiration time (in Unix time format) 
    and refresh_token to refresh it. All of these should be stored as a variable to use later when sending another request
    """
    try:
        # Call Supabase sign-up method
        response = supabase.auth.sign_up(
            {"email": user.email, "password": user.password}
        )

        # Access the user object from the response
        new_user = response.user

        return UserResponse(id=new_user.id, email=new_user.email, access_token=response.session.access_token, 
                            expires_at=response.session.expires_at, refresh_token=response.session.refresh_token)

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




#Login User enpoint
@app.post("/auth/login", response_model=UserResponse, summary="User login endpoint", status_code=200, responses={
        401: {
            "description": "Invalid input data.",
            "content": {"application/json": {"example": {"detail": "Invalid input."}}},
        },
        429: {
            "description": "Rate limit exceeded.",
            "content": {"application/json": {"example": {"detail": "Rate limit exceeded. Try again later."}}},
        },
        500: {
            "description": "Internal server error.",
            "content": {"application/json": {"example": {"detail": "Internal Server Error: <error_message>"}}},
        },
})

async def login_user(user: UserParameter):
    """
    Log the user in with email and password. Returns access_token, access_token expiration time (in Unix time format) 
    and refresh_token to refresh it. All of these should be stored as a variable to use later when sending another request.
    """
    try:
        response = supabase.auth.sign_in_with_password(
            {"email": user.email, "password": user.password}
        )
        logged_in_user = response.user
        
        
        return UserResponse(id=logged_in_user.id, email=logged_in_user.email, access_token=response.session.access_token, 
                            expires_at=response.session.expires_at, refresh_token=response.session.refresh_token)
    
    except AuthApiError as e:
        if "Invalid login credentials" in str(e):
            raise HTTPException(status_code=401, detail="Invalid email or password.")
        elif "rate limit" in str(e).lower():
            raise HTTPException(
                status_code=429, detail="Rate limit exceeded. Try again later."
            )
        else:
            raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")



#Send a forget password link
@app.post("/auth/send_forget_password_link", response_model=str, summary="Send a forget password link", status_code=200)
async def send_forgetPassword_link(userEmail: EmailParameter):
    try:
        supabase.auth.reset_password_for_email(userEmail.email, {"redirect_to": "http://localhost:3000/visitor/UpdatePass",})
        return "Link was sent succesfully"
    except AuthApiError as e:
        # Handle Supabase authentication-related errors
        if "rate limit" in e.message.lower():
            raise HTTPException(
                status_code=429,
                detail="Rate limit exceeded. Try again later."
            )
        else:
            raise HTTPException(
                status_code=401,
                detail=f"Authentication error: {e.message}"
            )
    except Exception as e:
        # Handle any unexpected server errors
        raise HTTPException(
            status_code=500,
            detail=f"Internal Server Error: {str(e)}"
        )



# Reset password endpoint
@app.put("/auth/reset-password", response_model=str, summary="Resets the password", status_code=200, responses={
        401: {
            "description": "Invalid input data.",
            "content": {"application/json": {"example": {"detail": "Invalid input."}}},
        },
        429: {
            "description": "Rate limit exceeded.",
            "content": {"application/json": {"example": {"detail": "Rate limit exceeded. Try again later."}}},
        },
        500: {
            "description": "Internal server error.",
            "content": {"application/json": {"example": {"detail": "Internal Server Error: <error_message>"}}},
        },
})
async def reset_password(userParameter: UserParameter):
   
    try:
      response = supabase.auth.update_user({"password": userParameter.password})
      return "Password reset was successful"


    except AuthApiError as e:
        # Handle Supabase authentication-related errors
        if "rate limit" in e.message.lower():
            raise HTTPException(
                status_code=429,
                detail="Rate limit exceeded. Try again later."
            )
        else:
            raise HTTPException(
                status_code=401,
                detail=f"Authentication error: {e.message}"
            )

    except Exception as e:
        # Handle any unexpected server errors
        raise HTTPException(
            status_code=500,
            detail=f"Internal Server Error: {str(e)}"
        )

    
#Delete the user account
@app.delete("/auth/delete", response_model=str, summary="Deletes the user", status_code=200, responses={
        401: {
            "description": "Invalid input data.",
            "content": {"application/json": {"example": {"detail": "Invalid input."}}},
        },
        429: {
            "description": "Rate limit exceeded.",
            "content": {"application/json": {"example": {"detail": "Rate limit exceeded. Try again later."}}},
        },
        500: {
            "description": "Internal server error.",
            "content": {"application/json": {"example": {"detail": "Internal Server Error: <error_message>"}}},
        },
})
async def delete_user(user_id: str):
    """
    If the request is succesfull this will delete a user from the database.
    The parameter user_id is the unique id that was returned to client during login / signup
    """
    
    try:
        delete_response = supabase.auth.admin.delete_user(id=user_id)
        return "The user deleted succesfully"
    except AuthApiError as e:
        # Handle Supabase authentication-related errors
        if "rate limit" in e.message.lower():
            raise HTTPException(
                status_code=429,
                detail="Rate limit exceeded. Try again later."
            )
        else:
            raise HTTPException(
                status_code=401,
                detail=f"Authentication error: {e.message}"
            )

    except Exception as e:
        # Handle any unexpected server errors
        raise HTTPException(
            status_code=500,
            detail=f"Internal Server Error: {str(e)}"
        )

    
   

