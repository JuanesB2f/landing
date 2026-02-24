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
    const limit = 10;
    const [ordersRes, productsRes, customersRes] = await Promise.all([
      supabase.from("orders").select("id_order, created_at, status, total_amount").order("created_at", { ascending: false }).limit(limit),
      supabase.from("products").select("id_product, name, created_at").order("created_at", { ascending: false }).limit(limit),
      supabase.from("customers").select("id_customer, first_name, last_name, created_at").order("created_at", { ascending: false }).limit(limit)
    ]);
    const events = [];
    const orders = ordersRes.data || [];
    for (const o of orders) {
      events.push({
        type: "order",
        timestamp: o.created_at,
        title: `Orden #${o.id_order} - ${o.status}`,
        description: `Total: $${o.total_amount || 0}`
      });
    }
    const products = productsRes.data || [];
    for (const p of products) {
      events.push({
        type: "product",
        timestamp: p.created_at,
        title: `Producto creado: ${p.name}`
      });
    }
    const customers = customersRes.data || [];
    for (const c of customers) {
      events.push({
        type: "customer",
        timestamp: c.created_at,
        title: `Nuevo cliente: ${(c.first_name || "") + " " + (c.last_name || "")}`
      });
    }
    const recent = events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 15);
    return respondSuccess(recent);
  } catch (e) {
    console.error("GET /api/activity/recent error:", e);
    return respondError("Error interno del servidor");
  }
});

export { recent as default };
//# sourceMappingURL=recent.mjs.map
