import ProgressBar from './ProgressBar'

interface QuizHeaderProps {
  questionNumber: number | null
  totalQuestions: number
  onBack?: () => void
  showBack: boolean
}

export default function QuizHeader({
  questionNumber,
  totalQuestions,
  onBack,
  showBack,
}: QuizHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/70 bg-cream/85 shadow-[0_8px_28px_-24px_rgba(23,61,48,.65)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
        {showBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Voltar para a pergunta anterior"
            className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sage-light bg-white/70 text-forest transition hover:bg-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <div className="h-9 w-9 shrink-0" />
        )}
        <div className="flex-1">
          <div className="mb-1 text-center text-[10px] font-extrabold uppercase tracking-[0.18em] text-forest/70">
            Tai Chi em Casa 45+
          </div>
          {questionNumber ? (
            <ProgressBar current={questionNumber} total={totalQuestions} />
          ) : (
            <div className="text-center font-display text-sm font-medium tracking-wide text-forest">
              Tai Chi em Casa 45+
            </div>
          )}
        </div>
        <div className="h-9 w-9 shrink-0" />
      </div>
    </header>
  )
}
