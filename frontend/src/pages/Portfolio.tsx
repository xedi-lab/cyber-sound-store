import type { Track } from '../components/AudioPlayer'

const DEMO_TRACKS: Track[] = [
  { id: 'track1', title: 'DARK_MATTER_V2',  artist: 'rizzie044', genre: 'ELECTRONIC',   duration: '3:24', src: '' },
  { id: 'track2', title: 'VOID_FREQUENCY',  artist: 'rizzie044', genre: 'EXPERIMENTAL', duration: '4:11', src: '' },
  { id: 'track3', title: 'SIGNAL_LOST',     artist: 'rizzie044', genre: 'HIP-HOP',      duration: '2:58', src: '' },
]

function StaticWaveform() {
  return (
    <div className="flex items-end gap-px h-7 mt-3">
      {Array.from({ length: 36 }).map((_, i) => {
        const h = 10 + Math.abs(Math.sin(i * 0.7 + 1) * 70 + Math.cos(i * 0.4) * 20)
        return (
          <div
            key={i}
            className="flex-1 rounded-none"
            style={{ height: `${h}%`, background: '#f0f0f0', opacity: 0.12 }}
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
          <div className="label mb-2">root / portfolio</div>
          <div className="heading-lg text-2xl">PORTFOLIO</div>
          <div className="label mt-1">ПРИМЕРЫ РАБОТ · BEFORE & AFTER</div>
        </div>

        {/* Status */}
        <div className="card p-4 mb-6">
          <div className="label mb-3">STATUS</div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 bg-v-white rounded-full animate-pulse opacity-60" />
            <span className="label text-v-white">COMING SOON</span>
          </div>
          <p className="body-text">
            Портфолио в процессе наполнения. Напиши{' '}
            <a href="https://t.me/rizzie044" className="text-v-white underline decoration-v-border2">
              @rizzie044
            </a>
            {' '}— отправит примеры работ напрямую.
          </p>
        </div>

        {/* Placeholder tracks */}
        <div className="space-y-2 mb-8">
          {DEMO_TRACKS.map((track, i) => (
            <div key={track.id} className="card p-4 opacity-30 pointer-events-none">
              <div className="flex items-start justify-between mb-2">
                <div className="tag">{track.genre}</div>
                <div className="label">#{String(i + 1).padStart(2, '0')}</div>
              </div>
              <div className="heading-sm">{track.title}</div>
              <div className="label mt-0.5">@{track.artist}</div>
              <StaticWaveform />
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="label mb-4">ХОЧЕШЬ УСЛЫШАТЬ ЖИВЫЕ ПРИМЕРЫ?</div>
          <a
            href="https://t.me/rizzie044"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary inline-flex px-10"
          >
            НАПИСАТЬ @rizzie044
          </a>
        </div>
      </div>
    </div>
  )
}
