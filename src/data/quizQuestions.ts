import type { QuestionKey } from './types'

export interface QuizOption {
  value: string
  label: string
  sub?: string
  image?: string // slot name under /images/quiz/
}

export interface QuizQuestion {
  id: string // q1..q9
  key: QuestionKey
  headline: string
  subheadline?: string
  options: QuizOption[]
  layout: 'image-cards' | 'text-cards' | 'body-focus'
  multiSelect?: boolean
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    key: 'ageRange',
    headline: 'Qual é a sua faixa de idade?',
    layout: 'image-cards',
    options: [
      { value: '45_54', label: '45–54 anos', image: 'age-45-54' },
      { value: '55_64', label: '55–64 anos', image: 'age-55-64' },
      { value: '65_74', label: '65–74 anos', image: 'age-65-74' },
      { value: '75_plus', label: '75 anos ou mais', image: 'age-75-plus' },
    ],
  },
  {
    id: 'q2',
    key: 'activityLevel',
    headline: 'Como está sua rotina de movimento hoje?',
    layout: 'image-cards',
    options: [
      {
        value: 'sedentary',
        label: 'Passo boa parte do dia parado(a)',
        image: 'activity-sedentary',
      },
      {
        value: 'low',
        label: 'Me movimento, mas não faço atividade regularmente',
        image: 'activity-low',
      },
      {
        value: 'somewhat_active',
        label: 'Faço alguma atividade 1–2 vezes por semana',
        image: 'activity-somewhat',
      },
      {
        value: 'active',
        label: 'Já me exercito com frequência',
        image: 'activity-active',
      },
    ],
  },
  {
    id: 'q3',
    key: 'taiChiExperience',
    headline: 'Você já praticou Tai Chi alguma vez?',
    layout: 'image-cards',
    options: [
      { value: 'never', label: 'Nunca pratiquei', image: 'experience-never' },
      { value: 'tried', label: 'Já experimentei algumas vezes', image: 'experience-tried' },
      { value: 'past', label: 'Já pratiquei no passado', image: 'experience-past' },
      { value: 'current', label: 'Pratico atualmente', image: 'experience-current' },
    ],
  },
  {
    id: 'q4',
    key: 'mainGoal',
    headline: 'O que você mais gostaria de sentir ao voltar a se movimentar?',
    layout: 'image-cards',
    options: [
      {
        value: 'active_lifestyle',
        label: 'Me sentir mais ativo(a) no dia a dia',
        image: 'goal-movement',
      },
      {
        value: 'vitality',
        label: 'Sentir mais disposição e vitalidade',
        image: 'goal-vitality',
      },
      {
        value: 'mobility_confidence',
        label: 'Ganhar mais confiança e fluidez para me movimentar',
        image: 'goal-mobility',
      },
      {
        value: 'consistency',
        label: 'Criar uma rotina que eu realmente consiga manter',
        image: 'goal-consistency',
      },
      {
        value: 'younger_feeling',
        label: 'Voltar a me sentir mais jovem e ativo(a)',
        image: 'goal-calm',
      },
      {
        value: 'weight_routine',
        label: 'Tornar minha rotina mais ativa e apoiar o controle do peso',
        image: 'goal-weight',
      },
    ],
  },
  {
    id: 'q5',
    key: 'mainBarrier',
    headline: 'O que mais tem impedido você de começar?',
    layout: 'text-cards',
    options: [
      { value: 'dont_know_where', label: 'Não sei por onde começar' },
      { value: 'too_intense', label: 'Exercícios parecem pesados demais' },
      { value: 'time', label: 'Tenho pouco tempo' },
      { value: 'gym', label: 'Não gosto de academia' },
      { value: 'consistency', label: 'Tenho dificuldade em manter uma rotina' },
    ],
  },
  {
    id: 'q6',
    key: 'availableTime',
    headline: 'Quanto tempo você consegue reservar com facilidade para começar?',
    layout: 'text-cards',
    options: [
      { value: '7', label: 'Cerca de 7 minutos' },
      { value: '10_15', label: '10–15 minutos' },
      { value: '15_20', label: '15–20 minutos' },
      { value: '20_plus', label: 'Mais de 20 minutos' },
    ],
  },
  {
    id: 'q7',
    key: 'intensityPreference',
    headline: 'Como você prefere começar?',
    layout: 'text-cards',
    options: [
      { value: 'very_light', label: 'Bem leve', sub: 'Quero começar com calma.' },
      {
        value: 'light_progressive',
        label: 'Leve e progressivo',
        sub: 'Quero sentir que estou me movimentando sem exagerar.',
      },
      {
        value: 'moderate',
        label: 'Moderado',
        sub: 'Já me sinto confortável com alguma atividade.',
      },
      {
        value: 'adaptive',
        label: 'Quero avançar conforme me adaptar',
        sub: 'Prefiro começar simples e aumentar aos poucos.',
      },
    ],
  },
  {
    id: 'q8',
    key: 'weeklyFrequency',
    headline: 'Quantos dias por semana você gostaria de reservar para essa prática?',
    layout: 'text-cards',
    options: [
      { value: '2', label: '2 dias' },
      { value: '3', label: '3 dias' },
      { value: '4', label: '4 dias' },
      { value: '5_plus', label: '5 dias ou mais' },
      { value: 'recommended', label: 'Quero que meu plano recomende' },
    ],
  },
  {
    id: 'q9',
    key: 'bodyFocus',
    headline: 'Em quais regiões você mais gostaria de sentir seu corpo mais solto e ativo?',
    subheadline: 'Você pode selecionar mais de uma região.',
    layout: 'body-focus',
    multiSelect: true,
    options: [
      { value: 'shoulders_arms', label: 'Ombros e braços' },
      { value: 'torso_back', label: 'Costas e tronco' },
      { value: 'hips', label: 'Quadril' },
      { value: 'legs', label: 'Pernas' },
      { value: 'full_body', label: 'Corpo inteiro' },
    ],
  },
]

export const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length
