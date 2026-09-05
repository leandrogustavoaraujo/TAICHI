import { PROFILES } from '../data/profiles'
import type { QuizState } from '../data/types'
import {
  ACTIVITY_LABEL,
  AVAILABLE_TIME_LABEL,
  EXPERIENCE_LABEL,
  INTENSITY_LABEL,
} from '../data/answerLabels'
import { GOAL_LABEL, BARRIER_LABEL } from '../data/personalizationCopy'
import { BODY_FOCUS_LABEL } from '../data/personalizationMatrix'
import { resolveWeeklyFrequency } from '../logic/frequencyRecommendation'
import { buildPersonalization } from '../logic/personalizationEngine'
import ResultCard from './ResultCard'
import PlanStartVisual from './PlanStartVisual'
import ScrollToOfferCTA from './ScrollToOfferCTA'
import ProgressionTimeline from './ProgressionTimeline'
import ContinuityNote from './ContinuityNote'
import LockedPlanPreview from './LockedPlanPreview'
import ProductMockupShowcase from './ProductMockupShowcase'
import ProductShowcaseCarousel from './ProductShowcaseCarousel'
import FaqSection from './FaqSection'
import SocialProofSection from './SocialProofSection'
import GuaranteeSection from './GuaranteeSection'
import OfferSection from './OfferSection'
import StickyMobileCTA from './StickyMobileCTA'
import type { HealthConsideration } from '../data/types'

const HEALTH_LABEL: Record<HealthConsideration, string> = {
  weight: 'Estar acima do peso',
  pain: 'Corpo dolorido e travado',
  fatigue: 'Cansaço e falta de energia',
  mind: 'Mente acelerada',
  sleep: 'Sono ruim',
  health: 'Cuidar da saúde',
}

interface PersonalizedResultProps {
  state: QuizState
  onRestart: () => void
}

