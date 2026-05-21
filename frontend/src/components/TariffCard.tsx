import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Tariff } from '../data/services'

interface Props { tariff: Tariff; index: number }

export function TariffCard({ tariff }: Props) {
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          {tariff.badge && <div className="tag tag-hi mb-2">{tariff.badge}</div>}
          <div className="t-heading">{tariff.name}</div>
          <div className="t-label mt-1">{tariff.label}</div>
        </div>
        <div className="text-right">
          <div className="t-price">{tariff.price.toLocaleString('ru-RU')} ₽</div>
          {tariff.oldPrice && (
            <div className="t-price-old">{tariff.oldPrice.toLocaleString('ru-RU')} ₽</div>
          )}
        </div>
      </div>

      <div className="t-label mb-3">срок: {tariff.deadline}</div>

      <p className="t-body mb-4">{tariff.description}</p>

      <button
        onClick={() => setExpanded(e => !e)}
        className="btn btn-ghost w-full justify-start text-[10px]"
      >
        <span className="mr-2">{expanded ? '▼' : '▶'}</span>
        как происходит оплата
      </button>

      {expanded && (
        <div className="border-l border-v-border2 pl-4 mt-2 mb-4 space-y-2">
          {tariff.paymentFlow.map((step, i) => (
            <div key={i} className="flex gap-2 t-body">
              <span className="text-v-white flex-shrink-0">{i + 1}.</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      )}

      <div className="divider mb-4" />

      <button
        onClick={() => navigate(`/order?tariff=${tariff.id}`)}
        className="btn btn-primary w-full"
      >
        заказать
      </button>
    </div>
  )
}
