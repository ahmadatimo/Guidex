from sqlalchemy import Integer, String, Column, Enum, ForeignKey, Date, Time, Text
from app.database import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(225), nullable=False )
    user_email = Column(String(255), unique=True, nullable=False)
    password = Column(String(225), nullable = False)
    role= Column(
        Enum("school", "administrator", "coordinator", "guide", "visitor"),
        nullable=False,
    )
    school_name = Column(String(225))
    appointments = relationship("Appointment",back_populates="user",cascade="all, delete")




class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key= True, index=True)
    user_id = Column(Integer)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    city = Column(String(50), nullable=False)
    visitors = Column(Integer, nullable=False) 
    GM = Column(String(255), nullable=False)  
    GM_phone = Column(String(17), nullable=False)  
    GM_email = Column(String(255), nullable=False) 
    note = Column(Text)  

    user = relationship("User", back_populates="appointments")