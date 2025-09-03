import { serverSupabaseClient } from '#supabase/server'
import { requireAuth, respondSuccess, respondError } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)

  if (method !== 'GET') {
    return respondError('Método no permitido')
  }

  try {
    await requireAuth(event)
    const query = getQuery(event)
    const sku = String(query.sku || '').trim()
    const excludeId = query.exclude_id ? String(query.exclude_id) : null

    if (!sku) {
      return respondError('SKU requerido')
    }

    let builder = supabase.from('products').select('id_product').eq('sku', sku)
    if (excludeId) builder = builder.neq('id_product', excludeId)

    const { data, error } = await builder.limit(1)
    if (error) {
      console.error('Error verificando SKU:', error)
      return respondError('Error verificando SKU', error.message)
    }

    const exists = Array.isArray(data) && data.length > 0
    return respondSuccess({ exists })
  } catch (error) {
    console.error('Error en GET /api/products/check-sku:', error)
    return respondError('Error interno del servidor')
  }
})


