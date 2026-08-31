import { useState } from 'react'
import { TESTIMONIALS } from '../config/trustConfig'
import ImageSlot from './ImageSlot'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-terracotta">
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function SocialProofSection() {
  const [active, setActive] = useState(0)
  if (TESTIMONIALS.length === 0) return null

  return (
    <div className="mb-12">
      <h2 className="mb-5 text-balance text-center text-2xl font-semibold sm:text-[28px]">
        O que dizem sobre a prática
      </h2>

      <div className="mx-auto max-w-sm rounded-xl2 border border-sage-light bg-white p-5 shadow-soft sm:max-w-md">
        {TESTIMONIALS.map((t, index) => (
          <div key={t.name} className={index === active ? 'block' : 'hidden'}>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
                <ImageSlot slot={t.avatar} alt={t.name} aspect="square" rounded="rounded-none" />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[15px] font-bold text-forest-deep">{t.name}</span>
                  <span className="text-xs font-medium text-ink/40">{t.location}</span>
                </div>
                <Stars rating={t.rating} />
              </div>
            </div>
            <p className="text-sm leading-relaxed text-ink/80">{t.text}</p>
          </div>
        ))}

        {TESTIMONIALS.length > 1 && (
          <div className="mt-4 flex justify-center gap-1.5">
            {TESTIMONIALS.map((t, index) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Ver depoimento ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === active ? 'w-5 bg-forest' : 'w-1.5 bg-sage-light'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
