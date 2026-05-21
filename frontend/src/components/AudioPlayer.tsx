import { useRef, useState } from 'react'

export interface Track {
  id: string; title: string; artist: string
  genre: string; duration: string; src: string; beforeSrc?: string
}

interface Props { track: Track; index: number }

function VUBars({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-end gap-px h-7">
      {Array.from({ length: 28 }).map((_, i) => {
        const h = 12 + Math.abs(Math.sin(i * 0.65) * 70 + Math.cos(i * 0.4) * 18)
        const isHot = h > 68
        return (
          <div
            key={i}
            className="vu-bar flex-1"
            style={{
              height: `${h}%`,
              background: isHot ? '#ff6600' : '#ff2020',
              opacity: playing ? 1 : 0.2,
              animationPlayState: playing ? 'running' : 'paused',
              animationDelay: `${(i * 0.045) % 0.7}s`,
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
  const [time, setTime] = useState('0:00')
  const [mode, setMode] = useState<'after' | 'before'>('after')

  const toggle = () => {
    if (!audioRef.current) return
    playing ? audioRef.current.pause() : audioRef.current.play()
    setPlaying(p => !p)
  }

  const onTimeUpdate = () => {
    const a = audioRef.current; if (!a) return
    setProgress((a.currentTime / a.duration) * 100 || 0)
    const m = Math.floor(a.currentTime / 60)
    const s = Math.floor(a.currentTime % 60)
    setTime(`${m}:${s.toString().padStart(2, '0')}`)
  }

  return (
    <div className="card p-5">
      <audio
        ref={audioRef}
        src={mode === 'before' ? (track.beforeSrc ?? track.src) : track.src}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setPlaying(false)}
      />

      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="tag tag-gray mb-2">{track.genre}</div>
          <div className="heading-sm">{track.title}</div>
          <div className="label mt-0.5">@{track.artist}</div>
        </div>
        <div className="label">#{String(index + 1).padStart(2, '0')}</div>
      </div>

      <VUBars playing={playing} />

      <div className="flex items-center gap-3 mt-3 mb-4">
        <span className="label w-8">{time}</span>
        <input
          type="range" min={0} max={100} value={progress}
          onChange={e => {
            const a = audioRef.current; if (!a) return
            a.currentTime = (Number(e.target.value) / 100) * a.duration
          }}
          className="audio-range flex-1"
          style={{ background:`linear-gradient(to right,#ff2020 ${progress}%,#1e1e24 ${progress}%)` }}
        />
        <span className="label w-8 text-right">{track.duration}</span>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={toggle} className="btn btn-primary px-5 py-2 text-xs">
          {playing ? '⏸ PAUSE' : '▶ PLAY'}
        </button>
        {track.beforeSrc && (
          <div className="flex border border-cyber-border rounded-sm ml-auto overflow-hidden">
            {(['after', 'before'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`label px-3 py-2 transition-colors
                  ${mode === m ? 'bg-cyber-red text-cyber-black font-bold' : 'hover:text-cyber-text-1'}`}
              >
                {m.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
