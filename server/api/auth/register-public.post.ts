import { getServiceClient, respondError, respondSuccess } from '~/server/utils/auth'

/**
 * Registro público sin verificación por correo: crea el usuario en Auth con email ya
 * "confirmado" y fila en profiles. El cliente debe llamar después a signInWithPassword.
 * Requiere SUPABASE_SERVICE_ROLE en el servidor (ya usado por el proyecto).
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{
      email?: string
      password?: string
      first_name?: string
      last_name?: string
    }>(event)

    const email = body.email?.trim().toLowerCase()
    const password = body.password ?? ''
    const first_name = body.first_name?.trim() ?? ''
    const last_name = body.last_name?.trim() ?? ''

    if (!email || !password) {
      return respondError('Correo y contraseña son obligatorios')
    }
    if (!first_name || !last_name) {
      return respondError('Nombre y apellido son obligatorios')
    }
    if (password.length < 6) {
      return respondError('La contraseña debe tener al menos 6 caracteres')
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return respondError('Correo electrónico no válido')
    }

    const admin = getServiceClient(event) as any

    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: `${first_name} ${last_name}`.trim()
      }
    })

    if (createErr) {
      const msg = createErr.message || 'No se pudo crear la cuenta'
      if (msg.toLowerCase().includes('already') || msg.toLowerCase().includes('registered')) {
        return respondError('Ya existe una cuenta con este correo')
      }
      return respondError(msg)
    }

    const user = created.user
    if (!user?.id) {
      return respondError('Respuesta inválida al crear usuario')
    }

    const name = `${first_name} ${last_name}`.trim()
    const payload = {
      id: user.id,
      email,
      role: 'customer',
      first_name,
      last_name,
      name,
      is_active: true,
      updated_at: new Date().toISOString()
    }

    const { error: profErr } = await admin.from('profiles').upsert(payload, { onConflict: 'id' })
    if (profErr) {
      console.error('[register-public] perfil:', profErr)
      try {
        await admin.auth.admin.deleteUser(user.id)
      } catch {
        /* ignore */
      }
      return respondError('No se pudo guardar el perfil', profErr.message)
    }

    return respondSuccess({ userId: user.id }, 'Cuenta creada')
  } catch (e) {
    console.error('[register-public]', e)
    return respondError('Error al registrar')
  }
})
