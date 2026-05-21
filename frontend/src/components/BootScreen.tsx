import { useState } from 'react'
import { Typewriter } from './GlitchText'

const BOOT_LINES = [
  '> INITIALIZING CYBER_SOUND_STORE...',
  '> AUDIO ENGINE.............. [OK]',
  '> SIGNAL CHAIN.............. [OK]',
  '> VOLTAGE: 220V ............ [ARMED]',
  '> ACCESS GRANTED',
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
      <div className="w-full max-w-xs">
        <div className="mb-8">
          <div className="font-display font-black text-lg text-v-white tracking-widest mb-1">
            CYBER SOUND STORE
          </div>
          <div className="label">HIGH VOLTAGE AUDIO</div>
        </div>

        <div className="card p-4 mb-5">
          <Typewriter lines={BOOT_LINES} speed={28} onDone={handleDone} />
        </div>

        <div className="h-px bg-v-border overflow-hidden">
          <div
            className="h-full bg-v-white transition-all duration-[2800ms] ease-linear"
            style={{ width: '100%', opacity: 0.4 }}
          />
        </div>
        <div className="label mt-2">SYSTEM BOOT...</div>
      </div>
    </div>
  )
}
