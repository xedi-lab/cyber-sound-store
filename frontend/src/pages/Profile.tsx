import { GlitchText } from '../components/GlitchText'

const MOCK_USER = {
  name: 'USER', tgId: '—', balance: 0,
  orders: [] as Order[], referrals: 0, referralEarnings: 0,
}

interface Order {
  id: string; service: string; status: 'pending'|'in_progress'|'done'; date: string; price: number
}

const STATUS_MAP = {
  pending:     { text: 'ОЖИДАНИЕ',  color: 'text-amber-400',  dot: 'bg-amber-400' },
  in_progress: { text: 'В РАБОТЕ',  color: 'text-v-white',    dot: 'bg-v-white' },
  done:        { text: 'ГОТОВО',    color: 'text-green-400',  dot: 'bg-green-400' },
}

export function ProfilePage() {
  const user = MOCK_USER

  return (
    <div className="page-enter pb-20 min-h-screen">
      <div className="px-4 pt-8">

        <div className="mb-6">
          <div className="label mb-2">root / profile</div>
          <GlitchText
            text="PROFILE"
            tag="h1"
            scramble
            className="heading-lg text-2xl"
          />
        </div>

        {/* User card */}
        <div className="card p-5 mb-4">
          <div className="label mb-3">USER DATA</div>
          <div className="space-y-2">
            {([
              ['ИМЯ',         user.name],
              ['TELEGRAM_ID', user.tgId],
              ['БАЛАНС',      `${user.balance.toLocaleString('ru-RU')} ₽`],
            ] as [string, string][]).map(([label, val]) => (
              <div key={label} className="flex justify-between items-baseline">
                <span className="label">{label}</span>
                <span className="font-mono text-[12px] text-v-white">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders */}
        <div className="mb-4">
          <div className="label mb-3">ИСТОРИЯ ЗАКАЗОВ [{user.orders.length}]</div>

          {user.orders.length === 0 ? (
            <div className="card p-6 text-center">
              <div className="label">ЗАКАЗОВ НЕТ</div>
              <div className="label mt-1">Твои заказы появятся здесь</div>
            </div>
          ) : (
            <div className="space-y-2">
              {user.orders.map(order => {
                const s = STATUS_MAP[order.status]
                return (
                  <div key={order.id} className="card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="heading-sm">{order.service}</div>
                      <div className={`flex items-center gap-1.5 font-mono text-[9px] ${s.color}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
                        {s.text}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="label">{order.date}</span>
                      <span className="label">{order.price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Referral */}
        <div className="mb-4">
          <div className="label mb-3">РЕФЕРАЛЬНАЯ СИСТЕМА</div>
          <div className="card p-5">
            <div className="flex mb-4">
              <div className="text-center flex-1">
                <div className="price text-2xl">{user.referrals}</div>
                <div className="label mt-1">РЕФЕРАЛОВ</div>
              </div>
              <div className="w-px bg-v-border mx-4" />
              <div className="text-center flex-1">
                <div className="price text-2xl">{user.referralEarnings}</div>
                <div className="label mt-1">ЗАРАБОТАНО ₽</div>
              </div>
            </div>
            <div className="label text-center mb-4">
              5% С КАЖДОЙ ПОКУПКИ ТВОЕГО РЕФЕРАЛА
            </div>
            <button className="btn btn-outline w-full text-[10px]">
              СКОПИРОВАТЬ ССЫЛКУ
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <button className="btn btn-outline text-[10px]">АКТИВИРОВАТЬ КУПОН</button>
          <button className="btn btn-outline text-[10px]">ПОПОЛНИТЬ БАЛАНС</button>
        </div>

        <div className="card p-4">
          <p className="body-text">
            Товары и услуги не подлежат возврату. Вопросы —{' '}
            <a href="https://t.me/rizzie044" className="text-v-white underline decoration-v-border2">
              @rizzie044
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}
