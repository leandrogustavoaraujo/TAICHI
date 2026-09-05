import { useState } from 'react'
import { QUIZ_QUESTIONS } from '../data/quizQuestions'

const MICROBENEFITS = [
  'Para iniciantes 45+',
  'Comece com apenas 7 minutos',
  'Faça em casa',
  'Sem equipamentos',
  'No seu próprio ritmo',
]

const AGE_QUESTION = QUIZ_QUESTIONS.find((q) => q.id === 'q1')!

interface IntroAgeScreenProps {
  currentValue?: string
  onSelectAge: (value: string) => void
}

const ADVANCE_DELAY_MS = 300

export default function IntroAgeScreen({ currentValue, onSelectAge }: IntroAgeScreenProps) {
  const [pendingValue, setPendingValue] = useState<string | null>(null)

  const handleSelect = (value: string) => {
    if (pendingValue) return
    setPendingValue(value)
    window.setTimeout(() => {
      onSelectAge(value)
      setPendingValue(null)
    }, ADVANCE_DELAY_MS)
  }

  const activeValue = pendingValue ?? currentValue

  return (
    <div className="mx-auto w-full max-w-3xl animate-fadeSlideIn px-4 py-5 sm:py-9">
      <div className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/85 shadow-card backdrop-blur-sm">
        <div className="px-5 pb-5 pt-6 text-center sm:px-9 sm:pt-8">
          <div className="mb-4 flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-forest">
            <span aria-hidden="true">✦</span> Tai Chi em Casa 45+
          </div>
          <div className="mx-auto mb-5 inline-flex rounded-full bg-sage-light/65 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-forest-deep">
            Plano 100% personalizado
          </div>
          <h1 className="mx-auto mb-4 max-w-2xl text-balance text-[30px] sm:text-[42px]">
            Volte a se movimentar com mais leveza em apenas{' '}
            <span className="text-forest">7 minutos por dia</span>
          </h1>
          <p className="mx-auto mb-6 max-w-xl text-[16px] leading-relaxed text-ink/70 sm:text-[17px]">
            Descubra um ponto de partida de Tai Chi feito para sua idade, sua rotina e o seu ritmo.
          </p>
          <div className="relative mx-auto mb-7 aspect-[16/8.4] max-w-xl overflow-hidden rounded-2xl shadow-soft">
            <img
              src="/images/quiz/reinforcement-start.webp"
              alt="Pessoa praticando Tai Chi ao ar livre"
              className="h-full w-full object-cover object-[center_35%]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/75 to-transparent px-5 pb-4 pt-12 text-left text-sm font-semibold text-cream">
              Movimentos suaves, guiados e sem equipamentos
            </div>
          </div>

          <h2 className="mb-4 text-center text-xl sm:text-2xl">{AGE_QUESTION.headline}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {AGE_QUESTION.options.map((option) => {
              const selected = activeValue === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => handleSelect(option.value)}
                  className={`focus-ring flex min-h-14 items-center justify-between rounded-2xl border-2 px-5 py-3 text-left text-[16px] font-bold transition-all hover:-translate-y-0.5 hover:shadow-soft ${
                    selected
                      ? 'border-forest bg-forest text-cream'
                      : 'border-sage-light bg-cream/70 text-forest-deep hover:border-forest/35'
                  }`}
                >
                  <span>{option.label}</span>
                  <span aria-hidden="true" className="text-lg">→</span>
                </button>
              )
            })}
          </div>
          <p className="mt-5 text-xs font-semibold text-ink/50">Leva menos de 3 minutos</p>
        </div>
      </div>

      <ul className="mx-auto mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {MICROBENEFITS.map((item) => (
          <li key={item} className="flex items-center gap-1.5 text-xs font-semibold text-ink/55 sm:text-sm">
            <span className="text-forest" aria-hidden="true">✓</span>{item}
          </li>
        ))}
      </ul>
    </div>
  )
}
