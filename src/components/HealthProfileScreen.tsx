import { useState, type ReactNode } from 'react'
import type { CurrentBodyType, DesiredBodyType, HealthConsideration, QuizAnswers, ReferenceBodyRegion } from '../data/types'
import PrimaryCTA from './PrimaryCTA'

type ProfileValues = Pick<QuizAnswers, 'currentBodyType' | 'desiredBodyType' | 'heightCm' | 'currentWeightKg' | 'targetWeightKg' | 'healthConsiderations' | 'referenceBodyRegions'>

interface Props { currentValue: QuizAnswers; onSubmit: (values: ProfileValues) => void }

const BODY_TYPES: { value: CurrentBodyType; label: string; image: string }[] = [
  { value: 'slim', label: 'Magra', image: '/images/quiz/body-cards/corpo-atual-magra.webp' },
  { value: 'skinny_fat', label: 'Falsa Magra', image: '/images/quiz/body-cards/corpo-atual-falsa-magra.webp' },
  { value: 'overweight', label: 'Acima do peso', image: '/images/quiz/body-cards/corpo-atual-acima-do-peso.webp' },
]
const HEALTH_OPTIONS: { value: HealthConsideration; label: string; icon?: string }[] = [
  { value: 'weight', label: 'Estar acima do peso' }, { value: 'pain', label: 'Meu corpo vive dolorido e travado' },
  { value: 'fatigue', label: 'Vivo cansada e sem energia' }, { value: 'mind', label: 'Minha mente não desacelera' },
  { value: 'sleep', label: 'Durmo muito mal' }, { value: 'health', label: 'Só quero cuidar da saúde', icon: '❤️' },
]
const DESIRED_TYPES: { value: DesiredBodyType; label: string; image: string }[] = [
  { value: 'slim', label: 'Magra', image: '/images/quiz/body-cards/corpo-desejado-magra.webp' },
  { value: 'toned', label: 'Torneada', image: '/images/quiz/body-cards/corpo-desejado-torneada.webp' },
  { value: 'defined', label: 'Definida', image: '/images/quiz/body-cards/corpo-desejado-definida.webp' },
]
const BODY_REGIONS: { value: Exclude<ReferenceBodyRegion, 'whole_body'>; label: string; image: string }[] = [
  { value: 'breasts', label: 'Seios', image: '/images/quiz/regions/seios.webp' },
  { value: 'arms', label: 'Braços', image: '/images/quiz/regions/bracos.webp' },
  { value: 'belly', label: 'Barriga', image: '/images/quiz/regions/barriga.webp' },
  { value: 'neck', label: 'Pescoço', image: '/images/quiz/regions/pescoco.webp' },
  { value: 'glutes', label: 'Glúteos', image: '/images/quiz/regions/gluteos.webp' },
  { value: 'thighs', label: 'Coxas', image: '/images/quiz/regions/coxas.webp' },
]

