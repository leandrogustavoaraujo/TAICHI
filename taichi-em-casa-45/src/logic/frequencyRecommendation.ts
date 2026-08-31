import type { ActivityLevel, TaiChiExperience, WeeklyFrequency } from '../data/types'

/**
 * Recommended weekly frequency when the user selects "Quero que meu plano recomende".
 * Fully configurable here (spec section 38).
 */
const RECOMMENDATION_TABLE: Record<ActivityLevel, number> = {
  sedentary: 3,
  low: 3,
  somewhat_active: 4,
  active: 4,
}

export function recommendedFrequency(
  activityLevel: ActivityLevel | undefined,
  experience: TaiChiExperience | undefined,
): number {
  if (experience === 'current') return 5
  if (!activityLevel) return 3
  return RECOMMENDATION_TABLE[activityLevel] ?? 3
}

export function resolveWeeklyFrequency(
  weeklyFrequency: WeeklyFrequency | undefined,
  activityLevel: ActivityLevel | undefined,
  experience: TaiChiExperience | undefined,
): number {
  if (!weeklyFrequency || weeklyFrequency === 'recommended') {
    return recommendedFrequency(activityLevel, experience)
  }
  if (weeklyFrequency === '5_plus') return 5
  return Number(weeklyFrequency)
}
