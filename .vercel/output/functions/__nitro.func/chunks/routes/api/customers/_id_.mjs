import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, h as getRouterParam, a as requireAdmin, k as readBody } from '../../../_/nitro.mjs';
import '@supabase/supabase-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@supabase/ssr';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';

const _id_ = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  const id = getRouterParam(event, "id");
  if (!id) {
    return {
      success: false,
      error: "ID de cliente requerido"
    };
  }
  if (method === "GET") {
    try {
      const { data: customer, error } = await supabase.from("customers").select("*").eq("id_customer", id).single();
      if (error) {
        if (error.code === "PGRST116") {
          return {
            success: false,
            error: "Cliente no encontrado"
          };
        }
        console.error("Error obteniendo cliente:", error);
        return {
          success: false,
          error: "Error obteniendo cliente",
          details: error.message
        };
      }
      const { count: ordersCount } = await supabase.from("orders").select("id_order", { count: "exact", head: true }).eq("customer_id", id);
      const processedCustomer = {
        ...customer,
        order_count: ordersCount || 0
      };
      return {
        success: true,
        data: processedCustomer
      };
    } catch (error) {
      console.error("Error en GET /api/customers/[id]:", error);
      return {
        success: false,
        error: "Error interno del servidor"
      };
    }
  }
  if (method === "PUT") {
    await requireAdmin(event);
    try {
      const body = await readBody(event);
      if (!body.first_name || !body.last_name || !body.email) {
        return {
          success: false,
          error: "Los campos nombre, apellido y email son requeridos"
        };
      }
      const { data: existingCustomer, error: checkError } = await supabase.from("customers").select("id_customer").eq("email", body.email).neq("id_customer", id).single();
      if (checkError && checkError.code !== "PGRST116") {
        console.error("Error verificando email duplicado:", checkError);
        return {
          success: false,
          error: "Error verificando email duplicado"
        };
      }
      if (existingCustomer) {
        return {
          success: false,
          error: "Ya existe otro cliente con este email"
        };
      }
      const updatedCustomer = {
        first_name: body.first_name.trim(),
        last_name: body.last_name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: ((_a = body.phone) == null ? void 0 : _a.trim()) || null,
        address: ((_b = body.address) == null ? void 0 : _b.trim()) || null,
        city: ((_c = body.city) == null ? void 0 : _c.trim()) || null,
        state: ((_d = body.state) == null ? void 0 : _d.trim()) || null,
        postal_code: ((_e = body.postal_code) == null ? void 0 : _e.trim()) || null,
        country: ((_f = body.country) == null ? void 0 : _f.trim()) || null,
        birth_date: body.birth_date || null,
        gender: body.gender || null,
        notes: ((_g = body.notes) == null ? void 0 : _g.trim()) || null,
        is_active: body.is_active !== void 0 ? body.is_active : true,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { data, error } = await supabase.from("customers").update(updatedCustomer).eq("id_customer", id).select().single();
      if (error) {
        console.error("Error actualizando cliente:", error);
        return {
          success: false,
          error: "Error actualizando cliente",
          details: error.message
        };
      }
      return {
        success: true,
        data,
        message: "Cliente actualizado exitosamente"
      };
    } catch (error) {
      console.error("Error en PUT /api/customers/[id]:", error);
      return {
        success: false,
        error: "Error interno del servidor"
      };
    }
  }
  if (method === "DELETE") {
    await requireAdmin(event);
    try {
      const { data: orders, error: ordersError } = await supabase.from("orders").select("id_order").eq("customer_id", id).limit(1);
      if (ordersError) {
        console.error("Error verificando pedidos del cliente:", ordersError);
        return {
          success: false,
          error: "Error verificando pedidos del cliente"
        };
      }
      if (orders && orders.length > 0) {
        return {
          success: false,
          error: "No se puede eliminar el cliente porque tiene pedidos asociados"
        };
      }
      const { error } = await supabase.from("customers").delete().eq("id_customer", id);
      if (error) {
        console.error("Error eliminando cliente:", error);
        return {
          success: false,
          error: "Error eliminando cliente",
          details: error.message
        };
      }
      return {
        success: true,
        message: "Cliente eliminado exitosamente"
      };
    } catch (error) {
      console.error("Error en DELETE /api/customers/[id]:", error);
      return {
        success: false,
        error: "Error interno del servidor"
      };
    }
  }
  return {
    success: false,
    error: "M\xE9todo no permitido"
  };
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
