import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, r as respondError, c as requireAuth, e as serverSupabaseUser, k as readBody, b as respondSuccess } from '../../../_/nitro.mjs';
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

const createFromCustomer = defineEventHandler(async (event) => {
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
    if (!["customer", "user"].includes(profile.role)) return respondError("Solo clientes o usuarios pueden crear aqu\xED");
    if (profile.is_active === false) return respondError("Usuario inactivo");
    const { data: customer, error: customerError } = await supabase.from("customers").select("id_customer, is_active").eq("id_customer", body.customer_id).single();
    if (customerError || !customer) return respondError("Cliente no encontrado");
    if (customer.is_active === false) return respondError("El cliente est\xE1 inactivo");
    let subtotal = 0;
    const orderItems = [];
    for (const item of body.order_items) {
      if (!item.product_id || !item.quantity) {
        return respondError("Todos los items deben tener product_id y quantity");
      }
      const { data: product, error: productError } = await supabase.from("products").select("id_product, name, stock_quantity, price").eq("id_product", item.product_id).single();
      if (productError || !product) return respondError(`Producto ${item.product_id} no encontrado`);
      if (product.stock_quantity < item.quantity) {
        return respondError(`Stock insuficiente para ${product.name}. Disponible: ${product.stock_quantity}, Solicitado: ${item.quantity}`);
      }
      const unitPrice = Number(product.price);
      const totalPrice = Number(item.quantity) * unitPrice;
      subtotal += totalPrice;
      orderItems.push({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: unitPrice,
        total_price: totalPrice
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
      billing_address: body.billing_address || null,
      payment_method: body.payment_method || null,
      payment_status: "pending",
      tracking_number: null,
      notes: body.notes || null,
      order_source: "customer",
      assigned_user_id: null
    };
    const orderRes = await supabase.from("orders").insert(newOrder).select().single();
    const orderData = orderRes.data;
    const orderError = orderRes.error;
    if (orderError) return respondError("Error creando pedido", orderError.message);
    const orderItemsWithOrderId = orderItems.map((i) => ({ ...i, order_id: orderData.id_order }));
    const { error: itemsError } = await supabase.from("order_items").insert(orderItemsWithOrderId);
    if (itemsError) {
      await supabase.from("orders").delete().eq("id_order", orderData.id_order);
      return respondError("Error creando items del pedido", itemsError.message);
    }
    return respondSuccess(orderData, "Pedido creado exitosamente");
  } catch (error) {
    console.error("Error en POST /api/orders/create-from-customer:", error);
    return respondError("Error interno del servidor");
  }
});

export { createFromCustomer as default };
//# sourceMappingURL=create-from-customer.mjs.map
