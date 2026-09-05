export type AgeRange = 'under_45' | '45_54' | '55_64' | '65_plus'
export type ActivityLevel = 'sedentary' | 'low' | 'somewhat_active' | 'active'
export type TaiChiExperience = 'never' | 'tried' | 'past' | 'current'
export type MainGoal =
  | 'active_lifestyle'
  | 'vitality'
  | 'mobility_confidence'
  | 'consistency'
  | 'younger_feeling'
  | 'weight_routine'
export type MainBarrier =
  | 'dont_know_where'
  | 'too_intense'
  | 'time'
  | 'gym'
  | 'consistency'
export type AvailableTime = '7' | '10_15' | '15_20' | '20_plus'
export type IntensityPreference =
  | 'very_light'
  | 'light_progressive'
  | 'moderate'
  | 'adaptive'
export type WeeklyFrequency = '2' | '3' | '4' | '5_plus' | 'recommended'
export type BodyFocusArea = 'shoulders_arms' | 'torso_back' | 'hips' | 'legs' | 'full_body'
export type CurrentBodyType = 'slim' | 'skinny_fat' | 'overweight'
export type DesiredBodyType = 'slim' | 'toned' | 'defined'
export type HealthConsideration = 'weight' | 'pain' | 'fatigue' | 'mind' | 'sleep' | 'health'
export type ReferenceBodyRegion = 'breasts' | 'arms' | 'belly' | 'neck' | 'glutes' | 'thighs' | 'whole_body'

export interface QuizAnswers {
  ageRange?: AgeRange
  activityLevel?: ActivityLevel
  taiChiExperience?: TaiChiExperience
  mainGoal?: MainGoal
  mainBarrier?: MainBarrier
  availableTime?: AvailableTime
  intensityPreference?: IntensityPreference
  weeklyFrequency?: WeeklyFrequency
  bodyFocus?: BodyFocusArea[]
  currentBodyType?: CurrentBodyType
  desiredBodyType?: DesiredBodyType
  heightCm?: number
  currentWeightKg?: number
  targetWeightKg?: number
  healthConsiderations?: HealthConsideration[]
  referenceBodyRegions?: ReferenceBodyRegion[]
}

export type QuestionKey = keyof QuizAnswers

export type ProfileId =
  | 'recomeco_essencial'
  | 'recomeco_progressivo'
  | 'movimento_evolucao'
  | 'retomada'
  | 'pratica_estruturada'

export interface UtmParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
}

export interface QuizState {
  answers: QuizAnswers
  currentQuestion: number // 1-8, index into QUESTION_ORDER
  currentStep: string // step id, e.g. 'intro' | 'q1' | 'reinforcement1' | 'processing' | 'result'
  quizCompleted: boolean
  resultGenerated: boolean
  profile: ProfileId | null
  utm: UtmParams
  startedAt: string | null
}
