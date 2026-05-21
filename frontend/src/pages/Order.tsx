import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { GlitchText } from '../components/GlitchText'
import { SERVICES, MIXING_TARIFFS } from '../data/services'

type Step = 'form' | 'success'

export function OrderPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const serviceId = params.get('service') ?? 'mixing'
  const tariffId  = params.get('tariff') ?? ''

  const service = SERVICES.find(s => s.id === serviceId) ?? SERVICES[0]
  const tariff  = MIXING_TARIFFS.find(t => t.id === tariffId)

  const [step, setStep] = useState<Step>('form')
  const [form, setForm] = useState({ name: '', tg: '', comment: '' })
  const [loading, setLoading] = useState(false)

  const selectedLabel = tariff
    ? `${tariff.label} — ${tariff.price.toLocaleString('ru-RU')} ₽`
    : `${service.title} — ${service.price.toLocaleString('ru-RU')} ₽`

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.tg.trim()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setStep('success')
  }

  if (step === 'success') {
    return (
      <div className="page-enter min-h-screen flex flex-col items-center justify-center px-4 pb-20">
        <div className="text-5xl mb-4 neon-spark" style={{ textShadow:'0 0 20px #ff6600' }}>⚡</div>
        <GlitchText
          text="ЗАЯВКА ПРИНЯТА"
          tag="div"
          scramble
          className="font-display font-bold text-cyber-red text-xl neon-text tracking-wider mb-2"
        />
        <p className="font-mono text-[11px] text-cyber-text-dim text-center mb-6 leading-relaxed">
          Заявка отправлена. <span className="text-cyber-red">@rizzie044</span> напишет
          тебе в ближайшее время.
        </p>
        <div className="space-y-2 w-full max-w-xs">
          <button
            onClick={() => navigate('/')}
            className="cyber-btn cyber-btn-primary w-full py-3 text-xs tracking-widest"
          >
            НА ГЛАВНУЮ
          </button>
          <button
            onClick={() => navigate('/services')}
            className="cyber-btn w-full py-3 text-xs tracking-widest"
          >
            ЕЩЁ УСЛУГИ
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter pb-20 min-h-screen">
      <div className="px-4 pt-8">

        <button
          onClick={() => navigate(-1)}
          className="font-mono text-[10px] text-cyber-text-dim hover:text-cyber-red mb-4 flex items-center gap-1 transition-colors"
        >
          ← НАЗАД
        </button>

        <div className="mb-6">
          <div className="font-mono text-[9px] text-cyber-text-dim tracking-widest mb-1">
            ⚡ root/order
          </div>
          <GlitchText
            text="ORDER.exe"
            tag="h1"
            scramble
            className="font-display font-black text-3xl text-cyber-red neon-text tracking-wider"
          />
        </div>

        {/* Selected service */}
        <div className="electric-card p-4 mb-6 bolt-corners">
          <div className="font-mono text-[9px] text-cyber-text-dim mb-1">⚡ ВЫБРАННАЯ УСЛУГА</div>
          <div className="font-display font-bold text-cyber-red text-sm tracking-wider">
            {selectedLabel}
          </div>
          {tariff && (
            <div className="font-mono text-[10px] text-cyber-text-dim mt-1">
              Срок: {tariff.deadline} · Контакт: {tariff.contact}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="space-y-4 mb-6">
          {[
            { label: '⚡ ИМЯ *',       key: 'name',    ph: 'КАК К ТЕБЕ ОБРАЩАТЬСЯ', type: 'text' },
            { label: '⚡ TELEGRAM *',   key: 'tg',      ph: '@USERNAME',              type: 'text' },
          ].map(f => (
            <div key={f.key}>
              <label className="font-mono text-[10px] text-cyber-text-dim tracking-widest block mb-1">
                {f.label}
              </label>
              <input
                type={f.type}
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                placeholder={f.ph}
                className="cyber-input"
              />
            </div>
          ))}

          <div>
            <label className="font-mono text-[10px] text-cyber-text-dim tracking-widest block mb-1">
              ⚡ КОММЕНТАРИЙ
            </label>
            <textarea
              value={form.comment}
              onChange={e => setForm(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="ЖАНР, РЕФЕРЕНСЫ, ПОЖЕЛАНИЯ..."
              rows={3}
              className="cyber-input resize-none"
            />
          </div>
        </div>

        <div className="font-mono text-[9px] text-cyber-text-dim mb-4 leading-relaxed">
          ⚡ После отправки{' '}
          <span className="text-cyber-red">@rizzie044</span> напишет тебе в Telegram.
          Возврат средств не предусмотрен.
        </div>

        <button
          onClick={handleSubmit}
          disabled={!form.name.trim() || !form.tg.trim() || loading}
          className="cyber-btn cyber-btn-primary w-full py-3 text-xs tracking-widest disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? '⚡ ОТПРАВКА...' : '⚡ ОТПРАВИТЬ ЗАЯВКУ →'}
        </button>

      </div>
    </div>
  )
}
