import { useNavigate, useParams } from 'react-router-dom'
import { GlitchText } from '../components/GlitchText'
import { TariffCard } from '../components/TariffCard'
import { SERVICES, COURSE_INCLUDES, MONTH_ENGINEER_INCLUDES } from '../data/services'

export function ServicesPage() {
  const navigate = useNavigate()

  return (
    <div className="page-enter pb-20 min-h-screen">
      <div className="px-4 pt-8">

        <div className="mb-6">
          <div className="font-mono text-[9px] text-cyber-text-dim tracking-widest mb-1">
            ⚡ root/services
          </div>
          <GlitchText
            text="SERVICES"
            tag="h1"
            scramble
            className="font-display font-black text-3xl text-cyber-red neon-text tracking-wider"
          />
          <div className="font-mono text-[10px] text-cyber-text-dim mt-1">
            ВЫБЕРИ УСЛУГУ
          </div>
        </div>

        <div className="space-y-3">
          {SERVICES.map((service, i) => (
            <button
              key={service.id}
              onClick={() => navigate(`/services/${service.slug}`)}
              className="electric-card w-full p-4 text-left group relative sparks"
            >
              <div className="absolute top-3 right-3 font-mono text-[10px] text-cyber-text-dim">
                [{String(i + 1).padStart(2, '0')}]
              </div>

              <div className="badge-red inline-block mb-2 text-[9px]">{service.tag}</div>

              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{service.icon}</span>
                <div>
                  <div className="font-display font-bold text-cyber-red text-sm tracking-wider">
                    {service.title}
                  </div>
                  <div className="font-mono text-cyber-text-dim text-[10px]">{service.subtitle}</div>
                </div>
              </div>

              <p className="font-mono text-[11px] text-cyber-text-dim leading-relaxed mb-3 line-clamp-2">
                {service.description}
              </p>

              <div className="flex items-end justify-between">
                <div>
                  {service.oldPrice && (
                    <div className="price-old font-mono text-[10px]">
                      {service.oldPrice.toLocaleString('ru-RU')} ₽
                    </div>
                  )}
                  <div className="font-display font-bold text-cyber-red text-lg">
                    {service.price.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
                {service.slots && (
                  <div className="badge-red text-[9px]">{service.slots} SLOTS LEFT</div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-spark to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            </button>
          ))}
        </div>

        <div className="mt-6 font-mono text-[9px] text-cyber-text-dim text-center tracking-widest">
          ⚡ ВОПРОСЫ? ПИСАТЬ В ЛС <span className="text-cyber-red">@rizzie044</span> ⚡
        </div>
      </div>
    </div>
  )
}

export function ServiceDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const service = SERVICES.find(s => s.slug === slug)

  if (!service) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="font-mono text-cyber-red text-sm">ERROR_404: SERVICE_NOT_FOUND</div>
      </div>
    )
  }

  return (
    <div className="page-enter pb-20 min-h-screen">
      <div className="px-4 pt-8">

        <button
          onClick={() => navigate('/services')}
          className="font-mono text-[10px] text-cyber-text-dim hover:text-cyber-red mb-4 flex items-center gap-1 transition-colors"
        >
          ← НАЗАД
        </button>

        <div className="mb-6">
          <div className="badge-red inline-block mb-2 text-[9px]">{service.tag}</div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-3xl">{service.icon}</span>
            <GlitchText
              text={service.title}
              tag="h1"
              scramble
              className="font-display font-bold text-cyber-red text-xl tracking-wider"
            />
          </div>
          <div className="font-mono text-cyber-text-dim text-[10px] tracking-widest">
            {service.subtitle}
          </div>
        </div>

        {/* Price card */}
        <div className="electric-card p-4 mb-6 bolt-corners">
          <div className="flex items-center justify-between">
            <div>
              {service.oldPrice && (
                <div className="price-old font-mono text-xs">
                  {service.oldPrice.toLocaleString('ru-RU')} ₽
                </div>
              )}
              <div className="font-display font-bold text-cyber-red text-2xl neon-text-dim">
                {service.price.toLocaleString('ru-RU')} ₽
              </div>
            </div>
            {service.slots && (
              <div className="text-right">
                <div className="badge-red text-[9px]">{service.slots} SLOTS</div>
                <div className="font-mono text-[9px] text-cyber-text-dim mt-1">МЕСТ ОСТАЛОСЬ</div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="font-mono text-[10px] text-cyber-text-dim tracking-widest mb-2">
            ⚡ ОПИСАНИЕ
          </div>
          <p className="font-mono text-[12px] text-cyber-text-dim leading-relaxed">
            {service.description}
          </p>
        </div>

        {service.tariffs && (
          <div className="mb-6">
            <div className="font-mono text-[10px] text-cyber-text-dim tracking-widest mb-3">
              ⚡ ТАРИФЫ [{service.tariffs.length}]
            </div>
            <div className="space-y-3">
              {service.tariffs.map((t, i) => (
                <TariffCard key={t.id} tariff={t} index={i} />
              ))}
            </div>
          </div>
        )}

        {service.id === 'course'         && <CourseIncludes />}
        {service.id === 'month_engineer' && <MonthEngineerIncludes />}
        {service.id === 'private_channel'&& <PrivateChannelInfo />}

        {!service.tariffs && (
          <button
            onClick={() => navigate(`/order?service=${service.id}`)}
            className="cyber-btn cyber-btn-primary w-full py-3 text-xs tracking-widest"
          >
            ⚡ ЗАКАЗАТЬ → {service.title}
          </button>
        )}
      </div>
    </div>
  )
}

function IncludeList({ items }: { items: string[] }) {
  return (
    <div className="electric-card p-4 space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2 font-mono text-[11px] text-cyber-text-dim">
          <span className="text-cyber-spark flex-shrink-0">⚡</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}

function CourseIncludes() {
  return (
    <div className="mb-6">
      <div className="font-mono text-[10px] text-cyber-text-dim tracking-widest mb-3">
        ⚡ ЧТО ВКЛЮЧЕНО
      </div>
      <IncludeList items={COURSE_INCLUDES} />
      <div className="mt-3 electric-card p-3">
        <div className="font-mono text-[10px] text-cyber-text-dim">⚡ ЦЕНА</div>
        <div className="font-display font-bold text-cyber-red text-xl mt-1">12 000 ₽</div>
        <div className="font-mono text-[9px] text-cyber-text-dim">(СКОРО ВЫРАСТЕТ)</div>
      </div>
    </div>
  )
}

function MonthEngineerIncludes() {
  return (
    <div className="mb-6">
      <div className="font-mono text-[10px] text-cyber-text-dim tracking-widest mb-3">
        ⚡ КАК ЭТО РАБОТАЕТ
      </div>
      <IncludeList items={MONTH_ENGINEER_INCLUDES} />
    </div>
  )
}

function PrivateChannelInfo() {
  return (
    <div className="mb-6">
      <div className="font-mono text-[10px] text-cyber-text-dim tracking-widest mb-3">
        ⚡ ЧТО ТЫ ПОЛУЧИШЬ
      </div>
      <IncludeList items={[
        'Доступ к закрытому Telegram-каналу',
        'Пресеты, проекты, референсы и материалы',
        'Регулярные обновления контента',
      ]} />
      <div className="mt-3 electric-card p-3">
        <div className="badge-red text-[9px]">ОСТАЛОСЬ 3 МЕСТА</div>
      </div>
    </div>
  )
}
