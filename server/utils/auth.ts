import { serverSupabaseClient, serverSupabaseUser, serverSupabaseServiceRole } from '#supabase/server'

/** Cliente de Supabase con service role (solo servidor). Usa el del módulo @nuxtjs/supabase para evitar import directo en Vercel. */
export function getServiceClient(event: any) {
  return serverSupabaseServiceRole(event)
}

/**
 * Requiere que exista sesión y que el usuario tenga rol admin.
 * Lanza createError con 401/403 si no cumple.
 */
export async function requireAdmin(event: any) {
  const { user } = await requireAuth(event)

  const serviceClient = getServiceClient(event)
  const { data: profileData, error } = await serviceClient
    .from('profiles')
    .select('role, is_active')
    .eq('id', user.id)
    .single()

  if (error || !profileData) {
    throw createError({ statusCode: 403, statusMessage: 'Perfil no encontrado' })
  }

  const profile = profileData as { role?: string; is_active?: boolean }
  if (!profile.is_active) {
    throw createError({ statusCode: 403, statusMessage: 'Usuario inactivo' })
  }

  if (profile.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Acceso denegado' })
  }

  return { user, profile }
}

/**
 * Requiere sesión autenticada; no valida rol.
 */
export async function requireAuth(event: any) {
  let user
  try {
    user = await serverSupabaseUser(event)
  } catch (e) {
    console.error('[auth] serverSupabaseUser error (revisar env/cookies en Vercel):', e)
    throw createError({ statusCode: 503, statusMessage: 'Auth unavailable', message: 'Session could not be verified.' })
  }
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'No autenticado' })
  }
  return { user }
}

/** Helper para respuestas exitosas con formato unificado */
export function respondSuccess(data: any, message?: string) {
  return { data: { success: true, data, ...(message ? { message } : {}) } }
}

/** Helper para respuestas de error con formato unificado (sin lanzar) */
export function respondError(message: string, details?: any) {
  return { data: { success: false, error: message, ...(details ? { details } : {}) } }
}


