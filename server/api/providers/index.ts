import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)

  try {
    if (method === 'GET') {
      // Obtener todos los proveedores (sin join problemático)
      const { data: providers, error: providersError } = await supabase
        .from('providers')
        .select('*')
        .order('name')

      if (providersError) {
        throw providersError
      }

      // Por ahora, establecer product_count en 0 hasta que se implemente la relación
      const providersWithCount = providers.map(provider => ({
        ...provider,
        product_count: 0 // Temporalmente en 0
      }))

      return {
        data: {
          success: true,
          data: providersWithCount
        }
      }

    } else if (method === 'POST') {
      // Crear nuevo proveedor
      const body = await readBody(event)
      
      // Validaciones básicas
      if (!body.name || body.name.trim().length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: 'El nombre del proveedor es obligatorio'
        })
      }

      // Verificar si ya existe un proveedor con el mismo nombre
      const { data: existingProvider, error: checkError } = await supabase
        .from('providers')
        .select('id_provider')
        .eq('name', body.name.trim())
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError
      }

      if (existingProvider) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Ya existe un proveedor con ese nombre'
        })
      }

      // Insertar nuevo proveedor
      const { data: newProvider, error: insertError } = await supabase
        .from('providers')
        .insert({
          name: body.name.trim(),
          email: body.email || null,
          phone: body.phone || null,
          address: body.address || null,
          city: body.city || null,
          contact_person: body.contact_person || null,
          is_active: body.is_active !== undefined ? body.is_active : true
        })
        .select()
        .single()

      if (insertError) {
        throw insertError
      }

      return {
        data: {
          success: true,
          data: newProvider,
          message: 'Proveedor creado exitosamente'
        }
      }

    } else {
      throw createError({
        statusCode: 405,
        statusMessage: 'Método no permitido'
      })
    }

  } catch (error) {
    console.error('Error en API de proveedores:', error)
    
    return {
      data: {
        success: false,
        error: error.message || 'Error interno del servidor'
      }
    }
  }
})
