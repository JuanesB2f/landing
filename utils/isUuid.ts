/**
 * Validación ligera de UUID v4 (formato estándar usado por Supabase).
 */
export function isUuid(value: string | null | undefined): boolean {
  if (value == null || String(value).trim() === '') return false
  const s = String(value).trim()
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s)
}
