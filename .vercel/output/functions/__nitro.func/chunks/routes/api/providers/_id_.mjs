import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, h as getRouterParam, n as createError, b as respondSuccess, a as requireAdmin, k as readBody, r as respondError } from '../../../_/nitro.mjs';
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
  var _a, _b;
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID de proveedor requerido"
    });
  }
  try {
    if (method === "GET") {
      const { data: provider, error } = await supabase.from("providers").select(`
          *,
          products:products(count)
        `).eq("id_provider", id).single();
      if (error) {
        if (error.code === "PGRST116") {
          throw createError({
            statusCode: 404,
            statusMessage: "Proveedor no encontrado"
          });
        }
        throw error;
      }
      const providerWithCount = {
        ...provider,
        product_count: ((_b = (_a = provider == null ? void 0 : provider.products) == null ? void 0 : _a[0]) == null ? void 0 : _b.count) || 0
      };
      return respondSuccess(providerWithCount);
    } else if (method === "PUT") {
      await requireAdmin(event);
      const body = await readBody(event);
      if (!body.name || body.name.trim().length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: "El nombre del proveedor es obligatorio"
        });
      }
      const { data: existingProvider, error: checkError } = await supabase.from("providers").select("id_provider").eq("name", body.name.trim()).neq("id_provider", id).single();
      if (checkError && checkError.code !== "PGRST116") {
        throw checkError;
      }
      if (existingProvider) {
        throw createError({
          statusCode: 400,
          statusMessage: "Ya existe otro proveedor con ese nombre"
        });
      }
      const { data: updatedProvider, error: updateError } = await supabase.from("providers").update({
        name: body.name.trim(),
        email: body.email || null,
        phone: body.phone || null,
        address: body.address || null,
        contact_person: body.contact_person || null,
        is_active: body.is_active !== void 0 ? body.is_active : true,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id_provider", id).select().single();
      if (updateError) {
        throw updateError;
      }
      return respondSuccess(updatedProvider, "Proveedor actualizado exitosamente");
    } else if (method === "DELETE") {
      await requireAdmin(event);
      const { error: deleteError } = await supabase.from("providers").delete().eq("id_provider", id);
      if (deleteError) {
        if (deleteError.code === "PGRST116") {
          throw createError({ statusCode: 404, statusMessage: "Proveedor no encontrado" });
        }
        throw deleteError;
      }
      return respondSuccess(null, "Proveedor eliminado exitosamente");
    } else {
      throw createError({
        statusCode: 405,
        statusMessage: "M\xE9todo no permitido"
      });
    }
  } catch (error) {
    console.error("Error en API de proveedor espec\xEDfico:", error);
    if (error.statusCode) {
      throw error;
    }
    return respondError(error.statusMessage || error.message || "Error interno del servidor");
  }
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
