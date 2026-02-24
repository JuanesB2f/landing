import { d as defineEventHandler, g as getMethod, r as respondError, s as serverSupabaseClient, e as serverSupabaseUser, h as getRouterParam, b as respondSuccess } from '../../../../_/nitro.mjs';
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
  var _a;
  const method = getMethod(event);
  if (method !== "POST") return respondError("M\xE9todo no permitido");
  try {
    const supabase = await serverSupabaseClient(event);
    const user = await serverSupabaseUser(event);
    if (!user) return respondError("No autenticado");
    const id = getRouterParam(event, "id");
    if (!id) return respondError("ID de pedido requerido");
    const { data: order, error } = await supabase.from("orders").select("id_order, status, customer_id, customers!inner(user_id)").eq("id_order", id).maybeSingle();
    if (error || !order) return respondError("Pedido no encontrado");
    if (((_a = order.customers) == null ? void 0 : _a.user_id) !== user.id) return respondError("No autorizado");
    if (order.status !== "pending") return respondError("Solo se puede cancelar si est\xE1 pendiente");
    const updRes = await supabase.from("orders").update({ status: "cancelled", updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id_order", id);
    const updErr = updRes.error;
    if (updErr) return respondError("No se pudo cancelar el pedido", updErr.message);
    return respondSuccess(null, "Pedido cancelado");
  } catch (e) {
    console.error("POST /api/orders/[id]/cancel error:", e);
    return respondError("Error interno del servidor");
  }
});

export { cancel as default };
//# sourceMappingURL=cancel.mjs.map
