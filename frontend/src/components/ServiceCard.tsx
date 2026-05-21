import { useNavigate } from 'react-router-dom'
import type { Service } from '../data/services'

interface Props { service: Service }

export function ServiceCard({ service }: Props) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(`/services/${service.slug}`)}
      className="card card-corners w-full text-left p-4 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="tag">{service.tag}</div>
        {service.slots && (
          <div className="tag">{service.slots} SLOTS</div>
        )}
      </div>

      <div className="flex items-center gap-3 mb-2">
        <div className="text-2xl leading-none">{service.icon}</div>
        <div>
          <div className="heading-sm">{service.title}</div>
          <div className="label mt-0.5">{service.subtitle}</div>
        </div>
      </div>

      <p className="body-text mb-4 line-clamp-2">{service.description}</p>

      <div className="flex items-end justify-between">
        <div>
          {service.oldPrice && (
            <div className="price-old font-mono text-[10px]">
              {service.oldPrice.toLocaleString('ru-RU')} ₽
            </div>
          )}
          <div className="font-display font-bold text-xl neon">
            {service.price.toLocaleString('ru-RU')} ₽
          </div>
        </div>
        <div className="label group-hover:text-cyber-red transition-colors">
          ОТКРЫТЬ →
        </div>
      </div>
    </button>
  )
}
