interface FaqItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Preciso já conhecer Tai Chi?',
    answer: 'Não. Seu ponto de partida considera sua experiência, mesmo que seja zero.',
  },
  {
    question: 'Preciso de equipamentos?',
    answer: 'Não. Todo o plano foi pensado para ser praticado sem nenhum equipamento.',
  },
  {
    question: 'Posso praticar em casa?',
    answer: 'Sim. Não é necessário ir à academia — a prática acontece no seu espaço.',
  },
  {
    question: 'Todas as práticas têm 7 minutos?',
    answer:
      'O plano pode começar com sessões curtas; a duração varia conforme o seu perfil e a progressão ao longo da jornada.',
  },
  {
    question: 'O que acontece depois dos 28 dias?',
    answer:
      'Os 28 dias representam sua Jornada Inicial. Seu acesso às práticas continua conforme definido no produto.',
  },
  {
    question: 'E se eu já tiver praticado Tai Chi?',
    answer: 'Seu resultado considera sua experiência anterior e organiza uma retomada progressiva.',
  },
  {
    question: 'Como meu plano é personalizado?',
    answer:
      'A partir das respostas que você deu no quiz — faixa etária, nível de atividade, experiência, tempo disponível, intensidade preferida, frequência e objetivo.',
  },
]

export default function FaqSection() {
  return (
    <div className="mb-12">
      <h2 className="mb-6 text-balance text-center text-2xl font-semibold sm:text-[28px]">
        Perguntas frequentes
      </h2>
      <div className="mx-auto max-w-xl divide-y divide-sage-light overflow-hidden rounded-xl2 border border-sage-light bg-white/70">
        {FAQ_ITEMS.map((item) => (
          <details key={item.question} className="group p-4 sm:p-5">
            <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-semibold text-forest-deep marker:content-none">
              {item.question}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0 text-forest transition-transform duration-200 group-open:rotate-45"
                aria-hidden="true"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </summary>
            <p className="mt-2.5 text-sm leading-relaxed text-ink/70">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  )
}
