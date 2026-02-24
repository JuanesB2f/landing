import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, r as respondError, c as requireAuth, l as setHeader, b as respondSuccess } from '../../_/nitro.mjs';
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
  if (method !== "GET") {
    return respondError("M\xE9todo no permitido");
  }
  try {
    await requireAuth(event);
    setHeader(event, "Cache-Control", "public, max-age=30");
    const { data: products, error } = await supabase.from("products").select(`
        *,
        category:categories(name)
      `).eq("is_active", true).order("name");
    if (error) {
      console.error("Error obteniendo inventario:", error);
      return respondError("Error obteniendo inventario");
    }
    const productIds = (products || []).map((p) => p.id_product);
    let lastMovementsByProduct = {};
    if (productIds.length > 0) {
      const { data: lastMovements, error: lmError } = await supabase.from("inventory_movements").select("product_id, movement_date:created_at").in("product_id", productIds).order("created_at", { ascending: false });
      if (!lmError && lastMovements) {
        for (const m of lastMovements) {
          if (!lastMovementsByProduct[m.product_id]) {
            lastMovementsByProduct[m.product_id] = m.movement_date;
          }
        }
      }
    }
    const processedProducts = (products || []).map((product) => ({
      ...product,
      category: product.category,
      last_movement_date: lastMovementsByProduct[product.id_product] || null,
      movements: void 0
    }));
    return respondSuccess(processedProducts);
  } catch (error) {
    console.error("Error inesperado:", error);
    return respondError("Error interno del servidor");
  }
});

export { index as default };
//# sourceMappingURL=index4.mjs.map
