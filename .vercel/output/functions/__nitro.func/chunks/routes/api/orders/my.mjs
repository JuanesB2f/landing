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
    const authUser = await serverSupabaseUser(event);
    if (!authUser) return respondSuccess([]);
    const { data: customer, error: customerError } = await supabase.from("customers").select("id_customer").eq("user_id", authUser.id).single();
    if (customerError || !customer) return respondSuccess([]);
    const { data, error } = await supabase.from("orders").select(`
        *,
        order_items:order_items(
          id_order_item,
          quantity,
          unit_price,
          total_price,
          product:products(id_product, name, sku, image_url)
        )
      `).eq("customer_id", customer.id_customer).order("created_at", { ascending: false });
    if (error) return respondError("Error obteniendo mis pedidos", error.message);
    return respondSuccess(data || []);
  } catch (e) {
    console.error("GET /api/orders/my error:", e);
    return respondError("Error interno del servidor");
  }
});

export { my as default };
//# sourceMappingURL=my.mjs.map
