/** Today's date in Brazilian format, computed client-side (e.g. "20/08/2026"). */
export function todayBR(): string {
  return new Date().toLocaleDateString('pt-BR')
}
