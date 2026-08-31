import { useState } from 'react'
import AnswerCard from './AnswerCard'
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
    <div className="mx-auto w-full max-w-xl animate-fadeSlideIn px-4 py-8 sm:max-w-2xl sm:py-14">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sage-light/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-forest-deep">
          Tai Chi em Casa 45+
        </div>
        <h1 className="mb-5 text-balance text-[28px] font-semibold leading-tight sm:text-[36px]">
          Volte a se movimentar depois dos 45 com apenas{' '}
          <span className="text-forest">7 minutos</span> de Tai Chi por dia.
        </h1>
        <p className="mx-auto mb-6 max-w-md text-[16px] leading-relaxed text-ink/75 sm:text-[17px]">
          Responda algumas perguntas rápidas e descubra um plano de Tai Chi em casa adaptado ao
          seu nível, à sua rotina e ao seu ponto de partida.
        </p>

        <ul className="mx-auto mb-8 flex max-w-md flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {MICROBENEFITS.map((item) => (
            <li key={item} className="flex items-center gap-1.5 text-sm font-medium text-ink/70">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0 text-forest" aria-hidden="true">
                <circle cx="12" cy="12" r="12" fill="currentColor" fillOpacity="0.15" />
                <path
                  d="M7 12.5l3 3 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <h2 className="mb-4 text-center text-lg font-semibold text-forest-deep sm:text-xl">
        {AGE_QUESTION.headline}
      </h2>
      <div className="flex flex-col gap-3">
        {AGE_QUESTION.options.map((option) => (
          <AnswerCard
            key={option.value}
            option={option}
            selected={activeValue === option.value}
            withImage
            onSelect={() => handleSelect(option.value)}
          />
        ))}
      </div>
    </div>
  )
}
