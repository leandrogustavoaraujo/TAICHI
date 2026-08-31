import { todayBR } from '../utils/date'

export default function UrgencyTopBar() {
  return (
    <div className="sticky top-0 z-40 bg-terracotta px-3 py-2 text-center text-cream shadow-soft">
      <p className="text-[12px] font-bold leading-snug sm:text-[13px]">
        🔥 OFERTA VÁLIDA HOJE — {todayBR()}
      </p>
    </div>
  )
}
