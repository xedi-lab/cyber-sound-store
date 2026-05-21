import { useState } from 'react'
import { Typewriter } from './GlitchText'

const BOOT_LINES = [
  '> INITIALIZING CYBER_SOUND_STORE...',
  '> AUDIO ENGINE............ [LOADED]',
  '> SIGNAL CHAIN.............. [READY]',
  '> VOLTAGE: 220V ⚡......... [ARMED]',
  '> ДОСТУП РАЗРЕШЁН',
]

interface Props { onDone: () => void }

export function BootScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<'typing' | 'done'>('typing')

  const handleDone = () => {
    setPhase('done')
    setTimeout(onDone, 400)
  }

  if (phase === 'done') return null

  return (
    <div className="fixed inset-0 z-50 bg-cyber-black flex flex-col items-center justify-center px-8">
      <div className="w-full max-w-xs">
        {/* Logo */}
        <div className="mb-8">
          <div className="font-display font-black text-xl text-cyber-white tracking-widest mb-1">
            CYBER SOUND STORE
          </div>
          <div className="label">
            <span className="bolt-icon mr-1">⚡</span>
            HIGH VOLTAGE AUDIO
          </div>
        </div>

        {/* Terminal */}
        <div className="card p-4 mb-5">
          <Typewriter lines={BOOT_LINES} speed={30} onDone={handleDone} />
        </div>

        {/* Progress */}
        <div className="h-px bg-cyber-border overflow-hidden">
          <div
            className="h-full bg-cyber-red transition-all duration-[3000ms] ease-linear"
            style={{ width: '85%' }}
          />
        </div>
        <div className="label mt-2">SYSTEM BOOT...</div>
      </div>
    </div>
  )
}
