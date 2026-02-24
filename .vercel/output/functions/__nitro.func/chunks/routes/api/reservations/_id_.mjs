import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, h as getRouterParam, r as respondError, a as requireAdmin, b as respondSuccess } from '../../../_/nitro.mjs';
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
  if (!id) return respondError("ID de reserva requerido");
  if (method === "DELETE") {
    try {
      await requireAdmin(event);
      const { error } = await supabase.from("reservations").delete().eq("id_reservation", id);
      if (error) return respondError("Error eliminando reserva", error.message);
      return respondSuccess(null, "Reserva eliminada");
    } catch (e) {
      return respondError("Error interno del servidor");
    }
  }
  return respondError("M\xE9todo no permitido");
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
