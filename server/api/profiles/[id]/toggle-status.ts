import { serverSupabaseClient } from '#supabase/server'
import { requireAdmin, respondSuccess, respondError } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)
  const id = getRouterParam(event, 'id')

  if (method !== 'PATCH') {
    return {
      data: {
        success: false,
        error: 'Método no permitido'
      }
    }
  }

  if (!id) {
    return {
      data: {
        success: false,
        error: 'ID de usuario requerido'
      }
    }
  }

  try {
    await requireAdmin(event)
    // Obtener el estado actual del usuario
    const { data: currentProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('is_active')
      .eq('id', id)
      .single()

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return {
          data: {
            success: false,
            error: 'Usuario no encontrado'
          }
        }
      }
      console.error('Error obteniendo estado del usuario:', fetchError)
      return {
        data: {
          success: false,
          error: 'Error obteniendo estado del usuario',
          details: fetchError.message
        }
      }
    }

    // Cambiar el estado (invertir)
    const newStatus = !currentProfile.is_active

    // Actualizar el estado
    const { data, error } = await supabase
      .from('profiles')
      .update({ 
        is_active: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select('id, is_active')
      .single()

    if (error) {
      console.error('Error actualizando estado del usuario:', error)
      return {
        data: {
          success: false,
          error: 'Error actualizando estado del usuario',
          details: error.message
        }
      }
    }

    return respondSuccess({ id: data.id, is_active: data.is_active }, `Usuario ${data.is_active ? 'activado' : 'desactivado'} exitosamente`)

  } catch (error) {
    console.error('Error en PATCH /api/profiles/[id]/toggle-status:', error)
    return respondError('Error interno del servidor')
  }
})
