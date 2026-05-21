import { useNavigate } from 'react-router-dom'
import { GlitchText } from '../components/GlitchText'
import { SERVICES } from '../data/services'

const STATS = [
  { value: '500+', label: 'ТРЕКОВ СВЕДЕНО' },
  { value: '3+',   label: 'ГОДА ОПЫТА' },
  { value: '24Ч',  label: 'ЭКСПРЕСС' },
]

/* Oscilloscope — voltage decoration */
function OsciLine() {
  return (
    <div className="flex items-end gap-px h-5 overflow-hidden">
      {Array.from({ length: 48 }).map((_, i) => {
        const y = 50 + Math.sin(i * 0.55) * 38 + Math.sin(i * 1.1) * 14
        return (
          <div
            key={i}
            className="flex-shrink-0"
            style={{
              width: 2,
              marginRight: 1,
              height: `${y}%`,
              background: '#f0f0f0',
              opacity: 0.15,
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
      <div className="relative px-4 pt-12 pb-10 text-center overflow-hidden">
        <div className="absolute inset-0 v-grid" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.025) 0%, transparent 65%)' }}
        />

        <div className="relative z-10">
          <div className="label mb-6">@rizzie044 · HIGH VOLTAGE AUDIO</div>

          <GlitchText
            text="CYBER"
            tag="div"
            scramble
            className="heading-xl text-5xl mb-0"
          />
          <div className="heading-xl text-5xl">SOUND</div>
          <div className="heading-xl text-5xl mb-4">STORE</div>

          <OsciLine />

          <div className="label mt-4 mb-8">СВЕДЕНИЕ · МАСТЕРИНГ · САУНД ДИЗАЙН</div>

          <button onClick={() => navigate('/services')} className="btn btn-primary px-10">
            УСЛУГИ
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 border-t border-b border-v-border mx-4 mb-10">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`py-4 text-center ${i < 2 ? 'border-r border-v-border' : ''}`}
          >
            <div className="price text-xl">{s.value}</div>
            <div className="label mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Services ── */}
      <div className="px-4 mb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="label">УСЛУГИ</span>
          <div className="flex-1 divider" />
        </div>

        <div className="space-y-2">
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => navigate(`/services/${s.slug}`)}
              className="card w-full p-4 flex items-center gap-4 group"
            >
              <div className="label w-5 flex-shrink-0">{String(i + 1).padStart(2, '0')}</div>
              <div className="text-base flex-shrink-0">{s.icon}</div>
              <div className="flex-1 text-left min-w-0">
                <div className="heading-sm">{s.title}</div>
                <div className="label mt-0.5">{s.subtitle}</div>
              </div>
              <div className="price text-sm flex-shrink-0">{s.price.toLocaleString('ru-RU')} ₽</div>
              <div className="label flex-shrink-0 group-hover:text-v-white transition-colors">→</div>
            </button>
          ))}
        </div>
      </div>

      {/* ── About ── */}
      <div className="mx-4 card p-5">
        <div className="label mb-3">О МАСТЕРЕ</div>
        <p className="body-text mb-4">
          Привет, я{' '}
          <span className="text-v-white">@rizzie044</span>
          {' '}— звукоинженер в электронной музыке.
          Сведение и мастеринг с 2023 года. Работаю с электроникой, хип-хопом,
          экспериментальными жанрами.
        </p>
        <div className="flex gap-2">
          <a
            href="https://t.me/rizzie044"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline flex-1 text-center text-[10px]"
          >
            TG: @rizzie044
          </a>
          <button
            onClick={() => navigate('/portfolio')}
            className="btn btn-outline flex-1 text-[10px]"
          >
            ПОРТФОЛИО →
          </button>
        </div>
      </div>

    </div>
  )
}
