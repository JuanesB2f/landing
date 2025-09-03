import { serverSupabaseClient } from '#supabase/server'
import { requireAdmin, respondSuccess, respondError } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    return {
      success: false,
      error: 'ID de pedido requerido'
    }
  }

  if (method === 'GET') {
    try {
      // Obtener pedido específico con información relacionada
      const { data: order, error } = await supabase
        .from('orders')
        .select(`
          *,
          customer:customers(
            id_customer,
            first_name,
            last_name,
            email,
            phone,
            address,
            city,
            state,
            postal_code,
            country
          ),
          order_items:order_items(
            id_order_item,
            quantity,
            unit_price,
            total_price,
            product:products(
              id_product,
              name,
              sku,
              image_url,
              price
            )
          )
        `)
        .eq('id_order', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return {
            success: false,
            error: 'Pedido no encontrado'
          }
        }
        console.error('Error obteniendo pedido:', error)
        return {
          success: false,
          error: 'Error obteniendo pedido',
          details: error.message
        }
      }

      // Procesar el pedido para incluir información adicional
      const processedOrder = {
        ...order,
        customer_name: order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : 'Cliente no encontrado',
        customer_email: order.customer?.email || 'N/A',
        customer_phone: order.customer?.phone || 'N/A',
        items_count: order.order_items?.length || 0,
        // Calcular totales si no están presentes
        total_amount: order.total_amount || 0,
        subtotal: order.subtotal || 0
      }

      return respondSuccess(processedOrder)

    } catch (error) {
      console.error('Error en GET /api/orders/[id]:', error)
      return respondError('Error interno del servidor')
    }
  }

  if (method === 'PUT') {
    try {
      await requireAdmin(event)
      const body = await readBody(event)
      
      // Validar campos requeridos
      if (!body.customer_id || !body.order_items || body.order_items.length === 0) {
        return respondError('El cliente y al menos un item son requeridos')
      }

      // Verificar que el pedido existe
      const { data: existingOrder, error: orderError } = await supabase
        .from('orders')
        .select('id_order, status')
        .eq('id_order', id)
        .single()

      if (orderError || !existingOrder) {
        return respondError('Pedido no encontrado')
      }

      // Solo permitir edición de pedidos pendientes o confirmados
      if (existingOrder.status !== 'pending' && existingOrder.status !== 'confirmed') {
        return respondError('Solo se pueden editar pedidos pendientes o confirmados')
      }

      // Verificar que el cliente existe
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('id_customer, is_active')
        .eq('id_customer', body.customer_id)
        .single()

      if (customerError || !customer) {
        return respondError('Cliente no encontrado')
      }

      if (!customer.is_active) {
        return respondError('El cliente está inactivo')
      }

      // Obtener items actuales del pedido para restaurar stock
      const { data: currentItems, error: currentItemsError } = await supabase
        .from('order_items')
        .select('product_id, quantity')
        .eq('order_id', id)

      if (currentItemsError) {
        console.error('Error obteniendo items actuales:', currentItemsError)
      }

      // Restaurar stock de items actuales
      if (currentItems) {
        for (const item of currentItems) {
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

      // Calcular totales de nuevos items
      let subtotal = 0
      const orderItems = []

      for (const item of body.order_items) {
        if (!item.product_id || !item.quantity || !item.unit_price) {
          return respondError('Todos los items deben tener product_id, quantity y unit_price')
        }

        // Verificar que el producto existe y tiene stock
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('id_product, name, stock_quantity, price')
          .eq('id_product', item.product_id)
          .single()

        if (productError || !product) {
          return respondError(`Producto ${item.product_id} no encontrado`)
        }

        if (product.stock_quantity < item.quantity) {
          return respondError(`Stock insuficiente para ${product.name}. Disponible: ${product.stock_quantity}, Solicitado: ${item.quantity}`)
        }

        const totalPrice = item.quantity * item.unit_price
        subtotal += totalPrice

        orderItems.push({
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price: totalPrice
        })
      }

      // Calcular totales finales
      const taxAmount = body.tax_amount || 0
      const shippingAmount = body.shipping_amount || 0
      const totalAmount = subtotal + taxAmount + shippingAmount

      // Actualizar el pedido
      const updatedOrder = {
        customer_id: body.customer_id,
        total_amount: totalAmount,
        subtotal: subtotal,
        tax_amount: taxAmount,
        shipping_amount: shippingAmount,
        status: body.status || existingOrder.status,
        shipping_address: body.shipping_address || null,
        billing_address: body.billing_address || null,
        payment_method: body.payment_method || null,
        payment_status: body.payment_status || 'pending',
        tracking_number: body.tracking_number || null,
        notes: body.notes || null,
        updated_at: new Date().toISOString()
      }

      const { data: orderData, error: updateError } = await supabase
        .from('orders')
        .update(updatedOrder)
        .eq('id_order', id)
        .select()
        .single()

      if (updateError) {
        console.error('Error actualizando pedido:', updateError)
        return respondError('Error actualizando pedido', updateError.message)
      }

      // Eliminar items actuales
      const { error: deleteItemsError } = await supabase
        .from('order_items')
        .delete()
        .eq('order_id', id)

      if (deleteItemsError) {
        console.error('Error eliminando items actuales:', deleteItemsError)
        return respondError('Error eliminando items actuales', deleteItemsError.message)
      }

      // Crear nuevos items
      const orderItemsWithOrderId = orderItems.map(item => ({
        ...item,
        order_id: id
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsWithOrderId)

      if (itemsError) {
        console.error('Error creando nuevos items:', itemsError)
        return respondError('Error creando nuevos items', itemsError.message)
      }

      // Actualizar stock de productos
      for (const item of orderItems) {
        const { error: stockError } = await supabase
          .from('products')
          .update({ 
            stock_quantity: supabase.raw(`stock_quantity - ${item.quantity}`),
            updated_at: new Date().toISOString()
          })
          .eq('id_product', item.product_id)

        if (stockError) {
          console.error('Error actualizando stock:', stockError)
        }
      }

      return respondSuccess(orderData, 'Pedido actualizado exitosamente')

    } catch (error) {
      console.error('Error en PUT /api/orders/[id]:', error)
      return respondError('Error interno del servidor')
    }
  }

  if (method === 'DELETE') {
    try {
      await requireAdmin(event)
      // Verificar que el pedido existe
      const { data: existingOrder, error: orderError } = await supabase
        .from('orders')
        .select('id_order, status')
        .eq('id_order', id)
        .single()

      if (orderError || !existingOrder) {
        return respondError('Pedido no encontrado')
      }

      // Solo permitir eliminación de pedidos pendientes
      if (existingOrder.status !== 'pending') {
        return respondError('Solo se pueden eliminar pedidos pendientes')
      }

      // Obtener items del pedido para restaurar stock
      const { data: orderItems, error: itemsError } = await supabase
        .from('order_items')
        .select('product_id, quantity')
        .eq('order_id', id)

      if (itemsError) {
        console.error('Error obteniendo items del pedido:', itemsError)
      }

      // Restaurar stock de productos
      if (orderItems) {
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

      // Eliminar items del pedido
      const { error: deleteItemsError } = await supabase
        .from('order_items')
        .delete()
        .eq('order_id', id)

      if (deleteItemsError) {
        console.error('Error eliminando items del pedido:', deleteItemsError)
        return respondError('Error eliminando items del pedido', deleteItemsError.message)
      }

      // Eliminar el pedido
      const { error: deleteOrderError } = await supabase
        .from('orders')
        .delete()
        .eq('id_order', id)

      if (deleteOrderError) {
        console.error('Error eliminando pedido:', deleteOrderError)
        return respondError('Error eliminando pedido', deleteOrderError.message)
      }

      return respondSuccess(null, 'Pedido eliminado exitosamente')

    } catch (error) {
      console.error('Error en DELETE /api/orders/[id]:', error)
      return respondError('Error interno del servidor')
    }
  }

  return respondError('Método no permitido')
})
