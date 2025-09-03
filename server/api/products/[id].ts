import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID de producto requerido'
    })
  }

  try {
    switch (method) {
      case 'GET':
        // Obtener producto específico con su categoría
        const { data: product, error: getError } = await client
          .from('products')
          .select(`
            *,
            category:categories(name)
          `)
          .eq('id_product', id)
          .single()

        if (getError) {
          if (getError.code === 'PGRST116') {
            throw createError({
              statusCode: 404,
              statusMessage: 'Producto no encontrado'
            })
          }
          throw getError
        }

        return {
          success: true,
          data: product
        }

      case 'PUT':
        // Actualizar producto existente
        const updateBody = await readBody(event)
        
        // Validar campos requeridos
        const requiredFields = ['name', 'description', 'price', 'stock_quantity', 'category_id', 'sku']
        for (const field of requiredFields) {
          if (!updateBody[field]) {
            throw createError({
              statusCode: 400,
              statusMessage: `Campo requerido: ${field}`
            })
          }
        }

        const { data: updatedProduct, error: updateError } = await client
          .from('products')
          .update({
            name: updateBody.name,
            description: updateBody.description,
            price: parseFloat(updateBody.price),
            stock_quantity: parseInt(updateBody.stock_quantity),
            category_id: updateBody.category_id,
            brand: updateBody.brand || '',
            sku: updateBody.sku,
            image_url: updateBody.image_url || null,
            is_active: updateBody.is_active !== undefined ? updateBody.is_active : true,
            updated_at: new Date().toISOString()
          })
          .eq('id_product', id)
          .select()
          .single()

        if (updateError) {
          if (updateError.code === 'PGRST116') {
            throw createError({
              statusCode: 404,
              statusMessage: 'Producto no encontrado'
            })
          }
          throw updateError
        }

        return {
          success: true,
          data: updatedProduct,
          message: 'Producto actualizado exitosamente'
        }

      case 'DELETE':
        // Eliminar producto
        const { error: deleteError } = await client
          .from('products')
          .delete()
          .eq('id_product', id)

        if (deleteError) {
          if (deleteError.code === 'PGRST116') {
            throw createError({
              statusCode: 404,
              statusMessage: 'Producto no encontrado'
            })
          }
          throw deleteError
        }

        return {
          success: true,
          message: 'Producto eliminado exitosamente'
        }

      default:
        throw createError({
          statusCode: 405,
          statusMessage: 'Método no permitido'
        })
    }
  } catch (error) {
    console.error('Error en API de producto individual:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    return {
      success: false,
      error: error.message || 'Error interno del servidor'
    }
  }
})
