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
    <div className="mx-auto w-full max-w-xl animate-fadeSlideIn px-4 py-8 sm:max-w-2xl sm:py-12">
      <h1 className="mb-6 text-balance text-[26px] font-semibold sm:mb-8 sm:text-3xl">
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
  )
}
