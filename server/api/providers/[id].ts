import { serverSupabaseClient } from '#supabase/server'
import { requireAdmin, respondSuccess, respondError } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID de proveedor requerido'
    })
  }

  try {
    if (method === 'GET') {
      // Obtener proveedor específico con conteo de productos
      const { data: provider, error } = await supabase
        .from('providers')
        .select(`
          *,
          products:products(count)
        `)
        .eq('id_provider', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          throw createError({
            statusCode: 404,
            statusMessage: 'Proveedor no encontrado'
          })
        }
        throw error
      }

      // Procesar el conteo de productos
      const providerWithCount = {
        ...provider,
        product_count: provider.products?.[0]?.count || 0
      }

      return respondSuccess(providerWithCount)

    } else if (method === 'PUT') {
      // Requiere admin y actualizar proveedor existente
      await requireAdmin(event)
      const body = await readBody(event)
      
      // Validaciones básicas
      if (!body.name || body.name.trim().length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'El nombre del proveedor es obligatorio'
        })
      }

      // Verificar si ya existe otro proveedor con el mismo nombre
      const { data: existingProvider, error: checkError } = await supabase
        .from('providers')
        .select('id_provider')
        .eq('name', body.name.trim())
        .neq('id_provider', id)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError
      }

      if (existingProvider) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Ya existe otro proveedor con ese nombre'
        })
      }

      // Actualizar proveedor
      const { data: updatedProvider, error: updateError } = await supabase
        .from('providers')
        .update({
          name: body.name.trim(),
          email: body.email || null,
          phone: body.phone || null,
          address: body.address || null,
          city: body.city || null,
          contact_person: body.contact_person || null,
          is_active: body.is_active !== undefined ? body.is_active : true,
          updated_at: new Date().toISOString()
        })
        .eq('id_provider', id)
        .select()
        .single()

      if (updateError) {
        throw updateError
      }

      return respondSuccess(updatedProvider, 'Proveedor actualizado exitosamente')

    } else if (method === 'DELETE') {
      // Requiere admin y verificar si el proveedor tiene productos asociados
      await requireAdmin(event)
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('id_product')
        .eq('provider_id', id)
        .limit(1)

      if (productsError) {
        throw productsError
      }

      if (products && products.length > 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'No se puede eliminar el proveedor porque tiene productos asociados'
        })
      }

      // Eliminar proveedor
      const { error: deleteError } = await supabase
        .from('providers')
        .delete()
        .eq('id_provider', id)

      if (deleteError) {
        throw deleteError
      }

      return respondSuccess(null, 'Proveedor eliminado exitosamente')

    } else {
      throw createError({
        statusCode: 405,
        statusMessage: 'Método no permitido'
      })
    }

  } catch (error) {
    console.error('Error en API de proveedor específico:', error)
    if ((error as any).statusCode) {
      throw error
    }
    return respondError((error as any).statusMessage || (error as any).message || 'Error interno del servidor')
  }
})
