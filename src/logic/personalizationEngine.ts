import type { QuizAnswers } from '../data/types'
import { AVAILABLE_TIME_LABEL, INTENSITY_LABEL } from '../data/answerLabels'
import {
  ACTIVITY_STARTING_POINT_PHRASE,
  ACTIVITY_STARTING_POINT_TITLE,
  BARRIER_WHY,
  EXPERIENCE_SUMMARY,
  GOAL_FOCUS_PHRASE,
  GOAL_WHY,
  bodyFocusWhyBullet,
  type WhyBullet,
} from '../data/personalizationMatrix'
import { BARRIER_COPY } from '../data/personalizationCopy'
import { resolveWeeklyFrequency } from './frequencyRecommendation'

export interface PersonalizationResult {
  startingPointBadge: string | null
  summarySentences: string[]
  whyItFits: WhyBullet[]
  offerChips: string[]
}

const EXPERIENCE_WHY: Record<string, WhyBullet> = {
  never: {
    title: 'Você começa com uma base clara',
    description: 'Nenhuma experiência anterior é necessária — sua progressão parte do básico.',
  },
  tried: {
    title: 'Você já teve um primeiro contato',
    description:
      'Sua jornada organiza uma sequência para transformar essa experiência ocasional em prática.',
  },
  past: {
    title: 'Retomar sem começar do zero',
    description: 'Sua experiência anterior já é considerada na progressão.',
  },
  current: {
    title: 'Você já tem familiaridade com a prática',
    description: 'O foco agora é estrutura e continuidade.',
  },
}

const INTENSITY_WHY: Record<string, WhyBullet> = {
  very_light: {
    title: 'Você prefere começar bem leve',
    description: 'Sua progressão respeita esse ritmo desde o primeiro dia.',
  },
  light_progressive: {
    title: 'Seguir em ritmo leve e progressivo',
    description: 'Você começa sem pressa e avança conforme ganha familiaridade.',
  },
  moderate: {
    title: 'Você já se sente confortável com atividade',
    description: 'Seu plano parte de um ritmo moderado, sem exageros.',
  },
  adaptive: {
    title: 'Você quer avançar conforme se adapta',
    description: 'Sua progressão aumenta gradualmente, no seu tempo.',
  },
}

/**
 * Builds every dynamic piece of copy on the result/offer screen from the
 * quiz answers. Never fabricates a sentence from a question the person
 * didn't answer — each clause only appears once its source answer exists.
 */
export function buildPersonalization(answers: QuizAnswers): PersonalizationResult {
  const {
    activityLevel,
    taiChiExperience,
    mainBarrier,
    mainGoal,
    availableTime,
    intensityPreference,
    weeklyFrequency,
    bodyFocus,
  } = answers

  const startingPointBadge = activityLevel ? ACTIVITY_STARTING_POINT_TITLE[activityLevel] : null

  const frequency = resolveWeeklyFrequency(weeklyFrequency, activityLevel, taiChiExperience)
  const durationLabel = availableTime ? AVAILABLE_TIME_LABEL[availableTime] : null
  const paceLabel = intensityPreference ? INTENSITY_LABEL[intensityPreference] : null
  const goalFocus = mainGoal ? GOAL_FOCUS_PHRASE[mainGoal] : null

  const summarySentences: string[] = []
  if (activityLevel) {
    summarySentences.push(
      `Pelas suas respostas, o melhor ponto de partida para você é ${ACTIVITY_STARTING_POINT_PHRASE[activityLevel]}.`,
    )
  }
  if (taiChiExperience) {
    summarySentences.push(EXPERIENCE_SUMMARY[taiChiExperience])
  }
  if (mainBarrier) {
    summarySentences.push(BARRIER_COPY[mainBarrier])
  }
  if (durationLabel && goalFocus) {
    summarySentences.push(
      `Seu plano começa com sessões de ${durationLabel}, ${frequency}x por semana, priorizando ${goalFocus}.`,
    )
  }

  // Candidates in priority order — a fixed slate of relevant, dynamic
  // arguments, capped to the 5 most relevant per person (never invents an
  // argument from a question that wasn't answered).
  const candidates: (WhyBullet | null)[] = [
    taiChiExperience ? EXPERIENCE_WHY[taiChiExperience] : null,
    mainBarrier ? BARRIER_WHY[mainBarrier] : null,
    bodyFocus && bodyFocus.length > 0 ? bodyFocusWhyBullet(bodyFocus) : null,
    availableTime
      ? {
          title: `Você dispõe de ${AVAILABLE_TIME_LABEL[availableTime].toLowerCase()}`,
          description: 'As práticas iniciais respeitam essa disponibilidade.',
        }
      : null,
    intensityPreference ? INTENSITY_WHY[intensityPreference] : null,
    mainGoal ? GOAL_WHY[mainGoal] : null,
  ]
  const whyItFits = candidates.filter((b): b is WhyBullet => b !== null).slice(0, 5)

  const offerChips: string[] = []
  if (durationLabel) offerChips.push(`Início com ${durationLabel}`)
  if (paceLabel) offerChips.push(`Ritmo ${paceLabel.toLowerCase()}`)
  offerChips.push(`${frequency}x por semana`)
  offerChips.push('Prática em casa')
  if (goalFocus) offerChips.push(`Foco em ${goalFocus}`)

  return { startingPointBadge, summarySentences, whyItFits, offerChips }
}
