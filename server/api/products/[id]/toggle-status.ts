import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    return {
      data: {
        success: false,
        error: 'ID de producto requerido'
      }
    }
  }

  if (method !== 'PATCH') {
    return {
      data: {
        success: false,
        error: 'Método no permitido'
      }
    }
  }

  try {
    // Obtener el estado actual del producto
    const { data: currentProduct, error: getError } = await client
      .from('products')
      .select('is_active')
      .eq('id_product', id)
      .single()

    if (getError) {
      if (getError.code === 'PGRST116') {
        return {
          data: {
            success: false,
            error: 'Producto no encontrado'
          }
        }
      }
      return {
        data: {
          success: false,
          error: 'Error obteniendo producto'
        }
      }
    }

    // Cambiar el estado
    const newStatus = !currentProduct.is_active

    const { data: updatedProduct, error: updateError } = await client
      .from('products')
      .update({
        is_active: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id_product', id)
      .select()
      .single()

    if (updateError) {
      return {
        data: {
          success: false,
          error: 'Error actualizando producto'
        }
      }
    }

    return {
      data: {
        success: true,
        data: updatedProduct,
        message: `Producto ${newStatus ? 'activado' : 'desactivado'} exitosamente`
      }
    }
  } catch (error) {
    console.error('Error cambiando estado del producto:', error)
    
    return {
      data: {
        success: false,
        error: error.message || 'Error interno del servidor'
      }
    }
  }
})
