from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Simulated in-memory "database"
fake_user_db = {}

# Request model
class SignupRequest(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    password: str = Field(..., min_length=6)

# Response model
class SignupResponse(BaseModel):
    id: str
    name: str
    email: EmailStr

@router.post("/signup", response_model=SignupResponse)
async def signup(user: SignupRequest):
    email = user.email.lower()

    # Check if user already exists
    if email in fake_user_db:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = pwd_context.hash(user.password)

    user_id = str(len(fake_user_db) + 1)

    # Save user to fake db
    fake_user_db[email] = {
        "id": user_id,
        "name": user.name,
        "email": email,
        "password": hashed_password
    }

    return SignupResponse(id=user_id, name=user.name, email=email)
