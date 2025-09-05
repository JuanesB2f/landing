import { serverSupabaseClient } from '#supabase/server'
import { createClient } from '@supabase/supabase-js'
import { requireAdmin, respondSuccess, respondError } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)
  const config = useRuntimeConfig()
  const serviceClient = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false } }
  )

  if (method === 'GET') {
    try {
      // Obtener todos los perfiles de usuario
      // Usar service role para listar todos los perfiles en panel admin
      const { data: profiles, error } = await serviceClient
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error obteniendo perfiles:', error)
        return {
          data: {
            success: false,
            error: 'Error obteniendo perfiles',
            details: error.message
          }
        }
      }

      // Procesar los perfiles para incluir información adicional
      const processedProfiles = profiles.map(profile => ({
        ...profile,
        full_name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || null
      }))

      return respondSuccess(processedProfiles)

    } catch (error) {
      console.error('Error en GET /api/profiles:', error)
      return respondError('Error interno del servidor')
    }
  }

  if (method === 'POST') {
    try {
      await requireAdmin(event)
      const body = await readBody(event)
      
      // Validar campos requeridos
      if (!body.first_name || !body.last_name || !body.email || !body.password || !body.role) {
        return respondError('Los campos nombre, apellido, email, contraseña y rol son requeridos')
      }

      // Verificar si el email ya existe
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', body.email)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error verificando email duplicado:', checkError)
        return respondError('Error verificando email duplicado')
      }

      if (existingProfile) {
        return respondError('Ya existe un usuario con este email')
      }

      // Crear usuario en Supabase Auth usando service role
      const config = useRuntimeConfig()
      const serviceClient = createClient(
        config.public.supabaseUrl,
        config.supabaseServiceKey,
        { auth: { persistSession: false } }
      )
      const { data: authData, error: authError } = await serviceClient.auth.admin.createUser({
        email: body.email.trim().toLowerCase(),
        password: body.password,
        email_confirm: true
      })

      if (authError) {
        console.error('Error creando usuario en Auth:', authError)
        return respondError('Error creando usuario en el sistema de autenticación', authError.message)
      }

      // Crear perfil del usuario
      const newProfile = {
        id: authData.user.id,
        name: `${body.first_name.trim()} ${body.last_name.trim()}`,
        first_name: body.first_name.trim(),
        last_name: body.last_name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone?.trim() || null,
        address: body.address?.trim() || null,
        city: body.city?.trim() || null,
        state: body.state?.trim() || null,
        postal_code: body.postal_code?.trim() || null,
        country: body.country?.trim() || null,
        birth_date: body.birth_date || null,
        gender: body.gender || null,
        role: body.role,
        is_active: body.is_active !== undefined ? body.is_active : true,
        notes: body.notes?.trim() || null
      }

      const { data: profileData, error: profileError } = await serviceClient
        .from('profiles')
        .upsert(newProfile as any, { onConflict: 'id' })
        .select()
        .single()

      if (profileError) {
        console.error('Error creando perfil:', profileError)
        // Intentar eliminar el usuario de Auth si falla la creación del perfil
        await serviceClient.auth.admin.deleteUser(authData.user.id)
        return respondError('Error creando perfil del usuario', profileError.message)
      }

      return respondSuccess(profileData, 'Usuario creado exitosamente')

    } catch (error) {
      console.error('Error en POST /api/profiles:', error)
      return respondError('Error interno del servidor')
    }
  }

  return respondError('Método no permitido')
})
