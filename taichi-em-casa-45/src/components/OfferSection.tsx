import { useEffect } from 'react'
import { OFFER_CONFIG } from '../config/offerConfig'
import type { UtmParams } from '../data/types'
import { appendUtmToUrl } from '../utils/utm'
import { track } from '../utils/analytics'
import PurchaseCard from './PurchaseCard'

interface OfferSectionProps {
  utm: UtmParams
  chips: string[]
}

export default function OfferSection({ utm, chips }: OfferSectionProps) {
  useEffect(() => {
    track('offer_viewed')
  }, [])

  const handleCheckoutClick = () => {
    track('checkout_clicked')
    if (!OFFER_CONFIG.checkoutUrl) return
    const url = appendUtmToUrl(OFFER_CONFIG.checkoutUrl, utm)
    window.location.href = url
  }

  return (
    <div id="offer" className="scroll-mt-6 text-center">
      <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-terracotta px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-cream">
        Oferta especial de hoje
      </div>
      <h2 className="mb-3 text-balance text-2xl font-semibold sm:text-[30px]">
        Seu plano está pronto. Falta apenas desbloquear seu acesso.
      </h2>
      <p className="mx-auto mb-7 max-w-md text-[15px] leading-relaxed text-ink/70">
        Comece seu Tai Chi em Casa com uma rotina organizada para o seu nível, sua disponibilidade
        e seus objetivos.
      </p>

      <PurchaseCard
        chips={chips}
        onCheckout={handleCheckoutClick}
        hasCheckoutUrl={Boolean(OFFER_CONFIG.checkoutUrl)}
      />

      <button
        type="button"
        onClick={handleCheckoutClick}
        className="focus-ring text-sm font-semibold text-forest underline underline-offset-4"
      >
        Começar meu Tai Chi em Casa
      </button>
    </div>
  )
}
