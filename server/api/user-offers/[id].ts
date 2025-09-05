import { serverSupabaseClient } from '#supabase/server'
import { requireAdmin, respondSuccess, respondError } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    return respondError('ID de oferta requerido')
  }

  if (method === 'GET') {
    try {
      await requireAdmin(event)
      const { data, error } = await supabase
        .from('user_offers')
        .select(`
          *,
          user:profiles(id, email, first_name, last_name, role),
          product:products(id_product, name, sku, price, image_url)
        `)
        .eq('id_offer', id)
        .single()

      if (error) return respondError('Oferta no encontrada')
      return respondSuccess(data)
    } catch (error) {
      console.error('Error en GET /api/user-offers/[id]:', error)
      return respondError('Error interno del servidor')
    }
  }

  if (method === 'PUT') {
    try {
      await requireAdmin(event)
      const body = await readBody(event)

      const payload: any = {}
      if (body.user_id !== undefined) payload.user_id = body.user_id
      if (body.product_id !== undefined) payload.product_id = body.product_id
      if (body.discount_percent !== undefined) payload.discount_percent = Number(body.discount_percent)
      if (body.is_active !== undefined) payload.is_active = !!body.is_active
      if (body.valid_from !== undefined) payload.valid_from = body.valid_from
      if (body.valid_to !== undefined) payload.valid_to = body.valid_to
      if (body.notes !== undefined) payload.notes = body.notes

      const { data, error } = await (supabase
        .from('user_offers') as any)
        .update(payload)
        .eq('id_offer', id)
        .select()
        .single()

      if (error) return respondError('Error actualizando oferta', error.message)
      return respondSuccess(data, 'Oferta actualizada exitosamente')
    } catch (error) {
      console.error('Error en PUT /api/user-offers/[id]:', error)
      return respondError('Error interno del servidor')
    }
  }

  if (method === 'DELETE') {
    try {
      await requireAdmin(event)
      const { error } = await supabase
        .from('user_offers')
        .delete()
        .eq('id_offer', id)

      if (error) return respondError('Error eliminando oferta', error.message)
      return respondSuccess(null, 'Oferta eliminada exitosamente')
    } catch (error) {
      console.error('Error en DELETE /api/user-offers/[id]:', error)
      return respondError('Error interno del servidor')
    }
  }

  return respondError('Método no permitido')
})