export default function HealthProfileScreen({ currentValue, onSubmit }: Props) {
  const [screen, setScreen] = useState(0)
  const [currentBodyType, setCurrentBodyType] = useState<CurrentBodyType | undefined>(currentValue.currentBodyType)
  const [healthConsiderations, setHealthConsiderations] = useState<HealthConsideration[]>(currentValue.healthConsiderations ?? [])
  const [desiredBodyType, setDesiredBodyType] = useState<DesiredBodyType | undefined>(currentValue.desiredBodyType)
  const [referenceBodyRegions, setReferenceBodyRegions] = useState<ReferenceBodyRegion[]>(currentValue.referenceBodyRegions ?? [])
  const [heightCm, setHeightCm] = useState(currentValue.heightCm ?? 160)
  const [currentWeightKg, setCurrentWeightKg] = useState(currentValue.currentWeightKg ?? 70)
  const [targetWeightKg, setTargetWeightKg] = useState(currentValue.targetWeightKg ?? 60)

  const card = (content: ReactNode) => <div className="mx-auto w-full max-w-xl animate-fadeSlideIn px-4 py-8 sm:py-12"><div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-card backdrop-blur-sm sm:p-8">{content}</div></div>
  const option = (label: string, selected: boolean, onClick: () => void, icon?: string) => <button key={label} type="button" aria-pressed={selected} onClick={onClick} className={`focus-ring mb-3 flex w-full items-center rounded-2xl border-2 p-4 text-left text-base font-semibold transition ${selected ? 'border-forest bg-sage-light/70 text-forest-deep' : 'border-white/80 bg-white/70 text-ink hover:border-forest/35'}`}>{icon && <span className="mr-3" aria-hidden="true">{icon}</span>}<span className="flex-1">{label}</span><span className="text-xl text-ink/25" aria-hidden="true">›</span></button>

  const toggleHealth = (value: HealthConsideration) => setHealthConsiderations((items) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value])
  const toggleRegion = (value: ReferenceBodyRegion) => setReferenceBodyRegions((items) => {
    if (value === 'whole_body') return items.includes(value) ? [] : ['whole_body']
    const withoutWhole = items.filter((item) => item !== 'whole_body')
    return withoutWhole.includes(value) ? withoutWhole.filter((item) => item !== value) : [...withoutWhole, value]
  })

  if (screen === 0) return card(<><h1 className="mb-6 text-center text-[26px]">Escolha seu tipo de corpo atual:</h1><div className="grid grid-cols-3 gap-2.5 sm:gap-3">{BODY_TYPES.map((item) => <button key={item.value} type="button" onClick={() => { setCurrentBodyType(item.value); setScreen(1) }} className="focus-ring overflow-hidden rounded-2xl border-2 border-white/80 bg-white/70 px-2 pb-4 pt-2 text-center text-sm font-semibold transition hover:border-forest/40 sm:text-base"><div className="mb-2 h-44 w-full overflow-hidden rounded-xl bg-sage-light/45 sm:h-56"><img src={item.image} alt={`Corpo atual: ${item.label}`} className="h-full w-full object-contain object-bottom" loading="eager" /></div>{item.label}</button>)}</div></>)

  if (screen === 1) return card(<><h1 className="mb-2 text-center text-[26px]">O que mais <span className="text-forest">incomoda</span> você hoje?</h1><p className="mb-5 text-center text-sm text-ink/55">Pode marcar mais de uma opção, se quiser.</p>{HEALTH_OPTIONS.map((item) => option(item.label, healthConsiderations.includes(item.value), () => toggleHealth(item.value), item.icon))}<PrimaryCTA onClick={() => setScreen(2)} disabled={healthConsiderations.length === 0} className="mt-2 w-full sm:w-full">Continuar</PrimaryCTA></>)

  if (screen === 2) return card(<><h1 className="mb-6 text-center text-[26px]">Qual corpo você quer conquistar?</h1><div className="grid grid-cols-3 gap-2.5 sm:gap-3">{DESIRED_TYPES.map((item) => <button key={item.value} type="button" onClick={() => { setDesiredBodyType(item.value); setScreen(3) }} className="focus-ring overflow-hidden rounded-2xl border-2 border-white/80 bg-white/70 px-2 pb-4 pt-2 text-center text-sm font-semibold transition hover:border-forest/40 sm:text-base"><div className="mb-2 h-44 w-full overflow-hidden rounded-xl bg-sage-light/45 sm:h-56"><img src={item.image} alt={`Corpo desejado: ${item.label}`} className="h-full w-full object-contain object-bottom" loading="lazy" /></div>{item.label}</button>)}</div></>)

  if (screen === 3) return card(<><h1 className="mb-2 text-center text-[26px]">Em quais regiões do corpo você gostaria de melhorar?</h1><p className="mb-5 text-center text-sm text-ink/55">Pode selecionar quantas quiser.</p><div className="mb-4 grid grid-cols-3 gap-3">{BODY_REGIONS.map((item) => { const selected = referenceBodyRegions.includes(item.value); return <button key={item.value} type="button" aria-pressed={selected} onClick={() => toggleRegion(item.value)} className={`focus-ring overflow-hidden rounded-2xl border-2 bg-white p-2 text-center text-sm font-semibold transition ${selected ? 'border-forest ring-2 ring-forest/15' : 'border-white hover:border-forest/30'}`}><img src={item.image} alt={item.label} className="mb-2 aspect-square w-full rounded-xl object-cover" loading="lazy" />{item.label}</button> })}</div>{option('Quero cuidar do corpo todo', referenceBodyRegions.includes('whole_body'), () => toggleRegion('whole_body'), '✅')}<PrimaryCTA onClick={() => setScreen(4)} disabled={referenceBodyRegions.length === 0} className="mt-2 w-full sm:w-full">Continuar</PrimaryCTA></>)

  const measureScreen = (title: string, value: number, setValue: (value: number) => void, min: number, max: number, suffix: string, helper: string | undefined, next: () => void, cta: string, testId: string) => card(<><h1 className="mb-5 text-center text-[26px]">{title}</h1><div className="mb-5 text-center"><span className="text-5xl font-bold text-forest-deep">{value}</span><span className="ml-1 text-xl text-ink/50">{suffix}</span></div><input data-testid={testId} aria-label={title} type="range" min={min} max={max} value={value} onChange={(event) => setValue(Number(event.target.value))} className="h-3 w-full cursor-pointer accent-forest" /><div className="mb-5 mt-1 flex justify-between text-xs text-ink/45"><span>{min} {suffix}</span><span>{max} {suffix}</span></div>{helper && <p className="mb-5 text-sm leading-relaxed text-ink/60">{helper}</p>}<PrimaryCTA onClick={next} className="w-full sm:w-full">{cta}</PrimaryCTA></>)

  if (screen === 4) return measureScreen('Qual é a sua altura?', heightCm, setHeightCm, 140, 200, 'cm', 'Calculando seu IMC. Sua altura nos ajuda a adaptar os movimentos à estrutura do seu corpo. O Tai Chi se adapta a você — e não o contrário.', () => setScreen(5), 'Próximo passo', 'slider-altura')
  if (screen === 5) return measureScreen('Qual é seu peso atual?', currentWeightKg, setCurrentWeightKg, 40, 150, 'kg', 'Usamos seu peso para ajustar a intensidade e o impacto — não para forçar seus limites. O Tai Chi trabalha com seu corpo de forma suave e eficaz.', () => setScreen(6), 'Continuar', 'slider-peso')
  return measureScreen('Em qual peso você quer chegar?', targetWeightKg, setTargetWeightKg, 40, 150, 'kg', undefined, () => onSubmit({ currentBodyType, desiredBodyType, heightCm, currentWeightKg, targetWeightKg, healthConsiderations, referenceBodyRegions }), 'Continuar', 'slider-peso-desejado')
}
