import { serverSupabaseClient } from '#supabase/server'
import { requireAdmin, respondSuccess, respondError } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)

  if (method !== 'GET') {
    return respondError('Método no permitido')
  }

  try {
    // Requiere admin
    await requireAdmin(event)
    // Obtener parámetros de consulta
    const query = getQuery(event)
    const startDate = query.start_date ? new Date(query.start_date as string) : null
    const endDate = query.end_date ? new Date(query.end_date as string) : null

    // Helper para aplicar filtros de fecha
    const applyDateFilters = (builder: any) => {
      if (startDate) builder = builder.gte('created_at', startDate.toISOString())
      if (endDate) builder = builder.lte('created_at', endDate.toISOString())
      return builder
    }

    // Obtener estadísticas generales
    const { count: totalOrders, error: totalError } = await applyDateFilters(
      supabase.from('orders').select('id_order', { count: 'exact', head: true })
    )

    if (totalError) {
      console.error('Error obteniendo total de pedidos:', totalError)
      return {
        success: false,
        error: 'Error obteniendo estadísticas',
        details: totalError.message
      }
    }

    // Obtener pedidos por estado
    const { data: statusRows, error: statusError } = await applyDateFilters(
      supabase.from('orders').select('status')
    )
    const ordersByStatus = statusRows
      ? statusRows.reduce((acc: Record<string, number>, row: any) => {
          acc[row.status] = (acc[row.status] || 0) + 1
          return acc
        }, {})
      : null

    if (statusError) {
      console.error('Error obteniendo pedidos por estado:', statusError)
    }

    // Obtener pedidos por estado de pago
    const { data: paymentRows, error: paymentError } = await applyDateFilters(
      supabase.from('orders').select('payment_status')
    )
    const ordersByPaymentStatus = paymentRows
      ? paymentRows.reduce((acc: Record<string, number>, row: any) => {
          acc[row.payment_status] = (acc[row.payment_status] || 0) + 1
          return acc
        }, {})
      : null

    if (paymentError) {
      console.error('Error obteniendo pedidos por estado de pago:', paymentError)
    }

    // Obtener total de ventas
    const { data: salesRows, error: salesError } = await applyDateFilters(
      supabase.from('orders').select('total_amount')
    )
    const totalSales = salesRows ? salesRows.reduce((sum: number, row: any) => sum + (row.total_amount || 0), 0) : 0

    if (salesError) {
      console.error('Error obteniendo total de ventas:', salesError)
    }

    // Obtener pedidos por mes (últimos 12 meses)
    const oneYearAgoIso = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()
    const { data: monthRows, error: monthError } = await supabase
      .from('orders')
      .select('created_at, total_amount')
      .gte('created_at', oneYearAgoIso)
    const ordersByMonth = monthRows
      ? (() => {
          const monthlyData = monthRows.reduce((acc: Record<string, { orders: number; sales: number }>, order: any) => {
            const date = new Date(order.created_at)
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
            if (!acc[monthKey]) acc[monthKey] = { orders: 0, sales: 0 }
            acc[monthKey].orders += 1
            acc[monthKey].sales += order.total_amount || 0
            return acc
          }, {})
          return Object.entries(monthlyData)
            .map(([month, data]: any) => ({ month, ...data }))
            .sort((a: any, b: any) => a.month.localeCompare(b.month))
        })()
      : []

    if (monthError) {
      console.error('Error obteniendo pedidos por mes:', monthError)
    }

    // Obtener productos más vendidos
    const { data: productRows, error: productsError } = await supabase
      .from('order_items')
      .select('quantity, product:products(name, sku)')
    const topProducts = productRows
      ? (() => {
          const productSales = productRows.reduce((acc: Record<string, { name: string; sku: string; quantity: number }>, item: any) => {
            const productName = item.product?.name || 'Producto desconocido'
            const productSku = item.product?.sku || 'N/A'
            const key = `${productName} (${productSku})`
            if (!acc[key]) acc[key] = { name: productName, sku: productSku, quantity: 0 }
            acc[key].quantity += item.quantity || 0
            return acc
          }, {})
          return Object.values(productSales).sort((a: any, b: any) => b.quantity - a.quantity).slice(0, 10)
        })()
      : []

    if (productsError) {
      console.error('Error obteniendo productos más vendidos:', productsError)
    }

    // Obtener clientes más frecuentes
    const { data: customerRows, error: customersError } = await supabase
      .from('orders')
      .select('customer_id, total_amount, customer:customers(first_name, last_name, email)')
    const topCustomers = customerRows
      ? (() => {
          const customerStats = customerRows.reduce((acc: Record<string, { name: string; email: string; orders: number; total_spent: number }>, order: any) => {
            const customerId = order.customer_id
            const customerName = order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : 'Cliente desconocido'
            const customerEmail = order.customer?.email || 'N/A'
            if (!acc[customerId]) acc[customerId] = { name: customerName, email: customerEmail, orders: 0, total_spent: 0 }
            acc[customerId].orders += 1
            acc[customerId].total_spent += order.total_amount || 0
            return acc
          }, {})
          return Object.values(customerStats).sort((a: any, b: any) => b.total_spent - a.total_spent).slice(0, 10)
        })()
      : []

    if (customersError) {
      console.error('Error obteniendo clientes más frecuentes:', customersError)
    }

    // Calcular métricas adicionales
    const pendingOrders = (ordersByStatus as any)?.pending || 0
    const confirmedOrders = (ordersByStatus as any)?.confirmed || 0
    const shippedOrders = (ordersByStatus as any)?.shipped || 0
    const deliveredOrders = (ordersByStatus as any)?.delivered || 0
    const cancelledOrders = (ordersByStatus as any)?.cancelled || 0

    const pendingPayments = (ordersByPaymentStatus as any)?.pending || 0
    const paidPayments = (ordersByPaymentStatus as any)?.paid || 0
    const failedPayments = (ordersByPaymentStatus as any)?.failed || 0
    const refundedPayments = (ordersByPaymentStatus as any)?.refunded || 0

    const totalOrdersCount = totalOrders || 0
    const totalSalesAmount = totalSales || 0
    const averageOrderValue = totalOrdersCount > 0 ? totalSalesAmount / totalOrdersCount : 0

    return respondSuccess({
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
        monthly_trends: ordersByMonth || [],
        top_products: topProducts || [],
        top_customers: topCustomers || [],
        date_range: {
          start_date: startDate?.toISOString() || null,
          end_date: endDate?.toISOString() || null
        }
      })

  } catch (error) {
    console.error('Error en GET /api/orders/stats:', error)
    return respondError('Error interno del servidor')
  }
})
