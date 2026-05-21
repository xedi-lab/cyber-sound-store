import { useNavigate } from 'react-router-dom'
import type { Service } from '../data/services'

interface Props { service: Service }

export function ServiceCard({ service }: Props) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(`/services/${service.slug}`)}
      className="card w-full text-left p-4 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="tag">{service.tag}</div>
        {service.slots && <div className="tag tag-hi">{service.slots} slots</div>}
      </div>

      <div className="t-heading mb-1">{service.title}</div>
      <div className="t-label mb-3">{service.subtitle}</div>

      <p className="t-body mb-4 line-clamp-2">{service.description}</p>

      <div className="flex items-end justify-between">
        <div>
          {service.oldPrice && (
            <div className="t-price-old">{service.oldPrice.toLocaleString('ru-RU')} ₽</div>
          )}
          <div className="t-price text-lg">{service.price.toLocaleString('ru-RU')} ₽</div>
        </div>
        <div className="t-label group-hover:text-v-white transition-colors">открыть →</div>
      </div>
    </button>
  )
}
