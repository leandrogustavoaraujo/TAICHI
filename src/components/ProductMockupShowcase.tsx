import ImageSlot from './ImageSlot'
import PhoneMockup, { PlayButton } from './PhoneMockup'
import ScrollToOfferCTA from './ScrollToOfferCTA'

const MODULES = [
  {
    week: 'Semana 1',
    state: 'done' as const,
    lessons: [
      { title: 'Boas-vindas e postura básica', done: true },
      { title: 'Movimento 1 — Respiração', done: true },
      { title: 'Movimento 3 — Ombros e braços', done: false, current: true },
    ],
  },
  {
    week: 'Semana 2',
    state: 'locked' as const,
    lessons: [
      { title: 'Movimento 4 — Equilíbrio', done: false },
      { title: 'Movimento 5 — Quadril', done: false },
    ],
  },
  {
    week: 'Semana 3',
    state: 'locked' as const,
    lessons: [{ title: 'Sequência completa, parte 1', done: false }],
  },
]

function LessonIcon({ done, current }: { done: boolean; current?: boolean }) {
  if (done) {
    return (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-[10px] text-cream">
        ✓
      </span>
    )
  }
  if (current) {
    return (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-terracotta">
        <span className="h-2 w-2 rounded-full bg-terracotta" />
      </span>
    )
  }
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-sage-light text-ink/30">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  )
}

function ModuleList() {
  return (
    <div className="flex w-full flex-col border-t border-sage-light bg-cream-soft sm:w-[220px] sm:border-l sm:border-t-0">
      <div className="border-b border-sage-light/70 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-forest/70">
        Módulos
      </div>
      <div className="max-h-[260px] overflow-y-auto">
        {MODULES.map((mod) => (
          <div key={mod.week} className="border-b border-sage-light/50 px-4 py-3 text-left">
            <div
              className={`mb-2 text-[11px] font-bold uppercase tracking-wide ${
                mod.state === 'locked' ? 'text-ink/35' : 'text-forest-deep'
              }`}
            >
              {mod.week}
            </div>
            <ul className="space-y-2">
              {mod.lessons.map((lesson) => (
                <li key={lesson.title} className="flex items-center gap-2">
                  <LessonIcon done={lesson.done} current={'current' in lesson && lesson.current} />
                  <span
                    className={`truncate text-[12.5px] leading-snug ${
                      'current' in lesson && lesson.current
                        ? 'font-semibold text-terracotta'
                        : mod.state === 'locked'
                          ? 'text-ink/35'
                          : 'text-ink/75'
                    }`}
                  >
                    {lesson.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function BrowserMockup() {
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-xl2 border border-sage-light bg-white shadow-card">
      <div className="flex items-center gap-1.5 border-b border-sage-light bg-sage-light/30 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-terracotta/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-sage" />
        <span className="h-2.5 w-2.5 rounded-full bg-forest/40" />
        <span className="ml-3 truncate text-[11px] text-ink/40">Área de prática</span>
      </div>

      <div className="flex flex-col sm:flex-row">
        {/* real lesson video, paused — the tangible "this is the actual course" moment */}
        <div className="group relative aspect-video w-full shrink-0 overflow-hidden bg-forest-deep sm:w-[calc(100%-220px)]">
          <ImageSlot
            slot="mockup-video-landscape"
            alt="Aula gravada de Tai Chi — Semana 1, Movimento 3"
            rounded="rounded-none"
            fill
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayButton />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-3">
            <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-terracotta-soft">
              Aula guiada · 07:12
            </div>
            <div className="mb-2 text-[13px] font-semibold text-cream">
              Semana 1 · Movimento 3 — Ombros e braços
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-cream/25">
              <div className="h-full w-2/5 rounded-full bg-terracotta" />
            </div>
          </div>
        </div>

        <ModuleList />
      </div>
    </div>
  )
}

export default function ProductMockupShowcase() {
  return (
    <div className="mb-12 rounded-xl2 bg-forest-deep px-5 py-10 text-center text-cream sm:px-10">
      <h2 className="mb-2 text-balance text-2xl font-semibold sm:text-[28px]">
        Seu Tai Chi em Casa já está preparado.
      </h2>
      <p className="mx-auto mb-8 max-w-md text-[15px] leading-relaxed text-cream/75">
        Acesse suas aulas gravadas direto pelo celular ou computador e acompanhe sua jornada no
        seu ritmo.
      </p>
      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-end sm:gap-8">
        <BrowserMockup />
        <PhoneMockup />
      </div>
      <div className="mt-9">
        <ScrollToOfferCTA className="!border-terracotta-soft !text-terracotta-soft hover:!bg-terracotta-soft hover:!text-forest-deep">
          Ver meu plano completo
        </ScrollToOfferCTA>
      </div>
    </div>
  )
}
