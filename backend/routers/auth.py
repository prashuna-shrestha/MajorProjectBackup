from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import SessionLocal
from models import User
from schemas import UserCreate, UserResponse, UserLogin
from passlib.context import CryptContext
from passlib.exc import UnknownHashError

router = APIRouter(prefix="/auth", tags=["Auth"])

# ------------------------
# Password hashing setup
# ------------------------
# Use Argon2 only (modern and secure)
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

# ------------------------
# Database dependency
# ------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ------------------------
# Hash password safely
# ------------------------
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# ------------------------
# Verify password safely
# ------------------------
def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except UnknownHashError:
        # Any invalid or corrupted hash will fail gracefully
        return False

# ------------------------
# Signup endpoint
# ------------------------
@router.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hash_password(user.password)  # secure Argon2 hash
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

# ------------------------
# Login endpoint
# ------------------------
@router.post("/login", response_model=UserResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    return db_user