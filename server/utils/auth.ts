import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { createClient } from '@supabase/supabase-js'

/** Cliente de Supabase con service role (solo servidor). Lanza 503 si faltan env. */
export function getServiceClient() {
  const config = useRuntimeConfig()
  const url = config.public?.supabaseUrl
  const key = config.supabaseServiceKey
  if (!url || !key) {
    console.error('[auth] Faltan NUXT_SUPABASE_URL o NUXT_SUPABASE_SERVICE_KEY en el servidor (ej. Vercel)')
    throw createError({
      statusCode: 503,
      statusMessage: 'Server configuration error',
      message: 'Missing Supabase configuration. Set NUXT_SUPABASE_URL and NUXT_SUPABASE_SERVICE_KEY in Vercel.'
    })
  }
  return createClient(url, key, { auth: { persistSession: false } })
}

/**
 * Requiere que exista sesión y que el usuario tenga rol admin.
 * Lanza createError con 401/403 si no cumple.
 */
export async function requireAdmin(event: any) {
  const { user } = await requireAuth(event)

  const serviceClient = getServiceClient()
  const { data: profile, error } = await serviceClient
    .from('profiles')
    .select('role, is_active')
    .eq('id', user.id)
    .single()

  if (error || !profile) {
    throw createError({ statusCode: 403, statusMessage: 'Perfil no encontrado' })
  }

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


