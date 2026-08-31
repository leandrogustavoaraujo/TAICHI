interface ScrollToOfferCTAProps {
  children: React.ReactNode
  className?: string
}

export default function ScrollToOfferCTA({ children, className = '' }: ScrollToOfferCTAProps) {
  const handleClick = () => {
    document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`focus-ring inline-flex items-center gap-2 rounded-xl2 border-2 border-forest px-6 py-3.5 text-[15px] font-bold uppercase tracking-wide text-forest transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest hover:text-cream ${className}`}
    >
      {children}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 5v14M5 12l7 7 7-7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
