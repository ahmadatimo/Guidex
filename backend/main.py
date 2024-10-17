from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from models import User, Base
from schemas import UserCreate, UserResponse
from db import engine, get_db
from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError
import hashlib
from contextlib import asynccontextmanager

# Create a lifespan context for your FastAPI app
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Perform startup tasks here (e.g., create database tables)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield  # This yield allows the app to run while keeping resources open

    # Perform any shutdown tasks (optional)
    await engine.dispose()

# Initialize FastAPI with the lifespan handler
app = FastAPI(lifespan=lifespan)

def hash_password(password: str) -> str:
    """Simple hash function for passwords."""
    return hashlib.sha256(password.encode()).hexdigest()

@app.post("/register", response_model=UserResponse)
async def register_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    hashed_pw = hash_password(user.password)
    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_pw
    )

    db.add(new_user)
    try:
        await db.commit()
        await db.refresh(new_user)
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Username or email already exists.")
    
    return new_user

@app.get("/user/{username}", response_model=UserResponse)
async def get_user(username: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.username == username))
    user = result.scalars().first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found.")
    return user
