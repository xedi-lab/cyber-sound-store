from __future__ import annotations
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..database import get_db
from ..models import User
from ..schemas import UserCreate, UserOut

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=UserOut)
async def upsert_user(data: UserCreate, db: AsyncSession = Depends(get_db)):
    user = (await db.execute(select(User).where(User.tg_id == data.tg_id))).scalar_one_or_none()
    if user:
        user.name = data.name
        user.username = data.username
    else:
        user = User(**data.model_dump())
        db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

@router.get("/{tg_id}", response_model=UserOut)
async def get_user(tg_id: int, db: AsyncSession = Depends(get_db)):
    user = (await db.execute(select(User).where(User.tg_id == tg_id))).scalar_one_or_none()
    if not user:
        raise HTTPException(404)
    return user
