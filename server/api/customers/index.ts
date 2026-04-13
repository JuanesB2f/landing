import { serverSupabaseClient, serverSupabaseServiceRole } from '#supabase/server'
import { requireAdmin } from '~/server/utils/auth'
import { mergeCustomerRows } from '~/server/utils/customer-groups'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const supabase = await serverSupabaseClient(event)

  if (method === 'GET') {
    try {
      // Solo admins y usar service role para evitar bloqueos por RLS en joins
      await requireAdmin(event)
      const adminClient = serverSupabaseServiceRole(event) as any

      // Obtener todos los clientes
      const { data: customers, error } = await adminClient
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error obteniendo clientes:', error)
        return {
          data: {
            success: false,
            error: 'Error obteniendo clientes',
            details: error.message
          }
        }
      }

      // Obtener conteo de pedidos por cliente
      const ids = (customers || []).map((c: any) => c.id_customer)
      const counts: Record<string, number> = {}
      if (ids.length > 0) {
        const { data: orders } = await adminClient
          .from('orders')
          .select('customer_id')
          .in('customer_id', ids)
        for (const o of ((orders as Array<{ customer_id: string }>) || [])) {
          const cid = String(o.customer_id)
          counts[cid] = (counts[cid] || 0) + 1
        }
      }

      const processedCustomers = mergeCustomerRows(customers || [], counts)

      return {
        data: {
          success: true,
          data: processedCustomers
        }
      }

    } catch (error) {
      console.error('Error en GET /api/customers:', error)
      return {
        data: {
          success: false,
          error: 'Error interno del servidor'
        }
      }
    }
  }

  if (method === 'POST') {
    await requireAdmin(event)
    try {
      const body = await readBody(event)
      
      // Validar campos requeridos
      if (!body.first_name || !body.last_name || !body.email) {
        return {
          data: {
            success: false,
            error: 'Los campos nombre, apellido y email son requeridos'
          }
        }
      }

      // Verificar si el email ya existe
      const { data: existingCustomer, error: checkError } = await supabase
        .from('customers')
        .select('id_customer')
        .eq('email', body.email)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error verificando email duplicado:', checkError)
        return {
          data: {
            success: false,
            error: 'Error verificando email duplicado'
          }
        }
      }

      if (existingCustomer) {
        return {
          data: {
            success: false,
            error: 'Ya existe un cliente con este email'
          }
        }
      }

      // Crear nuevo cliente
      const newCustomer = {
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
        is_active: body.is_active !== undefined ? body.is_active : true
      }

      const { data, error } = await (supabase
        .from('customers') as any)
        .insert(newCustomer)
        .select()
        .single()

      if (error) {
        console.error('Error creando cliente:', error)
        return {
          data: {
            success: false,
            error: 'Error creando cliente',
            details: error.message
          }
        }
      }

      return {
        data: {
          success: true,
          data: data,
          message: 'Cliente creado exitosamente'
        }
      }

    } catch (error) {
      console.error('Error en POST /api/customers:', error)
      return {
        data: {
          success: false,
          error: 'Error interno del servidor'
        }
      }
    }
  }

  return {
    data: {
      success: false,
      error: 'Método no permitido'
    }
  }
})
