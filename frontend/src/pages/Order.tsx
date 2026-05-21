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
      <div className="page-enter min-h-screen flex flex-col items-center justify-center px-6 pb-20">
        <div className="divider-bright w-16 mb-8" />
        <GlitchText
          text="ЗАЯВКА ПРИНЯТА"
          tag="div"
          scramble
          className="heading-md mb-3 text-center"
        />
        <p className="body-text text-center mb-8 max-w-xs">
          Заявка отправлена.{' '}
          <span className="text-v-white">@rizzie044</span>{' '}
          напишет тебе в ближайшее время.
        </p>
        <div className="space-y-2 w-full max-w-xs">
          <button onClick={() => navigate('/')} className="btn btn-primary w-full">
            НА ГЛАВНУЮ
          </button>
          <button onClick={() => navigate('/services')} className="btn btn-outline w-full">
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
          className="label hover:text-v-white mb-5 flex items-center gap-1 transition-colors"
        >
          ← НАЗАД
        </button>

        <div className="mb-6">
          <div className="label mb-2">root / order</div>
          <div className="heading-lg text-2xl">ORDER</div>
        </div>

        {/* Selected */}
        <div className="card p-4 mb-6">
          <div className="label mb-1">ВЫБРАННАЯ УСЛУГА</div>
          <div className="heading-sm mt-1">{selectedLabel}</div>
          {tariff && (
            <div className="label mt-1">Срок: {tariff.deadline}</div>
          )}
        </div>

        {/* Form */}
        <div className="space-y-4 mb-6">
          {[
            { label: 'ИМЯ *',      key: 'name', ph: 'КАК К ТЕБЕ ОБРАЩАТЬСЯ', type: 'text' },
            { label: 'TELEGRAM *', key: 'tg',   ph: '@USERNAME',              type: 'text' },
          ].map(f => (
            <div key={f.key}>
              <label className="label block mb-1.5">{f.label}</label>
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
            <label className="label block mb-1.5">КОММЕНТАРИЙ</label>
            <textarea
              value={form.comment}
              onChange={e => setForm(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="ЖАНР, РЕФЕРЕНСЫ, ПОЖЕЛАНИЯ..."
              rows={3}
              className="input resize-none"
            />
          </div>
        </div>

        <p className="body-text mb-6">
          После отправки{' '}
          <span className="text-v-white">@rizzie044</span>{' '}
          напишет тебе в Telegram. Возврат средств не предусмотрен.
        </p>

        <button
          onClick={handleSubmit}
          disabled={!form.name.trim() || !form.tg.trim() || loading}
          className="btn btn-primary w-full"
        >
          {loading ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ ЗАЯВКУ →'}
        </button>

      </div>
    </div>
  )
}
