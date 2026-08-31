import type { BodyFocusArea } from '../data/types'

interface BodySilhouetteProps {
  selected: BodyFocusArea[]
  className?: string
}

export default function BodySilhouette({ selected, className = '' }: BodySilhouetteProps) {
  const isFullBody = selected.includes('full_body')
  const isOn = (area: Exclude<BodyFocusArea, 'full_body'>) =>
    isFullBody || selected.includes(area)

  const fill = (area: Exclude<BodyFocusArea, 'full_body'>) =>
    isOn(area) ? 'url(#taichiHighlightGrad)' : 'url(#taichiBaseGrad)'
  const opacity = (area: Exclude<BodyFocusArea, 'full_body'>) => (isOn(area) ? 1 : 0.7)

  return (
    <svg
      viewBox="0 0 200 380"
      className={className}
      aria-hidden="true"
      style={{ maxHeight: 360 }}
    >
      <defs>
        <linearGradient id="taichiBaseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9D9C4" />
          <stop offset="100%" stopColor="#A8BDA8" />
        </linearGradient>
        <linearGradient id="taichiHighlightGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E9BD86" />
          <stop offset="100%" stopColor="#D99B4A" />
        </linearGradient>
        <linearGradient id="taichiHeadGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8FA38C" />
          <stop offset="100%" stopColor="#6E8570" />
        </linearGradient>
        <filter id="taichiSoftShadow" x="-30%" y="-20%" width="160%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#173D30" floodOpacity="0.18" />
        </filter>
      </defs>

      <g filter="url(#taichiSoftShadow)">
        {/* head + neck (decorative, not a selectable region) */}
        <ellipse cx="100" cy="36" rx="24" ry="26" fill="url(#taichiHeadGrad)" />
        <path d="M88 56 Q100 66 112 56 L110 72 Q100 78 90 72 Z" fill="url(#taichiHeadGrad)" opacity="0.9" />

        {/* shoulders & arms — soft capsules angled like a relaxed Tai Chi stance */}
        <g style={{ transition: 'fill 0.35s ease, opacity 0.35s ease' }}>
          <path
            d="M62 84 Q30 86 26 130 Q24 170 34 202 Q40 214 52 208 Q44 172 48 138 Q50 108 70 92 Z"
            fill={fill('shoulders_arms')}
            opacity={opacity('shoulders_arms')}
          />
          <path
            d="M138 84 Q170 86 174 130 Q176 170 166 202 Q160 214 148 208 Q156 172 152 138 Q150 108 130 92 Z"
            fill={fill('shoulders_arms')}
            opacity={opacity('shoulders_arms')}
          />
        </g>

        {/* torso / back — tapered, human-like silhouette instead of a rectangle */}
        <path
          d="M70 80 Q100 66 130 80 Q142 108 136 140 Q132 164 118 176 L82 176 Q68 164 64 140 Q58 108 70 80 Z"
          fill={fill('torso_back')}
          opacity={opacity('torso_back')}
          style={{ transition: 'fill 0.35s ease, opacity 0.35s ease' }}
        />

        {/* hips — smooth curve, wider than waist */}
        <path
          d="M78 176 L122 176 Q140 176 142 198 Q144 216 132 224 L68 224 Q56 216 58 198 Q60 176 78 176 Z"
          fill={fill('hips')}
          opacity={opacity('hips')}
          style={{ transition: 'fill 0.35s ease, opacity 0.35s ease' }}
        />

        {/* legs — gently tapered capsules */}
        <g style={{ transition: 'fill 0.35s ease, opacity 0.35s ease' }}>
          <path
            d="M68 222 Q64 260 66 300 Q67 330 72 356 Q74 366 86 366 Q92 366 92 356 Q90 328 90 298 Q90 258 96 222 Z"
            fill={fill('legs')}
            opacity={opacity('legs')}
          />
          <path
            d="M132 222 Q136 260 134 300 Q133 330 128 356 Q126 366 114 366 Q108 366 108 356 Q110 328 110 298 Q110 258 104 222 Z"
            fill={fill('legs')}
            opacity={opacity('legs')}
          />
        </g>
      </g>
    </svg>
  )
}
