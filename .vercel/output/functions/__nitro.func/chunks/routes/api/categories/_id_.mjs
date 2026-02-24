import { d as defineEventHandler, g as getMethod, h as getRouterParam, s as serverSupabaseClient, b as respondSuccess, r as respondError, a as requireAdmin, i as getHeader, j as readMultipartFormData, k as readBody } from '../../../_/nitro.mjs';
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

const _id_ = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const method = getMethod(event);
  const id = getRouterParam(event, "id");
  const supabase = await serverSupabaseClient(event);
  if (!id) {
    return {
      success: false,
      error: "ID de categor\xEDa requerido",
      data: null
    };
  }
  if (method === "GET") {
    try {
      const { data: category, error } = await supabase.from("categories").select(`
          *,
          products:products(count)
        `).eq("id_category", id).single();
      if (error) {
        if (error.code === "PGRST116") {
          return {
            success: false,
            error: "Categor\xEDa no encontrada",
            data: null
          };
        }
        console.error("Error obteniendo categor\xEDa:", error);
        return {
          success: false,
          error: "Error obteniendo categor\xEDa",
          data: null
        };
      }
      const processedCategory = {
        ...category,
        product_count: ((_b = (_a = category == null ? void 0 : category.products) == null ? void 0 : _a[0]) == null ? void 0 : _b.count) || 0
      };
      return respondSuccess(processedCategory);
    } catch (error) {
      console.error("Error inesperado:", error);
      return respondError("Error interno del servidor");
    }
  }
  if (method === "PUT") {
    try {
      await requireAdmin(event);
      const contentType = getHeader(event, "content-type") || "";
      let body = {};
      let uploadedImageUrl = null;
      if (contentType.includes("multipart/form-data")) {
        const form = await readMultipartFormData(event);
        const fields = {};
        let filePart = null;
        for (const part of form || []) {
          if (part.type === "file") {
            if (part.name === "image" && part.data && part.filename) filePart = part;
          } else if (part.name) {
            fields[part.name] = ((_c = part.data) == null ? void 0 : _c.toString()) || "";
          }
        }
        body = fields;
        if (filePart) {
          const fileExt = filePart.filename.split(".").pop();
          const filePath = `${crypto.randomUUID()}.${fileExt}`;
          const { error: uploadError } = await supabase.storage.from("product-image").upload(filePath, filePart.data, { contentType: filePart.mimetype, upsert: false });
          if (!uploadError) {
            const { data: publicUrl } = supabase.storage.from("product-image").getPublicUrl(filePath);
            uploadedImageUrl = publicUrl.publicUrl;
          }
        }
      } else {
        body = await readBody(event);
      }
      if (!body.name || !body.name.trim()) {
        return respondError("El nombre de la categor\xEDa es obligatorio");
      }
      const { data: existingCategory, error: checkError } = await supabase.from("categories").select("id_category").eq("name", body.name.trim()).neq("id_category", id).single();
      if (existingCategory) {
        return respondError("Ya existe otra categor\xEDa con ese nombre");
      }
      const updateData = {
        name: body.name.trim(),
        description: ((_d = body.description) == null ? void 0 : _d.trim()) || null,
        image_url: uploadedImageUrl || body.image_url || null,
        is_active: body.is_active !== void 0 ? body.is_active : true,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      const { data, error } = await supabase.from("categories").update(updateData).eq("id_category", id).select().single();
      if (error) {
        console.error("Error actualizando categor\xEDa:", error);
        return respondError("Error actualizando categor\xEDa");
      }
      return respondSuccess({ ...data, product_count: 0 });
    } catch (error) {
      console.error("Error inesperado:", error);
      return respondError("Error interno del servidor");
    }
  }
  if (method === "DELETE") {
    try {
      await requireAdmin(event);
      const { data: products, error: productsError } = await supabase.from("products").select("id_product").eq("category_id", id).limit(1);
      if (productsError) {
        console.error("Error verificando productos:", productsError);
        return respondError("Error verificando productos asociados");
      }
      if (products && products.length > 0) {
        return respondError("No se puede eliminar la categor\xEDa porque tiene productos asociados");
      }
      const { error } = await supabase.from("categories").delete().eq("id_category", id);
      if (error) {
        console.error("Error eliminando categor\xEDa:", error);
        return respondError("Error eliminando categor\xEDa");
      }
      return respondSuccess(null);
    } catch (error) {
      if (error == null ? void 0 : error.statusCode) throw error;
      console.error("Error inesperado:", error);
      return respondError("Error interno del servidor");
    }
  }
  return respondError("M\xE9todo no permitido");
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map
