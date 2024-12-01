from fastapi import FastAPI
import app.models as models
from app.database import engine
from app.routers import auth, appointments

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

@app.get("/public-test", include_in_schema=False)
async def public_test():
    return {"message": "Backend is running"}

app.include_router(auth.router)
app.include_router(appointments.router)