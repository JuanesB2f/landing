import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, h as getRouterParam, b as respondSuccess, r as respondError, a as requireAdmin, k as readBody, f as useRuntimeConfig } from '../../../_/nitro.mjs';
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

const _id_ = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  const id = getRouterParam(event, "id");
  if (!id) {
    return {
      success: false,
      error: "ID de usuario requerido"
    };
  }
  if (method === "GET") {
    try {
      const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", id).single();
      if (error) {
        if (error.code === "PGRST116") {
          return {
            success: false,
            error: "Usuario no encontrado"
          };
        }
        console.error("Error obteniendo perfil:", error);
        return {
          success: false,
          error: "Error obteniendo perfil",
          details: error.message
        };
      }
      const processedProfile = {
        ...profile,
        full_name: `${profile.first_name || ""} ${profile.last_name || ""}`.trim() || null
      };
      return respondSuccess(processedProfile);
    } catch (error) {
      console.error("Error en GET /api/profiles/[id]:", error);
      return respondError("Error interno del servidor");
    }
  }
  if (method === "PUT") {
    try {
      await requireAdmin(event);
      const body = await readBody(event);
      if (!body.first_name || !body.last_name || !body.email || !body.role) {
        return respondError("Los campos nombre, apellido, email y rol son requeridos");
      }
      const { data: existingProfile, error: checkError } = await supabase.from("profiles").select("id").eq("email", body.email).neq("id", id).single();
      if (checkError && checkError.code !== "PGRST116") {
        console.error("Error verificando email duplicado:", checkError);
        return respondError("Error verificando email duplicado");
      }
      if (existingProfile) {
        return respondError("Ya existe otro usuario con este email");
      }
      const updatedProfile = {
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
        notes: ((_g = body.notes) == null ? void 0 : _g.trim()) || null,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { data, error } = await supabase.from("profiles").update(updatedProfile).eq("id", id).select().single();
      if (error) {
        console.error("Error actualizando perfil:", error);
        return {
          success: false,
          error: "Error actualizando perfil",
          details: error.message
        };
      }
      return respondSuccess(data, "Perfil actualizado exitosamente");
    } catch (error) {
      console.error("Error en PUT /api/profiles/[id]:", error);
      return respondError("Error interno del servidor");
    }
  }
  if (method === "DELETE") {
    try {
      await requireAdmin(event);
      const config = useRuntimeConfig();
      const adminClient = createClient(
        config.public.supabaseUrl,
        config.supabaseServiceKey,
        { auth: { persistSession: false } }
      );
      const delAuth = await adminClient.auth.admin.deleteUser(id);
      if (delAuth.error && ((_h = delAuth.error) == null ? void 0 : _h.message) && !((_j = (_i = delAuth.error) == null ? void 0 : _i.message) == null ? void 0 : _j.includes("not found"))) {
        const err = delAuth.error;
        console.warn("No se pudo eliminar auth user en primer intento, continuando:", err);
      }
      const clearCust = await adminClient.from("customers").update({ user_id: null, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("user_id", id);
      if (clearCust.error) {
        console.error("Error desasociando cliente del usuario:", clearCust.error);
        return respondError("Error desasociando cliente del usuario", clearCust.error.message);
      }
      const delResv = await adminClient.from("reservations").delete().eq("user_id", id);
      if (delResv.error) {
        console.error("Error eliminando reservas del usuario:", delResv.error);
        return respondError("Error eliminando reservas del usuario", delResv.error.message);
      }
      const delOffers = await adminClient.from("user_offers").delete().eq("user_id", id);
      if (delOffers.error) {
        console.error("Error eliminando ofertas del usuario:", delOffers.error);
        return respondError("Error eliminando ofertas del usuario", delOffers.error.message);
      }
      const clearAssigned = await adminClient.from("orders").update({ assigned_user_id: null, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("assigned_user_id", id);
      if (clearAssigned.error) {
        console.error("Error desasociando \xF3rdenes asignadas:", clearAssigned.error);
        return respondError("Error desasociando \xF3rdenes asignadas", clearAssigned.error.message);
      }
      const delProf = await adminClient.from("profiles").delete().eq("id", id);
      if (delProf.error) {
        console.error("Error eliminando perfil:", delProf.error);
        return respondError("Error eliminando perfil", delProf.error.message);
      }
      const authDel = await adminClient.auth.admin.deleteUser(id);
      if (authDel.error && ((_k = authDel.error) == null ? void 0 : _k.message) && !((_m = (_l = authDel.error) == null ? void 0 : _l.message) == null ? void 0 : _m.includes("not found"))) {
        const err = authDel.error;
        console.error("Error eliminando usuario de Auth:", err);
        return respondError("Error eliminando usuario del sistema de autenticaci\xF3n", err.message);
      }
      return respondSuccess(null, "Usuario eliminado exitosamente");
    } catch (error) {
      console.error("Error en DELETE /api/profiles/[id]:", error);
      return respondError("Error interno del servidor");
    }
  }
  return respondError("M\xE9todo no permitido");
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
