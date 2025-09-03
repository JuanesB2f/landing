/**
 * API endpoint para categorías
 * GET: Obtener todas las categorías activas
 * POST: Crear nueva categoría
 */

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)

  if (method === 'GET') {
    try {
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

      // Procesar las categorías (product_count temporalmente en 0)
      const processedCategories = categories.map(category => ({
        ...category,
        product_count: 0 // Temporalmente en 0 hasta implementar la relación
      }))

      return {
        data: {
          success: true,
          data: processedCategories
        }
      }
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
      const body = await readBody(event)
      
      // Validar campos requeridos
      if (!body.name || !body.name.trim()) {
        return {
          data: {
            success: false,
            error: 'El nombre de la categoría es obligatorio'
          }
        }
      }

      // Verificar si ya existe una categoría con el mismo nombre
      const { data: existingCategory, error: checkError } = await supabase
        .from('categories')
        .select('id_category')
        .eq('name', body.name.trim())
        .single()

      if (existingCategory) {
        return {
          data: {
            success: false,
            error: 'Ya existe una categoría con ese nombre'
          }
        }
      }

      // Crear nueva categoría
      const newCategory = {
        name: body.name.trim(),
        description: body.description?.trim() || null,
        is_active: body.is_active !== undefined ? body.is_active : true
      }

      const { data, error } = await supabase
        .from('categories')
        .insert(newCategory)
        .select()
        .single()

      if (error) {
        console.error('Error creando categoría:', error)
        return {
          data: {
            success: false,
            error: 'Error creando categoría'
          }
        }
      }

      return {
        data: {
          success: true,
          data: { ...data, product_count: 0 },
          message: 'Categoría creada exitosamente'
        }
      }
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

  // Método no permitido
  return {
    data: {
      success: false,
      error: 'Método no permitido'
    }
  }
})
