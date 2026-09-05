export interface GuaranteeConfig {
  days: number
  headline: string
  description: string
  highlight: string
  rulesUrl?: string
}

/**
 * Set 2026-08 by Leandro: real 7-day guarantee, part of the commercial
 * policy for Tai Chi em Casa 45+. If the checkout provider or the policy
 * ever changes, update/null this and the guarantee section adjusts (or
 * disappears) automatically — nothing else in the code needs to change.
 */
export const GUARANTEE_CONFIG: GuaranteeConfig | null = {
  days: 7,
  headline: 'Experimente por 7 dias com tranquilidade',
  description:
    'Você terá 7 dias para conhecer o Tai Chi em Casa 45+. Se dentro desse período decidir que o programa não é para você, poderá solicitar o reembolso conforme as regras da garantia.',
  highlight: 'Você tem 7 dias para decidir.',
}

/**
 * Keep the generic lifetime-access badge hidden: access is communicated
 * according to the period of the plan selected in the offer cards.
 */
export const LIFETIME_ACCESS_CONFIRMED = false

export interface Testimonial {
  name: string
  location: string // e.g. "GO", "São Paulo, SP"
  text: string
  rating: number // 1-5
  avatar: string // slot name under public/images/quiz/, e.g. "testimonial-1"
}

/**
 * Never fabricate testimonials, names, photos, or star ratings. This stays
 * empty until Leandro provides real, verifiable reviews — the social proof
 * section renders nothing while it's empty. Once he sends the real
 * name/location/text/rating for each, add them here (and drop the matching
 * avatar photo in public/images/quiz/<avatar-slot>.webp).
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Roberto A.',
    location: 'SP',
    rating: 5,
    avatar: 'testimonial-roberto',
    text: 'No começo, eu tava meio cético, achei que não ia dar conta. Mas o programa é super didático e os exercícios são fáceis de encaixar na rotina. Na segunda semana, eu já senti uma baita diferença nas dores que eu sentia nas costas. Tô me sentindo muito mais ágil e com mais energia. Super recomendo!',
  },
  {
    name: 'Marcela Rodrigues',
    location: 'MG',
    rating: 5,
    avatar: 'testimonial-marcela',
    text: 'Estava procurando algo para me ajudar a melhorar a flexibilidade e o equilíbrio, e encontrei esse programa. Estou no final da terceira semana e os resultados são incríveis! As aulas são super prazerosas e a evolução é perceptível dia após dia. Sem falar no bem-estar mental que o Tai Chi proporciona. É transformador!',
  },
  {
    name: 'Maria Augusta',
    location: 'SP',
    rating: 5,
    avatar: 'testimonial-maria-augusta',
    text: 'O que eu mais gostei desse programa é que ele me ajudou a criar um hábito saudável. No início, eu ficava meio perdida, mas a estrutura de 28 dias é perfeita para ir progredindo aos poucos. Hoje, eu já consigo fazer os exercícios sem dificuldade e me sinto muito mais calma e focada. É um investimento em mim mesma!',
  },
]
