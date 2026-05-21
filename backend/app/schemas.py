from __future__ import annotations
from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from .models import OrderStatus

class OrderCreate(BaseModel):
    tg_id     : int
    name      : str
    tg_handle : str
    service_id: str
    tariff_id : Optional[str] = None
    comment   : Optional[str] = None
    price     : float

class OrderOut(BaseModel):
    id        : int
    service_id: str
    tariff_id : Optional[str]
    name      : str
    tg_handle : str
    price     : float
    status    : OrderStatus
    created_at: datetime

    model_config = {"from_attributes": True}

class UserOut(BaseModel):
    id        : int
    tg_id     : int
    name      : str
    username  : Optional[str]
    balance   : float
    created_at: datetime

    model_config = {"from_attributes": True}

class UserCreate(BaseModel):
    tg_id      : int
    name       : str
    username   : Optional[str] = None
    referrer_id: Optional[int] = None
