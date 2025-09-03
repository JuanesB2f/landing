/**
 * API endpoint para movimientos de inventario
 * GET: Obtener movimientos de un producto específico
 * POST: Registrar nuevo movimiento
 */

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)

  if (method === 'GET') {
    try {
      const query = getQuery(event)
      const productId = query.product_id

      if (!productId) {
        return {
          success: false,
          error: 'ID de producto requerido',
          data: null
        }
      }

      // Obtener movimientos del producto ordenados por fecha
      const { data: movements, error } = await supabase
        .from('inventory_movements')
        .select('*')
        .eq('product_id', productId)
        .order('movement_date', { ascending: false })

      if (error) {
        console.error('Error obteniendo movimientos:', error)
        return {
          success: false,
          error: 'Error obteniendo movimientos',
          data: null
        }
      }

      return {
        success: true,
        data: movements,
        error: null
      }
    } catch (error) {
      console.error('Error inesperado:', error)
      return {
        success: false,
        error: 'Error interno del servidor',
        data: null
      }
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      
      // Validar campos requeridos
      if (!body.product_id || !body.movement_type || !body.quantity || !body.reason) {
        return {
          success: false,
          error: 'Todos los campos son obligatorios',
          data: null
        }
      }

      // Obtener stock actual del producto
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('stock_quantity')
        .eq('id_product', body.product_id)
        .single()

      if (productError || !product) {
        return {
          success: false,
          error: 'Producto no encontrado',
          data: null
        }
      }

      const currentStock = product.stock_quantity
      let newStock = currentStock

      // Calcular nuevo stock según el tipo de movimiento
      switch (body.movement_type) {
        case 'in':
        case 'return':
          newStock = currentStock + body.quantity
          break
        case 'out':
        case 'damaged':
          newStock = Math.max(0, currentStock - body.quantity)
          break
        case 'adjustment':
          newStock = body.quantity
          break
        default:
          return {
            success: false,
            error: 'Tipo de movimiento no válido',
            data: null
          }
      }

      // Crear el movimiento
      const movementData = {
        product_id: body.product_id,
        movement_type: body.movement_type,
        quantity: body.quantity,
        stock_before: currentStock,
        stock_after: newStock,
        reason: body.reason,
        description: body.description || null,
        movement_date: body.movement_date || new Date().toISOString(),
        reference: body.reference || null
      }

      const { data: movement, error: movementError } = await supabase
        .from('inventory_movements')
        .insert(movementData)
        .select()
        .single()

      if (movementError) {
        console.error('Error creando movimiento:', movementError)
        return {
          success: false,
          error: 'Error creando movimiento',
          data: null
        }
      }

      // Actualizar stock del producto
      const { error: updateError } = await supabase
        .from('products')
        .update({ 
          stock_quantity: newStock,
          updated_at: new Date().toISOString()
        })
        .eq('id_product', body.product_id)

      if (updateError) {
        console.error('Error actualizando stock:', updateError)
        // Revertir el movimiento si no se puede actualizar el stock
        await supabase
          .from('inventory_movements')
          .delete()
          .eq('id_movement', movement.id_movement)
        
        return {
          success: false,
          error: 'Error actualizando stock del producto',
          data: null
        }
      }

      return {
        success: true,
        data: movement,
        error: null
      }
    } catch (error) {
      console.error('Error inesperado:', error)
      return {
        success: false,
        error: 'Error interno del servidor',
        data: null
      }
    }
  }

  // Método no permitido
  return {
    success: false,
    error: 'Método no permitido',
    data: null
  }
})
