import PrimaryCTA from './PrimaryCTA'

interface Props { onContinue: () => void }

export default function NewsProofScreen({ onContinue }: Props) {
  return <div className="mx-auto w-full max-w-xl animate-fadeSlideIn px-4 py-10"><div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-5 shadow-card sm:p-7"><img src="/images/quiz/g1.webp" alt="Conteúdo do G1 Saúde sobre Tai Chi, qualidade de vida e longevidade" className="mx-auto mb-6 w-full max-w-md rounded-xl border border-ink/10" loading="eager"/><div className="rounded-2xl bg-sage-light/35 p-4 text-left"><p className="mb-3 text-xs font-extrabold uppercase tracking-[0.14em] text-forest">Estudos confirmam</p><p className="mb-4 text-sm leading-relaxed text-ink/70">Movimentos lentos e contínuos podem apoiar equilíbrio, coordenação, mobilidade e bem-estar — especialmente depois dos 45 anos.</p><ul className="space-y-2 text-sm font-medium text-ink/75"><li>✓ Prática de baixo impacto</li><li>✓ Pode ser feita em casa</li><li>✓ Ajuda a criar uma rotina de movimento</li><li>✓ Adequada para diferentes níveis</li></ul></div><PrimaryCTA onClick={onContinue} className="mt-6 w-full sm:w-full">Continuar</PrimaryCTA></div></div>
}
