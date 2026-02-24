import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, h as getRouterParam, r as respondError, a as requireAdmin, b as respondSuccess } from '../../../../_/nitro.mjs';
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

const cancel = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  const id = getRouterParam(event, "id");
  if (method !== "PATCH") return respondError("M\xE9todo no permitido");
  if (!id) return respondError("ID de reserva requerido");
  try {
    await requireAdmin(event);
    const { data, error } = await supabase.from("reservations").update({ status: "cancelled", updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id_reservation", id).eq("status", "pending").select().single();
    if (error) return respondError("Error cancelando reserva", error.message);
    return respondSuccess(data, "Reserva cancelada");
  } catch (e) {
    return respondError("Error interno del servidor");
  }
});

export { cancel as default };
//# sourceMappingURL=cancel.mjs.map
