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
        error: "ID de usuario requerido"
      }
    };
  }
  try {
    await requireAdmin(event);
    const { data: currentProfile, error: fetchError } = await supabase.from("profiles").select("is_active").eq("id", id).single();
    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return {
          data: {
            success: false,
            error: "Usuario no encontrado"
          }
        };
      }
      console.error("Error obteniendo estado del usuario:", fetchError);
      return {
        data: {
          success: false,
          error: "Error obteniendo estado del usuario",
          details: fetchError.message
        }
      };
    }
    const newStatus = !currentProfile.is_active;
    const { data, error } = await supabase.from("profiles").update({
      is_active: newStatus,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", id).select("id, is_active").single();
    if (error) {
      console.error("Error actualizando estado del usuario:", error);
      return {
        data: {
          success: false,
          error: "Error actualizando estado del usuario",
          details: error.message
        }
      };
    }
    return respondSuccess({ id: data.id, is_active: data.is_active }, `Usuario ${data.is_active ? "activado" : "desactivado"} exitosamente`);
  } catch (error) {
    console.error("Error en PATCH /api/profiles/[id]/toggle-status:", error);
    return respondError("Error interno del servidor");
  }
});

export { toggleStatus as default };
//# sourceMappingURL=toggle-status.mjs.map
