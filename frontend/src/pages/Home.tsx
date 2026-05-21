import { useNavigate } from 'react-router-dom'
import { SERVICES } from '../data/services'

const STATS = [
  { value: '500+', label: 'треков сведено' },
  { value: '3+',   label: 'года опыта' },
  { value: '24ч',  label: 'экспресс' },
]

/* Animated oscilloscope — traveling light via phase offset */
function OsciTrace() {
  return (
    <div className="flex items-end gap-px h-5 overflow-hidden">
      {Array.from({ length: 52 }).map((_, i) => {
        const y = 50 + Math.sin(i * 0.5) * 36 + Math.sin(i * 1.05) * 13
        return (
          <div
            key={i}
            className="osci-bar flex-shrink-0"
            style={{
              width: 2,
              marginRight: 1,
              height: `${y}%`,
              background: '#ffffff',
              /* delay spreads 0..1.6s across all bars — peak brightness travels left→right */
              animationDelay: `${-(i * (1.6 / 52))}s`,
            }}
          />
        )
      })}
    </div>
  )
}

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="page-enter pb-16 min-h-screen">

      {/* ── Hero ── */}
      <div className="relative px-5 pt-14 pb-10 overflow-hidden">
        {/* Background video */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.14, filter: 'blur(0.5px)' }}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Fade to bg at bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(17,17,17,0.3) 0%, rgba(17,17,17,0.0) 40%, rgba(17,17,17,0.85) 100%)' }}
        />
        <div className="relative z-10">
        <div className="t-label mb-5">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-v-white mr-2 align-middle"
            style={{ animation: 'dot 3s ease-in-out infinite', opacity: 0.4 }}
          />
          @rizzie044
        </div>

        <div className="t-title text-[32px] leading-tight mb-1">CYBER</div>
        <div className="t-title text-[32px] leading-tight mb-1">SOUND</div>
        <div className="t-title text-[32px] leading-tight mb-6">STORE</div>

        <OsciTrace />

        <div className="t-label mt-4 mb-8">сведение · мастеринг · саунд дизайн</div>

        <button onClick={() => navigate('/services')} className="btn btn-primary px-8">
          услуги
        </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="flex border-t border-b border-v-border mx-5 mb-10">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`flex-1 py-4 text-center ${i < 2 ? 'border-r border-v-border' : ''}`}
          >
            <div className="font-mono font-medium text-[20px] text-v-white tracking-tight">{s.value}</div>
            <div className="t-label mt-1" style={{ fontWeight: 300 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Services ── */}
      <div className="px-5 mb-10">
        <div className="t-label mb-4">услуги</div>
        <div className="space-y-px">
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => navigate(`/services/${s.slug}`)}
              className="w-full flex items-center gap-4 py-3.5 border-b border-v-border group transition-colors hover:bg-v-surface2"
            >
              <div className="t-label w-5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</div>
              <div className="flex-1 text-left">
                <div className="t-heading">{s.title}</div>
                <div className="t-label mt-0.5">{s.subtitle}</div>
              </div>
              <div className="t-price text-[15px] flex-shrink-0">{s.price.toLocaleString('ru-RU')} ₽</div>
              <div className="t-label flex-shrink-0 group-hover:text-v-white transition-colors">→</div>
            </button>
          ))}
        </div>
      </div>

      {/* ── About ── */}
      <div className="mx-5 mb-5">
        <div className="t-label mb-3">о мастере</div>
        <p className="t-body mb-4">
          Я <span className="text-v-white">Shiny Ruby</span> — mix engineer и self-prod
          с аудиторией 130к+ слушателей на Яндексе.
          Знаю как сделать из твоего трека что-то реально мощное.
        </p>
        <div className="flex gap-2">
          <a
            href="https://t.me/rizzie044"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline flex-1 text-center"
          >
            @rizzie044
          </a>
          <button onClick={() => navigate('/portfolio')} className="btn btn-outline flex-1">
            портфолио →
          </button>
        </div>
      </div>

    </div>
  )
}
