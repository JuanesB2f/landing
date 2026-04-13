import { serverSupabaseServiceRole } from '#supabase/server'
import { requireAdmin } from '~/server/utils/auth'
import { resolveCustomerIdsInGroup } from '~/server/utils/customer-groups'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  if (method !== 'GET') {
    return { data: { success: false, error: 'Método no permitido' } }
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    return { data: { success: false, error: 'ID de cliente requerido' } }
  }

  try {
    await requireAdmin(event)
    const adminClient = serverSupabaseServiceRole(event) as any

    const { data: customer, error: custErr } = await adminClient
      .from('customers')
      .select('id_customer, first_name, last_name, email, user_id')
      .eq('id_customer', id)
      .maybeSingle()

    if (custErr || !customer) {
      return { data: { success: false, error: 'Cliente no encontrado' } }
    }

    const customerIds = await resolveCustomerIdsInGroup(adminClient, customer as any)

    const { data: orders, error } = await adminClient
      .from('orders')
      .select(`
        id_order,
        created_at,
        updated_at,
        status,
        payment_status,
        total_amount,
        subtotal,
        order_source,
        payment_method,
        order_items(
          id_order_item,
          quantity,
          unit_price,
          total_price,
          product:products(id_product, name, sku, image_url)
        )
      `)
      .in('customer_id', customerIds)
      .order('created_at', { ascending: false })
      .limit(200)

    if (error) {
      console.error('GET /api/customers/[id]/orders:', error)
      return { data: { success: false, error: 'Error obteniendo pedidos', details: error.message } }
    }

    return {
      data: {
        success: true,
        data: {
          customer,
          orders: orders || []
        }
      }
    }
  } catch (e) {
    console.error('GET /api/customers/[id]/orders', e)
    return { data: { success: false, error: 'Error interno del servidor' } }
  }
})
