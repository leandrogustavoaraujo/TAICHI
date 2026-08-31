import ImageSlot from './ImageSlot'

export function PlayButton({ size = 56 }: { size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-cream/95 text-forest-deep shadow-lg backdrop-blur transition-transform duration-200 group-hover:scale-105"
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.36} height={size * 0.36} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  )
}

interface PhoneMockupProps {
  className?: string
}

/**
 * Reusable phone frame with the (coded, always-legible) lesson screen
 * inside — used both in the mockups showcase and, layered over a hero
 * background, in the offer section.
 */
export default function PhoneMockup({ className = '' }: PhoneMockupProps) {
  return (
    <div
      className={`w-40 shrink-0 rounded-[2rem] border-[6px] border-forest-deep bg-forest-deep p-1.5 shadow-card sm:w-44 ${className}`}
    >
      <div className="group relative aspect-[9/16] overflow-hidden rounded-[1.4rem]">
        <ImageSlot
          slot="mockup-video-portrait"
          alt="Aula gravada de Tai Chi — versão celular"
          rounded="rounded-none"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60" />

        <div className="absolute inset-x-0 top-0 p-3">
          <div className="text-[9px] font-bold uppercase tracking-wide text-terracotta-soft">
            Aula guiada
          </div>
          <div className="text-[12px] font-semibold leading-snug text-cream">
            Semana 1 · Movimento 3
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <PlayButton size={44} />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3">
          <div className="h-1 w-full overflow-hidden rounded-full bg-cream/25">
            <div className="h-full w-2/5 rounded-full bg-terracotta" />
          </div>
        </div>
      </div>
    </div>
  )
}
