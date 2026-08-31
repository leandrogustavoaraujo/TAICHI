import type { BodyFocusArea } from '../data/types'
import type { WhyBullet } from '../data/personalizationMatrix'
import { BODY_FOCUS_LABEL } from '../data/personalizationMatrix'
import TodayVsPlanVisual from './TodayVsPlanVisual'
import BodySilhouette from './BodySilhouette'

interface PlanStartVisualProps {
  bullets: WhyBullet[]
  bodyFocus?: BodyFocusArea[]
}

export default function PlanStartVisual({ bullets, bodyFocus }: PlanStartVisualProps) {
  const hasBodyFocus = Boolean(bodyFocus && bodyFocus.length > 0)

  return (
    <div className="mb-10">
      <h2 className="mb-5 text-balance text-2xl font-semibold sm:text-[28px]">
        Seu plano começa exatamente daqui
      </h2>

      {/* Two independent cards (not one shared box) — each sizes to its own
          content, so a short bullet list never leaves blank space under a
          taller image column. */}
      <div className="grid gap-5 sm:grid-cols-[240px_1fr] sm:gap-6">
        <div className="rounded-xl2 border border-sage-light bg-white/80 p-5 shadow-card">
          <TodayVsPlanVisual />

          {hasBodyFocus && (
            <div className="mt-5 rounded-xl2 border border-terracotta/25 bg-terracotta/5 p-4 text-center">
              <BodySilhouette selected={bodyFocus!} className="mx-auto w-24" />
              <div className="mt-2 text-xs font-bold uppercase tracking-wide text-terracotta">
                Seu foco de movimento
              </div>
              <div className="mt-1 text-sm font-medium text-ink/70">
                {bodyFocus!.map((a) => BODY_FOCUS_LABEL[a]).join(', ')}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-xl2 border border-sage-light bg-white/80 p-5 shadow-card sm:p-7">
          <div className="mb-3 text-sm font-semibold text-ink/60">
            Seu plano foi preparado para:
          </div>
          <div className="space-y-3">
            {bullets.map((bullet) => (
              <div key={bullet.title} className="flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mt-0.5 shrink-0 text-forest"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="12" fill="currentColor" fillOpacity="0.15" />
                  <path
                    d="M7 12.5l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <div className="text-[15px] font-semibold text-forest-deep">{bullet.title}</div>
                  <div className="mt-0.5 text-sm leading-relaxed text-ink/70">
                    {bullet.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