export default function PersonalizedResult({ state, onRestart }: PersonalizedResultProps) {
  const { answers, profile } = state
  const profileDef = profile ? PROFILES[profile] : null

  const personalization = buildPersonalization(answers)

  const frequency = resolveWeeklyFrequency(
    answers.weeklyFrequency,
    answers.activityLevel,
    answers.taiChiExperience,
  )

  const startingDurationLabel = answers.availableTime
    ? AVAILABLE_TIME_LABEL[answers.availableTime]
    : `${profileDef?.startingDurationMinutes ?? 7} minutos`

  const paceLabel = answers.intensityPreference
    ? INTENSITY_LABEL[answers.intensityPreference]
    : (profileDef?.pace ?? 'Leve e progressivo')

  const summaryRows = [
    answers.heightCm && { label: 'Altura', value: `${answers.heightCm} cm` },
    answers.currentWeightKg && { label: 'Peso atual informado', value: `${answers.currentWeightKg} kg` },
    answers.targetWeightKg && { label: 'Meta informada', value: `${answers.targetWeightKg} kg` },
    answers.healthConsiderations && answers.healthConsiderations.length > 0 && {
      label: 'Cuidados considerados',
      value: answers.healthConsiderations.map((item) => HEALTH_LABEL[item]).join(', '),
    },
    answers.activityLevel && {
      label: 'Atividade atual',
      value: ACTIVITY_LABEL[answers.activityLevel],
    },
    answers.availableTime && {
      label: 'Tempo disponível',
      value: AVAILABLE_TIME_LABEL[answers.availableTime],
    },
    answers.intensityPreference && {
      label: 'Intensidade',
      value: INTENSITY_LABEL[answers.intensityPreference],
    },
    { label: 'Frequência', value: `${frequency}x por semana` },
    answers.mainGoal && { label: 'Objetivo', value: GOAL_LABEL[answers.mainGoal] },
    answers.mainBarrier && {
      label: 'Principal barreira',
      value: BARRIER_LABEL[answers.mainBarrier],
    },
    answers.taiChiExperience && {
      label: 'Experiência',
      value: EXPERIENCE_LABEL[answers.taiChiExperience],
    },
    answers.bodyFocus &&
      answers.bodyFocus.length > 0 && {
        label: 'Regiões de interesse',
        value: answers.bodyFocus.map((a) => BODY_FOCUS_LABEL[a]).join(', '),
      },
  ].filter(Boolean) as { label: string; value: string }[]

  const configRows = [
    { label: 'Duração inicial', value: `A partir de ${startingDurationLabel}` },
    { label: 'Ritmo', value: paceLabel },
    { label: 'Frequência', value: `${frequency} dias por semana` },
    { label: 'Local', value: 'Em casa' },
    { label: 'Equipamentos', value: 'Nenhum' },
    { label: 'Jornada inicial', value: '28 dias' },
  ]

  return (
    <div className="animate-fadeSlideIn">
      {/* 1. Resultado está pronto (creme) */}
      <div className="mx-auto w-full max-w-xl px-4 pb-8 pt-8 sm:max-w-3xl sm:pt-14">
        <div id="result-intro" className="mb-6 text-center">
          <h1 className="mb-3 text-balance text-[28px] font-semibold sm:text-[36px]">
            Seu Plano Personalizado de Tai Chi em Casa está pronto.
          </h1>
          <p className="text-[17px] text-ink/70">
            Montamos seu ponto de partida usando as respostas que você acabou de fornecer.
          </p>
          {personalization.startingPointBadge && (
            <p className="mt-2 text-sm font-medium text-forest/80">
              Ponto de partida recomendado: {personalization.startingPointBadge}
            </p>
          )}
        </div>

        {/* 2. Interpretação personalizada — visual + bullets */}
        <PlanStartVisual bullets={personalization.whyItFits} bodyFocus={answers.bodyFocus} />

        {/* 3. Dados resumidos (compactos) */}
        <div className="mb-10 space-y-4">
          <ResultCard title="Seu ponto de partida" rows={summaryRows} />
          <ResultCard title="Por isso, seu plano começa assim..." rows={configRows} />
        </div>

        {/* 5. CTA intermediário */}
        <div className="mb-2 text-center">
          <ScrollToOfferCTA>Ver meu plano completo</ScrollToOfferCTA>
        </div>
      </div>

      {/* 6-7. Jornada + continuidade (branco) */}
      <div className="bg-sage-light/40 py-12">
        <div className="mx-auto w-full max-w-xl px-4 sm:max-w-3xl">
          <div className="mb-10">
            <ProgressionTimeline />
          </div>
          <ContinuityNote />
        </div>
      </div>

      {/* 8. Prévia bloqueada (creme) */}
      <div className="py-12">
        <div className="mx-auto w-full max-w-xl px-4 sm:max-w-3xl">
          <LockedPlanPreview />
        </div>
      </div>

      {/* Prévia visual do produto (verde escuro, contraste forte) */}
      <div className="px-4">
        <div className="mx-auto w-full max-w-3xl">
          <ProductMockupShowcase />
        </div>
      </div>

      {/* 9. O que você recebe (verde muito claro) */}
      <div className="bg-terracotta/[0.07] py-12">
        <div className="mx-auto w-full max-w-xl px-4 sm:max-w-3xl">
          <ProductShowcaseCarousel />
        </div>
      </div>

      {/* 12. Prova social (creme) */}
      <div className="py-12">
        <div className="mx-auto w-full max-w-xl px-4 sm:max-w-3xl">
          <SocialProofSection />
        </div>
      </div>

      {/* 14-17. Oferta */}
      <div className="mx-auto w-full max-w-xl px-4 pb-16 sm:max-w-3xl">
        <div className="mb-8">
          <OfferSection utm={state.utm} chips={personalization.offerChips} />
        </div>

        <GuaranteeSection utm={state.utm} />

        <div className="mb-2 text-center">
          <button
            type="button"
            onClick={onRestart}
            className="focus-ring text-sm font-medium text-ink/50 underline underline-offset-4 hover:text-ink/70"
          >
            Refazer respostas
          </button>
        </div>

        {/* 13. FAQ — última seção antes do rodapé */}
        <FaqSection />

        <footer id="site-footer" className="mx-auto mt-10 max-w-md px-4 pb-28 pt-5 text-center text-xs font-semibold tracking-wide text-ink/40 sm:pb-6">
          Tai Chi em Casa 45+ © 2026. Todos os direitos reservados.
        </footer>
      </div>

      <StickyMobileCTA showAfterId="offer" utm={state.utm} />
    </div>
  )
}
