import { useState } from 'react'
import { Typewriter } from './GlitchText'

const BOOT_LINES = [
  '> initializing...',
  '> audio engine.......... ok',
  '> signal chain.......... ok',
  '> voltage: 220v......... armed',
  '> access granted',
]

interface Props { onDone: () => void }

export function BootScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<'typing' | 'done'>('typing')

  const handleDone = () => {
    setPhase('done')
    setTimeout(onDone, 350)
  }

  if (phase === 'done') return null

  return (
    <div className="fixed inset-0 z-50 bg-v-bg flex flex-col items-center justify-center px-8">
      {/* Background video */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.18, filter: 'blur(1px)' }}
      >
        <source src="/boot.mp4" type="video/mp4" />
      </video>
      {/* Dark vignette over video */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, #111111 100%)' }}
      />
      <div className="w-full max-w-xs relative z-10">
        <div className="mb-8">
          <div className="t-heading mb-1">CYBER SOUND STORE</div>
          <div className="t-label">high voltage audio</div>
        </div>

        <div className="card p-4 mb-6">
          <Typewriter lines={BOOT_LINES} speed={30} onDone={handleDone} />
        </div>

        <div className="h-px bg-v-border overflow-hidden">
          <div
            className="h-full bg-v-white transition-all duration-[2800ms] ease-linear opacity-30"
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  )
}

