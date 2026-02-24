import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, r as respondError, a as requireAdmin, b as respondSuccess } from '../../../_/nitro.mjs';
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

const recent = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  if (method !== "GET") return respondError("M\xE9todo no permitido");
  try {
    await requireAdmin(event);
    const { data, error } = await supabase.from("orders").select("id_order, total_amount, status, created_at, customer:customers(first_name, last_name)").order("created_at", { ascending: false }).limit(10);
    if (error) return respondError("Error obteniendo actividad", error.message);
    const activity = (data || []).map((o) => ({
      type: "order",
      title: "Nueva orden recibida",
      description: `Orden #${o.id_order} por $${o.total_amount}`,
      time: o.created_at,
      status: o.status,
      customer: o.customer ? `${o.customer.first_name} ${o.customer.last_name}` : null
    }));
    return respondSuccess(activity);
  } catch (e) {
    console.error("GET /api/orders/recent error:", e);
    return respondError("Error interno del servidor");
  }
});

export { recent as default };
//# sourceMappingURL=recent.mjs.map
