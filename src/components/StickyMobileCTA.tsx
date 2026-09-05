import { useEffect, useState } from 'react'
import { OFFER_PLANS, formatPrice } from '../config/offerConfig'
import { track } from '../utils/analytics'
import { appendUtmToUrl } from '../utils/utm'
import type { UtmParams } from '../data/types'

interface StickyMobileCTAProps {
  showAfterId: string
  utm: UtmParams
}

export default function StickyMobileCTA({ showAfterId, utm }: StickyMobileCTAProps) {
  const premiumPlan = OFFER_PLANS.find((plan) => plan.id === 'trimestral') ?? OFFER_PLANS[0]
  const [pastTrigger, setPastTrigger] = useState(false)

  useEffect(() => {
    const trigger = document.getElementById(showAfterId)
    if (!trigger) return

    const triggerObserver = new IntersectionObserver(
      ([entry]) => setPastTrigger(!entry.isIntersecting && entry.boundingClientRect.bottom < 0),
      { threshold: 0 },
    )
    triggerObserver.observe(trigger)
    return () => {
      triggerObserver.disconnect()
    }
  }, [showAfterId])

  const visible = pastTrigger

  const handleClick = () => {
    track('checkout_clicked')
    if (!premiumPlan.checkoutUrl) {
      document.getElementById(showAfterId)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    window.location.href = appendUtmToUrl(premiumPlan.checkoutUrl, utm)
  }

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-forest-deep/95 px-4 py-3 shadow-[0_-12px_35px_rgba(13,42,31,.25)] backdrop-blur-md transition-transform duration-300 sm:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-0.5 text-[10px] font-extrabold uppercase tracking-[.13em] text-terracotta-soft">Seu plano personalizado</div>
          <div className="flex items-baseline gap-1.5 text-white">
            <strong className="text-xl leading-none">{formatPrice(premiumPlan.price, 'BRL')}</strong>
            <span className="text-[10px] text-cream/60">• {premiumPlan.period}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="focus-ring shrink-0 rounded-xl2 bg-terracotta px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(210,119,61,.35)] transition hover:bg-terracotta-soft"
        >
          Acessar meu plano
        </button>
      </div>
    </div>
  )
}
