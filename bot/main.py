import asyncio
import os
from dotenv import load_dotenv
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import CommandStart
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo

load_dotenv()

BOT_TOKEN  = os.getenv("BOT_TOKEN", "")
MINI_APP_URL = os.getenv("MINI_APP_URL", "https://your-app.vercel.app")
ADMIN_ID   = int(os.getenv("ADMIN_TG_ID", "0"))

bot = Bot(token=BOT_TOKEN)
dp  = Dispatcher()

def main_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[[
        InlineKeyboardButton(
            text="🎛 ОТКРЫТЬ CYBER SOUND STORE",
            web_app=WebAppInfo(url=MINI_APP_URL),
        )
    ]])

@dp.message(CommandStart())
async def cmd_start(message: types.Message):
    await message.answer(
        "⚡ <b>CYBER SOUND STORE</b>\n\n"
        "Сведение · Мастеринг · Саунд Дизайн\n\n"
        "Нажми кнопку ниже чтобы открыть приложение 👇",
        reply_markup=main_keyboard(),
        parse_mode="HTML",
    )

@dp.message(F.text == "/admin")
async def cmd_admin(message: types.Message):
    if message.from_user and message.from_user.id != ADMIN_ID:
        return
    await message.answer(
        "🔧 <b>ADMIN PANEL</b>\n\n"
        "Команды:\n"
        "/orders — последние заказы\n"
        "/stats — статистика",
        parse_mode="HTML",
    )

@dp.message(F.text == "/orders")
async def cmd_orders(message: types.Message):
    if message.from_user and message.from_user.id != ADMIN_ID:
        return
    import httpx
    api = os.getenv("API_URL", "http://localhost:8000")
    async with httpx.AsyncClient() as client:
        try:
            # get last 10 orders would require admin endpoint
            await message.answer("📋 Заказы: смотри в БД или добавь admin endpoint")
        except Exception as e:
            await message.answer(f"Ошибка: {e}")

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
