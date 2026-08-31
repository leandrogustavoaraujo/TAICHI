export interface ProgressionWeek {
  week: number
  title: string
  description: string
}

export const PROGRESSION_WEEKS: ProgressionWeek[] = [
  {
    week: 1,
    title: 'Você entra em movimento',
    description:
      'Seu corpo começa a se acostumar novamente com uma rotina de movimento, um dia de cada vez.',
  },
  {
    week: 2,
    title: 'Você começa a sentir a diferença',
    description:
      'Com a prática ficando mais familiar, você pode começar a perceber mais leveza, controle e confiança nos movimentos.',
  },
  {
    week: 3,
    title: 'Sua evolução fica mais perceptível',
    description:
      'A rotina começa a ganhar vida própria e a forma como você se movimenta pode começar a refletir a constância construída nas primeiras semanas.',
  },
  {
    week: 4,
    title: 'Sua primeira progressão está completa',
    description:
      'Você conclui sua jornada inicial com uma base mais estruturada para continuar praticando no seu próprio ritmo.',
  },
]

export interface PreviewCard {
  label: string
  title: string
}

export const PREVIEW_CARDS: PreviewCard[] = [
  { label: 'Dia 1', title: 'Seu primeiro movimento' },
  { label: 'Dia 2', title: 'Criando familiaridade' },
  { label: 'Dia 3', title: 'Entrando no ritmo' },
  { label: 'Semana 2', title: 'Ganhe ritmo' },
  { label: 'Semana 3', title: 'Evolua sua sequência' },
  { label: 'Semana 4', title: 'Consolide sua rotina' },
]
