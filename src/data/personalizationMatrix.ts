import type { ActivityLevel, BodyFocusArea, MainBarrier, MainGoal, TaiChiExperience } from './types'

export interface WhyBullet {
  title: string
  description: string
}

/**
 * Internal starting-point naming derived from activity level (spec: "não
 * transformar isso em arquétipos exagerados" — used only as a soft label,
 * never a prominent headline).
 */
export const ACTIVITY_STARTING_POINT_TITLE: Record<ActivityLevel, string> = {
  sedentary: 'Recomeço gradual',
  low: 'Retomada progressiva',
  somewhat_active: 'Construção de consistência',
  active: 'Prática estruturada',
}

// Lowercase, article-included form for use mid-sentence.
export const ACTIVITY_STARTING_POINT_PHRASE: Record<ActivityLevel, string> = {
  sedentary: 'um recomeço gradual',
  low: 'uma retomada progressiva',
  somewhat_active: 'uma construção de consistência',
  active: 'uma prática estruturada',
}

export const EXPERIENCE_SUMMARY: Record<TaiChiExperience, string> = {
  never: 'Seu plano começa pelo básico — nenhuma experiência anterior é necessária.',
  tried:
    'Você já teve um primeiro contato com o Tai Chi. Agora seu plano organiza uma sequência para transformar essa experiência ocasional em prática.',
  past: 'Você não parte do zero como quem nunca praticou: sua jornada considera a experiência anterior e organiza uma retomada progressiva.',
  current:
    'Seu ponto de partida já considera a familiaridade que você tem com a prática — o foco agora é estrutura e continuidade.',
}

export const GOAL_FOCUS_PHRASE: Record<MainGoal, string> = {
  active_lifestyle: 'colocar movimento de volta na sua rotina',
  vitality: 'trazer mais disposição para o seu dia a dia',
  mobility_confidence: 'ganhar confiança e fluidez nos movimentos',
  consistency: 'criar uma rotina que seja fácil de manter',
  younger_feeling: 'trazer mais energia e leveza para o seu dia a dia',
  weight_routine: 'construir uma rotina mais ativa como parte do cuidado com o peso',
}

export const BARRIER_WHY: Record<MainBarrier, WhyBullet> = {
  dont_know_where: {
    title: 'Você não sabia por onde começar',
    description:
      'Sua jornada já chega com uma sequência organizada, pensada para o seu ponto de partida.',
  },
  too_intense: {
    title: 'Você prefere evitar exercícios intensos',
    description: 'Sua progressão começa leve e evolui aos poucos, sem exagero.',
  },
  time: {
    title: 'Pouco tempo tem sido sua barreira',
    description: 'As sessões iniciais são curtas e cabem mais facilmente na sua rotina.',
  },
  gym: {
    title: 'Você procura algo fora da academia',
    description: 'Sua rotina acontece em casa e não exige equipamentos.',
  },
  consistency: {
    title: 'Manter constância tem sido seu maior desafio',
    description: 'Seu plano começa pequeno para construir consistência antes de aumentar o ritmo.',
  },
}

export const GOAL_WHY: Record<MainGoal, WhyBullet> = {
  active_lifestyle: {
    title: 'Seu objetivo é voltar a se movimentar',
    description: 'Seu plano prioriza colocar movimento na rotina de forma simples e sustentável.',
  },
  vitality: {
    title: 'Você busca mais disposição e vitalidade',
    description: 'Sua rotina foi pensada para ajudar a trazer mais energia para o seu dia a dia.',
  },
  mobility_confidence: {
    title: 'Seu objetivo é ganhar confiança e fluidez',
    description: 'Sua progressão prioriza familiaridade antes de aumentar a dificuldade.',
  },
  consistency: {
    title: 'Você quer criar uma rotina que realmente se mantenha',
    description: 'A prioridade é transformar poucos minutos de prática em um hábito sustentável.',
  },
  younger_feeling: {
    title: 'Você quer se sentir com mais energia no dia a dia',
    description:
      'Seu plano começa com uma progressão compatível com seu ponto de partida, sem prometer resultados instantâneos.',
  },
  weight_routine: {
    title: 'Você quer apoiar o controle do peso com mais rotina',
    description:
      'Seu plano ajuda a construir uma prática regular de movimento, de forma simples e sustentável.',
  },
}

export const BODY_FOCUS_LABEL: Record<BodyFocusArea, string> = {
  shoulders_arms: 'Ombros e braços',
  torso_back: 'Costas e tronco',
  hips: 'Quadril',
  legs: 'Pernas',
  full_body: 'Corpo inteiro',
}

export function bodyFocusWhyBullet(areas: BodyFocusArea[]): WhyBullet | null {
  if (areas.length === 0) return null
  if (areas.includes('full_body')) {
    return {
      title: 'Foco em corpo inteiro',
      description:
        'Sua jornada considera movimentos amplos e progressivos, envolvendo diferentes regiões do corpo.',
    }
  }
  const labels = areas.map((a) => BODY_FOCUS_LABEL[a].toLowerCase())
  const joined =
    labels.length === 1
      ? labels[0]
      : `${labels.slice(0, -1).join(', ')} e ${labels[labels.length - 1]}`
  return {
    title: `Mais atenção para ${joined}`,
    description:
      'Seu plano pode priorizar sequências que envolvem essas regiões dentro da prática geral de Tai Chi.',
  }
}
