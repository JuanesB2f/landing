import { d as defineEventHandler, g as getMethod, h as getRouterParam, s as serverSupabaseClient, a as requireAdmin, r as respondError, b as respondSuccess } from '../../../../_/nitro.mjs';
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
  const id = getRouterParam(event, "id");
  const supabase = await serverSupabaseClient(event);
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
        error: "ID de categor\xEDa requerido"
      }
    };
  }
  try {
    await requireAdmin(event);
    const { data: currentCategory, error: fetchError } = await supabase.from("categories").select("is_active").eq("id_category", id).single();
    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return {
          data: {
            success: false,
            error: "Categor\xEDa no encontrada"
          }
        };
      }
      console.error("Error obteniendo categor\xEDa:", fetchError);
      return {
        data: {
          success: false,
          error: "Error obteniendo categor\xEDa"
        }
      };
    }
    const newStatus = !currentCategory.is_active;
    const { data, error } = await supabase.from("categories").update({
      is_active: newStatus,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id_category", id).select().single();
    if (error) {
      console.error("Error cambiando estado de categor\xEDa:", error);
      return respondError("Error cambiando estado de categor\xEDa");
    }
    return respondSuccess({ ...data, product_count: 0 }, `Categor\xEDa ${newStatus ? "activada" : "desactivada"} exitosamente`);
  } catch (error) {
    console.error("Error inesperado:", error);
    return respondError("Error interno del servidor");
  }
});

export { toggleStatus as default };
//# sourceMappingURL=toggle-status.mjs.map
