# Деплой Cyber Sound Store

## Frontend → Vercel

1. Зайди на vercel.com, создай аккаунт
2. `cd frontend && npm run build`
3. Задеплой папку `frontend/` через Vercel CLI или GitHub
4. Получишь URL типа `https://cyber-sound-store.vercel.app`

## Backend → Render

1. Зайди на render.com, создай Web Service
2. Root Dir: `backend/`
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Env vars:
   - `BOT_TOKEN=...`
   - `ADMIN_TG_ID=...`
6. Получишь URL типа `https://cyber-sound-api.onrender.com`

## Bot

1. Создай бота через @BotFather
2. Скопируй `.env.example` → `.env`, вставь токен
3. Задай MINI_APP_URL = твой Vercel URL
4. Запусти: `cd bot && python main.py`
5. В @BotFather → Edit Bot → Bot Menu Button → добавь Mini App URL

## Переменные окружения (.env)

```
BOT_TOKEN=1234567890:AAFxxx
ADMIN_TG_ID=120881488
MINI_APP_URL=https://cyber-sound-store.vercel.app
API_URL=https://cyber-sound-api.onrender.com
```
