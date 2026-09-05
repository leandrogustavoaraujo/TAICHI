import { useEffect, useState } from 'react'
import { track } from '../utils/analytics'

interface ProcessingStage {
  label: string
  done: string
}

const STAGES: ProcessingStage[] = [
  { label: 'Analisando seu perfil...', done: 'Perfil analisado' },
  { label: 'Calculando seu metabolismo...', done: 'Metabolismo calculado' },
  { label: 'Ajustando o nível de atividade...', done: 'Nível de atividade ajustado' },
  { label: 'Criando seu plano personalizado...', done: 'Plano personalizado criado' },
]

const RESULT_IMAGES = [
  '/images/quiz/results/transformacao-real-1.webp',
  '/images/quiz/results/transformacao-real-2.webp',
  '/images/quiz/results/transformacao-real-3.webp',
]

const STAGE_DURATION_MS = 1550
const TOTAL_DURATION_MS = STAGE_DURATION_MS * STAGES.length + 250
const PROGRESS_TICK_MS = 40

interface ProcessingScreenProps {
  onDone: () => void
}

export default function ProcessingScreen({ onDone }: ProcessingScreenProps) {
  const [activeStage, setActiveStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    track('processing_started')
    const timers: number[] = []
    STAGES.forEach((_, index) => {
      timers.push(
        window.setTimeout(() => setActiveStage(index + 1), STAGE_DURATION_MS * (index + 1)),
      )
    })
    timers.push(window.setTimeout(onDone, TOTAL_DURATION_MS))

    const startedAt = Date.now()
    const progressInterval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt
      const pct = Math.min(100, (elapsed / TOTAL_DURATION_MS) * 100)
      setProgress(pct)
      if (pct >= 100) window.clearInterval(progressInterval)
    }, PROGRESS_TICK_MS)
    const imageInterval = window.setInterval(() => {
      setImageIndex((current) => (current + 1) % RESULT_IMAGES.length)
    }, 1800)

    return () => {
      timers.forEach((t) => window.clearTimeout(t))
      window.clearInterval(progressInterval)
      window.clearInterval(imageInterval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mx-auto flex min-h-[78vh] w-full max-w-xl animate-fadeSlideIn flex-col items-center justify-center px-4 py-12 text-center">
      <div className="w-full rounded-[1.75rem] border border-white/70 bg-white/85 p-6 shadow-card backdrop-blur-sm sm:p-9">
      <div className="mb-3 text-xs font-extrabold uppercase tracking-[0.18em] text-forest">✦ Tai Chi em Casa 45+</div>
      <h1 className="mb-2 text-[27px] sm:text-[34px]">Seu plano personalizado de Tai Chi está sendo feito!</h1>
      <p className="mb-7 text-[15px] text-ink/60">Estamos organizando seu ponto de partida com base nas suas respostas.</p>

      <div className="mb-8 w-full">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-sage-light">
          <div
            className="h-full rounded-full bg-gradient-to-r from-forest via-terracotta to-forest bg-[length:200%_100%] transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%`, animation: 'shimmer 1.8s linear infinite' }}
          />
        </div>
        <div className="mt-2 text-right text-xs font-semibold tabular-nums text-forest/60">
          {Math.round(progress)}%
        </div>
      </div>

      <div className="w-full space-y-3">
        {STAGES.map((stage, index) => {
          const isDone = index < activeStage
          const isActive = index === activeStage
          return (
            <div
              key={stage.label}
              className={`flex items-center gap-3 rounded-xl2 border px-4 py-3 text-left transition-all duration-300 ${
                isDone
                  ? 'border-sage-light bg-sage-light/50'
                  : isActive
                    ? 'border-forest/40 bg-white shimmer-bg animate-shimmer'
                    : 'border-sage-light/40 bg-white/40 opacity-50'
              }`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {isDone ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="12" fill="#315F4A" />
                    <path
                      d="M7 12.5l3 3 7-7"
                      stroke="#FBF6EA"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span className="block h-2.5 w-2.5 rounded-full bg-sage" />
                )}
              </span>
              <span className="text-[15px] font-medium">
                {isDone ? stage.done : stage.label}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-7 overflow-hidden rounded-[1.5rem] bg-white shadow-card">
        <img src={RESULT_IMAGES[imageIndex]} alt="Representação visual de evolução corporal" className="aspect-square w-full object-cover transition-opacity duration-300" />
        <div className="p-4">
          <p className="font-serif text-lg font-bold text-forest">Movimento, energia e confiança podem evoluir juntos.</p>
          <div className="mt-3 flex justify-center gap-2" aria-hidden="true">
            {RESULT_IMAGES.map((image, index) => <span key={image} className={`h-2 rounded-full ${index === imageIndex ? 'w-5 bg-forest' : 'w-2 bg-sage-light'}`} />)}
          </div>
          <p className="mt-3 text-[11px] text-ink/45">Resultados variam de pessoa para pessoa.</p>
        </div>
      </div>
      </div>
    </div>
  )
}
