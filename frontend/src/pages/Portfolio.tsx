import type { Track } from '../components/AudioPlayer'

const DEMO_TRACKS: Track[] = [
  { id: 'track1', title: 'DARK_MATTER_V2',  artist: 'rizzie044', genre: 'electronic',   duration: '3:24', src: '' },
  { id: 'track2', title: 'VOID_FREQUENCY',  artist: 'rizzie044', genre: 'experimental', duration: '4:11', src: '' },
  { id: 'track3', title: 'SIGNAL_LOST',     artist: 'rizzie044', genre: 'hip-hop',      duration: '2:58', src: '' },
]

function StaticWaveform() {
  return (
    <div className="flex items-end gap-px h-6 mt-3">
      {Array.from({ length: 40 }).map((_, i) => {
        const h = 10 + Math.abs(Math.sin(i * 0.7 + 1) * 70 + Math.cos(i * 0.4) * 20)
        return (
          <div
            key={i}
            className="flex-1"
            style={{ height: `${h}%`, background: '#efefef', opacity: 0.07 }}
          />
        )
      })}
    </div>
  )
}

export function PortfolioPage() {
  return (
    <div className="page-enter pb-20 min-h-screen">
      <div className="px-5 pt-10">

        <div className="mb-6">
          <div className="t-label mb-3">root / portfolio</div>
          <div className="t-title text-[26px]">PORTFOLIO</div>
          <div className="t-label mt-1">before & after</div>
        </div>

        {/* Status */}
        <div className="card p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-v-white"
              style={{ animation: 'dot 3s ease-in-out infinite', opacity: 0.4 }}
            />
            <span className="t-label">coming soon</span>
          </div>
          <p className="t-body">
            Портфолио наполняется. Напиши{' '}
            <a href="https://t.me/rizzie044" className="text-v-white underline decoration-v-border2">
              @rizzie044
            </a>
            {' '}— пришлёт примеры.
          </p>
        </div>

        {/* Placeholder tracks */}
        <div className="space-y-px mb-8">
          {DEMO_TRACKS.map((track, i) => (
            <div key={track.id} className="py-4 border-b border-v-border opacity-20 pointer-events-none">
              <div className="flex items-start justify-between mb-1">
                <div className="tag">{track.genre}</div>
                <div className="t-label">#{String(i + 1).padStart(2, '0')}</div>
              </div>
              <div className="t-heading mt-2">{track.title}</div>
              <div className="t-label mt-0.5">@{track.artist}</div>
              <StaticWaveform />
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="t-label mb-4">хочешь услышать живые примеры?</div>
          <a
            href="https://t.me/rizzie044"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary inline-flex px-8"
          >
            написать @rizzie044
          </a>
        </div>
      </div>
    </div>
  )
}
