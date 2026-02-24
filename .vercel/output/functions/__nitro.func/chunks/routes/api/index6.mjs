import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, a as requireAdmin, f as useRuntimeConfig, b as respondSuccess, r as respondError, k as readBody } from '../../_/nitro.mjs';
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
      const { data: orders, error } = await adminClient.from("orders").select(`
          *,
          customer:customers(
            id_customer,
            first_name,
            last_name,
            email,
            phone
          ),
          order_items:order_items(
            id_order_item,
            quantity,
            unit_price,
            total_price,
            product:products(
              id_product,
              name,
              sku,
              image_url,
              price
            )
          )
        `).order("created_at", { ascending: false }).limit(500);
      if (error) {
        console.error("Error obteniendo pedidos:", error);
        return {
          data: {
            success: false,
            error: "Error obteniendo pedidos",
            details: error.message
          }
        };
      }
      const processedOrders = orders.map((order) => {
        var _a, _b;
        return {
          ...order,
          customer_name: order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : "Cliente no encontrado",
          customer_email: ((_a = order.customer) == null ? void 0 : _a.email) || "N/A",
          customer_phone: ((_b = order.customer) == null ? void 0 : _b.phone) || "N/A",
          items_count: (order.order_items || []).reduce((n, it) => n + Number(it.quantity || 0), 0),
          total_amount: Number(order.total_amount || (order.order_items || []).reduce((s, it) => s + Number(it.total_price || Number(it.quantity || 0) * Number(it.unit_price || 0)), 0)),
          subtotal: Number(order.subtotal || 0)
        };
      });
      return respondSuccess(processedOrders);
    } catch (error) {
      console.error("Error en GET /api/orders:", error);
      return respondError("Error interno del servidor");
    }
  }
  if (method === "POST") {
    try {
      await requireAdmin(event);
      const body = await readBody(event);
      if (!body.customer_id || !body.order_items || body.order_items.length === 0) {
        return respondError("El cliente y al menos un item son requeridos");
      }
      const { data: customer, error: customerError } = await supabase.from("customers").select("id_customer, is_active").eq("id_customer", body.customer_id).single();
      if (customerError || !customer) {
        return respondError("Cliente no encontrado");
      }
      if (!customer.is_active) {
        return respondError("El cliente est\xE1 inactivo");
      }
      let subtotal = 0;
      const orderItems = [];
      for (const item of body.order_items) {
        if (!item.product_id || !item.quantity || !item.unit_price) {
          return respondError("Todos los items deben tener product_id, quantity y unit_price");
        }
        const { data: product, error: productError } = await supabase.from("products").select("id_product, name, stock_quantity, price").eq("id_product", item.product_id).single();
        if (productError || !product) {
          return respondError(`Producto ${item.product_id} no encontrado`);
        }
        if (product.stock_quantity < item.quantity) {
          return respondError(`Stock insuficiente para ${product.name}. Disponible: ${product.stock_quantity}, Solicitado: ${item.quantity}`);
        }
        const totalPrice = Number(item.quantity) * Number(item.unit_price);
        subtotal += totalPrice;
        orderItems.push({
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
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
        status: body.status || "pending",
        shipping_address: body.shipping_address || null,
        billing_address: body.billing_address || null,
        payment_method: body.payment_method || null,
        payment_status: body.payment_status || "pending",
        tracking_number: body.tracking_number || null,
        notes: body.notes || null,
        order_source: "admin",
        assigned_user_id: body.assigned_user_id || null
      };
      const orderRes = await supabase.from("orders").insert(newOrder).select().single();
      const orderData = orderRes.data;
      const orderError = orderRes.error;
      if (orderError) {
        console.error("Error creando pedido:", orderError);
        return respondError("Error creando pedido", orderError.message);
      }
      const orderItemsWithOrderId = orderItems.map((item) => ({
        ...item,
        order_id: orderData.id_order
      }));
      const { error: itemsError } = await supabase.from("order_items").insert(orderItemsWithOrderId);
      if (itemsError) {
        console.error("Error creando items del pedido:", itemsError);
        await supabase.from("orders").delete().eq("id_order", orderData.id_order);
        return respondError("Error creando items del pedido", itemsError.message);
      }
      for (const item of orderItems) {
        const { error: stockError } = await supabase.from("products").update({
          stock_quantity: supabase.raw(`stock_quantity - ${item.quantity}`),
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }).eq("id_product", item.product_id);
        if (stockError) {
          console.error("Error actualizando stock:", stockError);
        }
      }
      const { data: completeOrder, error: fetchError } = await supabase.from("orders").select(`
          *,
          customer:customers(
            id_customer,
            first_name,
            last_name,
            email,
            phone
          ),
          order_items:order_items(
            id_order_item,
            quantity,
            unit_price,
            total_price,
            product:products(
              id_product,
              name,
              sku,
              image_url
            )
          )
        `).eq("id_order", orderData.id_order).single();
      if (fetchError) {
        console.error("Error obteniendo pedido completo:", fetchError);
      }
      return respondSuccess(completeOrder || orderData, "Pedido creado exitosamente");
    } catch (error) {
      console.error("Error en POST /api/orders:", error);
      return respondError("Error interno del servidor");
    }
  }
  return respondError("M\xE9todo no permitido");
});

export { index as default };
//# sourceMappingURL=index6.mjs.map
