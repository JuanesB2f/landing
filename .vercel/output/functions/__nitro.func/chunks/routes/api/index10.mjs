import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, a as requireAdmin, f as useRuntimeConfig, m as getQuery, r as respondError, b as respondSuccess, c as requireAuth, e as serverSupabaseUser, k as readBody } from '../../_/nitro.mjs';
import { createClient } from '@supabase/supabase-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@supabase/ssr';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';

const index = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  if (method === "GET") {
    try {
      await requireAdmin(event);
      const config = useRuntimeConfig();
      const adminClient = createClient(
        config.public.supabaseUrl,
        config.supabaseServiceKey,
        { auth: { persistSession: false } }
      );
      const query = getQuery(event);
      const statusFilter = query.status || void 0;
      const limit = Number(query.limit || 200);
      const nowIso = (/* @__PURE__ */ new Date()).toISOString();
      await adminClient.from("reservations").update({ status: "cancelled", updated_at: (/* @__PURE__ */ new Date()).toISOString() }).lte("expires_at", nowIso).eq("status", "pending");
      let builder = adminClient.from("reservations").select(`
          *,
          user:profiles(id, email, first_name, last_name),
          product:products(id_product, name, sku, image_url, price)
        `).order("created_at", { ascending: false }).limit(limit);
      if (statusFilter) builder = builder.eq("status", statusFilter);
      const { data, error } = await builder;
      if (error) return respondError("Error obteniendo reservas", error.message);
      return respondSuccess(data);
    } catch (e) {
      return respondError("Error interno del servidor");
    }
  }
  if (method === "POST") {
    try {
      await requireAuth(event);
      const user = await serverSupabaseUser(event);
      if (!user) return respondError("No autenticado");
      const body = await readBody(event);
      if (!body.product_id || !body.quantity) return respondError("product_id y quantity son requeridos");
      const expiresAt = new Date(Date.now() + 1e3 * 60 * 30).toISOString();
      const payload = {
        user_id: user.id,
        product_id: body.product_id,
        quantity: Number(body.quantity),
        status: "pending",
        notes: body.notes || null,
        expires_at: body.expires_at || expiresAt
      };
      const { data, error } = await supabase.from("reservations").insert(payload).select().single();
      if (error) return respondError("Error creando reserva", error.message);
      return respondSuccess(data, "Reserva creada");
    } catch (e) {
      return respondError("Error interno del servidor");
    }
  }
  return respondError("M\xE9todo no permitido");
});

export { index as default };
//# sourceMappingURL=index10.mjs.map
