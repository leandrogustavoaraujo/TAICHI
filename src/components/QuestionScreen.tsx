import { useState } from 'react'
import AnswerCard from './AnswerCard'
import type { QuizQuestion } from '../data/quizQuestions'

interface QuestionScreenProps {
  question: QuizQuestion
  currentValue?: string
  onAnswer: (value: string) => void
}

const ADVANCE_DELAY_MS = 300

export default function QuestionScreen({
  question,
  currentValue,
  onAnswer,
}: QuestionScreenProps) {
  const [pendingValue, setPendingValue] = useState<string | null>(null)

  const handleSelect = (value: string) => {
    if (pendingValue) return // avoid double-trigger during the transition window
    setPendingValue(value)
    window.setTimeout(() => {
      onAnswer(value)
      setPendingValue(null)
    }, ADVANCE_DELAY_MS)
  }

  const activeValue = pendingValue ?? currentValue

  return (
    <div className="mx-auto w-full max-w-2xl animate-fadeSlideIn px-4 py-7 sm:py-10">
      <div className="rounded-[1.75rem] border border-white/70 bg-white/75 p-5 shadow-card backdrop-blur-sm sm:p-8">
        <div className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-forest/65">
          Seu perfil
        </div>
        <h1 className="mb-6 text-balance text-[27px] sm:mb-8 sm:text-[34px]">
          {question.headline}
        </h1>
        <div className="flex flex-col gap-3">
          {question.options.map((option) => (
            <AnswerCard
              key={option.value}
              option={option}
              selected={activeValue === option.value}
              withImage={question.layout === 'image-cards'}
              onSelect={() => handleSelect(option.value)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
