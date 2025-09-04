import { serverSupabaseClient } from '#supabase/server'
import { requireAuth, requireAdmin, respondSuccess, respondError } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient<any>(event)

  try {
    if (method === 'GET') {
      setHeader(event, 'Cache-Control', 'public, max-age=60')
      // Obtener todos los proveedores
      const { data: providers, error: providersError } = await supabase
        .from('providers')
        .select('*')
        .order('name')

      if (providersError) {
        throw providersError
      }

      // Si la columna provider_id no existe en products, devolver conteo 0 para evitar error
      const providersWithCount = (providers as any[] || []).map((provider: any) => ({
        ...provider,
        product_count: 0
      }))

      return respondSuccess(providersWithCount)

    } else if (method === 'POST') {
      // Requiere sesión (alineado con productos)
      await requireAuth(event)
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
          contact_person: body.contact_person || null,
          is_active: body.is_active !== undefined ? body.is_active : true
        })
        .select()
        .single()

      if (insertError) {
        throw insertError
      }

      return respondSuccess(newProvider, 'Proveedor creado exitosamente')

    } else {
      throw createError({
        statusCode: 405,
        statusMessage: 'Método no permitido'
      })
    }

  } catch (error) {
    console.error('Error en API de proveedores:', error)
    return respondError((error as any).statusMessage || (error as any).message || 'Error interno del servidor')
  }
})
