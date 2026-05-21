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
          {tariff.badge && (
            <div className="tag tag-white mb-2">{tariff.badge}</div>
          )}
          <div className="heading-sm">{tariff.name}</div>
          <div className="label mt-0.5">{tariff.label}</div>
        </div>
        <div className="text-right">
          <div className="price text-xl">
            {tariff.price.toLocaleString('ru-RU')} ₽
          </div>
          {tariff.oldPrice && (
            <div className="price-old">
              {tariff.oldPrice.toLocaleString('ru-RU')} ₽
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="label">—</span>
        <span className="label">Срок: {tariff.deadline}</span>
      </div>

      <p className="body-text mb-4">{tariff.description}</p>

      <button
        onClick={() => setExpanded(e => !e)}
        className="btn btn-ghost w-full justify-start px-0 mb-1 text-[10px]"
      >
        <span className="mr-2 text-v-gray2">{expanded ? '▼' : '▶'}</span>
        КАК ПРОИСХОДИТ ОПЛАТА
      </button>

      {expanded && (
        <div className="border-l border-v-border2 pl-4 mb-4 space-y-2">
          {tariff.paymentFlow.map((step, i) => (
            <div key={i} className="flex gap-2 body-text">
              <span className="text-v-white flex-shrink-0 font-bold">{i + 1}.</span>
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
        ЗАКАЗАТЬ
      </button>
    </div>
  )
}
