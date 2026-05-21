const MOCK_USER = {
  name: 'USER', tgId: '—', balance: 0,
  orders: [] as Order[], referrals: 0, referralEarnings: 0,
}

interface Order {
  id: string; service: string; status: 'pending'|'in_progress'|'done'; date: string; price: number
}

const STATUS_MAP = {
  pending:     { text: 'ожидание', color: 'text-amber-500' },
  in_progress: { text: 'в работе', color: 'text-v-white' },
  done:        { text: 'готово',   color: 'text-green-500' },
}

export function ProfilePage() {
  const user = MOCK_USER

  return (
    <div className="page-enter pb-20 min-h-screen">
      <div className="px-5 pt-10">

        <div className="mb-6">
          <div className="t-label mb-3">root / profile</div>
          <div className="t-title text-[26px]">PROFILE</div>
        </div>

        {/* User */}
        <div className="card p-5 mb-4">
          <div className="t-label mb-3">данные</div>
          <div className="space-y-2.5">
            {([
              ['имя',         user.name],
              ['telegram id', user.tgId],
              ['баланс',      `${user.balance.toLocaleString('ru-RU')} ₽`],
            ] as [string, string][]).map(([label, val]) => (
              <div key={label} className="flex justify-between items-baseline">
                <span className="t-label">{label}</span>
                <span className="font-mono text-[12px] text-v-white">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders */}
        <div className="mb-4">
          <div className="t-label mb-3">история заказов [{user.orders.length}]</div>

          {user.orders.length === 0 ? (
            <div className="card p-5 text-center">
              <div className="t-label">заказов нет</div>
            </div>
          ) : (
            <div className="space-y-2">
              {user.orders.map(order => {
                const s = STATUS_MAP[order.status]
                return (
                  <div key={order.id} className="card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="t-heading">{order.service}</div>
                      <div className={`t-label ${s.color}`}>{s.text}</div>
                    </div>
                    <div className="flex justify-between">
                      <span className="t-label">{order.date}</span>
                      <span className="t-label">{order.price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Referral */}
        <div className="mb-4">
          <div className="t-label mb-3">реферальная система</div>
          <div className="card p-5">
            <div className="flex mb-4">
              <div className="text-center flex-1">
                <div className="t-price text-[22px]">{user.referrals}</div>
                <div className="t-label mt-1">рефералов</div>
              </div>
              <div className="w-px bg-v-border mx-4" />
              <div className="text-center flex-1">
                <div className="t-price text-[22px]">{user.referralEarnings}</div>
                <div className="t-label mt-1">заработано ₽</div>
              </div>
            </div>
            <div className="t-label text-center mb-4">5% с каждой покупки реферала</div>
            <button className="btn btn-outline w-full">скопировать ссылку</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <button className="btn btn-outline text-[10px]">активировать купон</button>
          <button className="btn btn-outline text-[10px]">пополнить баланс</button>
        </div>

        <div className="t-body">
          Товары и услуги не подлежат возврату.{' '}
          Вопросы —{' '}
          <a href="https://t.me/rizzie044" className="text-v-white underline decoration-v-border2">
            @rizzie044
          </a>
        </div>

      </div>
    </div>
  )
}
