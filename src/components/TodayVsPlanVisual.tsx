import ImageSlot from './ImageSlot'

export default function TodayVsPlanVisual() {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-xl2">
        <ImageSlot slot="before-sedentary" alt="Hoje: rotina parada, sem estrutura" aspect="square" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <div className="text-[11px] font-bold uppercase tracking-wide text-cream/80">Hoje</div>
          <div className="text-sm font-semibold text-cream">Rotina parada, sem estrutura</div>
        </div>
      </div>

      <div className="flex justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-terracotta" aria-hidden="true">
          <path
            d="M12 5v14M5 12l7 7 7-7"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="relative overflow-hidden rounded-xl2 ring-2 ring-forest/30">
        <ImageSlot slot="after-active" alt="Seu plano: sessões organizadas, no seu ritmo" aspect="square" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/80 to-transparent p-3">
          <div className="text-[11px] font-bold uppercase tracking-wide text-terracotta-soft">
            Seu plano
          </div>
          <div className="text-sm font-semibold text-cream">Sessões organizadas, no seu ritmo</div>
        </div>
      </div>
    </div>
  )
}
