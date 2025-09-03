import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)

  if (method === 'GET') {
    try {
      // Obtener todos los perfiles de usuario
      const { data: profiles, error } = await supabase
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

      return {
        data: {
          success: true,
          data: processedProfiles
        }
      }

    } catch (error) {
      console.error('Error en GET /api/profiles:', error)
      return {
        data: {
          success: false,
          error: 'Error interno del servidor'
        }
      }
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      
      // Validar campos requeridos
      if (!body.first_name || !body.last_name || !body.email || !body.password || !body.role) {
        return {
          data: {
            success: false,
            error: 'Los campos nombre, apellido, email, contraseña y rol son requeridos'
          }
        }
      }

      // Verificar si el email ya existe
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', body.email)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error verificando email duplicado:', checkError)
        return {
          data: {
            success: false,
            error: 'Error verificando email duplicado'
          }
        }
      }

      if (existingProfile) {
        return {
          data: {
            success: false,
            error: 'Ya existe un usuario con este email'
          }
        }
      }

      // Crear usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: body.email.trim().toLowerCase(),
        password: body.password,
        email_confirm: true
      })

      if (authError) {
        console.error('Error creando usuario en Auth:', authError)
        return {
          data: {
            success: false,
            error: 'Error creando usuario en el sistema de autenticación',
            details: authError.message
          }
        }
      }

      // Crear perfil del usuario
      const newProfile = {
        id: authData.user.id,
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

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert(newProfile)
        .select()
        .single()

      if (profileError) {
        console.error('Error creando perfil:', profileError)
        // Intentar eliminar el usuario de Auth si falla la creación del perfil
        await supabase.auth.admin.deleteUser(authData.user.id)
        return {
          data: {
            success: false,
            error: 'Error creando perfil del usuario',
            details: profileError.message
          }
        }
      }

      return {
        data: {
          success: true,
          data: profileData,
          message: 'Usuario creado exitosamente'
        }
      }

    } catch (error) {
      console.error('Error en POST /api/profiles:', error)
      return {
        data: {
          success: false,
          error: 'Error interno del servidor'
        }
      }
    }
  }

  return {
    data: {
      success: false,
      error: 'Método no permitido'
    }
  }
})
