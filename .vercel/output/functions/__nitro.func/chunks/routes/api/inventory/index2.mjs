import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, c as requireAuth, m as getQuery, r as respondError, b as respondSuccess } from '../../../_/nitro.mjs';
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
  if (method === "GET") {
    try {
      await requireAuth(event);
      const query = getQuery(event);
      const productId = query.product_id;
      if (!productId) {
        return respondError("ID de producto requerido");
      }
      const { data: movements, error } = await supabase.from("inventory_movements").select("*, movement_date:created_at").eq("product_id", productId).order("created_at", { ascending: false });
      if (error) {
        console.error("Error obteniendo movimientos:", error);
        return respondError("Error obteniendo movimientos");
      }
      return respondSuccess(movements);
    } catch (error) {
      console.error("Error inesperado:", error);
      return respondError("Error interno del servidor");
    }
  }
  return respondError("M\xE9todo no permitido");
});

export { index as default };
//# sourceMappingURL=index2.mjs.map
