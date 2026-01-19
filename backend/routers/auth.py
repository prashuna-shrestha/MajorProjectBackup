from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import SessionLocal
from models import User                  
from schemas import UserCreate, UserResponse, UserLogin
from passlib.context import CryptContext

router = APIRouter(prefix="/auth", tags=["Auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Hash password
def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


@router.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post("/login", response_model=UserResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    return db_user
