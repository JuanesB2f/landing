/**
 * API endpoint para cambiar el estado de una categoría
 * PATCH: Cambiar is_active entre true/false
 */

import { serverSupabaseClient } from '#supabase/server'
import { requireAdmin, respondSuccess, respondError } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')
  const supabase = await serverSupabaseClient<any>(event)

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
        error: 'ID de categoría requerido'
      }
    }
  }

  try {
    // Solo administradores
    await requireAdmin(event)
    // Obtener el estado actual de la categoría
    const { data: currentCategory, error: fetchError } = await supabase
      .from('categories')
      .select('is_active')
      .eq('id_category', id)
      .single()

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return {
          data: {
            success: false,
            error: 'Categoría no encontrada'
          }
        }
      }
      console.error('Error obteniendo categoría:', fetchError)
      return {
        data: {
          success: false,
          error: 'Error obteniendo categoría'
        }
      }
    }

    // Cambiar el estado
    const newStatus = !(currentCategory as any).is_active

    const { data, error } = await supabase
      .from('categories')
      .update({ 
        is_active: newStatus,
        updated_at: new Date().toISOString()
      } as any)
      .eq('id_category', id)
      .select()
      .single()

    if (error) {
      console.error('Error cambiando estado de categoría:', error)
      return respondError('Error cambiando estado de categoría')
    }

    return respondSuccess({ ...(data as any), product_count: 0 }, `Categoría ${newStatus ? 'activada' : 'desactivada'} exitosamente`)
  } catch (error) {
    console.error('Error inesperado:', error)
    return respondError('Error interno del servidor')
  }
})
