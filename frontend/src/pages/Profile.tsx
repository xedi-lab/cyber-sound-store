import { GlitchText } from '../components/GlitchText'

const MOCK_USER = { name: 'USER', tgId: '—', balance: 0, orders: [] as Order[], referrals: 0, referralEarnings: 0 }

interface Order {
  id: string; service: string; status: 'pending'|'in_progress'|'done'; date: string; price: number
}

const STATUS_MAP = {
  pending:     { text:'ОЖИДАНИЕ', color:'text-amber-400',   dot:'bg-amber-400' },
  in_progress: { text:'В РАБОТЕ', color:'text-cyber-red',   dot:'bg-cyber-red' },
  done:        { text:'ГОТОВО',   color:'text-green-400',   dot:'bg-green-400' },
}

export function ProfilePage() {
  const user = MOCK_USER

  return (
    <div className="page-enter pb-20 min-h-screen">
      <div className="px-4 pt-8">

        <div className="mb-6">
          <div className="font-mono text-[9px] text-cyber-text-dim tracking-widest mb-1">
            ⚡ root/profile
          </div>
          <GlitchText
            text="PROFILE"
            tag="h1"
            scramble
            className="font-display font-black text-3xl text-cyber-red neon-text tracking-wider"
          />
        </div>

        {/* User card */}
        <div className="electric-card p-4 mb-4 bolt-corners">
          <div className="font-mono text-[9px] text-cyber-text-dim mb-3">⚡ USER_DATA</div>
          <div className="space-y-1.5">
            {[
              ['ИМЯ:', user.name],
              ['TELEGRAM_ID:', user.tgId],
              ['БАЛАНС:', `${user.balance.toLocaleString('ru-RU')} ₽`],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between font-mono text-[11px]">
                <span className="text-cyber-text-dim">{label}</span>
                <span className="text-cyber-red">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders */}
        <div className="mb-4">
          <div className="font-mono text-[10px] text-cyber-text-dim tracking-widest mb-2">
            ⚡ ИСТОРИЯ_ЗАКАЗОВ [{user.orders.length}]
          </div>

          {user.orders.length === 0 ? (
            <div className="electric-card p-6 text-center">
              <div className="font-mono text-[10px] text-cyber-text-dim">ЗАКАЗОВ_НЕТ // NULL</div>
              <div className="font-mono text-[9px] text-cyber-text-dim mt-1">Твои заказы появятся здесь</div>
            </div>
          ) : (
            <div className="space-y-2">
              {user.orders.map(order => {
                const s = STATUS_MAP[order.status]
                return (
                  <div key={order.id} className="electric-card p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-display font-bold text-cyber-red text-xs tracking-wider">
                        {order.service}
                      </div>
                      <div className={`flex items-center gap-1.5 font-mono text-[9px] ${s.color}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
                        {s.text}
                      </div>
                    </div>
                    <div className="flex justify-between font-mono text-[9px] text-cyber-text-dim">
                      <span>{order.date}</span>
                      <span>{order.price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Referral */}
        <div className="mb-4">
          <div className="font-mono text-[10px] text-cyber-text-dim tracking-widest mb-2">
            ⚡ РЕФЕРАЛЬНАЯ_СИСТЕМА
          </div>
          <div className="electric-card p-4">
            <div className="flex justify-between mb-3">
              <div className="text-center flex-1">
                <div className="font-display font-bold text-cyber-red text-xl">{user.referrals}</div>
                <div className="font-mono text-[9px] text-cyber-text-dim mt-0.5">РЕФЕРАЛОВ</div>
              </div>
              <div className="w-px bg-cyber-border" />
              <div className="text-center flex-1">
                <div className="font-display font-bold text-cyber-red text-xl">{user.referralEarnings} ₽</div>
                <div className="font-mono text-[9px] text-cyber-text-dim mt-0.5">ЗАРАБОТАНО</div>
              </div>
            </div>
            <div className="font-mono text-[9px] text-cyber-text-dim text-center mb-3">
              5% С КАЖДОЙ ПОКУПКИ ТВОЕГО РЕФЕРАЛА
            </div>
            <button className="cyber-btn w-full py-2 text-[10px] tracking-widest">
              ⚡ СКОПИРОВАТЬ ССЫЛКУ
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button className="cyber-btn py-2.5 text-[10px] tracking-wider">АКТИВИРОВАТЬ КУПОН</button>
          <button className="cyber-btn py-2.5 text-[10px] tracking-wider">ПОПОЛНИТЬ БАЛАНС</button>
        </div>

        <div className="mt-4 electric-card p-3">
          <div className="font-mono text-[9px] text-cyber-text-dim leading-relaxed">
            <span className="text-cyber-red">⚡ ПРАВИЛА:</span> Товары и услуги не подлежат возврату.
            Вопросы?{' '}
            <a href="https://t.me/rizzie044" className="text-cyber-red underline">@rizzie044</a>
          </div>
        </div>

      </div>
    </div>
  )
}
