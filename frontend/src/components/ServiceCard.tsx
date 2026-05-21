import { useNavigate } from 'react-router-dom'
import type { Service } from '../data/services'

interface Props { service: Service }

export function ServiceCard({ service }: Props) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(`/services/${service.slug}`)}
      className="electric-card w-full text-left p-4 relative group"
    >
      {/* Badge */}
      <div className="badge-red inline-block mb-3 text-[9px]">{service.tag}</div>

      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="text-2xl leading-none">{service.icon}</div>
        {service.slots && (
          <div className="badge-red text-[9px]">{service.slots} SLOTS</div>
        )}
      </div>

      {/* Title */}
      <div className="font-display font-bold text-cyber-red text-sm tracking-wider mb-0.5 leading-tight">
        {service.title}
      </div>
      <div className="font-mono text-cyber-text-dim text-[10px] tracking-widest mb-3">
        {service.subtitle}
      </div>

      {/* Description */}
      <p className="font-mono text-[11px] text-cyber-text-dim leading-relaxed mb-4 line-clamp-2">
        {service.description}
      </p>

      {/* Price */}
      <div className="flex items-end justify-between">
        <div>
          {service.oldPrice && (
            <div className="price-old font-mono text-[10px]">
              {service.oldPrice.toLocaleString('ru-RU')} ₽
            </div>
          )}
          <div className="font-display font-bold text-cyber-red text-lg neon-text-dim">
            {service.price.toLocaleString('ru-RU')} ₽
          </div>
        </div>
        <div className="font-mono text-[10px] text-cyber-red opacity-50 group-hover:opacity-100 transition-opacity">
          ОТКРЫТЬ →
        </div>
      </div>

      {/* Hover spark line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-spark to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
    </button>
  )
}
