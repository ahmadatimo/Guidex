from datetime import timedelta, datetime, timezone
from typing import Annotated
from fastapi import APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from app.database import  SessionLocal
from sqlalchemy.orm import Session
from app.models import User
from fastapi import HTTPException, Depends, status
from passlib.context import CryptContext
from jose import jwt, JWTError


router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/login")

SECRET_KEY = "91ab6d6051805a8a1bf2f65dd1c5bfbcb198cffe492808928c723002a779d2a9"
ALGORRITHM = "HS256"


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

class CreateUserRequest(BaseModel):
    user_email: EmailStr
    role: str
    name: str
    school_name: str 
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    role: str



        
    
@router.post("/register", status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, create_user: CreateUserRequest):
    # Check if the email already exists in the database
    existing_user = db.query(User).filter(User.user_email == create_user.user_email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists."
        )
    #Otherwise create a new user
    db_user = User(
        user_email= create_user.user_email,
        name= create_user.name,
        role= create_user.role,
        school_name= create_user.school_name,
        hashed_password= bcrypt_context.hash(create_user.password)
    )

    db.add(db_user)
    db.commit()
    return{"User Succesfully Registered"}


def authenticate_user(user_email: str, password: str, db):
    user = db.query(User).filter(User.user_email == user_email).first()
    #if there is no user return false
    if not user:
        return False

    #if there password is wrong also return false
    if not bcrypt_context.verify(password, user.hashed_password):
        return False
    
    #if user is authenticated return user
    return user
    

def create_access_token(username: str, user_id: int, expires_delta: timedelta):
    
    expires = datetime.now(timezone.utc) + expires_delta
    encode  = {'sub' : username, 'user_id': user_id, 'exp' : expires}
    return jwt.encode(encode, SECRET_KEY , algorithm=ALGORRITHM)


#This function is to decode a jwt and get the username with user_id
async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    try: 
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORRITHM])
        username = payload.get('sub')
        user_id = payload.get('user_id')
        #in case if the user does not exist in the given jwt
        if username is None or user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="JWT malformed1")
        
        return {"username" : username, "user_id": user_id}
    
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="JWT malformed2")
    


@router.post("/login", status_code=status.HTTP_200_OK, response_model=LoginResponse)
async def sign_in_for_access_token(db: db_dependency, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    
    valid_user = authenticate_user(form_data.username, form_data.password, db)

    if not valid_user:
        raise HTTPException(status_code= status.HTTP_401_UNAUTHORIZED)
    
    token = create_access_token(valid_user.name, valid_user.id, timedelta(minutes=30))
    return {'access_token': token, 'token_type' : 'bearer', 'role': valid_user.role}
        

@router.get("/auth/get_user")
async def get_user():
    return {"current_user" : "Zesty Timo"}