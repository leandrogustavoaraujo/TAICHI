import { PREVIEW_CARDS } from '../data/progression'
import ScrollToOfferCTA from './ScrollToOfferCTA'

export default function LockedPlanPreview() {
  return (
    <div>
      <h2 className="mb-1.5 text-balance text-2xl font-semibold sm:text-[28px]">
        Seu plano já está esperando por você.
      </h2>
      <p className="mb-6 text-[15px] text-ink/70">
        Veja uma pequena prévia de como sua jornada começa.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {PREVIEW_CARDS.map((card) => (
          <div
            key={card.label}
            className="relative flex flex-col items-center justify-center gap-2 rounded-xl2 border-2 border-terracotta/30 bg-white/70 px-3 py-6 text-center transition-colors hover:border-terracotta/60"
          >
            <div className="absolute right-3 top-3 text-forest/60">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect
                  x="5"
                  y="11"
                  width="14"
                  height="9"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M8 11V8a4 4 0 018 0v3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="text-xs font-bold uppercase tracking-wide text-terracotta">
              {card.label}
            </div>
            <div className="text-sm font-semibold text-ink/80">{card.title}</div>
          </div>
        ))}
      </div>

      <div className="mt-7 text-center">
        <ScrollToOfferCTA>Ver meu plano completo</ScrollToOfferCTA>
      </div>
    </div>
  )
}
