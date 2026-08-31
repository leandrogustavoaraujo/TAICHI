import type { QuizState } from '../data/types'

const STORAGE_KEY = 'taichi45_quiz_state_v1'

export const INITIAL_STATE: QuizState = {
  answers: {},
  currentQuestion: 1,
  currentStep: 'intro',
  quizCompleted: false,
  resultGenerated: false,
  profile: null,
  utm: {},
  startedAt: null,
}

export function loadState(): QuizState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...INITIAL_STATE }
    const parsed = JSON.parse(raw) as QuizState
    return { ...INITIAL_STATE, ...parsed }
  } catch {
    return { ...INITIAL_STATE }
  }
}

export function saveState(state: QuizState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage unavailable (private mode, etc.) — fail silently.
  }
}

export function clearState(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
