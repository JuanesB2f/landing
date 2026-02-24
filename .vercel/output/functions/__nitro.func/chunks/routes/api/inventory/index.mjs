import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, r as respondError, a as requireAdmin, k as readBody, b as respondSuccess } from '../../../_/nitro.mjs';
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

const index = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  if (method !== "POST") {
    return respondError("M\xE9todo no permitido");
  }
  try {
    await requireAdmin(event);
    const body = await readBody(event);
    if (!body.product_id || !body.adjustment_type || body.quantity === void 0 || body.quantity === null || !body.reason) {
      return respondError("Todos los campos son obligatorios");
    }
    const { data: product, error: productError } = await supabase.from("products").select("stock_quantity").eq("id_product", body.product_id).single();
    if (productError || !product) {
      return respondError("Producto no encontrado");
    }
    const currentStock = product.stock_quantity;
    let newStock = currentStock;
    switch (body.adjustment_type) {
      case "set":
        newStock = body.quantity;
        break;
      case "add":
        newStock = currentStock + body.quantity;
        break;
      case "subtract":
        newStock = Math.max(0, currentStock - body.quantity);
        break;
      default:
        return respondError("Tipo de ajuste no v\xE1lido");
    }
    const notes = [];
    if (body.reason) notes.push(`Motivo: ${body.reason}`);
    if (body.description) notes.push(`Descripci\xF3n: ${body.description}`);
    const movementData = {
      product_id: body.product_id,
      movement_type: "adjustment",
      quantity: Math.abs(newStock - currentStock),
      unit_price: null,
      notes: notes.length ? notes.join(" | ") : `Ajuste de stock: ${body.adjustment_type}`
    };
    const { data: movement, error: movementError } = await supabase.from("inventory_movements").insert(movementData).select().single();
    if (movementError) {
      console.error("Error creando movimiento de ajuste:", movementError);
      return respondError("Error creando movimiento de ajuste");
    }
    const { error: updateError } = await supabase.from("products").update({
      stock_quantity: newStock,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id_product", body.product_id);
    if (updateError) {
      console.error("Error actualizando stock:", updateError);
      await supabase.from("inventory_movements").delete().eq("id_movement", movement.id_movement);
      return respondError("Error actualizando stock del producto");
    }
    return respondSuccess({ movement, old_stock: currentStock, new_stock: newStock });
  } catch (error) {
    console.error("Error inesperado:", error);
    return respondError("Error interno del servidor");
  }
});

export { index as default };
//# sourceMappingURL=index.mjs.map
