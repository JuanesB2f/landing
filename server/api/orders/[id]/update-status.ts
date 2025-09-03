import { serverSupabaseClient } from '#supabase/server'

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
        error: 'ID de pedido requerido'
      }
    }
  }

  try {
    const body = await readBody(event)
    
    // Validar campos requeridos
    if (!body.status) {
      return {
        data: {
          success: false,
          error: 'El nuevo estado es requerido'
        }
      }
    }

    // Validar estado válido
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
    if (!validStatuses.includes(body.status)) {
      return {
        data: {
          success: false,
          error: 'Estado no válido. Estados permitidos: pending, confirmed, shipped, delivered, cancelled'
        }
      }
    }

    // Obtener el pedido actual
    const { data: currentOrder, error: fetchError } = await supabase
      .from('orders')
      .select('id_order, status, payment_status')
      .eq('id_order', id)
      .single()

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return {
          data: {
            success: false,
            error: 'Pedido no encontrado'
          }
        }
      }
      console.error('Error obteniendo pedido:', fetchError)
      return {
        data: {
          success: false,
          error: 'Error obteniendo pedido',
          details: fetchError.message
        }
      }
    }

    // Validar transiciones de estado permitidas
    const currentStatus = currentOrder.status
    const newStatus = body.status

    // Reglas de transición de estado
    const allowedTransitions = {
      'pending': ['confirmed', 'cancelled'],
      'confirmed': ['shipped', 'cancelled'],
      'shipped': ['delivered', 'cancelled'],
      'delivered': [], // Estado final
      'cancelled': [] // Estado final
    }

    if (!allowedTransitions[currentStatus].includes(newStatus)) {
      return {
        data: {
          success: false,
          error: `No se puede cambiar el estado de '${currentStatus}' a '${newStatus}'. Transiciones permitidas: ${allowedTransitions[currentStatus].join(', ')}`
        }
      }
    }

    // Validaciones específicas por estado
    if (newStatus === 'shipped' && !body.tracking_number) {
      return {
        data: {
          success: false,
          error: 'El número de seguimiento es requerido cuando el estado cambia a "shipped"'
        }
      }
    }

    if (newStatus === 'confirmed' && currentOrder.payment_status !== 'paid') {
      return {
        data: {
          success: false,
          error: 'No se puede confirmar un pedido con estado de pago pendiente'
        }
      }
    }

    // Preparar datos de actualización
    const updateData = {
      status: newStatus,
      updated_at: new Date().toISOString()
    }

    // Agregar tracking number si se proporciona
    if (body.tracking_number) {
      updateData.tracking_number = body.tracking_number.trim()
    }

    // Agregar notas si se proporcionan
    if (body.notes) {
      updateData.notes = body.notes.trim()
    }

    // Actualizar el pedido
    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id_order', id)
      .select('id_order, status, tracking_number, notes, updated_at')
      .single()

    if (error) {
      console.error('Error actualizando estado del pedido:', error)
      return {
        data: {
          success: false,
          error: 'Error actualizando estado del pedido',
          details: error.message
        }
      }
    }

    // Si el pedido se cancela, restaurar stock
    if (newStatus === 'cancelled' && currentStatus !== 'cancelled') {
      const { data: orderItems, error: itemsError } = await supabase
        .from('order_items')
        .select('product_id, quantity')
        .eq('order_id', id)

      if (itemsError) {
        console.error('Error obteniendo items para restaurar stock:', itemsError)
      } else if (orderItems) {
        for (const item of orderItems) {
          const { error: stockError } = await supabase
            .from('products')
            .update({ 
              stock_quantity: supabase.raw(`stock_quantity + ${item.quantity}`),
              updated_at: new Date().toISOString()
            })
            .eq('id_product', item.product_id)

          if (stockError) {
            console.error('Error restaurando stock:', stockError)
          }
        }
      }
    }

    // Si el pedido se confirma desde pendiente, verificar stock nuevamente
    if (newStatus === 'confirmed' && currentStatus === 'pending') {
      const { data: orderItems, error: itemsError } = await supabase
        .from('order_items')
        .select('product_id, quantity')
        .eq('order_id', id)

      if (itemsError) {
        console.error('Error obteniendo items para verificar stock:', itemsError)
      } else if (orderItems) {
        for (const item of orderItems) {
          const { data: product, error: productError } = await supabase
            .from('products')
            .select('stock_quantity, name')
            .eq('id_product', item.product_id)
            .single()

          if (productError) {
            console.error('Error verificando stock del producto:', productError)
          } else if (product.stock_quantity < item.quantity) {
            console.warn(`Stock insuficiente para ${product.name} al confirmar pedido`)
          }
        }
      }
    }

    return {
      data: {
        success: true,
        data: {
          id_order: data.id_order,
          status: data.status,
          tracking_number: data.tracking_number,
          notes: data.notes,
          updated_at: data.updated_at
        },
        message: `Estado del pedido actualizado exitosamente a '${newStatus}'`
      }
    }

  } catch (error) {
    console.error('Error en PATCH /api/orders/[id]/update-status:', error)
    return {
      data: {
        success: false,
        error: 'Error interno del servidor'
      }
    }
  }
})
