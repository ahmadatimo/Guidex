from datetime import timedelta, datetime, timezone
from typing import Annotated
from fastapi import APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from app.database import  SessionLocal
from sqlalchemy.orm import Session
from sqlalchemy import event
from app.models import User
from fastapi import HTTPException, Depends, status
from jose import jwt, JWTError
from passlib.context import CryptContext
from typing import Optional




router = APIRouter(
    prefix='/auth',
    tags=['auth']
)


oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/login")
bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated="auto")

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
    school_name: Optional[str] = None
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    role: str
    name: str



        
    
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
    encode = {
        'sub': username,
        'user_id': user_id,
        'exp': expires
    }
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORRITHM)



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
    return {'access_token': token, 'token_type' : 'bearer', 'role': valid_user.role, 'name' : valid_user.name}
        

@router.get("/auth/get_user")
async def get_user():
    return {"current_user" : "Zesty Timo"}


#--------------------------------------------------------------- Below code is for admin initialization--------------------------------------- 


# Function to create admin user (explicitly passing the DB session)
def create_admin_user(db: Session):
    # Check if an admin user already exists
    admin_user = db.query(User).filter(User.role == "admin").first()
    if not admin_user:
        # Create the admin user
        admin_user = User(
            name="Admin",
            user_email="admin@example.com",
            role="admin",
            hashed_password=bcrypt_context.hash("abcd1234"),
            school_name=None,
        )
        db.add(admin_user)
        db.commit()
        print("Admin user created.")
    else:
        print("Admin user already exists.")

#-----------------------------------------------------------Below code is for populating db with the mock visitor and mock guide--------------------
#-----------------------------------------------------------it should be delete prior deployment----------------------------------------------------

def create_mock_users(db: Session):
    visitor = db.query(User).filter(User.role == "visitor").first()
    guide = db.query(User).filter(User.role == "guide").first()

    if not visitor and not guide:
        visitor = User(
            name = "VisitorExample",
            user_email = "visitor@example.com",
            role = "visitor",
            hashed_password=bcrypt_context.hash("abcd1234"),
            school_name = "High School A"
        )

        guide = User(
            name = "GuideExample",
            user_email = "guide@example.com",
            role = "guide",
            hashed_password=bcrypt_context.hash("abcd1234"),
            school_name = None
        )

        db.add(visitor)
        db.add(guide)
        db.commit()
        print("Mock visitor and guide users created")
    else:
        print("Users already exists.")



# Event listener for after creating the table
def after_create_listener(target, connection, **kwargs):
    # Create a session from the sessionmaker
    db = SessionLocal()
    create_admin_user(db)
    create_mock_users(db)
    db.close()

# Attach the event listener
event.listen(User.__table__, 'after_create', after_create_listener)