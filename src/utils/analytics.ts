export type AnalyticsEvent =
  | 'quiz_started'
  | 'question_answered'
  | 'reinforcement_viewed'
  | 'quiz_completed'
  | 'processing_started'
  | 'result_viewed'
  | 'offer_viewed'
  | 'checkout_clicked'

/**
 * Thin abstraction so a real pixel (Meta Pixel, UTMify, GA4, etc.) can be
 * wired in later without touching call sites. Currently logs to console
 * in dev and no-ops silently otherwise.
 */
export function track(event: AnalyticsEvent, payload: Record<string, unknown> = {}): void {
  const w = window as unknown as {
    fbq?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }

  if (typeof w.fbq === 'function') {
    w.fbq('trackCustom', event, payload)
  }

  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event, ...payload })
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, payload)
  }
}
