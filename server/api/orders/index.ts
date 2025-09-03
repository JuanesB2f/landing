import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)

  if (method === 'GET') {
    try {
      // Obtener todos los pedidos con información relacionada
      const { data: orders, error } = await supabase
        .from('orders')
        .select(`
          *,
          customer:customers(
            id_customer,
            first_name,
            last_name,
            email,
            phone
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
              image_url
            )
          )
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error obteniendo pedidos:', error)
        return {
          data: {
            success: false,
            error: 'Error obteniendo pedidos',
            details: error.message
          }
        }
      }

      // Procesar los pedidos para incluir información adicional
      const processedOrders = orders.map(order => ({
        ...order,
        customer_name: order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : 'Cliente no encontrado',
        customer_email: order.customer?.email || 'N/A',
        customer_phone: order.customer?.phone || 'N/A',
        items_count: order.order_items?.length || 0,
        // Calcular totales si no están presentes
        total_amount: order.total_amount || 0,
        subtotal: order.subtotal || 0
      }))

      return {
        data: {
          success: true,
          data: processedOrders
        }
      }

    } catch (error) {
      console.error('Error en GET /api/orders:', error)
      return {
        data: {
          success: false,
          error: 'Error interno del servidor'
        }
      }
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      
      // Validar campos requeridos
      if (!body.customer_id || !body.order_items || !body.order_items.length === 0) {
        return {
          data: {
            success: false,
            error: 'El cliente y al menos un item son requeridos'
          }
        }
      }

      // Verificar que el cliente existe
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('id_customer, is_active')
        .eq('id_customer', body.customer_id)
        .single()

      if (customerError || !customer) {
        return {
          data: {
            success: false,
            error: 'Cliente no encontrado'
          }
        }
      }

      if (!customer.is_active) {
        return {
          data: {
            success: false,
            error: 'El cliente está inactivo'
          }
        }
      }

      // Calcular totales
      let subtotal = 0
      const orderItems = []

      for (const item of body.order_items) {
        if (!item.product_id || !item.quantity || !item.unit_price) {
          return {
            data: {
              success: false,
              error: 'Todos los items deben tener product_id, quantity y unit_price'
            }
          }
        }

        // Verificar que el producto existe y tiene stock
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('id_product, name, stock_quantity, price')
          .eq('id_product', item.product_id)
          .single()

        if (productError || !product) {
          return {
            data: {
              success: false,
              error: `Producto ${item.product_id} no encontrado`
            }
          }
        }

        if (product.stock_quantity < item.quantity) {
          return {
            data: {
              success: false,
              error: `Stock insuficiente para ${product.name}. Disponible: ${product.stock_quantity}, Solicitado: ${item.quantity}`
            }
          }
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

      // Crear el pedido
      const newOrder = {
        customer_id: body.customer_id,
        total_amount: totalAmount,
        subtotal: subtotal,
        tax_amount: taxAmount,
        shipping_amount: shippingAmount,
        status: body.status || 'pending',
        shipping_address: body.shipping_address || null,
        billing_address: body.billing_address || null,
        payment_method: body.payment_method || null,
        payment_status: body.payment_status || 'pending',
        tracking_number: body.tracking_number || null,
        notes: body.notes || null
      }

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert(newOrder)
        .select()
        .single()

      if (orderError) {
        console.error('Error creando pedido:', orderError)
        return {
          data: {
            success: false,
            error: 'Error creando pedido',
            details: orderError.message
          }
        }
      }

      // Crear los items del pedido
      const orderItemsWithOrderId = orderItems.map(item => ({
        ...item,
        order_id: orderData.id_order
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItemsWithOrderId)

      if (itemsError) {
        console.error('Error creando items del pedido:', itemsError)
        // Intentar eliminar el pedido si falla la creación de items
        await supabase.from('orders').delete().eq('id_order', orderData.id_order)
        return {
          data: {
            success: false,
            error: 'Error creando items del pedido',
            details: itemsError.message
          }
        }
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

      // Obtener el pedido completo con items para retornar
      const { data: completeOrder, error: fetchError } = await supabase
        .from('orders')
        .select(`
          *,
          customer:customers(
            id_customer,
            first_name,
            last_name,
            email,
            phone
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
              image_url
            )
          )
        `)
        .eq('id_order', orderData.id_order)
        .single()

      if (fetchError) {
        console.error('Error obteniendo pedido completo:', fetchError)
      }

      return {
        data: {
          success: true,
          data: completeOrder || orderData,
          message: 'Pedido creado exitosamente'
        }
      }

    } catch (error) {
      console.error('Error en POST /api/orders:', error)
      return {
        data: {
          success: false,
          error: 'Error interno del servidor'
        }
      }
    }
  }

  return {
    data: {
      success: false,
      error: 'Método no permitido'
    }
  }
})
