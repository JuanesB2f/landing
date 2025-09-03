import { serverSupabaseClient } from '#supabase/server'
import { requireAuth, respondSuccess, respondError } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)

  if (method !== 'GET') {
    return respondError('Método no permitido')
  }

  try {
    // Permitir a cualquier usuario autenticado consultar sus métricas globales
    await requireAuth(event)

    // Total users (profiles)
    const { count: totalUsers, error: usersError } = await supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })

    // Total products
    const { count: totalProducts, error: productsError } = await supabase
      .from('products')
      .select('id_product', { count: 'exact', head: true })

    // Total orders
    const { count: totalOrders, error: ordersError } = await supabase
      .from('orders')
      .select('id_order', { count: 'exact', head: true })

    // Total revenue
    const { data: salesRows, error: revenueError } = await supabase
      .from('orders')
      .select('total_amount')

    if (usersError) console.error('usersError', usersError)
    if (productsError) console.error('productsError', productsError)
    if (ordersError) console.error('ordersError', ordersError)
    if (revenueError) console.error('revenueError', revenueError)

    const totalRevenue = (salesRows || []).reduce((sum: number, row: any) => sum + (row.total_amount || 0), 0)

    return respondSuccess({
      totalUsers: totalUsers || 0,
      totalProducts: totalProducts || 0,
      totalOrders: totalOrders || 0,
      totalRevenue
    })
  } catch (error) {
    console.error('Error en GET /api/dashboard:', error)
    return respondError('Error interno del servidor')
  }
})


