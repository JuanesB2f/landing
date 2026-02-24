import { d as defineEventHandler, g as getMethod, n as createError, k as readBody, s as serverSupabaseClient } from '../../../_/nitro.mjs';
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

const webhook = defineEventHandler(async (event) => {
  const method = getMethod(event);
  if (method !== "POST") {
    return createError({
      statusCode: 405,
      statusMessage: "M\xE9todo no permitido"
    });
  }
  const body = await readBody(event);
  const supabase = await serverSupabaseClient(event);
  console.log("\u{1F514} Webhook de MercadoPago recibido:", body);
  try {
    const { id, type } = body;
    if (!id || !type) {
      console.log("\u274C Webhook sin ID o tipo v\xE1lido");
      return { received: true };
    }
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      console.error("\u274C MERCADOPAGO_ACCESS_TOKEN no configurado");
      return { received: true };
    }
    const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });
    if (!paymentResponse.ok) {
      console.error("\u274C Error obteniendo detalles del pago desde MercadoPago");
      return { received: true };
    }
    const paymentData = await paymentResponse.json();
    console.log("\u{1F4B3} Datos del pago:", paymentData);
    const orderId = paymentData.external_reference;
    if (!orderId) {
      console.log("\u274C No se encontr\xF3 external_reference en el pago");
      return { received: true };
    }
    const { data: order, error: orderError } = await supabase.from("orders").select("id_order, payment_status, total_amount").eq("id_order", orderId).single();
    if (orderError || !order) {
      console.error("\u274C Pedido no encontrado:", orderId);
      return { received: true };
    }
    let paymentStatus = "pending";
    switch (paymentData.status) {
      case "approved":
        paymentStatus = "paid";
        console.log("\u2705 Pago aprobado:", orderId);
        break;
      case "rejected":
        paymentStatus = "failed";
        console.log("\u274C Pago rechazado:", orderId);
        break;
      case "pending":
        paymentStatus = "pending";
        console.log("\u23F3 Pago pendiente:", orderId);
        break;
      case "cancelled":
        paymentStatus = "failed";
        console.log("\u{1F6AB} Pago cancelado:", orderId);
        break;
      default:
        console.log("\u2753 Estado de pago desconocido:", paymentData.status);
        return { received: true };
    }
    const { error: updateError } = await supabase.from("orders").update({
      payment_status: paymentStatus,
      payment_method: "mercadopago",
      updated_at: (/* @__PURE__ */ new Date()).toISOString(),
      notes: `Estado: ${paymentData.status}, Payment ID: ${id}, MercadoPago`
    }).eq("id_order", orderId);
    if (updateError) {
      console.error("\u274C Error actualizando estado de pago:", updateError);
    } else {
      console.log(`\u2705 Estado de pago actualizado a "${paymentStatus}" para pedido:`, orderId);
    }
    return { received: true };
  } catch (error) {
    console.error("\u274C Error procesando webhook de MercadoPago:", error);
    return { received: true };
  }
});

export { webhook as default };
//# sourceMappingURL=webhook.mjs.map
