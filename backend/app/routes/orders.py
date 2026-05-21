from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..database import get_db
from ..models import Order, User, OrderStatus
from ..schemas import OrderCreate, OrderOut
import os

router = APIRouter(prefix="/orders", tags=["orders"])

PRICES = {
    "basic": 1000, "advanced": 3500, "advanced_24h": 5000,
    "experimental": 8000, "economy": 20000,
    "private_channel": 1500, "month_engineer": 40000, "course": 12000,
}

@router.post("/", response_model=OrderOut)
async def create_order(data: OrderCreate, db: AsyncSession = Depends(get_db)):
    user = (await db.execute(select(User).where(User.tg_id == data.tg_id))).scalar_one_or_none()
    if not user:
        user = User(tg_id=data.tg_id, name=data.name)
        db.add(user)
        await db.flush()

    price = data.price or PRICES.get(data.tariff_id or data.service_id, 0)

    order = Order(
        user_id=user.id,
        service_id=data.service_id,
        tariff_id=data.tariff_id,
        name=data.name,
        tg_handle=data.tg_handle,
        comment=data.comment,
        price=price,
    )
    db.add(order)
    await db.commit()
    await db.refresh(order)

    await _notify_admin(order)
    return order

@router.get("/user/{tg_id}", response_model=list[OrderOut])
async def get_user_orders(tg_id: int, db: AsyncSession = Depends(get_db)):
    user = (await db.execute(select(User).where(User.tg_id == tg_id))).scalar_one_or_none()
    if not user:
        return []
    result = await db.execute(select(Order).where(Order.user_id == user.id))
    return result.scalars().all()

@router.patch("/{order_id}/status")
async def update_status(order_id: int, status: OrderStatus, db: AsyncSession = Depends(get_db)):
    order = await db.get(Order, order_id)
    if not order:
        raise HTTPException(404)
    order.status = status
    await db.commit()
    return {"ok": True}

async def _notify_admin(order: Order):
    token = os.getenv("BOT_TOKEN")
    admin_id = os.getenv("ADMIN_TG_ID")
    if not token or not admin_id:
        return
    try:
        from telegram import Bot
        bot = Bot(token)
        text = (
            f"🆕 НОВЫЙ ЗАКАЗ\n"
            f"Услуга: {order.service_id}\n"
            f"Тариф: {order.tariff_id or '—'}\n"
            f"Имя: {order.name}\n"
            f"TG: @{order.tg_handle}\n"
            f"Цена: {order.price:,.0f} ₽\n"
            f"Комментарий: {order.comment or '—'}"
        )
        await bot.send_message(chat_id=int(admin_id), text=text)
    except Exception:
        pass
