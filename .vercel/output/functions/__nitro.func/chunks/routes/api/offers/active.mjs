import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, r as respondError, b as respondSuccess } from '../../../_/nitro.mjs';
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

const active = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  if (method !== "GET") return respondError("M\xE9todo no permitido");
  try {
    const nowIso = (/* @__PURE__ */ new Date()).toISOString();
    const { data, error } = await supabase.from("offers").select(`
        *,
        product:products(id_product, name, sku, price, image_url, stock_quantity)
      `).eq("is_active", true).or(`valid_from.is.null,valid_from.lte.${nowIso}`).or(`valid_to.is.null,valid_to.gte.${nowIso}`);
    if (error) return respondError("Error obteniendo ofertas", error.message);
    return respondSuccess(data);
  } catch (e) {
    console.error("GET /api/offers/active error:", e);
    return respondError("Error interno del servidor");
  }
});

export { active as default };
//# sourceMappingURL=active.mjs.map
