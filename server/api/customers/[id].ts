import { serverSupabaseClient } from '#supabase/server'
import { requireAdmin } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    return {
      success: false,
      error: 'ID de cliente requerido'
    }
  }

  if (method === 'GET') {
    try {
      // Obtener cliente específico
      const { data: customer, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id_customer', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return {
            success: false,
            error: 'Cliente no encontrado'
          }
        }
        console.error('Error obteniendo cliente:', error)
        return {
          success: false,
          error: 'Error obteniendo cliente',
          details: error.message
        }
      }

      // Obtener conteo de pedidos
      const { count: ordersCount } = await supabase
        .from('orders')
        .select('id_order', { count: 'exact', head: true })
        .eq('customer_id', id)

      const processedCustomer = {
        ...(customer as Record<string, unknown>),
        order_count: ordersCount || 0
      }

      return {
        success: true,
        data: processedCustomer
      }

    } catch (error) {
      console.error('Error en GET /api/customers/[id]:', error)
      return {
        success: false,
        error: 'Error interno del servidor'
      }
    }
  }

  if (method === 'PUT') {
    await requireAdmin(event)
    try {
      const body = await readBody(event)
      
      // Validar campos requeridos
      if (!body.first_name || !body.last_name || !body.email) {
        return {
          success: false,
          error: 'Los campos nombre, apellido y email son requeridos'
        }
      }

      // Verificar si el email ya existe en otro cliente
      const { data: existingCustomer, error: checkError } = await supabase
        .from('customers')
        .select('id_customer')
        .eq('email', body.email)
        .neq('id_customer', id)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error verificando email duplicado:', checkError)
        return {
          success: false,
          error: 'Error verificando email duplicado'
        }
      }

      if (existingCustomer) {
        return {
          success: false,
          error: 'Ya existe otro cliente con este email'
        }
      }

      // Actualizar cliente
      const updatedCustomer = {
        first_name: body.first_name.trim(),
        last_name: body.last_name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone?.trim() || null,
        address: body.address?.trim() || null,
        city: body.city?.trim() || null,
        state: body.state?.trim() || null,
        postal_code: body.postal_code?.trim() || null,
        country: body.country?.trim() || null,
        birth_date: body.birth_date || null,
        gender: body.gender || null,
        notes: body.notes?.trim() || null,
        is_active: body.is_active !== undefined ? body.is_active : true,
        updated_at: new Date().toISOString()
      }

      const { data, error } = await (supabase
        .from('customers') as any)
        .update(updatedCustomer)
        .eq('id_customer', id)
        .select()
        .single()

      if (error) {
        console.error('Error actualizando cliente:', error)
        return {
          success: false,
          error: 'Error actualizando cliente',
          details: error.message
        }
      }

      return {
        success: true,
        data: data,
        message: 'Cliente actualizado exitosamente'
      }

    } catch (error) {
      console.error('Error en PUT /api/customers/[id]:', error)
      return {
        success: false,
        error: 'Error interno del servidor'
      }
    }
  }

  if (method === 'DELETE') {
    await requireAdmin(event)
    try {
      // Verificar si el cliente tiene pedidos asociados
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('id_order')
        .eq('customer_id', id)
        .limit(1)

      if (ordersError) {
        console.error('Error verificando pedidos del cliente:', ordersError)
        return {
          success: false,
          error: 'Error verificando pedidos del cliente'
        }
      }

      if (orders && orders.length > 0) {
        return {
          success: false,
          error: 'No se puede eliminar el cliente porque tiene pedidos asociados'
        }
      }

      // Eliminar cliente
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id_customer', id)

      if (error) {
        console.error('Error eliminando cliente:', error)
        return {
          success: false,
          error: 'Error eliminando cliente',
          details: error.message
        }
      }

      return {
        success: true,
        message: 'Cliente eliminado exitosamente'
      }

    } catch (error) {
      console.error('Error en DELETE /api/customers/[id]:', error)
      return {
        success: false,
        error: 'Error interno del servidor'
      }
    }
  }

  return {
    success: false,
    error: 'Método no permitido'
  }
})
