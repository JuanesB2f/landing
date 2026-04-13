import { serverSupabaseUser } from '#supabase/server'
import { respondError, respondSuccess, requireAuth, getServiceClient } from '~/server/utils/auth'

// Ensures a profile row exists for the authenticated user and upgrades role to 'user'
export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  if (method !== 'POST') return respondError('Método no permitido')

  try {
    await requireAuth(event)
    const user = await serverSupabaseUser(event)
    if (!user) return respondError('No autenticado')

    const adminClient = getServiceClient(event) as any

    let body: { first_name?: string; last_name?: string; role?: string } = {}
    try {
      const raw = await readBody<{
        first_name?: string
        last_name?: string
        role?: string
      }>(event)
      if (raw && typeof raw === 'object') body = raw
    } catch {
      body = {}
    }

    // Upsert profile (si ya es admin, conservar rol)
    const { data: existing } = await adminClient
      .from('profiles')
      .select('id, role, email, first_name, last_name, name')
      .eq('id', user.id)
      .maybeSingle()

    let role: string
    if (existing?.role === 'admin') {
      role = 'admin'
    } else if (body.role && ['customer', 'user', 'manager'].includes(body.role)) {
      role = body.role
    } else if (existing?.role) {
      role = existing.role
    } else {
      role = 'customer'
    }

    const payload: any = {
      id: user.id,
      email: user.email,
      role,
      updated_at: new Date().toISOString(),
      ...(existing ? {} : { is_active: true })
    }

    if (body.first_name?.trim()) payload.first_name = body.first_name.trim()
    if (body.last_name?.trim()) payload.last_name = body.last_name.trim()

    if (!payload.first_name && user.user_metadata?.full_name) {
      const parts = String(user.user_metadata.full_name).split(' ')
      payload.first_name = parts[0] || existing?.first_name || null
      payload.last_name = parts.slice(1).join(' ') || existing?.last_name || null
    }

    payload.name =
      [payload.first_name, payload.last_name].filter(Boolean).join(' ').trim() ||
      existing?.name ||
      user.user_metadata?.full_name ||
      user.email

    const upsertRes = await adminClient
      .from('profiles')
      .upsert(payload, { onConflict: 'id' })
      .select()
      .maybeSingle()
    if (upsertRes.error) return respondError('Error guardando perfil', upsertRes.error.message)

    return respondSuccess(upsertRes.data || payload, 'Perfil actualizado')
  } catch (e) {
    console.error('POST /api/auth/upsert-profile error:', e)
    return respondError('Error interno del servidor')
  }
})


