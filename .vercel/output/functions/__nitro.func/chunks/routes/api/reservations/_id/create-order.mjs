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

const createOrder = defineEventHandler(async (event) => {
  var _a, _b;
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  const id = getRouterParam(event, "id");
  if (method !== "POST") return respondError("M\xE9todo no permitido");
  if (!id) return respondError("ID de reserva requerido");
  try {
    await requireAdmin(event);
    const res = await supabase.from("reservations").select(`
        *,
        user:profiles(id, email, first_name, last_name, is_active),
        product:products(id_product, name, price, sku)
      `).eq("id_reservation", id).single();
    const reservationError = res.error;
    const reservation = res.data;
    if (reservationError || !reservation) return respondError("Reserva no encontrada");
    if (reservation.status !== "pending") return respondError("La reserva no est\xE1 pendiente");
    const customerRes = await supabase.from("customers").select("id_customer").eq("user_id", reservation.user_id).single();
    let customerId = (_a = customerRes.data) == null ? void 0 : _a.id_customer;
    if (!customerRes.data || customerRes.error) {
      const profile = reservation.user;
      const createCust = await supabase.from("customers").insert({
        user_id: reservation.user_id,
        first_name: (profile == null ? void 0 : profile.first_name) || "Cliente",
        last_name: (profile == null ? void 0 : profile.last_name) || "N/A",
        email: (profile == null ? void 0 : profile.email) || null,
        is_active: true
      }).select("id_customer").single();
      if (createCust.error) return respondError("Error creando cliente");
      customerId = createCust.data.id_customer;
    }
    if (!customerId) return respondError("No fue posible obtener/crear el cliente");
    const quantity = Number(reservation.quantity);
    const unitPrice = Number(((_b = reservation.product) == null ? void 0 : _b.price) || 0);
    const subtotal = unitPrice * quantity;
    const newOrder = {
      customer_id: customerId,
      total_amount: subtotal,
      subtotal,
      tax_amount: 0,
      shipping_amount: 0,
      status: "pending",
      shipping_address: null,
      billing_address: null,
      payment_method: null,
      payment_status: "pending",
      tracking_number: null,
      notes: `Creado desde reserva ${id}`,
      order_source: "admin",
      assigned_user_id: null
    };
    const orderRes = await supabase.from("orders").insert(newOrder).select().single();
    if (orderRes.error) return respondError("Error creando pedido", orderRes.error.message);
    const orderData = orderRes.data;
    const item = {
      order_id: orderData.id_order,
      product_id: reservation.product_id,
      quantity,
      unit_price: unitPrice,
      total_price: unitPrice * quantity
    };
    const itemsRes = await supabase.from("order_items").insert(item);
    if (itemsRes.error) {
      await supabase.from("orders").delete().eq("id_order", orderData.id_order);
      return respondError("Error creando items del pedido", itemsRes.error.message);
    }
    await supabase.from("reservations").update({ status: "converted", updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id_reservation", id);
    return respondSuccess(orderData, "Pedido creado desde reserva");
  } catch (e) {
    console.error("Error en POST /api/reservations/[id]/create-order:", e);
    return respondError("Error interno del servidor");
  }
});

export { createOrder as default };
//# sourceMappingURL=create-order.mjs.map
