import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, h as getRouterParam } from '../../../../_/nitro.mjs';
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

const toggleStatus = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  const id = getRouterParam(event, "id");
  if (method !== "PATCH") {
    return {
      data: {
        success: false,
        error: "M\xE9todo no permitido"
      }
    };
  }
  if (!id) {
    return {
      data: {
        success: false,
        error: "ID de cliente requerido"
      }
    };
  }
  try {
    const { data: currentCustomer, error: fetchError } = await supabase.from("customers").select("is_active").eq("id_customer", id).single();
    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return {
          data: {
            success: false,
            error: "Cliente no encontrado"
          }
        };
      }
      console.error("Error obteniendo estado del cliente:", fetchError);
      return {
        data: {
          success: false,
          error: "Error obteniendo estado del cliente",
          details: fetchError.message
        }
      };
    }
    const newStatus = !currentCustomer.is_active;
    const { data, error } = await supabase.from("customers").update({
      is_active: newStatus,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id_customer", id).select("id_customer, is_active").single();
    if (error) {
      console.error("Error actualizando estado del cliente:", error);
      return {
        data: {
          success: false,
          error: "Error actualizando estado del cliente",
          details: error.message
        }
      };
    }
    return {
      data: {
        success: true,
        data: {
          id_customer: data.id_customer,
          is_active: data.is_active
        },
        message: `Cliente ${data.is_active ? "activado" : "desactivado"} exitosamente`
      }
    };
  } catch (error) {
    console.error("Error en PATCH /api/customers/[id]/toggle-status:", error);
    return {
      data: {
        success: false,
        error: "Error interno del servidor"
      }
    };
  }
});

export { toggleStatus as default };
//# sourceMappingURL=toggle-status.mjs.map
