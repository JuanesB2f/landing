import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, r as respondError, c as requireAuth, b as respondSuccess } from '../../_/nitro.mjs';
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
    const { count: totalUsers, error: usersError } = await supabase.from("profiles").select("id", { count: "exact", head: true });
    const { count: totalProducts, error: productsError } = await supabase.from("products").select("id_product", { count: "exact", head: true });
    const { count: totalOrders, error: ordersError } = await supabase.from("orders").select("id_order", { count: "exact", head: true });
    const { data: salesRows, error: revenueError } = await supabase.from("orders").select("total_amount");
    if (usersError) console.error("usersError", usersError);
    if (productsError) console.error("productsError", productsError);
    if (ordersError) console.error("ordersError", ordersError);
    if (revenueError) console.error("revenueError", revenueError);
    const totalRevenue = (salesRows || []).reduce((sum, row) => sum + (row.total_amount || 0), 0);
    const sevenDaysAgoIso = new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3).toISOString();
    const { data: weeklySalesRows, error: weeklySalesError } = await supabase.from("orders").select("total_amount, created_at").gte("created_at", sevenDaysAgoIso);
    const weeklySales = (weeklySalesRows || []).reduce((sum, row) => sum + (row.total_amount || 0), 0);
    if (weeklySalesError) console.error("weeklySalesError", weeklySalesError);
    const { count: newProducts, error: newProductsError } = await supabase.from("products").select("id_product", { count: "exact", head: true }).gte("created_at", sevenDaysAgoIso);
    if (newProductsError) console.error("newProductsError", newProductsError);
    const { count: weeklyOrders, error: weeklyOrdersError } = await supabase.from("orders").select("id_order", { count: "exact", head: true }).gte("created_at", sevenDaysAgoIso);
    if (weeklyOrdersError) console.error("weeklyOrdersError", weeklyOrdersError);
    const { count: totalCustomers, error: customersError } = await supabase.from("customers").select("id_customer", { count: "exact", head: true });
    if (customersError) console.error("customersError", customersError);
    return respondSuccess({
      totalUsers: totalUsers || 0,
      totalProducts: totalProducts || 0,
      totalOrders: totalOrders || 0,
      totalRevenue,
      weeklySales: weeklySales || 0,
      newProducts: newProducts || 0,
      weeklyOrders: weeklyOrders || 0,
      totalCustomers: totalCustomers || 0
    });
  } catch (error) {
    console.error("Error en GET /api/dashboard:", error);
    return respondError("Error interno del servidor");
  }
});

export { index as default };
//# sourceMappingURL=index3.mjs.map
