import type { UtmParams } from '../data/types'

const UTM_KEYS: (keyof UtmParams)[] = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
]

export function captureUtmFromUrl(): UtmParams {
  const params = new URLSearchParams(window.location.search)
  const result: UtmParams = {}
  UTM_KEYS.forEach((key) => {
    const value = params.get(key)
    if (value) result[key] = value
  })
  return result
}

export function appendUtmToUrl(url: string, utm: UtmParams): string {
  if (!url) return url
  const hasParams = Object.values(utm).some(Boolean)
  if (!hasParams) return url
  try {
    const target = new URL(url)
    UTM_KEYS.forEach((key) => {
      if (utm[key]) target.searchParams.set(key, utm[key] as string)
    })
    return target.toString()
  } catch {
    return url
  }
}
