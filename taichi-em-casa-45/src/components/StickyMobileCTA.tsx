import { useEffect, useState } from 'react'
import { OFFER_CONFIG, formatPrice } from '../config/offerConfig'
import { track } from '../utils/analytics'
import { appendUtmToUrl } from '../utils/utm'
import type { UtmParams } from '../data/types'

interface StickyMobileCTAProps {
  showAfterId: string
  hideWhenId: string
  utm: UtmParams
}

export default function StickyMobileCTA({ showAfterId, hideWhenId, utm }: StickyMobileCTAProps) {
  const [pastIntro, setPastIntro] = useState(false)
  const [offerVisible, setOfferVisible] = useState(false)

  useEffect(() => {
    const sentinel = document.getElementById(showAfterId)
    const offer = document.getElementById(hideWhenId)
    if (!sentinel || !offer) return

    const introObserver = new IntersectionObserver(
      ([entry]) => setPastIntro(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    )
    const offerObserver = new IntersectionObserver(([entry]) => setOfferVisible(entry.isIntersecting), {
      threshold: 0.15,
    })

    introObserver.observe(sentinel)
    offerObserver.observe(offer)
    return () => {
      introObserver.disconnect()
      offerObserver.disconnect()
    }
  }, [showAfterId, hideWhenId])

  const visible = pastIntro && !offerVisible

  const handleClick = () => {
    track('checkout_clicked')
    if (!OFFER_CONFIG.checkoutUrl) {
      document.getElementById(hideWhenId)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    window.location.href = appendUtmToUrl(OFFER_CONFIG.checkoutUrl, utm)
  }

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-sage-light bg-white/95 px-4 py-3 shadow-card backdrop-blur transition-transform duration-300 sm:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          {OFFER_CONFIG.price !== null && (
            <div className="text-[13px] font-bold text-forest-deep">
              {formatPrice(OFFER_CONFIG.price, OFFER_CONFIG.currency)}
            </div>
          )}
          <div className="truncate text-[11px] font-semibold text-terracotta">
            Oferta válida hoje
          </div>
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="focus-ring shrink-0 rounded-xl2 bg-terracotta px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-cream shadow-soft"
        >
          Desbloquear agora
        </button>
      </div>
    </div>
  )
}
