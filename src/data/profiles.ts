import type { ProfileId } from './types'

export interface ProfileDefinition {
  id: ProfileId
  label: string // internal only, not shown prominently
  startingPoint: string // shown softly on result screen
  pace: string
  startingDurationMinutes: number
}

export const PROFILES: Record<ProfileId, ProfileDefinition> = {
  recomeco_essencial: {
    id: 'recomeco_essencial',
    label: 'Recomeço Essencial',
    startingPoint: 'início bem leve e gradual',
    pace: 'Bem leve',
    startingDurationMinutes: 7,
  },
  recomeco_progressivo: {
    id: 'recomeco_progressivo',
    label: 'Recomeço Progressivo',
    startingPoint: 'início leve e progressivo',
    pace: 'Leve e progressivo',
    startingDurationMinutes: 10,
  },
  movimento_evolucao: {
    id: 'movimento_evolucao',
    label: 'Movimento em Evolução',
    startingPoint: 'ritmo moderado desde o início',
    pace: 'Moderado',
    startingDurationMinutes: 15,
  },
  retomada: {
    id: 'retomada',
    label: 'Retomada',
    startingPoint: 'retomada guiada a partir da sua experiência anterior',
    pace: 'Leve a moderado',
    startingDurationMinutes: 10,
  },
  pratica_estruturada: {
    id: 'pratica_estruturada',
    label: 'Prática Estruturada',
    startingPoint: 'continuidade estruturada da sua prática atual',
    pace: 'Moderado a avançado',
    startingDurationMinutes: 15,
  },
}
