import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, h as getRouterParam, r as respondError, a as requireAdmin, b as respondSuccess, k as readBody } from '../../../_/nitro.mjs';
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
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  const id = getRouterParam(event, "id");
  if (!id) return respondError("ID de oferta requerido");
  if (method === "GET") {
    try {
      await requireAdmin(event);
      const { data, error } = await supabase.from("offers").select(`
          *,
          product:products(id_product, name, sku, price, image_url)
        `).eq("id_offer", id).single();
      if (error || !data) return respondError("Oferta no encontrada");
      return respondSuccess(data);
    } catch (e) {
      console.error("GET /api/offers/[id] error:", e);
      return respondError("Error interno del servidor");
    }
  }
  if (method === "PUT") {
    try {
      await requireAdmin(event);
      const body = await readBody(event);
      const payload = {};
      if (body.product_id !== void 0) payload.product_id = body.product_id;
      if (body.discount_percent !== void 0) payload.discount_percent = Number(body.discount_percent);
      if (body.is_active !== void 0) payload.is_active = !!body.is_active;
      if (body.valid_from !== void 0) payload.valid_from = body.valid_from;
      if (body.valid_to !== void 0) payload.valid_to = body.valid_to;
      if (body.notes !== void 0) payload.notes = body.notes;
      const { data, error } = await supabase.from("offers").update(payload).eq("id_offer", id).select().single();
      if (error) return respondError("Error actualizando oferta", error.message);
      return respondSuccess(data, "Oferta actualizada exitosamente");
    } catch (e) {
      console.error("PUT /api/offers/[id] error:", e);
      return respondError("Error interno del servidor");
    }
  }
  if (method === "DELETE") {
    try {
      await requireAdmin(event);
      const { error } = await supabase.from("offers").delete().eq("id_offer", id);
      if (error) return respondError("Error eliminando oferta", error.message);
      return respondSuccess(null, "Oferta eliminada exitosamente");
    } catch (e) {
      console.error("DELETE /api/offers/[id] error:", e);
      return respondError("Error interno del servidor");
    }
  }
  return respondError("M\xE9todo no permitido");
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
