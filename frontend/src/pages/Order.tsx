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
        <div className="text-5xl mb-4" style={{ textShadow: '0 0 20px #ff6600' }}>⚡</div>
        <GlitchText
          text="ЗАЯВКА ПРИНЯТА"
          tag="div"
          scramble
          className="font-display font-bold text-cyber-white text-xl tracking-wider mb-2"
        />
        <p className="body-text text-center mb-6">
          Заявка отправлена. <span className="accent">@rizzie044</span> напишет
          тебе в ближайшее время.
        </p>
        <div className="space-y-2 w-full max-w-xs">
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary w-full"
          >
            НА ГЛАВНУЮ
          </button>
          <button
            onClick={() => navigate('/services')}
            className="btn btn-outline w-full"
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
          className="label hover:text-cyber-red mb-4 flex items-center gap-1 transition-colors"
        >
          ← НАЗАД
        </button>

        <div className="mb-6">
          <div className="label mb-1">
            <span className="bolt-icon mr-1">⚡</span>root/order
          </div>
          <GlitchText
            text="ORDER.exe"
            tag="h1"
            scramble
            className="font-display font-black text-3xl text-cyber-white tracking-wider"
          />
        </div>

        {/* Selected service */}
        <div className="card card-corners p-4 mb-6">
          <div className="label mb-1">
            <span className="bolt-icon mr-1">⚡</span>ВЫБРАННАЯ УСЛУГА
          </div>
          <div className="heading-sm">{selectedLabel}</div>
          {tariff && (
            <div className="label mt-1">
              Срок: {tariff.deadline} · Контакт: {tariff.contact}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="space-y-4 mb-6">
          {[
            { label: 'ИМЯ *',      key: 'name', ph: 'КАК К ТЕБЕ ОБРАЩАТЬСЯ', type: 'text' },
            { label: 'TELEGRAM *', key: 'tg',   ph: '@USERNAME',              type: 'text' },
          ].map(f => (
            <div key={f.key}>
              <label className="label block mb-1">
                <span className="bolt-icon mr-1">⚡</span>{f.label}
              </label>
              <input
                type={f.type}
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                placeholder={f.ph}
                className="input"
              />
            </div>
          ))}

          <div>
            <label className="label block mb-1">
              <span className="bolt-icon mr-1">⚡</span>КОММЕНТАРИЙ
            </label>
            <textarea
              value={form.comment}
              onChange={e => setForm(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="ЖАНР, РЕФЕРЕНСЫ, ПОЖЕЛАНИЯ..."
              rows={3}
              className="input resize-none"
            />
          </div>
        </div>

        <p className="body-text mb-4">
          <span className="bolt-icon mr-1">⚡</span>
          После отправки{' '}
          <span className="accent">@rizzie044</span> напишет тебе в Telegram.
          Возврат средств не предусмотрен.
        </p>

        <button
          onClick={handleSubmit}
          disabled={!form.name.trim() || !form.tg.trim() || loading}
          className="btn btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? '⚡ ОТПРАВКА...' : '⚡ ОТПРАВИТЬ ЗАЯВКУ →'}
        </button>

      </div>
    </div>
  )
}
