import { useEffect } from 'react'
import { OFFER_PLANS, formatPrice } from '../config/offerConfig'
import type { UtmParams } from '../data/types'
import { appendUtmToUrl } from '../utils/utm'
import { track } from '../utils/analytics'

interface OfferSectionProps {
  utm: UtmParams
  chips: string[]
}

export default function OfferSection({ utm, chips }: OfferSectionProps) {
  useEffect(() => {
    track('offer_viewed')
  }, [])

  const handleCheckoutClick = (checkoutUrl: string, planId: string) => {
    track('checkout_clicked', { plan: planId })
    if (!checkoutUrl) return
    const url = appendUtmToUrl(checkoutUrl, utm)
    window.location.assign(url)
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

      <div className="mx-auto grid max-w-3xl gap-5 md:grid-cols-2">
        {OFFER_PLANS.map((plan) => {
          const daily = plan.price / plan.days
          const enabled = Boolean(plan.checkoutUrl)
          return (
            <article key={plan.id} className={`relative overflow-hidden rounded-[1.75rem] border bg-white p-6 text-left shadow-card ${plan.badge ? 'border-terracotta ring-2 ring-terracotta/15' : 'border-sage-light'}`}>
              {plan.badge && <div className="absolute right-0 top-0 rounded-bl-2xl bg-terracotta px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white">{plan.badge}</div>}
              <p className="text-sm font-bold uppercase tracking-wide text-forest">{plan.period}</p>
              <h3 className="mt-2 text-2xl font-bold">{plan.title}</h3>
              <div className="mt-4 flex items-end gap-2">
                <strong className="text-4xl text-forest">{formatPrice(plan.price, 'BRL')}</strong>
                <span className="pb-1 text-sm text-ink/55">pagamento único</span>
              </div>
              <p className="mt-2 inline-flex rounded-full bg-sage-light px-3 py-1 text-sm font-extrabold text-forest">
                apenas {formatPrice(daily, 'BRL')} por dia
              </p>
              <ul className="my-5 space-y-2 text-sm text-ink/75">
                {chips.slice(0, 4).map((chip) => <li key={chip}>✓ {chip}</li>)}
                <li>✓ Acesso imediato pelo celular</li>
              </ul>
              <button type="button" disabled={!enabled} onClick={() => handleCheckoutClick(plan.checkoutUrl, plan.id)} className="focus-ring w-full rounded-2xl bg-forest px-5 py-4 text-base font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-ink/30">
                {enabled ? `Escolher ${plan.title}` : 'Checkout trimestral pendente'}
              </button>
            </article>
          )
        })}
      </div>
      <p className="mt-5 text-xs text-ink/55">Compra segura. Resultados variam conforme a frequência e as condições individuais.</p>
    </div>
  )
}
