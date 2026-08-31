# Tai Chi em Casa 45+ — Quiz Funnel

Funil completo: Intro → 8 perguntas (com 2 telas de reforço) → Processamento →
Resultado personalizado → Progressão de 28 dias → Prévia bloqueada → Oferta →
Checkout.

React + TypeScript + Vite + Tailwind. 100% client-side (localStorage), sem
backend, sem IA — regras determinísticas conforme especificado.

## Estrutura do funil (atualizado)

A tela de entrada já mostra a pergunta da idade com fotos, igual à
referência enviada por Leandro — sem um CTA "criar meu plano" separado. A
pessoa se identifica na hora ("48 anos? Eu me encaixo aqui") e ao tocar numa
faixa etária já avança direto para a pergunta 2. As mesmas 8 perguntas
continuam existindo — só que a primeira (idade) mora dentro da tela de
entrada em vez de uma tela própria. A barra de progresso só aparece a partir
da pergunta 2 (2/8), de propósito — a tela de entrada não mostra barra,
igual à referência.

## Posicionamento (reformulado)

O produto é **Tai Chi em Casa 45+** (subtítulo: "Seu Plano Personalizado").
Os 28 dias deixaram de ser o nome do produto — agora são a **Jornada
Inicial**, reforçada em vários pontos como não sendo a validade do acesso
("E o Dia 28 não é o fim.").

## Quiz — 9 perguntas

A 9ª pergunta (`bodyFocus`, multi-select) pergunta quais regiões do corpo a
pessoa quer sentir mais soltas/ativas, com uma silhueta que acende
conforme a seleção (`BodySilhouette.tsx` + `BodyFocusScreen.tsx`). A
pergunta de objetivo (`mainGoal`) ganhou uma 6ª opção ligada a controle de
peso, sempre com foco em rotina/movimento — nunca "emagrecer rápido" ou
promessas de resultado.

## Landing pós-quiz — nova arquitetura

Ordem atual da página de resultado: resultado pronto → interpretação
visual (`PlanStartVisual` — comparação Hoje/Plano + 4-5 bullets dinâmicos,
incluindo a região corporal escolhida) → dados compactos → CTA
intermediário (`ScrollToOfferCTA`, scroll suave) → jornada de 28 dias →
continuidade → prévia bloqueada → mockups do produto (navegador + celular,
`ProductMockupShowcase`) → carrossel "o que você recebe" (6 cards) → prova
social + FAQ → garantia → oferta → CTA final. No mobile, uma barra fixa
(`StickyMobileCTA`) aparece depois que a pessoa passa da primeira dobra e
some quando a oferta real entra na tela.

**Prova social e garantia ficam ocultas por padrão** — `src/config/
trustConfig.ts` tem `TESTIMONIALS = []` e `GUARANTEE_CONFIG = null`; nada é
inventado. Assim que você tiver depoimentos reais ou definir uma política
de garantia, preencha esse arquivo e as seções aparecem automaticamente.

## Motor de personalização

`src/logic/personalizationEngine.ts` + `src/data/personalizationMatrix.ts`
compõem, a partir das respostas do quiz:
- o resumo dinâmico no topo do resultado (`PersonalizationSummary`);
- os 3 bullets de "Por que esse plano combina com seu momento atual"
  (`WhyThisPlanFits`) — sempre 1 de barreira, 1 de tempo disponível, 1 de
  objetivo;
- os chips "Preparado para você" dentro da oferta.

Nada é inventado: cada trecho só aparece se a resposta de origem existir.
Testado com as 5 combinações do briefing (idade/atividade/experiência/
barreira/objetivo bem diferentes entre si) — os 5 resumos gerados são
únicos.

