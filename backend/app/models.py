from __future__ import annotations
from datetime import datetime
from typing import Optional, List
from sqlalchemy import String, Integer, Float, DateTime, ForeignKey, Text, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .database import Base
import enum

class OrderStatus(str, enum.Enum):
    pending     = "pending"
    in_progress = "in_progress"
    done        = "done"

class User(Base):
    __tablename__ = "users"

    id         : Mapped[int]           = mapped_column(Integer, primary_key=True)
    tg_id      : Mapped[int]           = mapped_column(Integer, unique=True, index=True)
    name       : Mapped[str]           = mapped_column(String(128))
    username   : Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    balance    : Mapped[float]         = mapped_column(Float, default=0.0)
    referrer_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("users.id"), nullable=True)
    created_at : Mapped[datetime]      = mapped_column(DateTime, default=datetime.utcnow)

    orders     : Mapped[List[Order]]   = relationship("Order", back_populates="user")

class Order(Base):
    __tablename__ = "orders"

    id         : Mapped[int]              = mapped_column(Integer, primary_key=True)
    user_id    : Mapped[int]              = mapped_column(Integer, ForeignKey("users.id"))
    service_id : Mapped[str]              = mapped_column(String(64))
    tariff_id  : Mapped[Optional[str]]    = mapped_column(String(64), nullable=True)
    name       : Mapped[str]              = mapped_column(String(128))
    tg_handle  : Mapped[str]              = mapped_column(String(64))
    comment    : Mapped[Optional[str]]    = mapped_column(Text, nullable=True)
    price      : Mapped[float]            = mapped_column(Float)
    status     : Mapped[OrderStatus]      = mapped_column(SAEnum(OrderStatus), default=OrderStatus.pending)
    created_at : Mapped[datetime]         = mapped_column(DateTime, default=datetime.utcnow)

    user       : Mapped[User]             = relationship("User", back_populates="orders")
