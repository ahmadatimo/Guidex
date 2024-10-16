from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Define the PostgreSQL database URL (SupaBase)
DATABASE_URL = "https://wlkrsebopdkdkkxpokao.supabase.co"               
# Create the SQLAlchemy engine and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Define the base class for models
Base = declarative_base()

# Define the User class
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)

# Define the Student class, inheriting from User
class Student(User):
    __tablename__ = "students"
    id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    school = Column(String(100), nullable=False)

# Define the Admin class, inheriting from User
class Admin(User):
    __tablename__ = "admins"
    id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    authorization_level = Column(String(50), nullable=False)

# Create the database tables
Base.metadata.create_all(bind=engine)

# Define the DB class to manage database operations
class DB:
    def __init__(self):
        self.session = SessionLocal()

    # Create a student
    def create_student(self, name: str, email: str, password: str, school: str):
        new_student = Student(name=name, email=email, password=password, school=school)
        self.session.add(new_student)
        self.session.commit()
        self.session.refresh(new_student)
        return new_student

    # Create an admin
    def create_admin(self, name: str, email: str, password: str, authorization_level: str):
        new_admin = Admin(name=name, email=email, password=password, authorization_level=authorization_level)
        self.session.add(new_admin)
        self.session.commit()
        self.session.refresh(new_admin)
        return new_admin

    # Get all students
    def get_students(self):
        return self.session.query(Student).all()

    # Get all admins
    def get_admins(self):
        return self.session.query(Admin).all()

    # Get a student by ID
    def get_student(self, student_id: int):
        return self.session.query(Student).filter(Student.id == student_id).first()

    # Get an admin by ID
    def get_admin(self, admin_id: int):
        return self.session.query(Admin).filter(Admin.id == admin_id).first()

    # Update a student
    def update_student(self, student_id: int, name: str, school: str):
        student = self.session.query(Student).filter(Student.id == student_id).first()
        if student:
            student.name = name
            student.school = school
            self.session.commit()
        return student

    # Update an admin
    def update_admin(self, admin_id: int, name: str, authorization_level: str):
        admin = self.session.query(Admin).filter(Admin.id == admin_id).first()
        if admin:
            admin.name = name
            admin.authorization_level = authorization_level
            self.session.commit()
        return admin

    # Delete a student
    def delete_student(self, student_id: int):
        student = self.session.query(Student).filter(Student.id == student_id).first()
        if student:
            self.session.delete(student)
            self.session.commit()
        return student

    # Delete an admin
    def delete_admin(self, admin_id: int):
        admin = self.session.query(Admin).filter(Admin.id == admin_id).first()
        if admin:
            self.session.delete(admin)
            self.session.commit()
        return admin

    # Close the session
    def close(self):
        self.session.close()
