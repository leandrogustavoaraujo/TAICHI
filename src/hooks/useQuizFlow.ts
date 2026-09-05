import { useCallback, useEffect, useMemo, useState } from 'react'
import { QUIZ_QUESTIONS } from '../data/quizQuestions'
import type { QuestionKey, QuizAnswers, QuizState } from '../data/types'
import { determineProfile } from '../logic/determineProfile'
import { INITIAL_STATE, clearState, loadState, saveState } from '../utils/storage'
import { track } from '../utils/analytics'
import { captureUtmFromUrl } from '../utils/utm'

// Ordered list of every screen in the funnel. 'intro' now doubles as
// question 1 (age range) — the entry screen shows the age cards directly,
// mirroring the reference funnel. Reinforcement/processing/result screens
// do not count toward the 1-8 question progress indicator.
export const STEP_ORDER = [
  'intro',
  'healthProfile',
  'q2',
  'reinforcement1',
  'q3',
  'q4',
  'q5',
  'reinforcement2',
  'q6',
  'q7',
  'q8',
  'q9',
  'processing',
  'result',
] as const

export type StepId = (typeof STEP_ORDER)[number]

function questionNumberForStep(step: string): number | null {
  if (step === 'intro') return 1
  if (step === 'healthProfile') return 2
  const match = /^q(\d)$/.exec(step)
  return match ? Number(match[1]) + 1 : null
}

export function useQuizFlow() {
  const [state, setState] = useState<QuizState>(() => loadState())
  const [hasHydrated, setHasHydrated] = useState(false)

  // Capture UTMs once on first load and persist them for the whole session.
  useEffect(() => {
    setState((prev) => {
      if (Object.keys(prev.utm).length > 0) return prev
      const captured = captureUtmFromUrl()
      if (Object.keys(captured).length === 0) return prev
      return { ...prev, utm: captured }
    })
    setHasHydrated(true)
  }, [])

  useEffect(() => {
    if (!hasHydrated) return
    saveState(state)
  }, [state, hasHydrated])

  const currentStep = state.currentStep as StepId
  const currentStepIndex = STEP_ORDER.indexOf(currentStep)
  const questionNumber = questionNumberForStep(currentStep)

  const goToStep = useCallback((step: StepId) => {
    setState((prev) => ({ ...prev, currentStep: step }))
  }, [])

  const start = useCallback(() => {
    track('quiz_started')
  }, [])

  const answerQuestion = useCallback(
    (key: QuestionKey, value: string) => {
      setState((prev) => {
        const nextAnswers: QuizAnswers = { ...prev.answers, [key]: value as never }
        const nextIndex = currentStepIndex + 1
        const nextStep = STEP_ORDER[nextIndex] ?? 'result'
        return {
          ...prev,
          answers: nextAnswers,
          currentStep: nextStep,
          startedAt: prev.startedAt ?? new Date().toISOString(),
        }
      })
      track('question_answered', { key, value })
    },
    [currentStepIndex],
  )

  const goBack = useCallback(() => {
    setState((prev) => {
      const idx = STEP_ORDER.indexOf(prev.currentStep as StepId)
      if (idx <= 0) return prev // can't go back before the entry/age screen
      const prevStep = STEP_ORDER[idx - 1]
      return { ...prev, currentStep: prevStep }
    })
  }, [])

  const answerMultiSelect = useCallback(
    (key: QuestionKey, values: string[]) => {
      setState((prev) => {
        const nextAnswers: QuizAnswers = { ...prev.answers, [key]: values as never }
        const nextIndex = currentStepIndex + 1
        const nextStep = STEP_ORDER[nextIndex] ?? 'result'
        return {
          ...prev,
          answers: nextAnswers,
          currentStep: nextStep,
          startedAt: prev.startedAt ?? new Date().toISOString(),
        }
      })
      track('question_answered', { key, values })
    },
    [currentStepIndex],
  )

  const saveHealthProfile = useCallback(
    (values: Pick<QuizAnswers, 'currentBodyType' | 'desiredBodyType' | 'heightCm' | 'currentWeightKg' | 'targetWeightKg' | 'healthConsiderations' | 'referenceBodyRegions'>) => {
      setState((prev) => {
        const nextIndex = currentStepIndex + 1
        const nextStep = STEP_ORDER[nextIndex] ?? 'result'
        return {
          ...prev,
          answers: { ...prev.answers, ...values },
          currentStep: nextStep,
          startedAt: prev.startedAt ?? new Date().toISOString(),
        }
      })
      track('question_answered', { key: 'healthProfile' })
    },
    [currentStepIndex],
  )

  const advanceFromReinforcement = useCallback(() => {
    setState((prev) => {
      const idx = STEP_ORDER.indexOf(prev.currentStep as StepId)
      const nextStep = STEP_ORDER[idx + 1] ?? 'result'
      return { ...prev, currentStep: nextStep }
    })
  }, [])

  const finishProcessing = useCallback(() => {
    setState((prev) => {
      const profile = determineProfile(prev.answers)
      return {
        ...prev,
        currentStep: 'result',
        quizCompleted: true,
        resultGenerated: true,
        profile,
      }
    })
    track('result_viewed')
  }, [])

  const restart = useCallback(() => {
    clearState()
    setState({ ...INITIAL_STATE, utm: state.utm })
  }, [state.utm])

  const answeredCount = useMemo(
    () => Object.values(state.answers).filter(Boolean).length,
    [state.answers],
  )

  return {
    state,
    currentStep,
    questionNumber,
    totalQuestions: QUIZ_QUESTIONS.length + 1,
    answeredCount,
    start,
    answerQuestion,
    answerMultiSelect,
    saveHealthProfile,
    goBack,
    advanceFromReinforcement,
    finishProcessing,
    restart,
    goToStep,
  }
}
