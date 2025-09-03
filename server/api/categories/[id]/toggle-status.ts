/**
 * API endpoint para cambiar el estado de una categoría
 * PATCH: Cambiar is_active entre true/false
 */

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')
  const supabase = await serverSupabaseClient(event)

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
    const newStatus = !currentCategory.is_active

    const { data, error } = await supabase
      .from('categories')
      .update({ 
        is_active: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id_category', id)
      .select()
      .single()

    if (error) {
      console.error('Error cambiando estado de categoría:', error)
      return {
        data: {
          success: false,
          error: 'Error cambiando estado de categoría'
        }
      }
    }

    return {
      data: {
        success: true,
        data: { ...data, product_count: 0 },
        message: `Categoría ${newStatus ? 'activada' : 'desactivada'} exitosamente`
      }
    }
  } catch (error) {
    console.error('Error inesperado:', error)
    return {
      data: {
        success: false,
        error: 'Error interno del servidor'
      }
    }
  }
})
