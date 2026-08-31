import { GUARANTEE_CONFIG } from '../config/trustConfig'
import { OFFER_CONFIG } from '../config/offerConfig'
import type { UtmParams } from '../data/types'
import { appendUtmToUrl } from '../utils/utm'
import { track } from '../utils/analytics'
import PrimaryCTA from './PrimaryCTA'

interface GuaranteeSectionProps {
  utm: UtmParams
}

export default function GuaranteeSection({ utm }: GuaranteeSectionProps) {
  if (!GUARANTEE_CONFIG) return null

  const handleCheckoutClick = () => {
    track('checkout_clicked')
    if (!OFFER_CONFIG.checkoutUrl) return
    window.location.href = appendUtmToUrl(OFFER_CONFIG.checkoutUrl, utm)
  }

  return (
    <div className="mb-8 rounded-xl2 border border-forest/15 bg-white/80 p-6 text-center shadow-soft sm:p-8">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-forest/10 text-forest">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M9 12l2 2 4-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h3 className="mb-2 font-display text-xl font-semibold text-forest-deep sm:text-2xl">
        {GUARANTEE_CONFIG.headline}
      </h3>
      <p className="mx-auto mb-4 max-w-md text-sm leading-relaxed text-ink/70">
        {GUARANTEE_CONFIG.description}
      </p>

      <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-1.5 text-sm font-bold text-forest">
        {GUARANTEE_CONFIG.highlight}
      </div>

      {GUARANTEE_CONFIG.rulesUrl && (
        <div className="mb-6">
          <a
            href={GUARANTEE_CONFIG.rulesUrl}
            className="text-xs font-semibold text-forest underline underline-offset-4"
          >
            Ver regras da garantia
          </a>
        </div>
      )}

      <PrimaryCTA onClick={handleCheckoutClick} disabled={!OFFER_CONFIG.checkoutUrl}>
        Quero começar agora
      </PrimaryCTA>
    </div>
  )
}
