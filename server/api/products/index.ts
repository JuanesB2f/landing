import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const method = getMethod(event)

  try {
    switch (method) {
      case 'GET':
        // Obtener todos los productos con sus categorías
        const { data: products, error: getError } = await client
          .from('products')
          .select(`
            *,
            category:categories(name)
          `)
          .order('created_at', { ascending: false })

        if (getError) throw getError

        return {
          data: {
            success: true,
            data: products
          }
        }

      case 'POST':
        // Crear nuevo producto
        const body = await readBody(event)
        
        // Validar campos requeridos
        const requiredFields = ['name', 'description', 'price', 'stock_quantity', 'category_id', 'sku']
        for (const field of requiredFields) {
          if (!body[field]) {
            throw createError({
              statusCode: 400,
              statusMessage: `Campo requerido: ${field}`
            })
          }
        }

        // Generar ID único
        const productId = crypto.randomUUID()
        
        const { data: newProduct, error: createError } = await client
          .from('products')
          .insert({
            id_product: productId,
            name: body.name,
            description: body.description,
            price: parseFloat(body.price),
            stock_quantity: parseInt(body.stock_quantity),
            category_id: body.category_id,
            brand: body.brand || '',
            sku: body.sku,
            image_url: body.image_url || null,
            is_active: body.is_active !== undefined ? body.is_active : true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single()

        if (createError) throw createError

        return {
          data: {
            success: true,
            data: newProduct,
            message: 'Producto creado exitosamente'
          }
        }

      default:
        throw createError({
          statusCode: 405,
          statusMessage: 'Método no permitido'
        })
    }
  } catch (error) {
    console.error('Error en API de productos:', error)
    
    return {
      data: {
        success: false,
        error: error.message || 'Error interno del servidor'
      }
    }
  }
})
