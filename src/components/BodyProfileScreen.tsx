import type { QuizAnswers } from '../data/types'
import PrimaryCTA from './PrimaryCTA'

interface Props { answers: QuizAnswers; onContinue: () => void }

export default function BodyProfileScreen({ answers, onContinue }: Props) {
  const height = answers.heightCm ?? 160
  const weight = answers.currentWeightKg ?? 70
  const bmi = weight / ((height / 100) ** 2)
  const position = Math.min(96, Math.max(4, ((bmi - 15) / 25) * 100))
  const interpretation = bmi < 18.5
    ? { title: 'Vamos fortalecer seu corpo', text: 'Seu perfil indica que o plano deve priorizar força, estabilidade e evolução gradual.' }
    : bmi < 25
      ? { title: 'Uma boa base para evoluir', text: 'Seu perfil está em uma faixa equilibrada. Vamos trabalhar mobilidade, firmeza e constância.' }
      : { title: 'Hora de equilibrar seu corpo', text: 'Seu peso está um pouco acima da faixa de referência. Vamos priorizar movimentos suaves, mobilidade e uma rotina possível de manter.' }

  return <div className="mx-auto w-full max-w-xl animate-fadeSlideIn px-4 py-10"><div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-6 shadow-card sm:p-8"><h1 className="mb-7 text-center text-[27px]">Seu perfil com base nas respostas:</h1><div className="mb-6"><p className="font-bold">Nível</p><p className="mb-2 text-sm text-ink/55">Índice de Massa Corporal (IMC)</p><div className="relative"><div className="h-3 rounded-full bg-gradient-to-r from-lime-400 via-yellow-400 to-red-500"/><span className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-forest shadow" style={{ left: `${position}%` }}/></div><div className="mt-1 flex justify-between text-[10px] text-ink/45"><span>Abaixo do peso</span><span>Normal</span><span>Sobrepeso</span><span>Obesidade</span></div></div><div className="mb-6 rounded-2xl border border-sage bg-sage-light/40 p-4"><p className="mb-1 font-bold">{interpretation.title}</p><p className="text-sm leading-relaxed text-ink/65">{interpretation.text}</p></div><div className="mb-7 space-y-4 text-sm"><div><p className="font-bold">Nível de energia</p><p className="text-ink/60">{answers.activityLevel === 'active' ? 'Alto' : answers.activityLevel === 'sedentary' ? 'Baixo' : 'Moderado'}</p></div><div><p className="font-bold">Meta informada</p><p className="text-ink/60">Chegar a {answers.targetWeightKg ?? 60} kg com uma rotina progressiva</p></div><div><p className="font-bold">Motivação para o Tai Chi</p><p className="text-ink/60">Alta</p></div></div><PrimaryCTA onClick={onContinue} className="w-full sm:w-full">Continuar</PrimaryCTA><p className="mt-3 text-center text-[11px] text-ink/40">Estimativa educativa; não substitui avaliação profissional.</p></div></div>
}
