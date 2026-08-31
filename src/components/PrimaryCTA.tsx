import type { ButtonHTMLAttributes } from 'react'

interface PrimaryCTAProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function PrimaryCTA({ children, className = '', ...rest }: PrimaryCTAProps) {
  return (
    <button
      type="button"
      className={`focus-ring w-full rounded-xl2 bg-forest px-6 py-4 text-center text-[17px] font-bold uppercase tracking-wide text-cream shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest-deep active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto sm:min-w-[320px] ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
