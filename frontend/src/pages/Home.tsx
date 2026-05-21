import { useNavigate } from 'react-router-dom'
import { GlitchText } from '../components/GlitchText'
import { SERVICES } from '../data/services'

const STATS = [
  { value: '500+', label: 'ТРЕКОВ СВЕДЕНО' },
  { value: '3+',   label: 'ГОДА ОПЫТА' },
  { value: '24Ч',  label: 'ЭКСПРЕСС' },
]

/* Lightning bolt SVG decoration */
function LightningBolt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 40" className={className} fill="currentColor">
      <path d="M14 0L0 22h10L8 40l16-24H14L14 0z" />
    </svg>
  )
}

/* Oscilloscope-style line */
function OsciLine() {
  return (
    <div className="flex items-center h-6 gap-0 overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => {
        const y = 50 + Math.sin(i * 0.6) * 40 + Math.sin(i * 1.2) * 15
        const color = y > 70 ? '#ff6600' : '#ff1a1a'
        return (
          <div
            key={i}
            className="flex-shrink-0"
            style={{
              width: 2,
              height: `${y}%`,
              background: color,
              boxShadow: `0 0 3px ${color}88`,
              alignSelf: 'flex-end',
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
        {/* HV Grid background */}
        <div className="absolute inset-0 hv-grid opacity-100" />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, #ff1a1a0d 0%, transparent 70%)' }}
        />

        {/* Lightning bolts */}
        <LightningBolt className="absolute top-6 left-4 w-5 h-8 text-cyber-spark opacity-60 animate-bolt" />
        <LightningBolt className="absolute top-6 right-4 w-5 h-8 text-cyber-spark opacity-60 [animation-delay:1.5s] animate-bolt" />

        <div className="relative z-10">
          <div className="font-mono text-[10px] tracking-[4px] text-cyber-text-dim mb-4">
            ⚡ HIGH_VOLTAGE_AUDIO · @rizzie044 ⚡
          </div>

          <GlitchText
            text="CYBER"
            tag="div"
            scramble
            className="font-display font-black text-6xl text-cyber-red neon-text leading-none tracking-wider"
          />
          <div className="font-display font-black text-6xl text-cyber-red leading-none tracking-wider mb-1">
            SOUND
          </div>
          <div className="font-display font-black text-6xl text-cyber-red leading-none tracking-wider">
            STORE
          </div>

          <div className="mt-3 font-mono text-[11px] text-cyber-text-dim tracking-widest">
            СВЕДЕНИЕ · МАСТЕРИНГ · САУНД ДИЗАЙН
          </div>

          {/* Oscilloscope line */}
          <div className="mt-4 mb-5 mx-4">
            <OsciLine />
          </div>

          <button
            onClick={() => navigate('/services')}
            className="cyber-btn cyber-btn-primary px-8 py-3 text-xs tracking-widest sparks"
          >
            ⚡ ПОДКЛЮЧИТЬСЯ
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-px mx-4 mb-8 border border-cyber-border">
        {STATS.map(s => (
          <div key={s.label} className="bg-cyber-card p-3 text-center relative">
            <div className="font-display font-bold text-cyber-red text-xl neon-text-dim">
              {s.value}
            </div>
            <div className="font-mono text-[8px] text-cyber-text-dim tracking-wider mt-0.5">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Services preview ── */}
      <div className="px-4 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="font-mono text-[10px] text-cyber-text-dim tracking-widest">
            ⚡ УСЛУГИ
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-cyber-red/40 to-transparent" />
        </div>

        <div className="space-y-2">
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => navigate(`/services/${s.slug}`)}
              className="electric-card w-full p-3 flex items-center gap-3 group"
            >
              <div className="font-mono text-[10px] text-cyber-text-dim w-5">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="text-lg">{s.icon}</div>
              <div className="flex-1 text-left">
                <div className="font-display text-xs text-cyber-red font-bold tracking-wider">
                  {s.title}
                </div>
                <div className="font-mono text-[9px] text-cyber-text-dim">{s.subtitle}</div>
              </div>
              <div className="font-display text-sm text-cyber-red font-bold">
                {s.price.toLocaleString('ru-RU')} ₽
              </div>
              <div className="font-mono text-[10px] text-cyber-text-dim group-hover:text-cyber-spark transition-colors">
                →
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── About block ── */}
      <div className="mx-4 electric-card p-4 bolt-corners relative">
        <div className="font-mono text-[10px] text-cyber-text-dim tracking-widest mb-3">
          ⚡ О СИСТЕМЕ
        </div>
        <p className="font-mono text-[11px] text-cyber-text-dim leading-relaxed mb-4">
          Привет, я <span className="text-cyber-red">@rizzie044</span> — звукарь
          в электронной музыке. Сведение и мастеринг с 2023 года.
          Работаю с электроникой, хип-хопом, экспериментальными жанрами.
        </p>
        <div className="flex gap-2">
          <a
            href="https://t.me/rizzie044"
            target="_blank"
            rel="noreferrer"
            className="cyber-btn text-[10px] flex-1 text-center py-2"
          >
            TG: @rizzie044
          </a>
          <button
            onClick={() => navigate('/portfolio')}
            className="cyber-btn text-[10px] flex-1 py-2"
          >
            ПОРТФОЛИО →
          </button>
        </div>
      </div>

    </div>
  )
}
