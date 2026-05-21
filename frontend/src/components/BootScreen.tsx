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
      <div className="w-full max-w-xs">
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