## Rodando localmente

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # gera /dist (build de produção, testado e passando)
npm run preview   # serve o build de produção localmente
```

## Onde entram as imagens reais

Coloque os arquivos `.webp` em `public/images/quiz/` usando exatamente estes
nomes (ver `src/data/quizQuestions.ts` e `src/App.tsx` para a lista completa
de slots):

```
intro.webp
age-45-54.webp / age-55-64.webp / age-65-74.webp / age-75-plus.webp
activity-sedentary.webp / activity-low.webp / activity-somewhat.webp / activity-active.webp
experience-never.webp / experience-tried.webp / experience-past.webp / experience-current.webp
goal-movement.webp / goal-vitality.webp / goal-mobility.webp / goal-consistency.webp / goal-calm.webp / goal-weight.webp
reinforcement-start.webp / reinforcement-progress.webp
result.webp
product-cover.webp
showcase-webapp.webp / showcase-lessons.webp / showcase-progress.webp / showcase-course.webp / showcase-access.webp / showcase-progression.webp
```

A pergunta corporal (última do quiz) usa uma ilustração vetorial própria
(`BodySilhouette.tsx`) em vez de fotos — as regiões acendem em terracota
conforme a pessoa seleciona, sem precisar de imagem externa.

`product-cover` é a imagem do card de compra (Seção "Desbloqueie agora"). Os
quatro `showcase-*` são os cards do carrossel "O que você vai receber" —
pensados pra receber prints/mockups reais do seu web app e das aulas quando
você gerar essas imagens.

Até que os arquivos reais existam, cada slot renderiza um placeholder
elegante (gradiente na paleta da marca + ícone de Tai Chi) com o aspect
ratio correto — nunca um retângulo cinza. Basta soltar o `.webp` com o nome
certo na pasta que ele substitui o placeholder automaticamente (fallback via
`onError` da tag `<img>`), sem precisar mexer em código.

## Configurar preço e checkout

Edite `src/config/offerConfig.ts`:

```ts
export const OFFER_CONFIG: OfferConfig = {
  productName: 'Plano Personalizado de Tai Chi 45+ — 28 Dias',
  price: 27.9,               // já configurado
  compareAtPrice: null,      // defina um valor "de" se quiser âncora de preço
  currency: 'BRL',
  checkoutUrl: 'https://pay.wiapy.com/xxxxx', // link real do checkout
}
```

Enquanto `price` for `null`, a seção de oferta mostra um estado de
desenvolvimento claro (sem inventar preço) e o botão de CTA fica desabilitado
até `checkoutUrl` ser preenchido — nada quebra, nada engana o usuário.

## Analytics

`src/utils/analytics.ts` expõe `track(event, payload)` já disparando os 8
eventos pedidos (`quiz_started`, `question_answered`,
`reinforcement_viewed`, `quiz_completed`, `processing_started`,
`result_viewed`, `offer_viewed`, `checkout_clicked`). Se `window.fbq`
(Meta Pixel) ou `window.dataLayer` (GTM) existirem na página, os eventos são
enviados automaticamente — basta colar o script do Pixel/UTMify no
`index.html` quando o produto for para produção.

## UTM

UTMs (`utm_source/medium/campaign/content/term`) são capturadas da URL no
primeiro carregamento, persistidas no localStorage durante toda a sessão e
anexadas automaticamente à `checkoutUrl` no clique do CTA
(`src/utils/utm.ts`).

## Lógica de perfil (determineProfile)

Prioridade implementada exatamente como especificado — experiência anterior/
atual > nível de atividade > intensidade > tempo disponível — e testada
contra os 5 cenários do briefing (ver `/tmp` durante o desenvolvimento;
todos passaram). Idade nunca é usada para decidir o perfil. O nome interno
do perfil não aparece em destaque no resultado — só o "ponto de partida"
(campo `startingPoint` em `src/data/profiles.ts`) discretamente.

## Estrutura

```
src/
  components/   UI (QuestionScreen, AnswerCard, ReinforcementScreen,
                ProcessingScreen, PersonalizedResult, OfferSection, etc.)
  data/         quizQuestions, profiles, progression, personalizationCopy,
                answerLabels, types
  logic/        determineProfile, frequencyRecommendation
  config/       offerConfig
  hooks/        useQuizFlow (state machine + persistência + analytics)
  utils/        storage (localStorage), analytics, utm
```

## Checklist de conclusão (todos os itens do briefing)

- [x] 8 perguntas funcionam (single-choice, card inteiro clicável, avanço automático ~300ms)
- [x] 2 telas de reforço funcionam (após pergunta 2 e após pergunta 5)
- [x] barra de progresso conta só perguntas (1/8 … 8/8, reforços não inflam)
- [x] botão voltar funciona e preserva a resposta selecionada
- [x] respostas persistem no localStorage (refresh não reinicia o quiz)
- [x] processamento com 4 etapas encadeadas, ~3.3s (dentro de 2.8–4s)
- [x] perfil calculado deterministicamente (5 cenários do briefing testados e passando)
- [x] configuração do plano muda conforme respostas (duração, ritmo, frequência)
- [x] barreira e objetivo aparecem como texto de personalização no resultado
- [x] progressão de 28 dias (4 semanas) aparece
- [x] prévia bloqueada (6 cards com cadeado) aparece
- [x] oferta com 8 pilares aparece
- [x] CTA principal + CTA secundário funcionam
- [x] checkout configurável via offerConfig.ts, com UTM anexado
- [x] mobile-first (375/390px testado via build responsivo Tailwind)
- [x] `npm run build` passa sem erros
