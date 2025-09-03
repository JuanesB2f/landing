import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)

  if (method !== 'GET') {
    return {
      success: false,
      error: 'Método no permitido'
    }
  }

  try {
    // Obtener parámetros de consulta
    const query = getQuery(event)
    const startDate = query.start_date ? new Date(query.start_date as string) : null
    const endDate = query.end_date ? new Date(query.end_date as string) : null

    // Construir filtros de fecha si se proporcionan
    let dateFilter = ''
    if (startDate && endDate) {
      dateFilter = `created_at >= '${startDate.toISOString()}' AND created_at <= '${endDate.toISOString()}'`
    } else if (startDate) {
      dateFilter = `created_at >= '${startDate.toISOString()}'`
    } else if (endDate) {
      dateFilter = `created_at <= '${endDate.toISOString()}'`
    }

    // Obtener estadísticas generales
    const { data: totalOrders, error: totalError } = await supabase
      .from('orders')
      .select('id_order', { count: 'exact' })

    if (totalError) {
      console.error('Error obteniendo total de pedidos:', totalError)
      return {
        success: false,
        error: 'Error obteniendo estadísticas',
        details: totalError.message
      }
    }

    // Obtener pedidos por estado
    const { data: ordersByStatus, error: statusError } = await supabase
      .from('orders')
      .select('status')
      .then(result => {
        if (result.error) return { data: null, error: result.error }
        
        const statusCounts = result.data.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1
          return acc
        }, {} as Record<string, number>)
        
        return { data: statusCounts, error: null }
      })

    if (statusError) {
      console.error('Error obteniendo pedidos por estado:', statusError)
    }

    // Obtener pedidos por estado de pago
    const { data: ordersByPaymentStatus, error: paymentError } = await supabase
      .from('orders')
      .select('payment_status')
      .then(result => {
        if (result.error) return { data: null, error: result.error }
        
        const paymentCounts = result.data.reduce((acc, order) => {
          acc[order.payment_status] = (acc[order.payment_status] || 0) + 1
          return acc
        }, {} as Record<string, number>)
        
        return { data: paymentCounts, error: null }
      })

    if (paymentError) {
      console.error('Error obteniendo pedidos por estado de pago:', paymentError)
    }

    // Obtener total de ventas
    const { data: totalSales, error: salesError } = await supabase
      .from('orders')
      .select('total_amount')
      .then(result => {
        if (result.error) return { data: 0, error: result.error }
        
        const total = result.data.reduce((sum, order) => sum + (order.total_amount || 0), 0)
        return { data: total, error: null }
      })

    if (salesError) {
      console.error('Error obteniendo total de ventas:', salesError)
    }

    // Obtener pedidos por mes (últimos 12 meses)
    const { data: ordersByMonth, error: monthError } = await supabase
      .from('orders')
      .select('created_at, total_amount')
      .gte('created_at', new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString())
      .then(result => {
        if (result.error) return { data: [], error: result.error }
        
        const monthlyData = result.data.reduce((acc, order) => {
          const date = new Date(order.created_at)
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
          
          if (!acc[monthKey]) {
            acc[monthKey] = { orders: 0, sales: 0 }
          }
          
          acc[monthKey].orders += 1
          acc[monthKey].sales += order.total_amount || 0
          
          return acc
        }, {} as Record<string, { orders: number, sales: number }>)
        
        // Convertir a array y ordenar
        const monthlyArray = Object.entries(monthlyData).map(([month, data]) => ({
          month,
          ...data
        })).sort((a, b) => a.month.localeCompare(b.month))
        
        return { data: monthlyArray, error: null }
      })

    if (monthError) {
      console.error('Error obteniendo pedidos por mes:', monthError)
    }

    // Obtener productos más vendidos
    const { data: topProducts, error: productsError } = await supabase
      .from('order_items')
      .select(`
        quantity,
        product:products(name, sku)
      `)
      .then(result => {
        if (result.error) return { data: [], error: result.error }
        
        const productSales = result.data.reduce((acc, item) => {
          const productName = item.product?.name || 'Producto desconocido'
          const productSku = item.product?.sku || 'N/A'
          const key = `${productName} (${productSku})`
          
          if (!acc[key]) {
            acc[key] = { name: productName, sku: productSku, quantity: 0 }
          }
          
          acc[key].quantity += item.quantity || 0
          return acc
        }, {} as Record<string, { name: string, sku: string, quantity: number }>)
        
        // Convertir a array y ordenar por cantidad
        const topProductsArray = Object.values(productSales)
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 10) // Top 10 productos
        
        return { data: topProductsArray, error: null }
      })

    if (productsError) {
      console.error('Error obteniendo productos más vendidos:', productsError)
    }

    // Obtener clientes más frecuentes
    const { data: topCustomers, error: customersError } = await supabase
      .from('orders')
      .select(`
        customer_id,
        total_amount,
        customer:customers(first_name, last_name, email)
      `)
      .then(result => {
        if (result.error) return { data: [], error: result.error }
        
        const customerStats = result.data.reduce((acc, order) => {
          const customerId = order.customer_id
          const customerName = order.customer 
            ? `${order.customer.first_name} ${order.customer.last_name}`
            : 'Cliente desconocido'
          const customerEmail = order.customer?.email || 'N/A'
          
          if (!acc[customerId]) {
            acc[customerId] = { 
              name: customerName, 
              email: customerEmail, 
              orders: 0, 
              total_spent: 0 
            }
          }
          
          acc[customerId].orders += 1
          acc[customerId].total_spent += order.total_amount || 0
          
          return acc
        }, {} as Record<string, { name: string, email: string, orders: number, total_spent: number }>)
        
        // Convertir a array y ordenar por total gastado
        const topCustomersArray = Object.values(customerStats)
          .sort((a, b) => b.total_spent - a.total_spent)
          .slice(0, 10) // Top 10 clientes
        
        return { data: topCustomersArray, error: null }
      })

    if (customersError) {
      console.error('Error obteniendo clientes más frecuentes:', customersError)
    }

    // Calcular métricas adicionales
    const pendingOrders = ordersByStatus?.data?.pending || 0
    const confirmedOrders = ordersByStatus?.data?.confirmed || 0
    const shippedOrders = ordersByStatus?.data?.shipped || 0
    const deliveredOrders = ordersByStatus?.data?.delivered || 0
    const cancelledOrders = ordersByStatus?.data?.cancelled || 0

    const pendingPayments = ordersByPaymentStatus?.data?.pending || 0
    const paidPayments = ordersByPaymentStatus?.data?.paid || 0
    const failedPayments = ordersByPaymentStatus?.data?.failed || 0
    const refundedPayments = ordersByPaymentStatus?.data?.refunded || 0

    const totalOrdersCount = totalOrders || 0
    const totalSalesAmount = totalSales?.data || 0
    const averageOrderValue = totalOrdersCount > 0 ? totalSalesAmount / totalOrdersCount : 0

    return {
      success: true,
      data: {
        summary: {
          total_orders: totalOrdersCount,
          total_sales: totalSalesAmount,
          average_order_value: Math.round(averageOrderValue * 100) / 100,
          pending_orders: pendingOrders,
          confirmed_orders: confirmedOrders,
          shipped_orders: shippedOrders,
          delivered_orders: deliveredOrders,
          cancelled_orders: cancelledOrders
        },
        payment_status: {
          pending: pendingPayments,
          paid: paidPayments,
          failed: failedPayments,
          refunded: refundedPayments
        },
        monthly_trends: ordersByMonth?.data || [],
        top_products: topProducts?.data || [],
        top_customers: topCustomers?.data || [],
        date_range: {
          start_date: startDate?.toISOString() || null,
          end_date: endDate?.toISOString() || null
        }
      }
    }

  } catch (error) {
    console.error('Error en GET /api/orders/stats:', error)
    return {
      success: false,
      error: 'Error interno del servidor'
    }
  }
})
