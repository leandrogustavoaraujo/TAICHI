import { useState } from 'react'
import BodySilhouette from './BodySilhouette'
import PrimaryCTA from './PrimaryCTA'
import type { QuizQuestion } from '../data/quizQuestions'
import type { BodyFocusArea } from '../data/types'

interface BodyFocusScreenProps {
  question: QuizQuestion
  currentValue?: string[]
  onSubmit: (values: string[]) => void
}

export default function BodyFocusScreen({ question, currentValue, onSubmit }: BodyFocusScreenProps) {
  const [selected, setSelected] = useState<string[]>(currentValue ?? [])

  const toggle = (value: string) => {
    setSelected((prev) => {
      if (value === 'full_body') {
        return prev.includes('full_body') ? [] : ['full_body']
      }
      const withoutFullBody = prev.filter((v) => v !== 'full_body')
      return withoutFullBody.includes(value)
        ? withoutFullBody.filter((v) => v !== value)
        : [...withoutFullBody, value]
    })
  }

  return (
    <div className="mx-auto w-full max-w-xl animate-fadeSlideIn px-4 py-8 sm:max-w-3xl sm:py-12">
      <h1 className="mb-2 text-balance text-[26px] font-semibold sm:text-3xl">
        {question.headline}
      </h1>
      {question.subheadline && (
        <p className="mb-6 text-[15px] text-ink/60 sm:mb-8">{question.subheadline}</p>
      )}

      <div className="grid gap-8 sm:grid-cols-[220px_1fr] sm:items-center sm:gap-10">
        <div className="flex justify-center">
          <BodySilhouette selected={selected as BodyFocusArea[]} className="w-40 sm:w-full" />
        </div>

        <div className="flex flex-col gap-3">
          {question.options.map((option) => {
            const isSelected = selected.includes(option.value)
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggle(option.value)}
                aria-pressed={isSelected}
                className={`focus-ring flex w-full items-center justify-between rounded-xl2 border-2 bg-white/80 p-4 text-left shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card ${
                  isSelected ? 'border-terracotta bg-terracotta/10' : 'border-transparent'
                }`}
              >
                <span className="text-[16px] font-semibold text-ink sm:text-[17px]">
                  {option.label}
                </span>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition ${
                    isSelected ? 'border-terracotta bg-terracotta' : 'border-sage-light bg-white'
                  }`}
                >
                  {isSelected && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="#FBF6EA"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-8 flex justify-center sm:justify-start">
        <PrimaryCTA onClick={() => onSubmit(selected)} disabled={selected.length === 0}>
          Continuar
        </PrimaryCTA>
      </div>
    </div>
  )
}
