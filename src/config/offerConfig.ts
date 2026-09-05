export interface OfferConfig {
  productName: string
  productSubtitle: string
  price: number | null
  compareAtPrice: number | null
  currency: 'BRL' | 'USD'
  checkoutUrl: string
}

/**
 * "Tai Chi em Casa 45+" is the product. The 28 days are the personalized
 * starting journey inside it — never the whole product name (see
 * productSubtitle / result & offer copy).
 */
export const OFFER_CONFIG: OfferConfig = {
  productName: 'Tai Chi em Casa 45+',
  productSubtitle: 'Seu Plano Personalizado',
  price: 19.9,
  compareAtPrice: 119.9,
  currency: 'BRL',
  checkoutUrl: 'https://pay.wiapy.com/z7nvUEp9PaRQ',
}

export interface OfferPlan {
  id: string
  title: string
  period: string
  price: number
  days: number
  checkoutUrl: string
  badge?: string
}

export const OFFER_PLANS: OfferPlan[] = [
  {
    id: 'mensal',
    title: 'Plano de 1 mês',
    period: '30 dias de acesso',
    price: 19.9,
    days: 30,
    checkoutUrl: OFFER_CONFIG.checkoutUrl,
  },
  {
    id: 'trimestral',
    title: 'Plano de 3 meses',
    period: '90 dias de acesso',
    price: 29.9,
    days: 90,
    checkoutUrl: 'https://pay.wiapy.com/6a9c1f9122e4ee57af4a3e47',
    badge: 'Mais escolhido',
  },
]

export function formatPrice(value: number, currency: 'BRL' | 'USD'): string {
  const locale = currency === 'BRL' ? 'pt-BR' : 'en-US'
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
}
