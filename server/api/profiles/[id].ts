import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    return {
      success: false,
      error: 'ID de usuario requerido'
    }
  }

  if (method === 'GET') {
    try {
      // Obtener perfil específico
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return {
            success: false,
            error: 'Usuario no encontrado'
          }
        }
        console.error('Error obteniendo perfil:', error)
        return {
          success: false,
          error: 'Error obteniendo perfil',
          details: error.message
        }
      }

      // Procesar el perfil para incluir información adicional
      const processedProfile = {
        ...profile,
        full_name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || null
      }

      return {
        success: true,
        data: processedProfile
      }

    } catch (error) {
      console.error('Error en GET /api/profiles/[id]:', error)
      return {
        success: false,
        error: 'Error interno del servidor'
      }
    }
  }

  if (method === 'PUT') {
    try {
      const body = await readBody(event)
      
      // Validar campos requeridos
      if (!body.first_name || !body.last_name || !body.email || !body.role) {
        return {
          success: false,
          error: 'Los campos nombre, apellido, email y rol son requeridos'
        }
      }

      // Verificar si el email ya existe en otro usuario
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', body.email)
        .neq('id', id)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error verificando email duplicado:', checkError)
        return {
          success: false,
          error: 'Error verificando email duplicado'
        }
      }

      if (existingProfile) {
        return {
          success: false,
          error: 'Ya existe otro usuario con este email'
        }
      }

      // Actualizar perfil
      const updatedProfile = {
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
        notes: body.notes?.trim() || null,
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('profiles')
        .update(updatedProfile)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error actualizando perfil:', error)
        return {
          success: false,
          error: 'Error actualizando perfil',
          details: error.message
        }
      }

      return {
        success: true,
        data: data,
        message: 'Perfil actualizado exitosamente'
      }

    } catch (error) {
      console.error('Error en PUT /api/profiles/[id]:', error)
      return {
        success: false,
        error: 'Error interno del servidor'
      }
    }
  }

  if (method === 'DELETE') {
    try {
      // Verificar si el usuario tiene pedidos asociados
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('id_order')
        .eq('customer_id', id)
        .limit(1)

      if (ordersError) {
        console.error('Error verificando pedidos del usuario:', ordersError)
        return {
          success: false,
          error: 'Error verificando pedidos del usuario'
        }
      }

      if (orders && orders.length > 0) {
        return {
          success: false,
          error: 'No se puede eliminar el usuario porque tiene pedidos asociados'
        }
      }

      // Eliminar usuario de Supabase Auth
      const { error: authError } = await supabase.auth.admin.deleteUser(id)
      if (authError) {
        console.error('Error eliminando usuario de Auth:', authError)
        return {
          success: false,
          error: 'Error eliminando usuario del sistema de autenticación',
          details: authError.message
        }
      }

      // Eliminar perfil
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error eliminando perfil:', error)
        return {
          success: false,
          error: 'Error eliminando perfil',
          details: error.message
        }
      }

      return {
        success: true,
        message: 'Usuario eliminado exitosamente'
      }

    } catch (error) {
      console.error('Error en DELETE /api/profiles/[id]:', error)
      return {
        success: false,
        error: 'Error interno del servidor'
      }
    }
  }

  return {
    success: false,
    error: 'Método no permitido'
  }
})
