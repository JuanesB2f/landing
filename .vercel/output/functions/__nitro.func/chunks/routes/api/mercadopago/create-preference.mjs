import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, r as respondError, c as requireAuth, e as serverSupabaseUser, k as readBody, b as respondSuccess } from '../../../_/nitro.mjs';
import { Preference, MercadoPagoConfig } from 'mercadopago';
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

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "TEST-...",
  options: { timeout: 5e3 }
});
const preference = new Preference(client);
const createPreference = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  if (method !== "POST") {
    return respondError("M\xE9todo no permitido");
  }
  try {
    await requireAuth(event);
    const authUser = await serverSupabaseUser(event);
    if (!authUser) return respondError("No autenticado");
    const body = await readBody(event);
    if (!body.customer_id || !body.order_items || body.order_items.length === 0) {
      return respondError("El cliente y al menos un item son requeridos");
    }
    const { data: profile, error: profileError } = await supabase.from("profiles").select("id, role, is_active").eq("id", authUser.id).single();
    if (profileError || !profile) return respondError("Perfil no encontrado");
    if (!["customer", "user"].includes(profile.role)) return respondError("Solo clientes o usuarios pueden crear pedidos");
    if (profile.is_active === false) return respondError("Usuario inactivo");
    const { data: customer, error: customerError } = await supabase.from("customers").select("id_customer, name, email, phone, is_active").eq("id_customer", body.customer_id).single();
    if (customerError || !customer) return respondError("Cliente no encontrado");
    if (customer.is_active === false) return respondError("El cliente est\xE1 inactivo");
    let subtotal = 0;
    const items = [];
    for (const item of body.order_items) {
      if (!item.product_id || !item.quantity) {
        return respondError("Todos los items deben tener product_id y quantity");
      }
      const { data: product, error: productError } = await supabase.from("products").select("id_product, name, stock_quantity, price, image_url").eq("id_product", item.product_id).single();
      if (productError || !product) return respondError(`Producto ${item.product_id} no encontrado`);
      if (product.stock_quantity < item.quantity) {
        return respondError(`Stock insuficiente para ${product.name}. Disponible: ${product.stock_quantity}, Solicitado: ${item.quantity}`);
      }
      const unitPrice = Number(product.price);
      const totalPrice = Number(item.quantity) * unitPrice;
      subtotal += totalPrice;
      items.push({
        id: item.product_id,
        title: product.name,
        description: `SKU: ${product.sku || item.product_id}`,
        category_id: "fashion",
        quantity: item.quantity,
        currency_id: "COP",
        unit_price: unitPrice,
        picture_url: product.image_url || void 0
      });
    }
    const taxAmount = body.tax_amount || 0;
    const shippingAmount = body.shipping_amount || 0;
    const totalAmount = subtotal + taxAmount + shippingAmount;
    const newOrder = {
      customer_id: body.customer_id,
      total_amount: totalAmount,
      subtotal,
      tax_amount: taxAmount,
      shipping_amount: shippingAmount,
      status: "pending",
      shipping_address: body.shipping_address || null,
      billing_address: body.shipping_address || null,
      payment_method: "mercadopago",
      payment_status: "pending",
      tracking_number: null,
      notes: "Pago pendiente con MercadoPago",
      order_source: "customer",
      assigned_user_id: null
    };
    const orderRes = await supabase.from("orders").insert(newOrder).select().single();
    const orderData = orderRes.data;
    const orderError = orderRes.error;
    if (orderError) return respondError("Error creando pedido", orderError.message);
    const orderItems = body.order_items.map((i) => ({
      product_id: i.product_id,
      quantity: i.quantity,
      unit_price: i.unit_price,
      total_price: i.quantity * i.unit_price,
      order_id: orderData.id_order
    }));
    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
    if (itemsError) {
      await supabase.from("orders").delete().eq("id_order", orderData.id_order);
      return respondError("Error creando items del pedido", itemsError.message);
    }
    const preferenceData = {
      items,
      payer: {
        name: customer.name || "Cliente",
        email: customer.email || authUser.email || "",
        phone: {
          number: customer.phone || ""
        }
      },
      back_urls: {
        success: `${process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000"}/checkout/success?order_id=${orderData.id_order}`,
        failure: `${process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000"}/shop/cart?error=payment_failed`,
        pending: `${process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000"}/checkout/pending?order_id=${orderData.id_order}`
      },
      auto_return: "approved",
      notification_url: `${process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/mercadopago/webhook`,
      external_reference: orderData.id_order,
      metadata: {
        order_id: orderData.id_order,
        customer_id: body.customer_id
      }
    };
    const preferenceResult = await preference.create({ body: preferenceData });
    await supabase.from("orders").update({
      payment_reference: preferenceResult.id,
      notes: `MercadoPago Preference: ${preferenceResult.id}`
    }).eq("id_order", orderData.id_order);
    return respondSuccess({
      preference_id: preferenceResult.id,
      init_point: preferenceResult.init_point,
      sandbox_init_point: preferenceResult.sandbox_init_point,
      order_id: orderData.id_order
    }, "Preferencia de pago creada exitosamente");
  } catch (error) {
    console.error("Error en POST /api/mercadopago/create-preference:", error);
    return respondError("Error interno del servidor", error.message || "Error desconocido");
  }
});

export { createPreference as default };
//# sourceMappingURL=create-preference.mjs.map
