/**
 * Perfil mínimo para operar como cliente: nombre, apellido y fecha de nacimiento.
 */
export function needsProfileCompletion(profile: {
  first_name?: string | null
  last_name?: string | null
  birth_date?: string | null
  role?: string | null
} | null): boolean {
  if (!profile) return true
  if (profile.role === 'admin' || profile.role === 'manager') return false
  const fn = (profile.first_name || '').trim()
  const ln = (profile.last_name || '').trim()
  if (!fn || !ln) return true
  if (!profile.birth_date) return true
  return false
}

export function computeAgeFromBirthDate(isoDate: string): number | null {
  if (!isoDate) return null
  const d = new Date(isoDate)
  if (Number.isNaN(d.getTime())) return null
  const today = new Date()
  let age = today.getFullYear() - d.getFullYear()
  const m = today.getMonth() - d.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--
  return age >= 0 ? age : null
}
