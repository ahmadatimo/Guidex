from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Create an async engine with the correct configuration
engine = create_async_engine(
    DATABASE_URL,
    connect_args={"statement_cache_size": 0},  # Correct parameter name
)

# Create an async sessionmaker
SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

async def get_db():
    """Dependency to provide a new DB session per request."""
    async with SessionLocal() as session:
        yield session
