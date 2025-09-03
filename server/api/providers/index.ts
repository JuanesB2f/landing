import { serverSupabaseClient } from '#supabase/server'
import { requireAdmin, respondSuccess, respondError } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)

  try {
    if (method === 'GET') {
      // Obtener todos los proveedores con conteo real de productos
      const { data: providers, error: providersError } = await supabase
        .from('providers')
        .select(`
          *,
          products:products(count)
        `)
        .order('name')

      if (providersError) {
        throw providersError
      }

      const providersWithCount = (providers || []).map((provider: any) => ({
        ...provider,
        product_count: provider.products?.[0]?.count || 0
      }))

      return respondSuccess(providersWithCount)

    } else if (method === 'POST') {
      // Requiere admin y crear nuevo proveedor
      await requireAdmin(event)
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
