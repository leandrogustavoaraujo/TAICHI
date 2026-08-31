import type { MainBarrier, MainGoal } from './types'

export const BARRIER_COPY: Record<MainBarrier, string> = {
  dont_know_where:
    'Como você indicou que não sabe por onde começar, sua progressão prioriza uma sequência simples e organizada desde o primeiro dia.',
  too_intense:
    'Como treinos pesados não combinam com o que você procura agora, sua rotina começa com uma intensidade mais leve e evolui gradualmente.',
  time: 'Como você indicou que tem pouco tempo, sua rotina foi configurada para começar com sessões curtas e fáceis de encaixar.',
  gym: 'Como academia não faz parte da rotina que você procura, seu plano foi pensado para ser praticado em casa e sem equipamentos.',
  consistency:
    'Como manter constância é hoje sua principal barreira, sua progressão começa simples antes de aumentar o ritmo.',
}

export const BARRIER_LABEL: Record<MainBarrier, string> = {
  dont_know_where: 'Não saber por onde começar',
  too_intense: 'Exercícios pesados demais',
  time: 'Falta de tempo',
  gym: 'Não gostar de academia',
  consistency: 'Dificuldade em manter rotina',
}

export const GOAL_COPY: Record<MainGoal, string> = {
  active_lifestyle:
    'Seu plano dá prioridade a colocar movimento novamente na sua rotina de forma simples e sustentável.',
  vitality:
    'Sua progressão foi organizada para ajudar você a construir uma rotina mais ativa e compatível com o seu dia a dia.',
  mobility_confidence:
    'Sua progressão prioriza familiaridade e confiança para acompanhar os movimentos no seu próprio ritmo.',
  consistency:
    'A prioridade será transformar os primeiros minutos de prática em uma rotina que seja fácil de repetir.',
  younger_feeling:
    'Seu objetivo é voltar a sentir mais energia e confiança para se movimentar no dia a dia — por isso seu plano começa com uma progressão compatível com seu ponto de partida.',
  weight_routine:
    'Você também indicou que deseja tornar sua rotina mais ativa como parte do cuidado com o peso. Seu plano ajuda você a começar uma prática regular de movimento de forma simples.',
}

export const GOAL_LABEL: Record<MainGoal, string> = {
  active_lifestyle: 'Mais movimento no dia a dia',
  vitality: 'Mais disposição e vitalidade',
  mobility_confidence: 'Mais confiança e fluidez',
  consistency: 'Uma rotina que eu consiga manter',
  younger_feeling: 'Voltar a se sentir mais jovem e ativo(a)',
  weight_routine: 'Rotina mais ativa, com apoio ao controle do peso',
}
