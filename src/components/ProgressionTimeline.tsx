import { PROGRESSION_WEEKS } from '../data/progression'

export default function ProgressionTimeline() {
  return (
    <div>
      <h2 className="mb-1 text-balance text-2xl font-semibold sm:text-[28px]">
        Seus primeiros 28 dias já estão organizados
      </h2>
      <p className="mb-6 text-sm text-ink/60">
        Essa é sua Jornada Inicial — o ponto de partida para criar familiaridade, ritmo e uma
        primeira progressão no Tai Chi.
      </p>

      <ol className="relative space-y-6 border-l-2 border-sage-light pl-6 sm:pl-8">
        {PROGRESSION_WEEKS.map((item) => (
          <li key={item.week} className="relative">
            <span className="absolute -left-[calc(1.5rem+7px)] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-forest bg-cream sm:-left-[calc(2rem+7px)]" />
            <div className="mb-1 text-xs font-bold uppercase tracking-wide text-terracotta">
              Semana {item.week}
            </div>
            <h3 className="mb-1.5 text-lg font-semibold text-forest-deep sm:text-xl">
              {item.title}
            </h3>
            <p className="text-[15px] leading-relaxed text-ink/75">{item.description}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
