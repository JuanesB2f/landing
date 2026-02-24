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

const updateStatus = defineEventHandler(async (event) => {
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
    if (!body.status) {
      return {
        data: {
          success: false,
          error: "El nuevo estado es requerido"
        }
      };
    }
    const validStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
    if (!body.status || !validStatuses.includes(body.status)) {
      return {
        data: {
          success: false,
          error: "Estado no v\xE1lido. Estados permitidos: pending, confirmed, shipped, delivered, cancelled"
        }
      };
    }
    const currentOrderRes = await supabase.from("orders").select("id_order, status, payment_status").eq("id_order", id).single();
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
    const currentStatus = currentOrder.status;
    const newStatus = body.status;
    const allowedTransitions = {
      pending: ["confirmed", "cancelled"],
      confirmed: ["shipped", "cancelled"],
      shipped: ["delivered", "cancelled"],
      delivered: [],
      cancelled: []
    };
    if (!allowedTransitions[currentStatus].includes(newStatus)) {
      return {
        data: {
          success: false,
          error: `No se puede cambiar el estado de '${currentStatus}' a '${newStatus}'. Transiciones permitidas: ${allowedTransitions[currentStatus].join(", ")}`
        }
      };
    }
    if (newStatus === "shipped" && !body.tracking_number) {
      return {
        data: {
          success: false,
          error: 'El n\xFAmero de seguimiento es requerido cuando el estado cambia a "shipped"'
        }
      };
    }
    if (newStatus === "confirmed" && currentOrder.payment_status !== "paid") {
      return {
        data: {
          success: false,
          error: "No se puede confirmar un pedido con estado de pago pendiente"
        }
      };
    }
    const updateData = {
      status: newStatus,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    if (body.tracking_number) {
      updateData.tracking_number = body.tracking_number.trim();
    }
    if (body.notes) {
      updateData.notes = body.notes.trim();
    }
    const updateRes = await supabase.from("orders").update(updateData).eq("id_order", id).select("id_order, status, tracking_number, notes, updated_at").single();
    const error = updateRes.error;
    const data = updateRes.data;
    if (error) {
      console.error("Error actualizando estado del pedido:", error);
      return {
        data: {
          success: false,
          error: "Error actualizando estado del pedido",
          details: error.message
        }
      };
    }
    if (newStatus === "cancelled" && currentStatus !== "cancelled") {
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
    if (newStatus === "confirmed" && currentStatus === "pending") {
      const orderItemsRes = await supabase.from("order_items").select("product_id, quantity").eq("order_id", id);
      const itemsError = orderItemsRes.error;
      const orderItems = orderItemsRes.data;
      if (itemsError) {
        console.error("Error obteniendo items para verificar stock:", itemsError);
      } else if (orderItems) {
        for (const item of orderItems) {
          const productRes = await supabase.from("products").select("stock_quantity, name").eq("id_product", item.product_id).single();
          const productError = productRes.error;
          const product = productRes.data;
          if (productError) {
            console.error("Error verificando stock del producto:", productError);
          } else if (product.stock_quantity < item.quantity) {
            console.warn(`Stock insuficiente para ${product.name} al confirmar pedido`);
            return {
              data: {
                success: false,
                error: `Stock insuficiente para ${product.name}`
              }
            };
          }
        }
        for (const item of orderItems) {
          const rpcRes = await supabase.rpc("adjust_product_stock", { p_id_product: item.product_id, p_delta: -Number(item.quantity) });
          const stockError = rpcRes.error;
          if (stockError) console.error("Error descontando stock via RPC:", stockError);
        }
      }
    }
    return {
      data: {
        success: true,
        data: {
          id_order: data.id_order,
          status: data.status,
          tracking_number: data.tracking_number,
          notes: data.notes,
          updated_at: data.updated_at
        },
        message: `Estado del pedido actualizado exitosamente a '${newStatus}'`
      }
    };
  } catch (error) {
    console.error("Error en PATCH /api/orders/[id]/update-status:", error);
    return {
      data: {
        success: false,
        error: "Error interno del servidor"
      }
    };
  }
});

export { updateStatus as default };
//# sourceMappingURL=update-status.mjs.map
