interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (current / total) * 100))
  return (
    <div className="w-full">
      <div className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-forest/70">
        <span>
          {current} / {total}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-sage-light">
        <div
          className="h-full rounded-full bg-forest transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
