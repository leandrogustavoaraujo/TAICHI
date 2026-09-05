import { useEffect } from 'react'
import { OFFER_PLANS, formatPrice } from '../config/offerConfig'
import type { UtmParams } from '../data/types'
import { appendUtmToUrl } from '../utils/utm'
import { track } from '../utils/analytics'
import ImageSlot from './ImageSlot'
import TrustBadges from './TrustBadges'

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

      <div className="mx-auto grid max-w-4xl items-start gap-6 md:grid-cols-2">
        {OFFER_PLANS.map((plan) => {
          const daily = plan.price / plan.days
          const enabled = Boolean(plan.checkoutUrl)
          return (
            <article key={plan.id} className={`relative overflow-hidden rounded-[2rem] border text-left shadow-[0_18px_55px_rgba(26,65,49,.16)] transition md:hover:-translate-y-1 ${plan.badge ? 'border-terracotta bg-forest-deep text-cream ring-4 ring-terracotta/15' : 'border-sage-light bg-white'}`}>
              {plan.badge && <div className="absolute right-4 top-4 z-10 rounded-full bg-terracotta px-4 py-2 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-lg">★ {plan.badge}</div>}

              <div className="relative bg-gradient-to-br from-sage-light/80 to-cream p-3">
                <ImageSlot slot="product-mockup-card" alt="Tai Chi em Casa — aulas, plano e acompanhamento no celular e computador" natural rounded="rounded-[1.35rem]" />
                <span className="absolute bottom-5 left-5 rounded-full bg-forest-deep/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">Acesso imediato</span>
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl shadow-md ring-2 ring-white/50">
                    <ImageSlot slot="product-cover" alt="Tai Chi em Casa" aspect="square" rounded="rounded-none" />
                  </div>
                  <div>
                    <p className={`text-xs font-extrabold uppercase tracking-[.12em] ${plan.badge ? 'text-terracotta-soft' : 'text-forest'}`}>{plan.period}</p>
                    <h3 className="mt-1 text-2xl font-bold">{plan.title}</h3>
                  </div>
                </div>

                <div className={`my-5 h-px ${plan.badge ? 'bg-white/12' : 'bg-sage-light'}`} />
                <p className={`text-xs font-semibold uppercase tracking-wide ${plan.badge ? 'text-cream/55' : 'text-ink/50'}`}>Pagamento único de</p>
                <div className="mt-1 flex flex-wrap items-end gap-2">
                  <strong className={`text-4xl ${plan.badge ? 'text-white' : 'text-forest'}`}>{formatPrice(plan.price, 'BRL')}</strong>
                  <span className={`pb-1 text-sm ${plan.badge ? 'text-cream/55' : 'text-ink/55'}`}>sem mensalidade</span>
                </div>
                <p className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-sm font-extrabold ${plan.badge ? 'bg-terracotta/25 text-terracotta-soft' : 'bg-sage-light text-forest'}`}>
                  Só {formatPrice(daily, 'BRL')} por dia
                </p>

                <ul className={`my-6 space-y-2.5 text-sm ${plan.badge ? 'text-cream/85' : 'text-ink/75'}`}>
                  {chips.slice(0, 4).map((chip) => <li key={chip} className="flex gap-2"><span className={plan.badge ? 'text-terracotta-soft' : 'text-forest'}>✓</span><span>{chip}</span></li>)}
                  <li className="flex gap-2"><span className={plan.badge ? 'text-terracotta-soft' : 'text-forest'}>✓</span><span>Aulas para fazer em casa</span></li>
                  <li className="flex gap-2"><span className={plan.badge ? 'text-terracotta-soft' : 'text-forest'}>✓</span><span>Acesso pelo celular ou computador</span></li>
                </ul>

                <button type="button" disabled={!enabled} onClick={() => handleCheckoutClick(plan.checkoutUrl, plan.id)} className={`focus-ring w-full rounded-2xl px-5 py-4 text-base font-extrabold text-white shadow-xl transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-ink/30 ${plan.badge ? 'animate-glowPulse bg-terracotta hover:bg-terracotta-soft' : 'bg-forest hover:bg-forest-deep'}`}>
                  {enabled ? `Escolher ${plan.title}` : 'Checkout trimestral pendente'}
                </button>
                <p className={`mt-3 text-center text-xs ${plan.badge ? 'text-cream/55' : 'text-ink/45'}`}>🔒 Compra segura • Liberação imediata</p>
                <div className="mt-5"><TrustBadges variant={plan.badge ? 'dark' : 'light'} /></div>
              </div>
            </article>
          )
        })}
      </div>
      <p className="mt-5 text-xs text-ink/55">Compra segura. Resultados variam conforme a frequência e as condições individuais.</p>
    </div>
  )
}
