/**
 * API endpoint para inventario
 * GET: Obtener inventario con información de productos
 */

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)

  if (method !== 'GET') {
    return {
      data: {
        success: false,
        error: 'Método no permitido'
      }
    }
  }

  try {
    // Obtener productos con información de categorías y último movimiento
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(name)
      `)
      .eq('is_active', true)
      .order('name')

    if (error) {
      console.error('Error obteniendo inventario:', error)
      return {
        data: {
          success: false,
          error: 'Error obteniendo inventario'
        }
      }
    }

    // Procesar los datos para incluir información básica
    const processedProducts = products.map(product => ({
      ...product,
      category: product.category,
      last_movement_date: null, // Temporalmente null hasta implementar movimientos
      movements: undefined
    }))

    return {
      data: {
        success: true,
        data: processedProducts
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
