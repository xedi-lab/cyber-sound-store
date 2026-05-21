import { useState } from 'react'
import { Typewriter } from './GlitchText'

const BOOT_LINES = [
  '> HIGH_VOLTAGE_SYSTEM v2.0 STARTING...',
  '> LOADING AUDIO_ENGINE............. [OK]',
  '> CHARGING CAPACITORS.............. [OK]',
  '> FREQUENCY_CALIBRATION............ [OK]',
  '> ИНИЦИАЛИЗАЦИЯ СВЕДЕНИЯ........... [OK]',
  '> НАПРЯЖЕНИЕ: 220V ⚡ ОПАСНО',
  '> СИСТЕМА ГОТОВА — ДОБРО ПОЖАЛОВАТЬ',
]

interface Props { onDone: () => void }

export function BootScreen({ onDone }: Props) {
  const [phase, setPhase] = useState<'typing' | 'flash' | 'done'>('typing')

  const handleTypingDone = () => {
    setPhase('flash')
    setTimeout(() => { setPhase('done'); onDone() }, 600)
  }

  if (phase === 'done') return null

  return (
    <div className={`fixed inset-0 z-50 bg-cyber-black flex flex-col items-center justify-center p-8
      ${phase === 'flash' ? 'animate-flicker' : ''}`}>

      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="font-display text-2xl font-black text-cyber-red neon-text tracking-widest mb-1">
          CYBER SOUND STORE
        </div>
        <div className="font-mono text-[10px] tracking-[4px] text-cyber-text-dim">
          ⚡ HIGH VOLTAGE AUDIO ⚡
        </div>
      </div>

      {/* Terminal window */}
      <div className="w-full max-w-sm bg-cyber-card border border-cyber-border p-4 bolt-corners relative">
        <Typewriter lines={BOOT_LINES} speed={32} onDone={handleTypingDone} />
      </div>

      {/* Progress bar */}
      <div className="mt-6 w-full max-w-sm h-px bg-cyber-border relative overflow-hidden">
        <div
          className="h-full bg-cyber-red transition-all duration-[3200ms] ease-linear"
          style={{ width: phase === 'typing' ? '85%' : '100%', boxShadow:'0 0 8px #ff1a1a' }}
        />
      </div>
      <div className="mt-2 text-cyber-text-dim font-mono text-[10px] tracking-widest">
        SYSTEM_BOOT...
      </div>
    </div>
  )
}
