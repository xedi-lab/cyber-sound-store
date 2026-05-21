import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Tariff } from '../data/services'

interface Props { tariff: Tariff; index: number }

const BADGE_STYLES: Record<string, string> = {
  '24H':          'bg-amber-500/20 border-amber-500/60 text-amber-400',
  'EXPERIMENTAL': 'bg-orange-500/20 border-orange-500/60 text-orange-400',
  '−42%':         'bg-cyber-red/20 border-cyber-red/60 text-cyber-red',
}

export function TariffCard({ tariff, index }: Props) {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

  const badgeStyle = tariff.badge
    ? BADGE_STYLES[tariff.badge] ?? 'bg-cyber-red/20 border-cyber-red/60 text-cyber-red'
    : ''

  return (
    <div className="electric-card p-4 relative sparks">
      {/* Index */}
      <div className="absolute top-3 right-3 font-mono text-[10px] text-cyber-text-dim">
        [{String(index + 1).padStart(2, '0')}]
      </div>

      {/* Badge */}
      {tariff.badge && (
        <div className={`inline-block border text-[9px] font-mono tracking-widest px-2 py-0.5 mb-2 ${badgeStyle}`}>
          {tariff.badge}
        </div>
      )}

      {/* Name */}
      <div className="font-display font-bold text-cyber-red text-sm tracking-wider mb-0.5">
        {tariff.label}
      </div>
      <div className="font-mono text-cyber-text-dim text-[10px] tracking-widest mb-3">
        {tariff.name}
      </div>

      {/* Price + deadline */}
      <div className="flex items-center gap-3 mb-3">
        <div className="font-display font-bold text-xl text-cyber-red neon-text-dim">
          {tariff.price.toLocaleString('ru-RU')} ₽
        </div>
        {tariff.oldPrice && (
          <div className="price-old font-mono text-xs">
            {tariff.oldPrice.toLocaleString('ru-RU')} ₽
          </div>
        )}
        <div className="ml-auto font-mono text-[9px] text-cyber-text-dim border border-cyber-border px-2 py-0.5">
          ⚡ {tariff.deadline}
        </div>
      </div>

      {/* Description */}
      <p className="font-mono text-[11px] text-cyber-text-dim leading-relaxed mb-3">
        {tariff.description}
      </p>

      {/* Payment flow */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full text-left font-mono text-[10px] text-cyber-text-dim hover:text-cyber-red transition-colors flex items-center gap-2 mb-2"
      >
        <span className="text-cyber-red">{expanded ? '▼' : '▶'}</span>
        КАК ПРОИСХОДИТ ОПЛАТА
      </button>

      {expanded && (
        <div className="border-l-2 border-cyber-red/30 pl-3 mb-3 space-y-1">
          {tariff.paymentFlow.map((step, i) => (
            <div key={i} className="font-mono text-[10px] text-cyber-text-dim flex gap-2">
              <span className="text-cyber-spark flex-shrink-0">{i + 1}.</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <button
        onClick={() => navigate(`/order?tariff=${tariff.id}`)}
        className="cyber-btn cyber-btn-primary w-full text-center mt-1"
      >
        ЗАКАЗАТЬ // {tariff.label}
      </button>
    </div>
  )
}
