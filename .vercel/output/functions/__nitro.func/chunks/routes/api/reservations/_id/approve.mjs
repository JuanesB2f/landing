import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, h as getRouterParam, r as respondError, a as requireAdmin, f as useRuntimeConfig, b as respondSuccess } from '../../../../_/nitro.mjs';
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

const approve = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  const id = getRouterParam(event, "id");
  if (method !== "POST") return respondError("M\xE9todo no permitido");
  if (!id) return respondError("ID de reserva requerido");
  try {
    await requireAdmin(event);
    const config = useRuntimeConfig();
    const adminClient = createClient(
      config.public.supabaseUrl,
      config.supabaseServiceKey,
      { auth: { persistSession: false } }
    );
    const res = await supabase.from("reservations").select(`*, user:profiles(id, email, first_name, last_name), product:products(id_product, name, price, sku, stock_quantity)`).eq("id_reservation", id).single();
    const reservationError = res.error;
    const reservation = res.data;
    if (reservationError || !reservation) return respondError("Reserva no encontrada");
    if (reservation.status !== "pending") return respondError("La reserva no est\xE1 pendiente");
    const quantity = Number(reservation.quantity);
    const unitPrice = Number(((_a = reservation.product) == null ? void 0 : _a.price) || 0);
    if (Number(((_b = reservation.product) == null ? void 0 : _b.stock_quantity) || 0) < quantity) {
      return respondError("Stock insuficiente para aprobar el pedido");
    }
    const customerRes = await adminClient.from("customers").select("id_customer").eq("user_id", reservation.user_id).single();
    let customerId = (_c = customerRes.data) == null ? void 0 : _c.id_customer;
    if (!customerRes.data || customerRes.error) {
      const profile = reservation.user;
      const safeEmail = (profile == null ? void 0 : profile.email) || "no-email@local";
      const existingByEmail = await adminClient.from("customers").select("id_customer").eq("email", safeEmail).single();
      const existingEmailErr = existingByEmail.error;
      const existingEmail = existingByEmail.data;
      if (existingEmail && !existingEmailErr) {
        const upd = await adminClient.from("customers").update({ user_id: reservation.user_id, is_active: true, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id_customer", existingEmail.id_customer).select("id_customer").single();
        if (upd.error) return respondError("Error vinculando cliente", upd.error.message);
        customerId = upd.data.id_customer;
      } else {
        const createCust = await adminClient.from("customers").insert({
          user_id: reservation.user_id,
          first_name: (profile == null ? void 0 : profile.first_name) || "Cliente",
          last_name: (profile == null ? void 0 : profile.last_name) || "N/A",
          email: safeEmail,
          is_active: true
        }).select("id_customer").single();
        if (createCust.error) return respondError("Error creando cliente", createCust.error.message);
        customerId = createCust.data.id_customer;
      }
    }
    if (!customerId) return respondError("No fue posible obtener/crear el cliente");
    const subtotal = unitPrice * quantity;
    const newOrder = {
      customer_id: customerId,
      total_amount: subtotal,
      subtotal,
      tax_amount: 0,
      shipping_amount: 0,
      status: "confirmed",
      shipping_address: null,
      billing_address: null,
      payment_method: null,
      payment_status: "paid",
      tracking_number: null,
      notes: `Aprobado desde reserva ${id}`,
      order_source: "admin",
      assigned_user_id: null
    };
    const orderRes = await adminClient.from("orders").insert(newOrder).select().single();
    if (orderRes.error) return respondError("Error creando pedido", orderRes.error.message);
    const orderData = orderRes.data;
    const item = {
      order_id: orderData.id_order,
      product_id: reservation.product_id,
      quantity,
      unit_price: unitPrice,
      total_price: unitPrice * quantity
    };
    const itemsRes = await adminClient.from("order_items").insert(item);
    if (itemsRes.error) {
      await supabase.from("orders").delete().eq("id_order", orderData.id_order);
      return respondError("Error creando items del pedido", itemsRes.error.message);
    }
    const rpcRes = await adminClient.rpc("adjust_product_stock", { p_id_product: reservation.product_id, p_delta: -Number(quantity) });
    const stockError = rpcRes.error;
    if (stockError) console.error("Error descontando stock via RPC:", stockError);
    await adminClient.from("reservations").update({ status: "converted", updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id_reservation", id);
    return respondSuccess(orderData, "Pedido aprobado desde reserva");
  } catch (e) {
    console.error("Error en POST /api/reservations/[id]/approve:", e);
    return respondError("Error interno del servidor");
  }
});

export { approve as default };
//# sourceMappingURL=approve.mjs.map
