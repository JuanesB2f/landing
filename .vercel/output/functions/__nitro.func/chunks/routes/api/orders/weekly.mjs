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

const weekly = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  if (method !== "GET") return respondError("M\xE9todo no permitido");
  try {
    await requireAdmin(event);
    const days = 7;
    const start = /* @__PURE__ */ new Date();
    start.setDate(start.getDate() - (days - 1));
    start.setHours(0, 0, 0, 0);
    const startIso = start.toISOString();
    const { data, error } = await supabase.from("orders").select("created_at, total_amount").gte("created_at", startIso).order("created_at", { ascending: true });
    if (error) return respondError("Error obteniendo ventas semanales", error.message);
    const byDay = {};
    const cursor = new Date(start);
    for (let i = 0; i < days; i++) {
      const key = cursor.toISOString().slice(0, 10);
      byDay[key] = 0;
      cursor.setDate(cursor.getDate() + 1);
    }
    const rows = data || [];
    for (const row of rows) {
      const key = new Date(row.created_at).toISOString().slice(0, 10);
      byDay[key] = (byDay[key] || 0) + (row.total_amount || 0);
    }
    const series = Object.entries(byDay).map(([date, sales]) => ({ date, sales }));
    return respondSuccess({ series });
  } catch (e) {
    console.error("GET /api/orders/weekly error:", e);
    return respondError("Error interno del servidor");
  }
});

export { weekly as default };
//# sourceMappingURL=weekly.mjs.map
