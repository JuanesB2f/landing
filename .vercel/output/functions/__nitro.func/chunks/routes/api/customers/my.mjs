import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, r as respondError, c as requireAuth, e as serverSupabaseUser, b as respondSuccess } from '../../../_/nitro.mjs';
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

const my = defineEventHandler(async (event) => {
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  if (method !== "GET") return respondError("M\xE9todo no permitido");
  try {
    await requireAuth(event);
    const authUser = await serverSupabaseUser(event);
    if (!authUser) return respondError("No autenticado");
    const { data: existing } = await supabase.from("customers").select("*").eq("user_id", authUser.id).single();
    if (existing) return respondSuccess(existing);
    const { data: profile } = await supabase.from("profiles").select("first_name, last_name, email, phone, address, city, state, postal_code, country, role").eq("id", authUser.id).single();
    const payload = {
      user_id: authUser.id,
      first_name: (profile == null ? void 0 : profile.first_name) || "Cliente",
      last_name: (profile == null ? void 0 : profile.last_name) || "N/A",
      email: (profile == null ? void 0 : profile.email) || authUser.email,
      phone: (profile == null ? void 0 : profile.phone) || null,
      address: (profile == null ? void 0 : profile.address) || null,
      city: (profile == null ? void 0 : profile.city) || null,
      state: (profile == null ? void 0 : profile.state) || null,
      postal_code: (profile == null ? void 0 : profile.postal_code) || null,
      country: (profile == null ? void 0 : profile.country) || "M\xE9xico",
      is_active: true
    };
    const { data: created, error } = await supabase.from("customers").insert(payload).select().single();
    if (error) return respondError("Error creando cliente", error.message);
    return respondSuccess(created);
  } catch (error) {
    console.error("Error en GET /api/customers/my:", error);
    return respondError("Error interno del servidor");
  }
});

export { my as default };
//# sourceMappingURL=my.mjs.map
