import type {
  ActivityLevel,
  AvailableTime,
  IntensityPreference,
  TaiChiExperience,
} from './types'

export const ACTIVITY_LABEL: Record<ActivityLevel, string> = {
  sedentary: 'Rotina com pouca atividade física',
  low: 'Rotina com atividade ocasional',
  somewhat_active: 'Atividade física moderada',
  active: 'Rotina fisicamente ativa',
}

export const EXPERIENCE_LABEL: Record<TaiChiExperience, string> = {
  never: 'Iniciante',
  tried: 'Já experimentou',
  past: 'Já praticou antes',
  current: 'Pratica atualmente',
}

export const AVAILABLE_TIME_LABEL: Record<AvailableTime, string> = {
  '7': '7 minutos',
  '10_15': '10 a 15 minutos',
  '15_20': '15 a 20 minutos',
  '20_plus': 'Mais de 20 minutos',
}

export const INTENSITY_LABEL: Record<IntensityPreference, string> = {
  very_light: 'Bem leve',
  light_progressive: 'Leve e progressivo',
  moderate: 'Moderado',
  adaptive: 'Progressivo, conforme adaptação',
}
