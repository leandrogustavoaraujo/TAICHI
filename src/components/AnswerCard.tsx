import ImageSlot from './ImageSlot'
import type { QuizOption } from '../data/quizQuestions'

interface AnswerCardProps {
  option: QuizOption
  selected: boolean
  withImage: boolean
  onSelect: () => void
}

export default function AnswerCard({ option, selected, withImage, onSelect }: AnswerCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`focus-ring group flex w-full items-center gap-4 rounded-xl2 border-2 bg-white/80 p-3.5 text-left shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card sm:p-4 ${
        selected ? 'border-forest bg-sage-light/60' : 'border-transparent'
      }`}
    >
      {withImage && option.image && (
        <ImageSlot
          slot={option.image}
          alt={option.label}
          aspect="square"
          className="w-16 shrink-0 sm:w-20"
        />
      )}
      <div className="flex-1">
        <div className="text-[17px] font-semibold leading-snug text-ink sm:text-lg">
          {option.label}
        </div>
        {option.sub && <div className="mt-1 text-sm text-ink/60">{option.sub}</div>}
      </div>
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition ${
          selected ? 'border-forest bg-forest' : 'border-sage-light bg-white'
        }`}
      >
        {selected && (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            className="animate-pulseCheck"
            aria-hidden="true"
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="#FBF6EA"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </button>
  )
}
