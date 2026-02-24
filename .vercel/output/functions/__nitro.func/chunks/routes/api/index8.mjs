import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, f as useRuntimeConfig, b as respondSuccess, r as respondError, a as requireAdmin, k as readBody } from '../../_/nitro.mjs';
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
  const config = useRuntimeConfig();
  const serviceClient = createClient(
    config.public.supabaseUrl,
    config.supabaseServiceKey,
    { auth: { persistSession: false } }
  );
  if (method === "GET") {
    try {
      const { data: profiles, error } = await serviceClient.from("profiles").select("*").order("created_at", { ascending: false });
      if (error) {
        console.error("Error obteniendo perfiles:", error);
        return {
          data: {
            success: false,
            error: "Error obteniendo perfiles",
            details: error.message
          }
        };
      }
      const processedProfiles = profiles.map((profile) => ({
        ...profile,
        full_name: `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || null
      }));
      return respondSuccess(processedProfiles);
    } catch (error) {
      console.error("Error en GET /api/profiles:", error);
      return respondError("Error interno del servidor");
    }
  }
  if (method === "POST") {
    try {
      await requireAdmin(event);
      const body = await readBody(event);
      if (!body.first_name || !body.last_name || !body.email || !body.password || !body.role) {
        return respondError("Los campos nombre, apellido, email, contrase\xF1a y rol son requeridos");
      }
      const { data: existingProfile, error: checkError } = await supabase.from("profiles").select("id").eq("email", body.email).single();
      if (checkError && checkError.code !== "PGRST116") {
        console.error("Error verificando email duplicado:", checkError);
        return respondError("Error verificando email duplicado");
      }
      if (existingProfile) {
        return respondError("Ya existe un usuario con este email");
      }
      const config2 = useRuntimeConfig();
      const serviceClient2 = createClient(
        config2.public.supabaseUrl,
        config2.supabaseServiceKey,
        { auth: { persistSession: false } }
      );
      const { data: authData, error: authError } = await serviceClient2.auth.admin.createUser({
        email: body.email.trim().toLowerCase(),
        password: body.password,
        email_confirm: true
      });
      if (authError) {
        console.error("Error creando usuario en Auth:", authError);
        return respondError("Error creando usuario en el sistema de autenticaci\xF3n", authError.message);
      }
      const newProfile = {
        id: authData.user.id,
        name: `${body.first_name.trim()} ${body.last_name.trim()}`,
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
        role: body.role,
        is_active: body.is_active !== void 0 ? body.is_active : true,
        notes: ((_g = body.notes) == null ? void 0 : _g.trim()) || null
      };
      const { data: profileData, error: profileError } = await serviceClient2.from("profiles").upsert(newProfile, { onConflict: "id" }).select().single();
      if (profileError) {
        console.error("Error creando perfil:", profileError);
        await serviceClient2.auth.admin.deleteUser(authData.user.id);
        return respondError("Error creando perfil del usuario", profileError.message);
      }
      return respondSuccess(profileData, "Usuario creado exitosamente");
    } catch (error) {
      console.error("Error en POST /api/profiles:", error);
      return respondError("Error interno del servidor");
    }
  }
  return respondError("M\xE9todo no permitido");
});

export { index as default };
//# sourceMappingURL=index8.mjs.map
