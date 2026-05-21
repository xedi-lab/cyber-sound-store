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
          <div className="label mb-1">
            <span className="bolt-icon mr-1">⚡</span>root/services
          </div>
          <GlitchText
            text="SERVICES"
            tag="h1"
            scramble
            className="font-display font-black text-3xl text-cyber-white tracking-wider"
          />
          <div className="label mt-1">ВЫБЕРИ УСЛУГУ</div>
        </div>

        <div className="space-y-3">
          {SERVICES.map((service, i) => (
            <button
              key={service.id}
              onClick={() => navigate(`/services/${service.slug}`)}
              className="card card-corners w-full p-4 text-left group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="tag">{service.tag}</div>
                <div className="label">[{String(i + 1).padStart(2, '0')}]</div>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{service.icon}</span>
                <div>
                  <div className="heading-sm">{service.title}</div>
                  <div className="label mt-0.5">{service.subtitle}</div>
                </div>
              </div>

              <p className="body-text mb-3 line-clamp-2">{service.description}</p>

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
                {service.slots && (
                  <div className="tag">{service.slots} SLOTS LEFT</div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 label text-center">
          <span className="bolt-icon mr-1">⚡</span>
          ВОПРОСЫ? ПИСАТЬ В ЛС <span className="accent">@rizzie044</span>
          <span className="bolt-icon ml-1">⚡</span>
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
        <div className="accent font-mono text-sm">ERROR_404: SERVICE_NOT_FOUND</div>
      </div>
    )
  }

  return (
    <div className="page-enter pb-20 min-h-screen">
      <div className="px-4 pt-8">

        <button
          onClick={() => navigate('/services')}
          className="label hover:text-cyber-red mb-4 flex items-center gap-1 transition-colors"
        >
          ← НАЗАД
        </button>

        <div className="mb-6">
          <div className="tag mb-2">{service.tag}</div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-3xl">{service.icon}</span>
            <GlitchText
              text={service.title}
              tag="h1"
              scramble
              className="font-display font-bold text-xl text-cyber-white tracking-wider"
            />
          </div>
          <div className="label">{service.subtitle}</div>
        </div>

        {/* Price card */}
        <div className="card card-corners p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              {service.oldPrice && (
                <div className="price-old font-mono text-xs">
                  {service.oldPrice.toLocaleString('ru-RU')} ₽
                </div>
              )}
              <div className="font-display font-bold text-2xl neon">
                {service.price.toLocaleString('ru-RU')} ₽
              </div>
            </div>
            {service.slots && (
              <div className="text-right">
                <div className="tag">{service.slots} SLOTS</div>
                <div className="label mt-1">МЕСТ ОСТАЛОСЬ</div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="label mb-2">
            <span className="bolt-icon mr-1">⚡</span>ОПИСАНИЕ
          </div>
          <p className="body-text">{service.description}</p>
        </div>

        {service.tariffs && (
          <div className="mb-6">
            <div className="label mb-3">
              <span className="bolt-icon mr-1">⚡</span>
              ТАРИФЫ [{service.tariffs.length}]
            </div>
            <div className="space-y-3">
              {service.tariffs.map((t, i) => (
                <TariffCard key={t.id} tariff={t} index={i} />
              ))}
            </div>
          </div>
        )}

        {service.id === 'course'          && <CourseIncludes />}
        {service.id === 'month_engineer'  && <MonthEngineerIncludes />}
        {service.id === 'private_channel' && <PrivateChannelInfo />}

        {!service.tariffs && (
          <button
            onClick={() => navigate(`/order?service=${service.id}`)}
            className="btn btn-primary w-full"
          >
            <span className="bolt-icon mr-2">⚡</span>
            ЗАКАЗАТЬ → {service.title}
          </button>
        )}
      </div>
    </div>
  )
}

function IncludeList({ items }: { items: string[] }) {
  return (
    <div className="card p-4 space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2 body-text">
          <span className="accent-spark flex-shrink-0">⚡</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}

function CourseIncludes() {
  return (
    <div className="mb-6">
      <div className="label mb-3">
        <span className="bolt-icon mr-1">⚡</span>ЧТО ВКЛЮЧЕНО
      </div>
      <IncludeList items={COURSE_INCLUDES} />
      <div className="mt-3 card p-3">
        <div className="label">
          <span className="bolt-icon mr-1">⚡</span>ЦЕНА
        </div>
        <div className="font-display font-bold text-xl neon mt-1">12 000 ₽</div>
        <div className="label mt-0.5">(СКОРО ВЫРАСТЕТ)</div>
      </div>
    </div>
  )
}

function MonthEngineerIncludes() {
  return (
    <div className="mb-6">
      <div className="label mb-3">
        <span className="bolt-icon mr-1">⚡</span>КАК ЭТО РАБОТАЕТ
      </div>
      <IncludeList items={MONTH_ENGINEER_INCLUDES} />
    </div>
  )
}

function PrivateChannelInfo() {
  return (
    <div className="mb-6">
      <div className="label mb-3">
        <span className="bolt-icon mr-1">⚡</span>ЧТО ТЫ ПОЛУЧИШЬ
      </div>
      <IncludeList items={[
        'Доступ к закрытому Telegram-каналу',
        'Пресеты, проекты, референсы и материалы',
        'Регулярные обновления контента',
      ]} />
      <div className="mt-3 card p-3">
        <div className="tag">ОСТАЛОСЬ 3 МЕСТА</div>
      </div>
    </div>
  )
}
