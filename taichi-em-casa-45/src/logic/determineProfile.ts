import type { ProfileId, QuizAnswers } from '../data/types'

/**
 * Priority order (per spec, section 31):
 * 1. experiência anterior/atual
 * 2. nível atual de atividade
 * 3. intensidade
 * 4. duração disponível
 *
 * Age is intentionally NOT used to determine profile.
 */
export function determineProfile(answers: QuizAnswers): ProfileId {
  const { taiChiExperience, activityLevel, intensityPreference } = answers

  // 1. Experience takes top priority.
  if (taiChiExperience === 'current') {
    return 'pratica_estruturada'
  }
  if (taiChiExperience === 'past') {
    return 'retomada'
  }

  // 2. Activity level (only reached for never/tried experience).
  if (activityLevel === 'somewhat_active' || activityLevel === 'active') {
    return 'movimento_evolucao'
  }

  if (activityLevel === 'low') {
    return 'recomeco_progressivo'
  }

  if (activityLevel === 'sedentary') {
    // 3. Refine sedentary users by intensity preference.
    if (intensityPreference === 'moderate' || intensityPreference === 'adaptive') {
      return 'recomeco_progressivo'
    }
    return 'recomeco_essencial'
  }

  // Fallback (shouldn't be reached once all questions are answered).
  return 'recomeco_essencial'
}
