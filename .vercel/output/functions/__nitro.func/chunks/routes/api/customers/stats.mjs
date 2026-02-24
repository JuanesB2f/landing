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

const stats = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  if (method !== "GET") return respondError("M\xE9todo no permitido");
  try {
    await requireAdmin(event);
    const { count: totalCustomers, error: customersError } = await supabase.from("customers").select("id_customer", { count: "exact", head: true });
    if (customersError) return respondError("Error obteniendo clientes", customersError.message);
    const { data: recentCustomers, error: recentError } = await supabase.from("customers").select("id_customer, first_name, last_name, email, created_at").order("created_at", { ascending: false }).limit(10);
    if (recentError) return respondError("Error obteniendo clientes recientes", recentError.message);
    return respondSuccess({ totalCustomers: totalCustomers || 0, recentCustomers });
  } catch (e) {
    console.error("GET /api/customers/stats error:", e);
    return respondError("Error interno del servidor");
  }
});

export { stats as default };
//# sourceMappingURL=stats.mjs.map
