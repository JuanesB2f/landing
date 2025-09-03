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
    if (!body.payment_status) {
      return {
        data: {
          success: false,
          error: 'El nuevo estado de pago es requerido'
        }
      }
    }

    // Validar estado de pago válido
    const validPaymentStatuses = ['pending', 'paid', 'failed', 'refunded']
    if (!validPaymentStatuses.includes(body.payment_status)) {
      return {
        data: {
          success: false,
          error: 'Estado de pago no válido. Estados permitidos: pending, paid, failed, refunded'
        }
      }
    }

    // Obtener el pedido actual
    const { data: currentOrder, error: fetchError } = await supabase
      .from('orders')
      .select('id_order, payment_status, status')
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

    // Validar transiciones de estado de pago permitidas
    const currentPaymentStatus = currentOrder.payment_status
    const newPaymentStatus = body.payment_status

    // Reglas de transición de estado de pago
    const allowedPaymentTransitions = {
      'pending': ['paid', 'failed'],
      'paid': ['refunded'],
      'failed': ['pending', 'paid'],
      'refunded': [] // Estado final
    }

    if (!allowedPaymentTransitions[currentPaymentStatus].includes(newPaymentStatus)) {
      return {
        data: {
          success: false,
          error: `No se puede cambiar el estado de pago de '${currentPaymentStatus}' a '${newPaymentStatus}'. Transiciones permitidas: ${allowedPaymentTransitions[currentPaymentStatus].join(', ')}`
        }
      }
    }

    // Validaciones específicas por estado de pago
    if (newPaymentStatus === 'refunded' && currentPaymentStatus !== 'paid') {
      return {
        data: {
          success: false,
          error: 'Solo se puede reembolsar un pedido que esté pagado'
        }
      }
    }

    if (newPaymentStatus === 'paid' && currentPaymentStatus === 'refunded') {
      return {
        data: {
          success: false,
          error: 'No se puede marcar como pagado un pedido reembolsado'
        }
      }
    }

    // Preparar datos de actualización
    const updateData = {
      payment_status: newPaymentStatus,
      updated_at: new Date().toISOString()
    }

    // Agregar notas si se proporcionan
    if (body.notes) {
      updateData.notes = body.notes.trim()
    }

    // Agregar método de pago si se proporciona
    if (body.payment_method) {
      updateData.payment_method = body.payment_method.trim()
    }

    // Agregar referencia de pago si se proporciona
    if (body.payment_reference) {
      updateData.payment_reference = body.payment_reference.trim()
    }

    // Actualizar el pedido
    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id_order', id)
      .select('id_order, payment_status, payment_method, notes, updated_at')
      .single()

    if (error) {
      console.error('Error actualizando estado de pago del pedido:', error)
      return {
        data: {
          success: false,
          error: 'Error actualizando estado de pago del pedido',
          details: error.message
        }
      }
    }

    // Si el pago se marca como fallido, restaurar stock si el pedido estaba confirmado
    if (newPaymentStatus === 'failed' && currentPaymentStatus === 'paid' && currentOrder.status === 'confirmed') {
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

    // Si el pago se marca como pagado, verificar si se puede confirmar el pedido
    if (newPaymentStatus === 'paid' && currentPaymentStatus === 'pending' && currentOrder.status === 'pending') {
      // Verificar stock antes de confirmar automáticamente
      const { data: orderItems, error: itemsError } = await supabase
        .from('order_items')
        .select('product_id, quantity')
        .eq('order_id', id)

      if (itemsError) {
        console.error('Error obteniendo items para verificar stock:', itemsError)
      } else if (orderItems) {
        let canConfirm = true
        
        for (const item of orderItems) {
          const { data: product, error: productError } = await supabase
            .from('products')
            .select('stock_quantity, name')
            .eq('id_product', item.product_id)
            .single()

          if (productError) {
            console.error('Error verificando stock del producto:', productError)
            canConfirm = false
          } else if (product.stock_quantity < item.quantity) {
            console.warn(`Stock insuficiente para ${product.name} al confirmar pedido automáticamente`)
            canConfirm = false
          }
        }

        // Si se puede confirmar, hacerlo automáticamente
        if (canConfirm) {
          const { error: confirmError } = await supabase
            .from('orders')
            .update({ 
              status: 'confirmed',
              updated_at: new Date().toISOString()
            })
            .eq('id_order', id)

          if (confirmError) {
            console.error('Error confirmando pedido automáticamente:', confirmError)
          } else {
            console.log('Pedido confirmado automáticamente después del pago')
          }
        }
      }
    }

    return {
      data: {
        success: true,
        data: {
          id_order: data.id_order,
          payment_status: data.payment_status,
          payment_method: data.payment_method,
          notes: data.notes,
          updated_at: data.updated_at
        },
        message: `Estado de pago del pedido actualizado exitosamente a '${newPaymentStatus}'`
      }
    }

  } catch (error) {
    console.error('Error en PATCH /api/orders/[id]/update-payment:', error)
    return {
      data: {
        success: false,
        error: 'Error interno del servidor'
      }
    }
  }
})
