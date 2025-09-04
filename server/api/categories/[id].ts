/**
 * API endpoint para operaciones individuales de categorías
 * GET: Obtener categoría por ID
 * PUT: Actualizar categoría
 * DELETE: Eliminar categoría
 */

import { serverSupabaseClient } from '#supabase/server'
import { requireAuth, requireAdmin, respondSuccess, respondError } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')
  const supabase = await serverSupabaseClient<any>(event)

  if (!id) {
    return {
      success: false,
      error: 'ID de categoría requerido',
      data: null
    }
  }

  if (method === 'GET') {
    try {
      const { data: category, error } = await supabase
        .from('categories')
        .select(`
          *,
          products:products(count)
        `)
        .eq('id_category', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return {
            success: false,
            error: 'Categoría no encontrada',
            data: null
          }
        }
        console.error('Error obteniendo categoría:', error)
        return {
          success: false,
          error: 'Error obteniendo categoría',
          data: null
        }
      }

      // Procesar el conteo de productos
      const processedCategory = {
        ...(category as any),
        product_count: (category as any)?.products?.[0]?.count || 0
      }

      return respondSuccess(processedCategory)
    } catch (error) {
      console.error('Error inesperado:', error)
      return respondError('Error interno del servidor')
    }
  }

  if (method === 'PUT') {
    try {
      await requireAuth(event)
      const contentType = getHeader(event, 'content-type') || ''
      let body: any = {}
      let uploadedImageUrl: string | null = null
      if (contentType.includes('multipart/form-data')) {
        const form = await readMultipartFormData(event)
        const fields: Record<string, string> = {}
        let filePart: any = null
        for (const part of form || []) {
          if (part.type === 'file') {
            if (part.name === 'image' && part.data && part.filename) filePart = part
          } else if (part.name) {
            fields[part.name] = part.data?.toString() || ''
          }
        }
        body = fields
        if (filePart) {
          const fileExt = (filePart.filename as string).split('.').pop()
          const filePath = `${crypto.randomUUID()}.${fileExt}`
          const { error: uploadError } = await supabase.storage
            .from('product-image')
            .upload(filePath, filePart.data, { contentType: filePart.mimetype, upsert: false })
          if (!uploadError) {
            const { data: publicUrl } = supabase.storage.from('product-image').getPublicUrl(filePath)
            uploadedImageUrl = publicUrl.publicUrl
          }
        }
      } else {
        body = await readBody(event)
      }
      
      // Validar campos requeridos
      if (!body.name || !body.name.trim()) {
        return respondError('El nombre de la categoría es obligatorio')
      }

      // Verificar si ya existe otra categoría con el mismo nombre
      const { data: existingCategory, error: checkError } = await supabase
        .from('categories')
        .select('id_category')
        .eq('name', body.name.trim())
        .neq('id_category', id)
        .single()

      if (existingCategory) {
        return respondError('Ya existe otra categoría con ese nombre')
      }

      // Actualizar categoría
      const updateData = {
        name: body.name.trim(),
        description: body.description?.trim() || null,
        image_url: uploadedImageUrl || body.image_url || null,
        is_active: body.is_active !== undefined ? body.is_active : true,
        updated_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('categories')
        .update(updateData as any)
        .eq('id_category', id)
        .select()
        .single()

      if (error) {
        console.error('Error actualizando categoría:', error)
        return respondError('Error actualizando categoría')
      }

      return respondSuccess({ ...(data as any), product_count: 0 })
    } catch (error) {
      console.error('Error inesperado:', error)
      return respondError('Error interno del servidor')
    }
  }

  if (method === 'DELETE') {
    try {
      // Permitir eliminar con sesión autenticada mientras se configuran perfiles
      await requireAuth(event)
      // Verificar si la categoría tiene productos asociados
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('id_product')
        .eq('category_id', id)
        .limit(1)

      if (productsError) {
        console.error('Error verificando productos:', productsError)
        return respondError('Error verificando productos asociados')
      }

      if (products && products.length > 0) {
        return respondError('No se puede eliminar la categoría porque tiene productos asociados')
      }

      // Eliminar categoría
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id_category', id)

      if (error) {
        console.error('Error eliminando categoría:', error)
        return respondError('Error eliminando categoría')
      }

      return respondSuccess(null)
    } catch (error) {
      // Si es un error HTTP generado con createError, re-lanzarlo para que respete el status
      // y no se enmascare como 500
      // @ts-ignore - error shape from h3
      if ((error as any)?.statusCode) throw error
      console.error('Error inesperado:', error)
      return respondError('Error interno del servidor')
    }
  }

  // Método no permitido
  return respondError('Método no permitido')
})
