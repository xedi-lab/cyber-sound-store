import { useRef, useState } from 'react'

export interface Track {
  id: string
  title: string
  artist: string
  genre: string
  duration: string
  src: string
  beforeSrc?: string
}

interface Props { track: Track; index: number }

function VUBars({ playing, bars = 24 }: { playing: boolean; bars?: number }) {
  return (
    <div className="flex items-end gap-px h-8">
      {Array.from({ length: bars }).map((_, i) => {
        const h = 15 + Math.abs(Math.sin(i * 0.7)) * 70 + Math.abs(Math.cos(i * 0.4)) * 15
        const color = h > 70 ? '#ff6600' : h > 45 ? '#ff2200' : '#ff1a1a'
        return (
          <div
            key={i}
            className="vu-bar flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background: color,
              boxShadow: playing ? `0 0 4px ${color}88` : 'none',
              opacity: playing ? 1 : 0.25,
              animationPlayState: playing ? 'running' : 'paused',
              animationDelay: `${(i * 0.04) % 0.6}s`,
            }}
          />
        )
      })}
    </div>
  )
}

export function AudioPlayer({ track, index }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [mode, setMode] = useState<'after' | 'before'>('after')

  const src = mode === 'before' ? (track.beforeSrc ?? track.src) : track.src

  const toggle = () => {
    if (!audioRef.current) return
    playing ? audioRef.current.pause() : audioRef.current.play()
    setPlaying(p => !p)
  }

  const handleTimeUpdate = () => {
    const a = audioRef.current
    if (!a) return
    setProgress((a.currentTime / a.duration) * 100 || 0)
    const m = Math.floor(a.currentTime / 60)
    const s = Math.floor(a.currentTime % 60)
    setCurrentTime(`${m}:${s.toString().padStart(2, '0')}`)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current
    if (!a) return
    a.currentTime = (Number(e.target.value) / 100) * a.duration
  }

  return (
    <div className="electric-card p-4 relative">
      <audio ref={audioRef} src={src} onTimeUpdate={handleTimeUpdate} onEnded={() => setPlaying(false)} />

      <div className="absolute top-3 right-3 font-mono text-[10px] text-cyber-text-dim">
        TRACK_{String(index + 1).padStart(2, '0')}
      </div>

      <div className="mb-3">
        <div className="badge-red inline-block mb-2 text-[9px]">{track.genre}</div>
        <div className="font-display font-bold text-cyber-red text-sm tracking-wider">{track.title}</div>
        <div className="font-mono text-cyber-text-dim text-[10px]">// {track.artist}</div>
      </div>

      <VUBars playing={playing} />

      <div className="flex items-center gap-2 mt-3 mb-3">
        <span className="font-mono text-[10px] text-cyber-text-dim w-8">{currentTime}</span>
        <input
          type="range" min={0} max={100} value={progress}
          onChange={handleSeek}
          className="audio-progress flex-1"
          style={{ background:`linear-gradient(to right, #ff1a1a ${progress}%, #2a0a0a ${progress}%)` }}
        />
        <span className="font-mono text-[10px] text-cyber-text-dim w-8 text-right">{track.duration}</span>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={toggle} className="cyber-btn cyber-btn-primary px-4 py-2 text-xs flex items-center gap-2">
          {playing ? '⏸ PAUSE' : '▶ PLAY'}
        </button>

        {track.beforeSrc && (
          <div className="flex border border-cyber-border overflow-hidden ml-auto">
            {(['after', 'before'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`font-mono text-[9px] px-2 py-1.5 tracking-wider transition-colors
                  ${mode === m ? 'bg-cyber-red text-cyber-black font-bold' : 'text-cyber-text-dim hover:text-cyber-red'}`}
              >
                {m === 'after' ? 'AFTER' : 'BEFORE'}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
