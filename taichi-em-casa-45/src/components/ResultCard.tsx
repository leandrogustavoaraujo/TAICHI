interface ResultRow {
  label: string
  value: string
}

interface ResultCardProps {
  title: string
  rows: ResultRow[]
}

export default function ResultCard({ title, rows }: ResultCardProps) {
  return (
    <div className="rounded-xl2 border border-sage-light bg-white/80 p-5 shadow-soft sm:p-6">
      <h3 className="mb-4 font-display text-lg font-semibold text-forest-deep sm:text-xl">
        {title}
      </h3>
      <dl className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="rounded-md bg-sage-light/40 px-3.5 py-2.5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-forest/70">
              {row.label}
            </dt>
            <dd className="mt-0.5 text-[15px] font-semibold text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
