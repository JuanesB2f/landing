import { d as defineEventHandler, s as serverSupabaseClient, g as getMethod, h as getRouterParam, a as requireAdmin, b as respondSuccess, r as respondError } from '../../../../_/nitro.mjs';
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
  const client = await serverSupabaseClient(event);
  const method = getMethod(event);
  const id = getRouterParam(event, "id");
  if (!id) {
    return {
      data: {
        success: false,
        error: "ID de producto requerido"
      }
    };
  }
  if (method !== "PATCH") {
    return {
      data: {
        success: false,
        error: "M\xE9todo no permitido"
      }
    };
  }
  try {
    await requireAdmin(event);
    const { data: currentProduct, error: getError } = await client.from("products").select("is_active").eq("id_product", id).single();
    if (getError) {
      if (getError.code === "PGRST116") {
        return {
          data: {
            success: false,
            error: "Producto no encontrado"
          }
        };
      }
      return {
        data: {
          success: false,
          error: "Error obteniendo producto"
        }
      };
    }
    const newStatus = !currentProduct.is_active;
    const { data: updatedProduct, error: updateError } = await client.from("products").update({
      is_active: newStatus,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id_product", id).select().single();
    if (updateError) {
      return {
        data: {
          success: false,
          error: "Error actualizando producto"
        }
      };
    }
    return respondSuccess(updatedProduct, `Producto ${newStatus ? "activado" : "desactivado"} exitosamente`);
  } catch (error) {
    console.error("Error cambiando estado del producto:", error);
    return respondError(error.statusMessage || error.message || "Error interno del servidor");
  }
});

export { toggleStatus as default };
//# sourceMappingURL=toggle-status.mjs.map
