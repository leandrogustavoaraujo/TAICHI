import { LIFETIME_ACCESS_CONFIRMED } from '../config/trustConfig'

interface Badge {
  icon: React.ReactNode
  label: string
}

const iconProps = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none' as const }

const LockIcon = (
  <svg {...iconProps} aria-hidden="true">
    <rect x="5" y="11" width="14" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const BoltIcon = (
  <svg {...iconProps} aria-hidden="true">
    <path
      d="M13 3L5 14h6l-1 7 8-11h-6l1-7z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
)

const InfinityIcon = (
  <svg {...iconProps} aria-hidden="true">
    <path
      d="M7 9a5 5 0 000 10c2 0 3.2-1.5 5-4.5C13.8 10.5 15 9 17 9a5 5 0 010 10 5 5 0 01-5-5 5 5 0 01-5-5z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
)

const DeviceIcon = (
  <svg {...iconProps} aria-hidden="true">
    <rect x="3" y="6" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    <rect x="16" y="9" width="6" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M9 15v1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export default function TrustBadges({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const badges: Badge[] = [
    { icon: LockIcon, label: 'Compra 100% segura' },
    { icon: BoltIcon, label: 'Acesso imediato após a confirmação' },
    ...(LIFETIME_ACCESS_CONFIRMED
      ? [{ icon: InfinityIcon, label: 'Acesso vitalício às práticas' }]
      : []),
    { icon: DeviceIcon, label: 'Acesse pelo celular ou computador' },
  ]

  const isDark = variant === 'dark'

  return (
    <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-2">
      {badges.map((badge) => (
        <div
          key={badge.label}
          className={`flex flex-col items-center gap-1.5 rounded-xl2 px-2 py-3 text-center ${
            isDark ? 'bg-cream/10' : 'bg-forest/[0.06]'
          }`}
        >
          <span className={isDark ? 'text-terracotta-soft' : 'text-forest'}>{badge.icon}</span>
          <span
            className={`text-[12px] font-medium leading-tight ${
              isDark ? 'text-cream/90' : 'text-forest-deep'
            }`}
          >
            {badge.label}
          </span>
        </div>
      ))}
    </div>
  )
}
