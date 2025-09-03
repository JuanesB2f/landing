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
        error: 'ID de proveedor requerido'
      }
    }
  }

  try {
    // Requiere admin
    await requireAdmin(event)
    // Obtener el estado actual del proveedor
    const { data: currentProvider, error: fetchError } = await supabase
      .from('providers')
      .select('is_active')
      .eq('id_provider', id)
      .single()

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return {
          data: {
            success: false,
            error: 'Proveedor no encontrado'
          }
        }
      }
      return {
        data: {
          success: false,
          error: 'Error obteniendo proveedor'
        }
      }
    }

    // Cambiar el estado (invertir)
    const newStatus = !currentProvider.is_active

    // Actualizar el estado
    const { data: updatedProvider, error: updateError } = await supabase
      .from('providers')
      .update({
        is_active: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id_provider', id)
      .select('id_provider, name, is_active')
      .single()

    if (updateError) {
      return {
        data: {
          success: false,
          error: 'Error actualizando proveedor'
        }
      }
    }

    return respondSuccess(updatedProvider, `Proveedor ${newStatus ? 'activado' : 'desactivado'} exitosamente`)

  } catch (error) {
    console.error('Error cambiando estado del proveedor:', error)
    return respondError((error as any).statusMessage || (error as any).message || 'Error interno del servidor')
  }
})
