import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, a as requireAdmin, r as respondError, b as respondSuccess, k as readBody } from '../../_/nitro.mjs';
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

const index = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  if (method === "GET") {
    try {
      await requireAdmin(event);
      const { data, error } = await supabase.from("offers").select(`
          *,
          product:products(id_product, name, sku, price, image_url)
        `).order("created_at", { ascending: false });
      if (error) return respondError("Error obteniendo ofertas", error.message);
      return respondSuccess(data);
    } catch (e) {
      console.error("GET /api/offers error:", e);
      return respondError("Error interno del servidor");
    }
  }
  if (method === "POST") {
    try {
      await requireAdmin(event);
      const body = await readBody(event);
      if (!body.product_id || body.discount_percent === void 0) {
        return respondError("product_id y discount_percent son requeridos");
      }
      const payload = {
        product_id: body.product_id,
        discount_percent: Number(body.discount_percent),
        is_active: body.is_active !== void 0 ? !!body.is_active : true,
        valid_from: body.valid_from || null,
        valid_to: body.valid_to || null,
        notes: body.notes || null
      };
      const { data, error } = await supabase.from("offers").insert(payload).select().single();
      if (error) return respondError("Error creando oferta", error.message);
      return respondSuccess(data, "Oferta creada exitosamente");
    } catch (e) {
      console.error("POST /api/offers error:", e);
      return respondError("Error interno del servidor");
    }
  }
  return respondError("M\xE9todo no permitido");
});

export { index as default };
//# sourceMappingURL=index5.mjs.map
