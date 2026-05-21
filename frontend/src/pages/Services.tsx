import { useNavigate, useParams } from 'react-router-dom'
import { TariffCard } from '../components/TariffCard'
import { SERVICES, COURSE_INCLUDES, MONTH_ENGINEER_INCLUDES } from '../data/services'

export function ServicesPage() {
  const navigate = useNavigate()

  return (
    <div className="page-enter pb-20 min-h-screen">
      <div className="px-5 pt-10">

        <div className="mb-6">
          <div className="t-label mb-3">root / services</div>
          <div className="t-title text-[26px]">SERVICES</div>
        </div>

        <div className="space-y-px">
          {SERVICES.map((service, i) => (
            <button
              key={service.id}
              onClick={() => navigate(`/services/${service.slug}`)}
              className="w-full text-left py-4 border-b border-v-border group hover:bg-v-surface transition-colors px-1"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="t-label">{String(i + 1).padStart(2, '0')} — {service.tag}</div>
                {service.slots && <div className="tag tag-hi">{service.slots} slots</div>}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="t-heading mb-0.5">{service.title}</div>
                  <div className="t-label">{service.subtitle}</div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  {service.oldPrice && (
                    <div className="t-price-old">{service.oldPrice.toLocaleString('ru-RU')} ₽</div>
                  )}
                  <div className="t-price text-[17px]">{service.price.toLocaleString('ru-RU')} ₽</div>
                </div>
              </div>

              <p className="t-body mt-2 line-clamp-1">{service.description}</p>
            </button>
          ))}
        </div>

        <div className="mt-8 t-label text-center">
          вопросы — <span className="text-v-white">@rizzie044</span>
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
        <div className="t-label">404 — не найдено</div>
      </div>
    )
  }

  return (
    <div className="page-enter pb-20 min-h-screen">
      <div className="px-5 pt-10">

        <button
          onClick={() => navigate('/services')}
          className="t-label hover:text-v-white mb-6 flex items-center gap-1 transition-colors"
        >
          ← назад
        </button>

        <div className="mb-6">
          <div className="tag mb-3">{service.tag}</div>
          <div className="t-title text-[22px] mb-1">{service.title}</div>
          <div className="t-label">{service.subtitle}</div>
        </div>

        {/* Price */}
        <div className="card p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              {service.oldPrice && (
                <div className="t-price-old mb-0.5">{service.oldPrice.toLocaleString('ru-RU')} ₽</div>
              )}
              <div className="t-price text-[22px]">{service.price.toLocaleString('ru-RU')} ₽</div>
            </div>
            {service.slots && (
              <div>
                <div className="tag tag-hi">{service.slots} slots</div>
                <div className="t-label mt-1">мест осталось</div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="t-label mb-2">описание</div>
          <p className="t-body">{service.description}</p>
        </div>

        {service.tariffs && (
          <div className="mb-6">
            <div className="t-label mb-3">тарифы [{service.tariffs.length}]</div>
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
            заказать
          </button>
        )}
      </div>
    </div>
  )
}

function IncludeList({ items }: { items: string[] }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3 t-body">
          <span className="text-v-gray2 flex-shrink-0">—</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}

function CourseIncludes() {
  return (
    <div className="mb-6">
      <div className="t-label mb-3">что включено</div>
      <IncludeList items={COURSE_INCLUDES} />
      <div className="card p-4 mt-4">
        <div className="t-label mb-1">цена</div>
        <div className="t-price text-[20px]">12 000 ₽</div>
        <div className="t-label mt-0.5">скоро вырастет</div>
      </div>
    </div>
  )
}

function MonthEngineerIncludes() {
  return (
    <div className="mb-6">
      <div className="t-label mb-3">как это работает</div>
      <IncludeList items={MONTH_ENGINEER_INCLUDES} />
    </div>
  )
}

function PrivateChannelInfo() {
  return (
    <div className="mb-6">
      <div className="t-label mb-3">что ты получишь</div>
      <IncludeList items={[
        'Доступ к закрытому Telegram-каналу',
        'Пресеты, проекты, референсы и материалы',
        'Регулярные обновления контента',
      ]} />
      <div className="card p-3 mt-3">
        <div className="tag tag-hi">осталось 3 места</div>
      </div>
    </div>
  )
}
