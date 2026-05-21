import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
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
        <div className="t-title text-[22px] mb-3 text-center">заявка принята</div>
        <p className="t-body text-center mb-8 max-w-xs">
          <span className="text-v-white">@rizzie044</span>{' '}
          напишет тебе в ближайшее время.
        </p>
        <div className="space-y-2 w-full max-w-xs">
          <button onClick={() => navigate('/')} className="btn btn-primary w-full">
            на главную
          </button>
          <button onClick={() => navigate('/services')} className="btn btn-outline w-full">
            ещё услуги
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter pb-20 min-h-screen">
      <div className="px-5 pt-10">

        <button
          onClick={() => navigate(-1)}
          className="t-label hover:text-v-white mb-6 flex items-center gap-1 transition-colors"
        >
          ← назад
        </button>

        <div className="mb-6">
          <div className="t-label mb-3">root / order</div>
          <div className="t-title text-[26px]">ORDER</div>
        </div>

        {/* Selected */}
        <div className="card p-4 mb-6">
          <div className="t-label mb-1">выбранная услуга</div>
          <div className="t-heading mt-1">{selectedLabel}</div>
          {tariff && <div className="t-label mt-1">срок: {tariff.deadline}</div>}
        </div>

        {/* Form */}
        <div className="space-y-4 mb-6">
          {[
            { label: 'имя *',      key: 'name', ph: 'как к тебе обращаться', type: 'text' },
            { label: 'telegram *', key: 'tg',   ph: '@username',              type: 'text' },
          ].map(f => (
            <div key={f.key}>
              <label className="t-label block mb-1.5">{f.label}</label>
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
            <label className="t-label block mb-1.5">комментарий</label>
            <textarea
              value={form.comment}
              onChange={e => setForm(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="жанр, референсы, пожелания..."
              rows={3}
              className="input resize-none"
            />
          </div>
        </div>

        <p className="t-body mb-6">
          После отправки{' '}
          <span className="text-v-white">@rizzie044</span>{' '}
          напишет в Telegram. Возврат не предусмотрен.
        </p>

        <button
          onClick={handleSubmit}
          disabled={!form.name.trim() || !form.tg.trim() || loading}
          className="btn btn-primary w-full"
        >
          {loading ? 'отправка...' : 'отправить заявку →'}
        </button>

      </div>
    </div>
  )
}
