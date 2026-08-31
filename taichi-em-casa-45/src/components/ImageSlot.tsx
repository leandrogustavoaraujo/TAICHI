import { useState } from 'react'

interface ImageSlotProps {
  slot: string
  alt: string
  aspect?: 'square' | 'portrait' | 'landscape'
  className?: string
  rounded?: string
  /** When true, fills the parent (absolute inset-0) instead of setting its own aspect-ratio box — use when the parent already defines the aspect ratio (e.g. a device mockup frame). */
  fill?: boolean
  /** 'cover' (default) crops to fill the box; 'contain' shows the whole image, letterboxed — use for product/device mockups where nothing should be cropped. */
  fit?: 'cover' | 'contain'
  /** When true, no forced aspect-ratio box at all — the image just renders at its own natural ratio, scaled to the container width (no letterboxing, no cropping). Use for a single hero/mockup image whose real proportions aren't known in advance. */
  natural?: boolean
}

const ASPECT_CLASSES: Record<NonNullable<ImageSlotProps['aspect']>, string> = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
}

/**
 * Renders /images/quiz/{slot}.webp when present. If the real asset hasn't
 * been dropped in yet, falls back to an elegant, on-brand gradient
 * placeholder with a Tai Chi motif — never a plain gray box.
 */
export default function ImageSlot({
  slot,
  alt,
  aspect = 'landscape',
  className = '',
  rounded = 'rounded-xl2',
  fill = false,
  fit = 'cover',
  natural = false,
}: ImageSlotProps) {
  const [failed, setFailed] = useState(false)
  const src = `./images/quiz/${slot}.webp`

  if (natural) {
    return (
      <div className={`relative overflow-hidden ${rounded} ${className}`}>
        {!failed ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="block h-auto w-full"
          />
        ) : (
          <div className="aspect-[4/3] w-full">
            <PlaceholderArt slot={slot} />
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${fill ? 'absolute inset-0 h-full w-full' : ASPECT_CLASSES[aspect]} ${className}`}
    >
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
        />
      )}
      {failed && <PlaceholderArt slot={slot} />}
    </div>
  )
}

function PlaceholderArt({ slot }: { slot: string }) {
  // Deterministic gentle variation so different slots don't look identical.
  const hue = Math.abs(hashCode(slot)) % 3
  const gradients = [
    'from-[#D8E3D6] via-[#F3EBD9] to-[#E9BD86]',
    'from-[#A8BDA8] via-[#F3EBD9] to-[#D99B4A]',
    'from-[#C9D9C4] via-[#FBF6EA] to-[#DCB27E]',
  ]
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradients[hue]}`}
    >
      <svg
        width="42%"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="32" cy="32" r="30" stroke="#315F4A" strokeOpacity="0.35" strokeWidth="1.5" />
        <path
          d="M32 6c9 6 9 20 0 26-9 6-9 20 0 26"
          stroke="#315F4A"
          strokeOpacity="0.55"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="32" cy="19" r="4" fill="#315F4A" fillOpacity="0.5" />
        <circle cx="32" cy="45" r="4" fill="#D99B4A" fillOpacity="0.7" />
      </svg>
    </div>
  )
}

function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return hash
}
