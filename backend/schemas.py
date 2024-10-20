from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: EmailStr

class LoginUser(BaseModel):
    email: EmailStr
    password: str

class ResetPasswordRequest(BaseModel):
    email: str

class UpdatePasswordRequest(BaseModel):
    email: EmailStr
    new_password: str

class DeleteUserResponse(BaseModel):
    message: str