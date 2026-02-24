import { d as defineEventHandler, g as getMethod, r as respondError, c as requireAuth, e as serverSupabaseUser, f as useRuntimeConfig, b as respondSuccess } from '../../../_/nitro.mjs';
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

const upsertProfile = defineEventHandler(async (event) => {
  var _a, _b;
  const method = getMethod(event);
  if (method !== "POST") return respondError("M\xE9todo no permitido");
  try {
    await requireAuth(event);
    const user = await serverSupabaseUser(event);
    if (!user) return respondError("No autenticado");
    const config = useRuntimeConfig();
    const adminClient = createClient(
      config.public.supabaseUrl,
      config.supabaseServiceKey,
      { auth: { persistSession: false } }
    );
    const { data: existing } = await adminClient.from("profiles").select("id, role, email, first_name, last_name").eq("id", user.id).maybeSingle();
    const payload = {
      id: user.id,
      email: user.email,
      role: (existing == null ? void 0 : existing.role) === "admin" ? "admin" : "user",
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
    if ((_a = user.user_metadata) == null ? void 0 : _a.full_name) {
      const parts = String(user.user_metadata.full_name).split(" ");
      payload.first_name = parts[0] || (existing == null ? void 0 : existing.first_name) || null;
      payload.last_name = parts.slice(1).join(" ") || (existing == null ? void 0 : existing.last_name) || null;
    }
    payload.name = (existing == null ? void 0 : existing.name) || ((_b = user.user_metadata) == null ? void 0 : _b.full_name) || user.email;
    const upsertRes = await adminClient.from("profiles").upsert(payload, { onConflict: "id" }).select().maybeSingle();
    if (upsertRes.error) return respondError("Error guardando perfil", upsertRes.error.message);
    return respondSuccess(upsertRes.data || payload, "Perfil actualizado");
  } catch (e) {
    console.error("POST /api/auth/upsert-profile error:", e);
    return respondError("Error interno del servidor");
  }
});

export { upsertProfile as default };
//# sourceMappingURL=upsert-profile.mjs.map
