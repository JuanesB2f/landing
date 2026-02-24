import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, h as getRouterParam, a as requireAdmin, b as respondSuccess, r as respondError } from '../../../../_/nitro.mjs';
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
        error: "ID de proveedor requerido"
      }
    };
  }
  try {
    await requireAdmin(event);
    const { data: currentProvider, error: fetchError } = await supabase.from("providers").select("is_active").eq("id_provider", id).single();
    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return {
          data: {
            success: false,
            error: "Proveedor no encontrado"
          }
        };
      }
      return {
        data: {
          success: false,
          error: "Error obteniendo proveedor"
        }
      };
    }
    const newStatus = !currentProvider.is_active;
    const { data: updatedProvider, error: updateError } = await supabase.from("providers").update({
      is_active: newStatus,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id_provider", id).select("id_provider, name, is_active").single();
    if (updateError) {
      return {
        data: {
          success: false,
          error: "Error actualizando proveedor"
        }
      };
    }
    return respondSuccess(updatedProvider, `Proveedor ${newStatus ? "activado" : "desactivado"} exitosamente`);
  } catch (error) {
    console.error("Error cambiando estado del proveedor:", error);
    return respondError(error.statusMessage || error.message || "Error interno del servidor");
  }
});

export { toggleStatus as default };
//# sourceMappingURL=toggle-status.mjs.map
