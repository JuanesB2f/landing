import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, r as respondError, e as serverSupabaseUser, b as respondSuccess } from '../../../_/nitro.mjs';
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
  if (method !== "GET") return respondError("M\xE9todo no permitido");
  try {
    const user = await serverSupabaseUser(event);
    if (!user) return respondSuccess([]);
    const { data, error } = await supabase.from("reservations").select(`
        id_reservation,
        product_id,
        quantity,
        status,
        expires_at,
        created_at,
        updated_at
      `).eq("user_id", user.id).order("created_at", { ascending: false });
    if (error) return respondError("Error obteniendo mis reservas", error.message);
    return respondSuccess(data || []);
  } catch (e) {
    console.error("GET /api/reservations/my error:", e);
    return respondError("Error interno del servidor");
  }
});

export { my as default };
//# sourceMappingURL=my.mjs.map
