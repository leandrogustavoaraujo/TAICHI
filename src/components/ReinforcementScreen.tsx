import ImageSlot from './ImageSlot'
import PrimaryCTA from './PrimaryCTA'

interface ReinforcementScreenProps {
  eyebrow?: string
  headline: string
  body: string
  highlight?: { big: string; small: string }
  imageSlot: string
  onContinue: () => void
}

export default function ReinforcementScreen({
  eyebrow,
  headline,
  body,
  highlight,
  imageSlot,
  onContinue,
}: ReinforcementScreenProps) {
  return (
    <div className="mx-auto w-full max-w-xl animate-fadeSlideIn px-4 py-8 sm:max-w-4xl sm:py-14">
      <div className="grid items-center gap-8 sm:grid-cols-2 sm:gap-12">
        <div className="order-2 sm:order-1">
          {eyebrow && (
            <div className="mb-2 text-sm font-bold uppercase tracking-wide text-terracotta">
              {eyebrow}
            </div>
          )}
          <h2 className="mb-4 text-balance text-[26px] font-semibold sm:text-[32px]">
            {headline}
          </h2>
          <p className="mb-6 text-[17px] leading-relaxed text-ink/80">{body}</p>

          {highlight && (
            <div className="mb-7 rounded-xl2 border border-sage-light bg-white/70 px-6 py-5 text-center sm:text-left">
              <div className="font-display text-3xl font-semibold text-forest sm:text-4xl">
                {highlight.big}
              </div>
              <div className="mt-1 text-sm font-medium text-ink/70">{highlight.small}</div>
            </div>
          )}

          <PrimaryCTA onClick={onContinue} className="w-full sm:w-auto">
            Continuar
          </PrimaryCTA>
        </div>
        <div className="order-1 sm:order-2">
          <ImageSlot
            slot={imageSlot}
            alt={headline}
            aspect="portrait"
            className="mx-auto max-w-sm sm:max-w-none"
          />
        </div>
      </div>
    </div>
  )
}
