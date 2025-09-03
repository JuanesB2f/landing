import { serverSupabaseClient } from '#supabase/server'
import { requireAuth, respondSuccess, respondError } from '~/server/utils/auth'

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

        return respondSuccess(product)

      case 'PUT':
        // Requiere sesión (temporal durante configuración de perfiles)
        await requireAuth(event)
        const contentType = getHeader(event, 'content-type') || ''
        let updateBody: any = {}
        let uploadedImageUrl: string | null = null
        if (contentType.includes('multipart/form-data')) {
          const form = await readMultipartFormData(event)
          const fields: Record<string, string> = {}
          let filePart: any = null
          for (const part of form || []) {
            if (part.type === 'file') {
              if (part.name === 'image' && part.data && part.filename) {
                filePart = part
              }
            } else if (part.name) {
              fields[part.name] = part.data?.toString() || ''
            }
          }
          updateBody = fields
          if (filePart) {
            const fileExt = (filePart.filename as string).split('.').pop()
            const filePath = `${crypto.randomUUID()}.${fileExt}`
            const { error: uploadError } = await client.storage
              .from('product-image')
              .upload(filePath, filePart.data, { contentType: filePart.mimetype, upsert: false })
            if (uploadError) {
              throw createError({ statusCode: 400, statusMessage: 'Error subiendo imagen' })
            }
            const { data: publicUrl } = client.storage.from('product-image').getPublicUrl(filePath)
            uploadedImageUrl = publicUrl.publicUrl
          }
        } else {
          updateBody = await readBody(event)
        }
        
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
            image_url: uploadedImageUrl || updateBody.image_url || null,
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

        return respondSuccess(updatedProduct, 'Producto actualizado exitosamente')

      case 'DELETE':
        // Requiere sesión (temporal durante configuración de perfiles)
        await requireAuth(event)
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

        return respondSuccess(null, 'Producto eliminado exitosamente')

      default:
        throw createError({
          statusCode: 405,
          statusMessage: 'Método no permitido'
        })
    }
  } catch (error) {
    console.error('Error en API de producto individual:', error)
    if ((error as any).statusCode) {
      throw error
    }
    return respondError((error as any).statusMessage || (error as any).message || 'Error interno del servidor')
  }
})
