import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, h as getRouterParam, k as readBody } from '../../../../_/nitro.mjs';
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

const updatePayment = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  const id = getRouterParam(event, "id");
  if (method !== "PATCH") {
    return {
      data: {
        success: false,
        error: "M\xE9todo no permitido"
      }
    };
  }
  if (!id) {
    return {
      data: {
        success: false,
        error: "ID de pedido requerido"
      }
    };
  }
  try {
    const body = await readBody(event);
    if (!body.payment_status) {
      return {
        data: {
          success: false,
          error: "El nuevo estado de pago es requerido"
        }
      };
    }
    const validPaymentStatuses = ["pending", "paid", "failed", "refunded"];
    if (!body.payment_status || !validPaymentStatuses.includes(body.payment_status)) {
      return {
        data: {
          success: false,
          error: "Estado de pago no v\xE1lido. Estados permitidos: pending, paid, failed, refunded"
        }
      };
    }
    const currentOrderRes = await supabase.from("orders").select("id_order, payment_status, status").eq("id_order", id).single();
    const fetchError = currentOrderRes.error;
    const currentOrder = currentOrderRes.data;
    if (fetchError) {
      if (fetchError.code === "PGRST116") {
        return {
          data: {
            success: false,
            error: "Pedido no encontrado"
          }
        };
      }
      console.error("Error obteniendo pedido:", fetchError);
      return {
        data: {
          success: false,
          error: "Error obteniendo pedido",
          details: fetchError.message
        }
      };
    }
    const currentPaymentStatus = currentOrder.payment_status;
    const newPaymentStatus = body.payment_status;
    const allowedPaymentTransitions = {
      pending: ["paid", "failed"],
      paid: ["refunded"],
      failed: ["pending", "paid"],
      refunded: []
    };
    if (!allowedPaymentTransitions[currentPaymentStatus].includes(newPaymentStatus)) {
      return {
        data: {
          success: false,
          error: `No se puede cambiar el estado de pago de '${currentPaymentStatus}' a '${newPaymentStatus}'. Transiciones permitidas: ${allowedPaymentTransitions[currentPaymentStatus].join(", ")}`
        }
      };
    }
    if (newPaymentStatus === "refunded" && currentPaymentStatus !== "paid") {
      return {
        data: {
          success: false,
          error: "Solo se puede reembolsar un pedido que est\xE9 pagado"
        }
      };
    }
    if (newPaymentStatus === "paid" && currentPaymentStatus === "refunded") {
      return {
        data: {
          success: false,
          error: "No se puede marcar como pagado un pedido reembolsado"
        }
      };
    }
    const updateData = {
      payment_status: newPaymentStatus,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    if (body.notes) {
      updateData.notes = body.notes.trim();
    }
    if (body.payment_method) {
      updateData.payment_method = body.payment_method.trim();
    }
    if (body.payment_reference) {
      updateData.payment_reference = body.payment_reference.trim();
    }
    const clientAny = supabase;
    const updateRes = await clientAny.from("orders").update(updateData).eq("id_order", id).select("id_order, payment_status, payment_method, notes, updated_at").single();
    const error = updateRes.error;
    const data = updateRes.data;
    if (error) {
      console.error("Error actualizando estado de pago del pedido:", error);
      return {
        data: {
          success: false,
          error: "Error actualizando estado de pago del pedido",
          details: error.message
        }
      };
    }
    if (newPaymentStatus === "failed" && currentPaymentStatus === "paid" && currentOrder.status === "confirmed") {
      const orderItemsRes = await supabase.from("order_items").select("product_id, quantity").eq("order_id", id);
      const itemsError = orderItemsRes.error;
      const orderItems = orderItemsRes.data;
      if (itemsError) {
        console.error("Error obteniendo items para restaurar stock:", itemsError);
      } else if (orderItems) {
        for (const item of orderItems) {
          const rpcRes = await supabase.rpc("adjust_product_stock", { p_id_product: item.product_id, p_delta: Number(item.quantity) });
          const stockError = rpcRes.error;
          if (stockError) console.error("Error restaurando stock via RPC:", stockError);
        }
      }
    }
    return {
      data: {
        success: true,
        data: {
          id_order: data.id_order,
          payment_status: data.payment_status,
          payment_method: data.payment_method,
          notes: data.notes,
          updated_at: data.updated_at
        },
        message: `Estado de pago del pedido actualizado exitosamente a '${newPaymentStatus}'`
      }
    };
  } catch (error) {
    console.error("Error en PATCH /api/orders/[id]/update-payment:", error);
    return {
      data: {
        success: false,
        error: "Error interno del servidor"
      }
    };
  }
});

export { updatePayment as default };
//# sourceMappingURL=update-payment.mjs.map
