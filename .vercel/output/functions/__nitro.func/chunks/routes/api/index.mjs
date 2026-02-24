import { d as defineEventHandler, g as getMethod, s as serverSupabaseClient, l as setHeader, b as respondSuccess, a as requireAdmin, i as getHeader, j as readMultipartFormData, k as readBody, r as respondError } from '../../_/nitro.mjs';
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
  var _a, _b;
  const method = getMethod(event);
  const supabase = await serverSupabaseClient(event);
  if (method === "GET") {
    try {
      setHeader(event, "Cache-Control", "public, max-age=60");
      const { data: categories, error } = await supabase.from("categories").select("*").eq("is_active", true).order("name");
      if (error) {
        console.error("Error obteniendo categor\xEDas:", error);
        return {
          data: {
            success: false,
            error: "Error obteniendo categor\xEDas"
          }
        };
      }
      const { data: categoriesWithCounts, error: countError } = await supabase.from("categories").select(`
          *,
          products:products(count)
        `).eq("is_active", true).order("name");
      if (countError) {
        console.error("Error obteniendo conteos de productos por categor\xEDa:", countError);
      }
      const processedCategories = (categoriesWithCounts || categories).map((category) => {
        var _a2, _b2;
        return {
          ...category,
          product_count: ((_b2 = (_a2 = category == null ? void 0 : category.products) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.count) || 0
        };
      });
      return respondSuccess(processedCategories);
    } catch (error) {
      console.error("Error inesperado:", error);
      return {
        data: {
          success: false,
          error: "Error interno del servidor"
        }
      };
    }
  }
  if (method === "POST") {
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
            fields[part.name] = ((_a = part.data) == null ? void 0 : _a.toString()) || "";
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
      const { data: existingCategory, error: checkError } = await supabase.from("categories").select("id_category").eq("name", body.name.trim()).single();
      if (existingCategory) {
        return respondError("Ya existe una categor\xEDa con ese nombre");
      }
      const newCategory = {
        name: body.name.trim(),
        description: ((_b = body.description) == null ? void 0 : _b.trim()) || null,
        image_url: uploadedImageUrl || body.image_url || null,
        is_active: body.is_active !== void 0 ? body.is_active : true
      };
      const { data, error } = await supabase.from("categories").insert(newCategory).select().single();
      if (error) {
        console.error("Error creando categor\xEDa:", error);
        return respondError("Error creando categor\xEDa");
      }
      return respondSuccess({ ...data, product_count: 0 }, "Categor\xEDa creada exitosamente");
    } catch (error) {
      console.error("Error inesperado:", error);
      return respondError("Error interno del servidor");
    }
  }
  return respondError("M\xE9todo no permitido");
});

export { index as default };
//# sourceMappingURL=index.mjs.map
