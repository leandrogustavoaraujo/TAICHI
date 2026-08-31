import ImageSlot from './ImageSlot'
import { PRODUCT_SHOWCASE } from '../data/productShowcase'

/**
 * Auto-scrolling, infinite, non-interactive marquee — no swipe/drag/arrows
 * needed, so it works reliably on mobile without touch gesture conflicts.
 * The item list is duplicated once so the loop is seamless.
 */
export default function ProductShowcaseCarousel() {
  const loopItems = [...PRODUCT_SHOWCASE, ...PRODUCT_SHOWCASE]

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-balance text-2xl font-semibold sm:text-[28px]">
          Tudo o que você precisa para começar em casa
        </h2>
        <p className="mt-1 text-[15px] text-ink/65">
          Muito mais do que um plano em PDF — um projeto completo de Tai Chi para os seus
          próximos 28 dias.
        </p>
      </div>

      <div
        className="group -mx-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] sm:mx-0"
        aria-hidden="false"
      >
        <div className="flex w-max animate-marquee gap-4 px-4 group-hover:[animation-play-state:paused] sm:px-0">
          {loopItems.map((item, index) => (
            <div
              key={`${item.image}-${index}`}
              className="w-[240px] shrink-0 overflow-hidden rounded-xl2 border border-sage-light bg-white/80 shadow-soft sm:w-[280px]"
            >
              <ImageSlot
                slot={item.image}
                alt={item.title}
                aspect="landscape"
                rounded="rounded-none"
              />
              <div className="p-4">
                <h3 className="mb-1.5 text-[16px] font-semibold text-forest-deep">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink/70">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
