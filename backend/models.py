from sqlalchemy import Boolean, Integer, String, Column
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String(50), unique=True)
    password = Column(String(50))
    role= Column(String(20))



class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key= True, index=True)
    user_id = Column(Integer)