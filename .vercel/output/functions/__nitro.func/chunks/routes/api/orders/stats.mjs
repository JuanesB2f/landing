import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, r as respondError, a as requireAdmin, m as getQuery, b as respondSuccess } from '../../../_/nitro.mjs';
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

const stats = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  if (method !== "GET") {
    return respondError("M\xE9todo no permitido");
  }
  try {
    await requireAdmin(event);
    const query = getQuery(event);
    const startDate = query.start_date ? new Date(query.start_date) : null;
    const endDate = query.end_date ? new Date(query.end_date) : null;
    const applyDateFilters = (builder) => {
      if (startDate) builder = builder.gte("created_at", startDate.toISOString());
      if (endDate) builder = builder.lte("created_at", endDate.toISOString());
      return builder;
    };
    const { count: totalOrders, error: totalError } = await applyDateFilters(
      supabase.from("orders").select("id_order", { count: "exact", head: true })
    );
    if (totalError) {
      console.error("Error obteniendo total de pedidos:", totalError);
      return {
        success: false,
        error: "Error obteniendo estad\xEDsticas",
        details: totalError.message
      };
    }
    const { data: statusRows, error: statusError } = await applyDateFilters(
      supabase.from("orders").select("status")
    );
    const ordersByStatus = statusRows ? statusRows.reduce((acc, row) => {
      acc[row.status] = (acc[row.status] || 0) + 1;
      return acc;
    }, {}) : null;
    if (statusError) {
      console.error("Error obteniendo pedidos por estado:", statusError);
    }
    const { data: paymentRows, error: paymentError } = await applyDateFilters(
      supabase.from("orders").select("payment_status")
    );
    const ordersByPaymentStatus = paymentRows ? paymentRows.reduce((acc, row) => {
      acc[row.payment_status] = (acc[row.payment_status] || 0) + 1;
      return acc;
    }, {}) : null;
    if (paymentError) {
      console.error("Error obteniendo pedidos por estado de pago:", paymentError);
    }
    const { data: salesRows, error: salesError } = await applyDateFilters(
      supabase.from("orders").select("total_amount")
    );
    const totalSales = salesRows ? salesRows.reduce((sum, row) => sum + (row.total_amount || 0), 0) : 0;
    if (salesError) {
      console.error("Error obteniendo total de ventas:", salesError);
    }
    const oneYearAgoIso = new Date(Date.now() - 365 * 24 * 60 * 60 * 1e3).toISOString();
    const { data: monthRows, error: monthError } = await supabase.from("orders").select("created_at, total_amount").gte("created_at", oneYearAgoIso);
    const ordersByMonth = monthRows ? (() => {
      const monthlyData = monthRows.reduce((acc, order) => {
        const date = new Date(order.created_at);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        if (!acc[monthKey]) acc[monthKey] = { orders: 0, sales: 0 };
        acc[monthKey].orders += 1;
        acc[monthKey].sales += order.total_amount || 0;
        return acc;
      }, {});
      return Object.entries(monthlyData).map(([month, data]) => ({ month, ...data })).sort((a, b) => a.month.localeCompare(b.month));
    })() : [];
    if (monthError) {
      console.error("Error obteniendo pedidos por mes:", monthError);
    }
    const { data: productRows, error: productsError } = await supabase.from("order_items").select("quantity, product:products(name, sku)");
    const topProducts = productRows ? (() => {
      const productSales = productRows.reduce((acc, item) => {
        var _a, _b;
        const productName = ((_a = item.product) == null ? void 0 : _a.name) || "Producto desconocido";
        const productSku = ((_b = item.product) == null ? void 0 : _b.sku) || "N/A";
        const key = `${productName} (${productSku})`;
        if (!acc[key]) acc[key] = { name: productName, sku: productSku, quantity: 0 };
        acc[key].quantity += item.quantity || 0;
        return acc;
      }, {});
      return Object.values(productSales).sort((a, b) => b.quantity - a.quantity).slice(0, 10);
    })() : [];
    if (productsError) {
      console.error("Error obteniendo productos m\xE1s vendidos:", productsError);
    }
    const { data: customerRows, error: customersError } = await supabase.from("orders").select("customer_id, total_amount, customer:customers(first_name, last_name, email)");
    const topCustomers = customerRows ? (() => {
      const customerStats = customerRows.reduce((acc, order) => {
        var _a;
        const customerId = order.customer_id;
        const customerName = order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : "Cliente desconocido";
        const customerEmail = ((_a = order.customer) == null ? void 0 : _a.email) || "N/A";
        if (!acc[customerId]) acc[customerId] = { name: customerName, email: customerEmail, orders: 0, total_spent: 0 };
        acc[customerId].orders += 1;
        acc[customerId].total_spent += order.total_amount || 0;
        return acc;
      }, {});
      return Object.values(customerStats).sort((a, b) => b.total_spent - a.total_spent).slice(0, 10);
    })() : [];
    if (customersError) {
      console.error("Error obteniendo clientes m\xE1s frecuentes:", customersError);
    }
    const pendingOrders = (ordersByStatus == null ? void 0 : ordersByStatus.pending) || 0;
    const confirmedOrders = (ordersByStatus == null ? void 0 : ordersByStatus.confirmed) || 0;
    const shippedOrders = (ordersByStatus == null ? void 0 : ordersByStatus.shipped) || 0;
    const deliveredOrders = (ordersByStatus == null ? void 0 : ordersByStatus.delivered) || 0;
    const cancelledOrders = (ordersByStatus == null ? void 0 : ordersByStatus.cancelled) || 0;
    const pendingPayments = (ordersByPaymentStatus == null ? void 0 : ordersByPaymentStatus.pending) || 0;
    const paidPayments = (ordersByPaymentStatus == null ? void 0 : ordersByPaymentStatus.paid) || 0;
    const failedPayments = (ordersByPaymentStatus == null ? void 0 : ordersByPaymentStatus.failed) || 0;
    const refundedPayments = (ordersByPaymentStatus == null ? void 0 : ordersByPaymentStatus.refunded) || 0;
    const totalOrdersCount = totalOrders || 0;
    const totalSalesAmount = totalSales || 0;
    const averageOrderValue = totalOrdersCount > 0 ? totalSalesAmount / totalOrdersCount : 0;
    return respondSuccess({
      summary: {
        total_orders: totalOrdersCount,
        total_sales: totalSalesAmount,
        average_order_value: Math.round(averageOrderValue * 100) / 100,
        pending_orders: pendingOrders,
        confirmed_orders: confirmedOrders,
        shipped_orders: shippedOrders,
        delivered_orders: deliveredOrders,
        cancelled_orders: cancelledOrders
      },
      payment_status: {
        pending: pendingPayments,
        paid: paidPayments,
        failed: failedPayments,
        refunded: refundedPayments
      },
      monthly_trends: ordersByMonth || [],
      top_products: topProducts || [],
      top_customers: topCustomers || [],
      date_range: {
        start_date: (startDate == null ? void 0 : startDate.toISOString()) || null,
        end_date: (endDate == null ? void 0 : endDate.toISOString()) || null
      }
    });
  } catch (error) {
    console.error("Error en GET /api/orders/stats:", error);
    return respondError("Error interno del servidor");
  }
});

export { stats as default };
//# sourceMappingURL=stats.mjs.map
