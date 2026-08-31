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
  checkoutUrl: '',
}

export function formatPrice(value: number, currency: 'BRL' | 'USD'): string {
  const locale = currency === 'BRL' ? 'pt-BR' : 'en-US'
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value)
}
