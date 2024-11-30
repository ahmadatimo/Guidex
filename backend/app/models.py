from sqlalchemy import Integer, String, Column, Enum, ForeignKey, Date, Time, Text
from app.database import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False )
    user_email = Column(String(50), unique=True, nullable=False)
    role= Column(String(50), nullable=False,)
    hashed_password = Column(String(255), nullable = False)
    school_name = Column(String(225))
    # appointments = relationship("Appointment",back_populates="user",cascade="all, delete")




class Appointment(Base):
    __tablename__ = "appointment"

    id = Column(Integer, primary_key= True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    city = Column(String(50), nullable=False)
    visitors_number = Column(Integer, nullable=False) 
    GM = Column(String(255), nullable=False)  
    GM_phone = Column(String(17), nullable=False)  
    GM_email = Column(String(255), nullable=False) 
    note = Column(Text)  

    # user = relationship("User", back_populates="appointments")