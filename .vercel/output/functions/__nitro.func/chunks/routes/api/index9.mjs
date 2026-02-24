import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, l as setHeader, b as respondSuccess, a as requireAdmin, k as readBody, n as createError, r as respondError } from '../../_/nitro.mjs';
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
  try {
    if (method === "GET") {
      setHeader(event, "Cache-Control", "public, max-age=60");
      const { data: providers, error: providersError } = await supabase.from("providers").select("*").order("name");
      if (providersError) {
        throw providersError;
      }
      const providersWithCount = (providers || []).map((provider) => ({
        ...provider,
        product_count: 0
      }));
      return respondSuccess(providersWithCount);
    } else if (method === "POST") {
      await requireAdmin(event);
      const body = await readBody(event);
      if (!body.name || body.name.trim().length === 0) {
        throw createError({
          statusCode: 400,
          statusMessage: "El nombre del proveedor es obligatorio"
        });
      }
      const { data: existingProvider, error: checkError } = await supabase.from("providers").select("id_provider").eq("name", body.name.trim()).single();
      if (checkError && checkError.code !== "PGRST116") {
        throw checkError;
      }
      if (existingProvider) {
        throw createError({
          statusCode: 400,
          statusMessage: "Ya existe un proveedor con ese nombre"
        });
      }
      const { data: newProvider, error: insertError } = await supabase.from("providers").insert({
        name: body.name.trim(),
        email: body.email || null,
        phone: body.phone || null,
        address: body.address || null,
        contact_person: body.contact_person || null,
        is_active: body.is_active !== void 0 ? body.is_active : true
      }).select().single();
      if (insertError) {
        throw insertError;
      }
      return respondSuccess(newProvider, "Proveedor creado exitosamente");
    } else {
      throw createError({
        statusCode: 405,
        statusMessage: "M\xE9todo no permitido"
      });
    }
  } catch (error) {
    console.error("Error en API de proveedores:", error);
    return respondError(error.statusMessage || error.message || "Error interno del servidor");
  }
});

export { index as default };
//# sourceMappingURL=index9.mjs.map
