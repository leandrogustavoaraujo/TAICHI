export interface ShowcaseItem {
  image: string
  title: string
  description: string
}

/**
 * Cards for the "o que você recebe" carousel on the result/offer screen.
 * Images are real screenshots Leandro will generate/capture of the actual
 * web app and course — see /images/quiz/ slot naming in the README.
 */
export const PRODUCT_SHOWCASE: ShowcaseItem[] = [
  {
    image: 'showcase-webapp',
    title: 'Seu Plano Personalizado',
    description: 'Sequência organizada considerando as respostas que você acabou de fornecer.',
  },
  {
    image: 'showcase-lessons',
    title: 'Aulas Guiadas',
    description: 'Movimentos apresentados passo a passo, no seu ritmo e em casa.',
  },
  {
    image: 'showcase-progress',
    title: 'Jornada Inicial de 28 Dias',
    description: 'Uma primeira progressão já organizada para você começar.',
  },
  {
    image: 'showcase-course',
    title: 'Orientação de Ritmo e Frequência',
    description: 'Saiba exatamente quanto praticar e quando começar.',
  },
  {
    image: 'showcase-access',
    title: 'Acesso às Práticas',
    description: 'Continue usando seu material mesmo depois da jornada inicial.',
  },
  {
    image: 'showcase-progression',
    title: 'Progressão Organizada',
    description: 'Evolua gradualmente conforme ganha familiaridade com a prática.',
  },
]
