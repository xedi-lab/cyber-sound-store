import { useNavigate } from 'react-router-dom'
import { GlitchText } from '../components/GlitchText'
import { SERVICES } from '../data/services'

const STATS = [
  { value: '500+', label: 'ТРЕКОВ СВЕДЕНО' },
  { value: '3+',   label: 'ГОДА ОПЫТА' },
  { value: '24Ч',  label: 'ЭКСПРЕСС' },
]

function OsciLine() {
  return (
    <div className="flex items-end gap-px h-6 overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => {
        const y = 50 + Math.sin(i * 0.6) * 40 + Math.sin(i * 1.2) * 15
        const isHot = y > 70
        return (
          <div
            key={i}
            className="flex-shrink-0"
            style={{
              width: 2,
              height: `${y}%`,
              background: isHot ? '#ff6600' : '#ff2020',
              opacity: 0.6,
              marginRight: 1,
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
      <div className="relative px-4 pt-10 pb-8 text-center overflow-hidden">
        <div className="absolute inset-0 hv-grid" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, #ff202008 0%, transparent 70%)' }}
        />

        <div className="relative z-10">
          <div className="label mb-4">
            <span className="bolt-icon mr-1">⚡</span>
            HIGH_VOLTAGE_AUDIO · @rizzie044
            <span className="bolt-icon ml-1">⚡</span>
          </div>

          <GlitchText
            text="CYBER"
            tag="div"
            scramble
            className="font-display font-black text-6xl text-cyber-white leading-none tracking-wider"
          />
          <div className="font-display font-black text-6xl text-cyber-white leading-none tracking-wider mb-1">
            SOUND
          </div>
          <div className="font-display font-black text-6xl neon leading-none tracking-wider">
            STORE
          </div>

          <div className="label mt-3 mb-4">
            СВЕДЕНИЕ · МАСТЕРИНГ · САУНД ДИЗАЙН
          </div>

          <div className="mb-5 mx-4">
            <OsciLine />
          </div>

          <button
            onClick={() => navigate('/services')}
            className="btn btn-primary px-8"
          >
            <span className="bolt-icon mr-2">⚡</span>
            ПОДКЛЮЧИТЬСЯ
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-px mx-4 mb-8 border border-cyber-border">
        {STATS.map(s => (
          <div key={s.label} className="bg-cyber-card p-3 text-center">
            <div className="font-display font-bold text-xl neon">{s.value}</div>
            <div className="label mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Services preview ── */}
      <div className="px-4 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="label">
            <span className="bolt-icon mr-1">⚡</span>УСЛУГИ
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-red/30 to-transparent" />
        </div>

        <div className="space-y-2">
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => navigate(`/services/${s.slug}`)}
              className="card w-full p-3 flex items-center gap-3 group"
            >
              <div className="label w-5">{String(i + 1).padStart(2, '0')}</div>
              <div className="text-lg">{s.icon}</div>
              <div className="flex-1 text-left">
                <div className="heading-sm">{s.title}</div>
                <div className="label mt-0.5">{s.subtitle}</div>
              </div>
              <div className="font-display font-bold neon text-sm">
                {s.price.toLocaleString('ru-RU')} ₽
              </div>
              <div className="label group-hover:text-cyber-red transition-colors">→</div>
            </button>
          ))}
        </div>
      </div>

      {/* ── About ── */}
      <div className="mx-4 card card-corners p-4">
        <div className="label mb-3">
          <span className="bolt-icon mr-1">⚡</span>О СИСТЕМЕ
        </div>
        <p className="body-text mb-4">
          Привет, я <span className="accent">@rizzie044</span> — звукарь
          в электронной музыке. Сведение и мастеринг с 2023 года.
          Работаю с электроникой, хип-хопом, экспериментальными жанрами.
        </p>
        <div className="flex gap-2">
          <a
            href="https://t.me/rizzie044"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline text-[10px] flex-1 text-center"
          >
            TG: @rizzie044
          </a>
          <button
            onClick={() => navigate('/portfolio')}
            className="btn btn-outline text-[10px] flex-1"
          >
            ПОРТФОЛИО →
          </button>
        </div>
      </div>

    </div>
  )
}
