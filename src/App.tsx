import { useEffect } from 'react'
import IntroAgeScreen from './components/IntroAgeScreen'
import QuizHeader from './components/QuizHeader'
import QuestionScreen from './components/QuestionScreen'
import BodyFocusScreen from './components/BodyFocusScreen'
import ReinforcementScreen from './components/ReinforcementScreen'
import ProcessingScreen from './components/ProcessingScreen'
import PersonalizedResult from './components/PersonalizedResult'
import UrgencyTopBar from './components/UrgencyTopBar'
import HealthProfileScreen from './components/HealthProfileScreen'
import { QUIZ_QUESTIONS } from './data/quizQuestions'
import { useQuizFlow } from './hooks/useQuizFlow'
import { track } from './utils/analytics'

export default function App() {
  const {
    state,
    currentStep,
    questionNumber,
    totalQuestions,
    start,
    answerQuestion,
    answerMultiSelect,
    saveHealthProfile,
    goBack,
    advanceFromReinforcement,
    finishProcessing,
    restart,
  } = useQuizFlow()

  useEffect(() => {
    if (currentStep === 'reinforcement1' || currentStep === 'reinforcement2') {
      track('reinforcement_viewed', { step: currentStep })
    }
  }, [currentStep])

  useEffect(() => {
    // Fires once, the moment the funnel is first shown.
    if (!state.startedAt) start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isQuestionStep = currentStep !== 'intro' && /^q\d+$/.test(currentStep)
  const currentQuestion = isQuestionStep
    ? QUIZ_QUESTIONS.find((q) => q.id === currentStep)
    : undefined
  const isBodyFocusStep = currentQuestion?.layout === 'body-focus'

  const showBack = Boolean(questionNumber && questionNumber > 1)

  const handleAnswer = (value: string) => {
    if (!currentQuestion) return
    answerQuestion(currentQuestion.key, value)
  }

  const handleBodyFocusSubmit = (values: string[]) => {
    if (!currentQuestion) return
    answerMultiSelect(currentQuestion.key, values)
    track('quiz_completed')
  }

  return (
    <div className="min-h-dvh bg-cream text-ink">
      {currentStep !== 'intro' && currentStep !== 'processing' && currentStep !== 'result' && (
        <QuizHeader
          questionNumber={questionNumber}
          totalQuestions={totalQuestions}
          onBack={goBack}
          showBack={showBack}
        />
      )}

      {currentStep === 'result' && <UrgencyTopBar />}

      <main>
        {currentStep === 'intro' && (
          <IntroAgeScreen
            currentValue={state.answers.ageRange}
            onSelectAge={(value) => answerQuestion('ageRange', value)}
          />
        )}

        {currentQuestion && isBodyFocusStep && (
          <BodyFocusScreen
            question={currentQuestion}
            currentValue={state.answers.bodyFocus}
            onSubmit={handleBodyFocusSubmit}
          />
        )}

        {currentStep === 'healthProfile' && (
          <HealthProfileScreen
            currentValue={state.answers}
            onSubmit={saveHealthProfile}
          />
        )}

        {currentQuestion && !isBodyFocusStep && (
          <QuestionScreen
            key={currentQuestion.id}
            question={currentQuestion}
            currentValue={state.answers[currentQuestion.key] as string | undefined}
            onAnswer={handleAnswer}
          />
        )}

        {currentStep === 'reinforcement1' && (
          <ReinforcementScreen
            headline="Você não precisa começar pesado para voltar a se movimentar."
            body="Seu plano será organizado a partir de como você está hoje — começando de forma simples e evoluindo no seu próprio ritmo."
            highlight={{ big: 'Comece com apenas 7 minutos.', small: 'Sem academia. Sem equipamentos. Em casa.' }}
            imageSlot="reinforcement-start"
            onContinue={advanceFromReinforcement}
          />
        )}

        {currentStep === 'reinforcement2' && (
          <ReinforcementScreen
            headline="O segredo é começar pequeno e evoluir no seu ritmo."
            body="Você não precisa mudar toda a sua rotina de uma vez. Seu Tai Chi em Casa começa com uma barreira baixa — e sua Jornada Inicial de 28 dias evolui conforme o ponto de partida que você indicou."
            highlight={{ big: '7 minutos → 28 dias', small: 'para começar · sua jornada inicial' }}
            imageSlot="reinforcement-progress"
            onContinue={advanceFromReinforcement}
          />
        )}

        {currentStep === 'processing' && <ProcessingScreen onDone={finishProcessing} />}

        {currentStep === 'result' && (
          <PersonalizedResult state={state} onRestart={restart} />
        )}
      </main>
    </div>
  )
}
