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

const latest = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  if (method !== "GET") return respondError("M\xE9todo no permitido");
  try {
    const { data, error } = await supabase.from("offers").select("id_offer, title, discount_percent, used_count, total_count, created_at").order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (error) return respondError("Error obteniendo \xFAltima oferta", error.message);
    return respondSuccess(data);
  } catch (e) {
    console.error("GET /api/offers/latest error:", e);
    return respondError("Error interno del servidor");
  }
});

export { latest as default };
//# sourceMappingURL=latest.mjs.map
