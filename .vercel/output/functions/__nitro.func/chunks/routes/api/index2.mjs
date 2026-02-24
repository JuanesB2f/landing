import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, a as requireAdmin, f as useRuntimeConfig, k as readBody } from '../../_/nitro.mjs';
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
  var _a, _b, _c, _d, _e, _f, _g;
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
      const { data: customers, error } = await adminClient.from("customers").select("*").order("created_at", { ascending: false });
      if (error) {
        console.error("Error obteniendo clientes:", error);
        return {
          data: {
            success: false,
            error: "Error obteniendo clientes",
            details: error.message
          }
        };
      }
      const ids = (customers || []).map((c) => c.id_customer);
      let counts = {};
      if (ids.length > 0) {
        const { data: orders } = await adminClient.from("orders").select("customer_id").in("customer_id", ids);
        for (const o of orders || []) {
          counts[o.customer_id] = (counts[o.customer_id] || 0) + 1;
        }
      }
      const processedCustomers = (customers || []).map((customer) => ({
        ...customer,
        order_count: counts[customer.id_customer] || 0
      }));
      return {
        data: {
          success: true,
          data: processedCustomers
        }
      };
    } catch (error) {
      console.error("Error en GET /api/customers:", error);
      return {
        data: {
          success: false,
          error: "Error interno del servidor"
        }
      };
    }
  }
  if (method === "POST") {
    await requireAdmin(event);
    try {
      const body = await readBody(event);
      if (!body.first_name || !body.last_name || !body.email) {
        return {
          data: {
            success: false,
            error: "Los campos nombre, apellido y email son requeridos"
          }
        };
      }
      const { data: existingCustomer, error: checkError } = await supabase.from("customers").select("id_customer").eq("email", body.email).single();
      if (checkError && checkError.code !== "PGRST116") {
        console.error("Error verificando email duplicado:", checkError);
        return {
          data: {
            success: false,
            error: "Error verificando email duplicado"
          }
        };
      }
      if (existingCustomer) {
        return {
          data: {
            success: false,
            error: "Ya existe un cliente con este email"
          }
        };
      }
      const newCustomer = {
        first_name: body.first_name.trim(),
        last_name: body.last_name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: ((_a = body.phone) == null ? void 0 : _a.trim()) || null,
        address: ((_b = body.address) == null ? void 0 : _b.trim()) || null,
        city: ((_c = body.city) == null ? void 0 : _c.trim()) || null,
        state: ((_d = body.state) == null ? void 0 : _d.trim()) || null,
        postal_code: ((_e = body.postal_code) == null ? void 0 : _e.trim()) || null,
        country: ((_f = body.country) == null ? void 0 : _f.trim()) || null,
        birth_date: body.birth_date || null,
        gender: body.gender || null,
        notes: ((_g = body.notes) == null ? void 0 : _g.trim()) || null,
        is_active: body.is_active !== void 0 ? body.is_active : true
      };
      const { data, error } = await supabase.from("customers").insert(newCustomer).select().single();
      if (error) {
        console.error("Error creando cliente:", error);
        return {
          data: {
            success: false,
            error: "Error creando cliente",
            details: error.message
          }
        };
      }
      return {
        data: {
          success: true,
          data,
          message: "Cliente creado exitosamente"
        }
      };
    } catch (error) {
      console.error("Error en POST /api/customers:", error);
      return {
        data: {
          success: false,
          error: "Error interno del servidor"
        }
      };
    }
  }
  return {
    data: {
      success: false,
      error: "M\xE9todo no permitido"
    }
  };
});

export { index as default };
//# sourceMappingURL=index2.mjs.map
