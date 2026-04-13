import { serverSupabaseUser } from '#supabase/server'
import { getServiceClient, requireAuth, respondError, respondSuccess } from '~/server/utils/auth'

interface Body {
  first_name: string
  last_name: string
  birth_date: string
  phone?: string | null
  gender?: string | null
  /** Identificación adicional (documento, etc.) — se guarda en profiles.notes */
  identification?: string | null
}

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') return respondError('Método no permitido')

  try {
    await requireAuth(event)
    const user = await serverSupabaseUser(event)
    if (!user?.email) return respondError('No autenticado')

    const body = await readBody<Body>(event)
    const first = (body.first_name || '').trim()
    const last = (body.last_name || '').trim()
    const bd = (body.birth_date || '').trim()

    if (!first || !last) return respondError('Nombre y apellido son obligatorios')
    if (!bd) return respondError('La fecha de nacimiento es obligatoria')

    const birth = new Date(bd)
    if (Number.isNaN(birth.getTime())) return respondError('Fecha de nacimiento no válida')
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
    if (age < 13) return respondError('Debes tener al menos 13 años')
    if (age > 120) return respondError('Fecha de nacimiento no válida')

    const phone = (body.phone || '').trim() || null
    const gender = (body.gender || '').trim() || null
    const identification = (body.identification || '').trim() || null

    const adminClient = getServiceClient(event) as any

    const { data: existing, error: exErr } = await adminClient
      .from('profiles')
      .select('id, role, notes, avatar_url, is_active')
      .eq('id', user.id)
      .maybeSingle()
    if (exErr) return respondError('Error leyendo perfil', exErr.message)

    const fullName = `${first} ${last}`.trim()
    const notesParts: string[] = []
    if (identification) notesParts.push(`Identificación: ${identification}`)
    const mergedNotes = [notesParts.join('\n'), (existing as any)?.notes].filter(Boolean).join('\n\n').trim() || null

    const role =
      (existing as any)?.role === 'admin'
        ? 'admin'
        : (existing as any)?.role === 'user'
          ? 'user'
          : (existing as any)?.role === 'manager'
            ? 'manager'
            : (existing as any)?.role || 'customer'

    const upsertRow: Record<string, unknown> = {
      id: user.id,
      email: user.email!.toLowerCase(),
      first_name: first,
      last_name: last,
      name: fullName,
      birth_date: bd,
      phone,
      gender,
      notes: mergedNotes,
      role,
      is_active: (existing as any)?.is_active !== false,
      avatar_url: (existing as any)?.avatar_url ?? null,
      updated_at: new Date().toISOString()
    }

    const { data: profile, error: upErr } = await adminClient
      .from('profiles')
      .upsert(upsertRow, { onConflict: 'id' })
      .select()
      .single()

    if (upErr) return respondError('Error guardando perfil', upErr.message)

    const { data: custRow } = await adminClient
      .from('customers')
      .select('id_customer')
      .eq('user_id', user.id)
      .maybeSingle()

    const custPayload = {
      user_id: user.id,
      first_name: first,
      last_name: last,
      email: user.email!.toLowerCase(),
      phone,
      is_active: true,
      updated_at: new Date().toISOString()
    }

    if (custRow?.id_customer) {
      await adminClient.from('customers').update(custPayload).eq('id_customer', custRow.id_customer)
    } else {
      await adminClient.from('customers').insert({
        ...custPayload,
        country: 'México'
      })
    }

    return respondSuccess(profile, 'Perfil completado')
  } catch (e: any) {
    console.error('POST /api/auth/complete-profile', e)
    return respondError('Error interno del servidor', e?.message)
  }
})
