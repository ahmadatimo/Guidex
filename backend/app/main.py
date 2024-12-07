from fastapi import FastAPI
import app.models as models
from app.database import engine
from app.routers import auth, appointments, notifications, users
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
models.Base.metadata.create_all(bind=engine)



# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

app.include_router(auth.router)
app.include_router(appointments.router)
app.include_router(notifications.router)
app.include_router(users.router)