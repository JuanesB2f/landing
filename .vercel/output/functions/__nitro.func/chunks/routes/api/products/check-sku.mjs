import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, r as respondError, a as requireAdmin, m as getQuery, b as respondSuccess } from '../../../_/nitro.mjs';
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

const checkSku = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  if (method !== "GET") {
    return respondError("M\xE9todo no permitido");
  }
  try {
    await requireAdmin(event);
    const query = getQuery(event);
    const sku = String(query.sku || "").trim();
    const excludeId = query.exclude_id ? String(query.exclude_id) : null;
    if (!sku) {
      return respondError("SKU requerido");
    }
    let builder = supabase.from("products").select("id_product").eq("sku", sku);
    if (excludeId) builder = builder.neq("id_product", excludeId);
    const { data, error } = await builder.limit(1);
    if (error) {
      console.error("Error verificando SKU:", error);
      return respondError("Error verificando SKU", error.message);
    }
    const exists = Array.isArray(data) && data.length > 0;
    return respondSuccess({ exists });
  } catch (error) {
    console.error("Error en GET /api/products/check-sku:", error);
    return respondError("Error interno del servidor");
  }
});

export { checkSku as default };
//# sourceMappingURL=check-sku.mjs.map
