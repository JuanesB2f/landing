import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, r as respondError, c as requireAuth, e as serverSupabaseUser, b as respondSuccess } from '../../../_/nitro.mjs';
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

const my = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  if (method !== "GET") {
    return respondError("M\xE9todo no permitido");
  }
  try {
    await requireAuth(event);
    const user = await serverSupabaseUser(event);
    if (!user) return respondError("No autenticado");
    const nowIso = (/* @__PURE__ */ new Date()).toISOString();
    const { data, error } = await supabase.from("user_offers").select(`
        *,
        product:products(id_product, name, sku, price, image_url)
      `).eq("user_id", user.id).eq("is_active", true).or(`valid_from.is.null,valid_from.lte.${nowIso}`).or(`valid_to.is.null,valid_to.gte.${nowIso}`);
    if (error) return respondError("Error obteniendo mis ofertas", error.message);
    return respondSuccess(data);
  } catch (error) {
    console.error("Error en GET /api/user-offers/my:", error);
    return respondError("Error interno del servidor");
  }
});

export { my as default };
//# sourceMappingURL=my.mjs.map
