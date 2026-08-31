import ImageSlot from './ImageSlot'
import { OFFER_CONFIG, formatPrice } from '../config/offerConfig'
import TrustBadges from './TrustBadges'
import PrimaryCTA from './PrimaryCTA'

const STATIC_HIGHLIGHTS = [
  'Para iniciantes',
  'Em casa',
  'Sem equipamentos',
  'Progressão organizada',
]

interface PurchaseCardProps {
  chips: string[]
  onCheckout: () => void
  hasCheckoutUrl: boolean
}

export default function PurchaseCard({ chips, onCheckout, hasCheckoutUrl }: PurchaseCardProps) {
  const hasPrice = OFFER_CONFIG.price !== null

  // Merge the personalized chips with a few fixed, always-true highlights —
  // capped so the checklist stays scannable, not another wall of text.
  const checklist = [...chips, ...STATIC_HIGHLIGHTS].slice(0, 8)

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onCheckout}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onCheckout()
      }}
      className="group mb-8 cursor-pointer overflow-hidden rounded-xl2 bg-forest-deep text-cream shadow-card ring-1 ring-forest-deep/40 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
    >
      <div className="flex items-center gap-4 border-b border-cream/10 p-5 sm:p-7">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl2 sm:h-20 sm:w-20">
          <ImageSlot slot="product-cover" alt={OFFER_CONFIG.productName} aspect="square" rounded="rounded-none" />
        </div>
        <div className="min-w-0">
          <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-terracotta/25 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-terracotta-soft">
            {OFFER_CONFIG.productSubtitle}
          </div>
          <h3 className="text-balance font-display text-xl font-semibold text-cream sm:text-2xl">
            {OFFER_CONFIG.productName}
          </h3>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {/* single product mockup — real screenshot at its natural aspect
            ratio, no forced box, no background fill, no letterboxing */}
        <div className="mb-6">
          <ImageSlot
            slot="product-mockup-card"
            alt="Tai Chi em Casa 45+ — plano personalizado no celular e computador"
            natural
            rounded="rounded-xl2"
          />
        </div>

        <ul className="mb-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {checklist.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[14px] font-medium text-cream/90">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="mt-0.5 shrink-0 text-terracotta-soft"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="12" fill="currentColor" fillOpacity="0.25" />
                <path
                  d="M7 12.5l3 3 7-7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mb-6 border-t border-cream/10 pt-6 text-center sm:text-left">
          {hasPrice ? (
            <>
              {OFFER_CONFIG.compareAtPrice && (
                <div className="mb-1 text-sm text-cream/50">
                  De{' '}
                  <span className="line-through">
                    {formatPrice(OFFER_CONFIG.compareAtPrice, OFFER_CONFIG.currency)}
                  </span>
                </div>
              )}
              <div className="flex flex-wrap items-baseline justify-center gap-3 sm:justify-start">
                <span className="font-display text-4xl font-bold text-cream">
                  {formatPrice(OFFER_CONFIG.price as number, OFFER_CONFIG.currency)}
                </span>
                <span className="text-xs text-cream/55">pagamento único</span>
              </div>
            </>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full bg-terracotta/25 px-4 py-2 text-sm font-semibold text-terracotta-soft">
              Preço a ser configurado (offerConfig.ts)
            </span>
          )}
        </div>

        {hasPrice && (
          <p className="mb-5 text-center text-xs font-semibold text-terracotta-soft sm:text-left">
            Essa condição de {formatPrice(OFFER_CONFIG.price as number, OFFER_CONFIG.currency)} é
            válida hoje.
          </p>
        )}

        <PrimaryCTA
          onClick={(e) => {
            e.stopPropagation()
            onCheckout()
          }}
          disabled={!hasCheckoutUrl}
          className="w-full animate-glowPulse !bg-terracotta text-cream hover:!bg-terracotta-soft sm:w-full"
        >
          Quero desbloquear meu plano
        </PrimaryCTA>
        <p className="mt-3 text-center text-xs text-cream/55">
          Pague e receba o plano por e-mail
        </p>

        <div className="mt-6">
          <TrustBadges variant="dark" />
        </div>
      </div>
    </div>
  )
}
