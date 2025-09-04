import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { createClient } from '@supabase/supabase-js'

/**
 * Requiere que exista sesión y que el usuario tenga rol admin.
 * Lanza createError con 401/403 si no cumple.
 */
export async function requireAdmin(event: any) {
  const { user } = await requireAuth(event)

  // Usar client con service role para evitar bloqueos por RLS al leer el perfil
  const config = useRuntimeConfig()
  const serviceClient = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false } }
  )
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
  const user = await serverSupabaseUser(event)
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


