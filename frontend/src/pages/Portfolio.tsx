import type { Track } from '../components/AudioPlayer'
import { GlitchText } from '../components/GlitchText'

const DEMO_TRACKS: Track[] = [
  { id: 'track1', title: 'DARK_MATTER_V2',  artist: 'rizzie044', genre: 'ELECTRONIC',   duration: '3:24', src: '' },
  { id: 'track2', title: 'VOID_FREQUENCY',  artist: 'rizzie044', genre: 'EXPERIMENTAL', duration: '4:11', src: '' },
  { id: 'track3', title: 'SIGNAL_LOST',     artist: 'rizzie044', genre: 'HIP-HOP',      duration: '2:58', src: '' },
]

function StaticWaveform() {
  return (
    <div className="flex items-end gap-px h-8 mt-3">
      {Array.from({ length: 32 }).map((_, i) => {
        const h = 10 + Math.abs(Math.sin(i * 0.7 + 1) * 70 + Math.cos(i * 0.4) * 20)
        const isHot = h > 65
        return (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background: isHot ? '#ff6600' : '#ff2020',
              opacity: 0.25,
            }}
          />
        )
      })}
    </div>
  )
}

export function PortfolioPage() {
  return (
    <div className="page-enter pb-20 min-h-screen">
      <div className="px-4 pt-8">

        <div className="mb-6">
          <div className="label mb-1">
            <span className="bolt-icon mr-1">⚡</span>root/portfolio
          </div>
          <GlitchText
            text="PORTFOLIO"
            tag="h1"
            scramble
            className="font-display font-black text-3xl text-cyber-white tracking-wider"
          />
          <div className="label mt-1">ПРИМЕРЫ РАБОТ · BEFORE & AFTER</div>
        </div>

        {/* Status */}
        <div className="card p-4 mb-6">
          <div className="label mb-2">
            <span className="bolt-icon mr-1">⚡</span>STATUS
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="font-mono text-[11px] text-amber-400">
              ТРЕКИ ЗАГРУЖАЮТСЯ... COMING SOON
            </span>
          </div>
          <p className="body-text">
            Портфолио в процессе наполнения. Напиши{' '}
            <a href="https://t.me/rizzie044" className="accent underline">@rizzie044</a>
            {' '}— отправит примеры работ.
          </p>
        </div>

        {/* Placeholder tracks */}
        <div className="space-y-3">
          {DEMO_TRACKS.map((track, i) => (
            <div key={track.id} className="card p-4 opacity-40">
              <div className="flex items-start justify-between mb-2">
                <div className="tag-gray tag">{track.genre}</div>
                <div className="label">TRACK_{String(i + 1).padStart(2, '0')}</div>
              </div>
              <div className="heading-sm">{track.title}</div>
              <div className="label mt-0.5">@{track.artist}</div>
              <StaticWaveform />
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <div className="label mb-3">
            <span className="bolt-icon mr-1">⚡</span>
            ХОЧЕШЬ УСЛЫШАТЬ ЖИВЫЕ ПРИМЕРЫ?
          </div>
          <a
            href="https://t.me/rizzie044"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary inline-flex px-8"
          >
            НАПИСАТЬ @rizzie044
          </a>
        </div>
      </div>
    </div>
  )
}
