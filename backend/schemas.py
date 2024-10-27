from pydantic import BaseModel, EmailStr

class UserParameter(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    access_token: str
    expires_at: int
    refresh_token: str

class EmailParameter(BaseModel):
    email: EmailStr
    



class DeleteUserResponse(BaseModel):
    message: str