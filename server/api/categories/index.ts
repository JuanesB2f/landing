/**
 * API endpoint para categorías
 * GET: Obtener todas las categorías activas
 * POST: Crear nueva categoría
 */

import { serverSupabaseClient } from '#supabase/server'
import { requireAuth, respondSuccess, respondError } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient<any>(event)

  if (method === 'GET') {
    try {
      setHeader(event, 'Cache-Control', 'public, max-age=60')
      // Obtener categorías (sin join problemático)
      const { data: categories, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (error) {
        console.error('Error obteniendo categorías:', error)
        return {
          data: {
            success: false,
            error: 'Error obteniendo categorías'
          }
        }
      }

      // Obtener conteo real de productos por categoría
      const { data: categoriesWithCounts, error: countError } = await supabase
        .from('categories')
        .select(`
          *,
          products:products(count)
        `)
        .eq('is_active', true)
        .order('name')

      if (countError) {
        console.error('Error obteniendo conteos de productos por categoría:', countError)
      }

      const processedCategories = (categoriesWithCounts || categories).map((category: any) => ({
        ...(category as any),
        product_count: (category as any)?.products?.[0]?.count || 0
      }))

      return respondSuccess(processedCategories)
    } catch (error) {
      console.error('Error inesperado:', error)
      return {
        data: {
          success: false,
          error: 'Error interno del servidor'
        }
      }
    }
  }

  if (method === 'POST') {
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

      // Verificar si ya existe una categoría con el mismo nombre
      const { data: existingCategory, error: checkError } = await supabase
        .from('categories')
        .select('id_category')
        .eq('name', body.name.trim())
        .single()

      if (existingCategory) {
        return respondError('Ya existe una categoría con ese nombre')
      }

      // Crear nueva categoría
      const newCategory = {
        name: body.name.trim(),
        description: body.description?.trim() || null,
        image_url: uploadedImageUrl || body.image_url || null,
        is_active: body.is_active !== undefined ? body.is_active : true
      }

      const { data, error } = await supabase
        .from('categories')
        .insert(newCategory as any)
        .select()
        .single()

      if (error) {
        console.error('Error creando categoría:', error)
        return respondError('Error creando categoría')
      }

      return respondSuccess({ ...(data as any), product_count: 0 }, 'Categoría creada exitosamente')
    } catch (error) {
      console.error('Error inesperado:', error)
      return respondError('Error interno del servidor')
    }
  }

  // Método no permitido
  return respondError('Método no permitido')
})
