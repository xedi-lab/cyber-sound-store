import type { Track } from '../components/AudioPlayer'
import { GlitchText } from '../components/GlitchText'

const DEMO_TRACKS: Track[] = [
  { id: 'track1', title: 'DARK_MATTER_V2',   artist: 'rizzie044', genre: 'ELECTRONIC',   duration: '3:24', src: '' },
  { id: 'track2', title: 'VOID_FREQUENCY',   artist: 'rizzie044', genre: 'EXPERIMENTAL', duration: '4:11', src: '' },
  { id: 'track3', title: 'SIGNAL_LOST',      artist: 'rizzie044', genre: 'HIP-HOP',      duration: '2:58', src: '' },
]

/* Static waveform preview */
function StaticWaveform() {
  return (
    <div className="flex items-end gap-px h-8 mt-3">
      {Array.from({ length: 32 }).map((_, i) => {
        const h = 10 + Math.abs(Math.sin(i * 0.7 + 1) * 70 + Math.cos(i * 0.4) * 20)
        const color = h > 65 ? '#ff6600' : '#ff1a1a'
        return (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{ height:`${h}%`, background:color, opacity:0.3, boxShadow:`0 0 2px ${color}44` }}
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
          <div className="font-mono text-[9px] text-cyber-text-dim tracking-widest mb-1">
            ⚡ root/portfolio
          </div>
          <GlitchText
            text="PORTFOLIO"
            tag="h1"
            scramble
            className="font-display font-black text-3xl text-cyber-red neon-text tracking-wider"
          />
          <div className="font-mono text-[10px] text-cyber-text-dim mt-1">
            ПРИМЕРЫ РАБОТ · BEFORE & AFTER
          </div>
        </div>

        {/* Status */}
        <div className="electric-card p-4 mb-6">
          <div className="font-mono text-[10px] text-cyber-text-dim tracking-widest mb-2">
            ⚡ STATUS
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="font-mono text-[11px] text-amber-400">
              ТРЕКИ ЗАГРУЖАЮТСЯ... COMING SOON
            </span>
          </div>
          <p className="font-mono text-[10px] text-cyber-text-dim mt-2 leading-relaxed">
            Портфолио в процессе наполнения. Напиши{' '}
            <a href="https://t.me/rizzie044" className="text-cyber-red underline">@rizzie044</a>
            {' '}— отправит примеры работ.
          </p>
        </div>

        {/* Placeholder tracks */}
        <div className="space-y-3">
          {DEMO_TRACKS.map((track, i) => (
            <div key={track.id} className="electric-card p-4 opacity-40">
              <div className="badge-red inline-block mb-2 text-[9px]">{track.genre}</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-cyber-red text-sm tracking-wider">
                    {track.title}
                  </div>
                  <div className="font-mono text-cyber-text-dim text-[10px]">// {track.artist}</div>
                </div>
                <div className="font-mono text-[10px] text-cyber-text-dim">
                  TRACK_{String(i + 1).padStart(2, '0')}
                </div>
              </div>
              <StaticWaveform />
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <div className="font-mono text-[10px] text-cyber-text-dim mb-3">
            ⚡ ХОЧЕШЬ УСЛЫШАТЬ ЖИВЫЕ ПРИМЕРЫ?
          </div>
          <a
            href="https://t.me/rizzie044"
            target="_blank"
            rel="noreferrer"
            className="cyber-btn cyber-btn-primary inline-block px-8 py-3 text-xs tracking-widest"
          >
            НАПИСАТЬ @rizzie044
          </a>
        </div>
      </div>
    </div>
  )
}
