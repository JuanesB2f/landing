/**
 * API endpoint para ajustes de stock
 * POST: Realizar ajuste de stock
 */

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)

  if (method !== 'POST') {
    return {
      success: false,
      error: 'Método no permitido',
      data: null
    }
  }

  try {
    const body = await readBody(event)
    
    // Validar campos requeridos
    if (!body.product_id || !body.adjustment_type || !body.quantity || !body.reason) {
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

    // Calcular nuevo stock según el tipo de ajuste
    switch (body.adjustment_type) {
      case 'set':
        newStock = body.quantity
        break
      case 'add':
        newStock = currentStock + body.quantity
        break
      case 'subtract':
        newStock = Math.max(0, currentStock - body.quantity)
        break
      default:
        return {
          success: false,
          error: 'Tipo de ajuste no válido',
          data: null
        }
    }

    // Crear el movimiento de ajuste
    const movementData = {
      product_id: body.product_id,
      movement_type: 'adjustment',
      quantity: Math.abs(newStock - currentStock),
      stock_before: currentStock,
      stock_after: newStock,
      reason: body.reason,
      description: body.description || `Ajuste de stock: ${body.adjustment_type}`,
      movement_date: body.adjustment_date || new Date().toISOString(),
      reference: body.reference || null
    }

    const { data: movement, error: movementError } = await supabase
      .from('inventory_movements')
      .insert(movementData)
      .select()
      .single()

    if (movementError) {
      console.error('Error creando movimiento de ajuste:', movementError)
      return {
        success: false,
        error: 'Error creando movimiento de ajuste',
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
      data: {
        movement,
        old_stock: currentStock,
        new_stock: newStock
      },
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
})
