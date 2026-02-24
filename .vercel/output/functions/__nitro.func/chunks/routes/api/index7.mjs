import { d as defineEventHandler, s as serverSupabaseClient, g as getMethod, n as createError, a as requireAdmin, i as getHeader, j as readMultipartFormData, k as readBody, b as respondSuccess, m as getQuery, r as respondError } from '../../_/nitro.mjs';
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
  var _a;
  const client = await serverSupabaseClient(event);
  const method = getMethod(event);
  try {
    switch (method) {
      case "GET":
        const query = getQuery(event);
        const categoryId = query.category_id ? String(query.category_id) : void 0;
        const search = query.search ? String(query.search) : void 0;
        const page = query.page ? Math.max(1, parseInt(String(query.page))) : void 0;
        const pageSize = query.page_size ? Math.max(1, parseInt(String(query.page_size))) : void 0;
        let builder = client.from("products").select(`
            *,
            category:categories(name)
          `).order("created_at", { ascending: false });
        if (categoryId) builder = builder.eq("category_id", categoryId);
        if (search && search.trim()) {
          const like = `%${search.trim()}%`;
          builder = builder.or(`name.ilike.${like},sku.ilike.${like}`);
        }
        if (page && pageSize) {
          const from = (page - 1) * pageSize;
          const to = from + pageSize - 1;
          builder = builder.range(from, to);
        }
        const { data: products, error: getError } = await builder;
        if (getError) throw getError;
        return respondSuccess(products);
      case "POST":
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
              if (part.name === "image" && part.data && part.filename) {
                filePart = part;
              }
            } else if (part.name) {
              fields[part.name] = ((_a = part.data) == null ? void 0 : _a.toString()) || "";
            }
          }
          body = fields;
          if (filePart) {
            const fileExt = filePart.filename.split(".").pop();
            const filePath = `${crypto.randomUUID()}.${fileExt}`;
            const { error: uploadError } = await client.storage.from("product-image").upload(filePath, filePart.data, { contentType: filePart.mimetype, upsert: false });
            if (uploadError) {
              throw createError({ statusCode: 400, statusMessage: "Error subiendo imagen" });
            }
            const { data: publicUrl } = client.storage.from("product-image").getPublicUrl(filePath);
            uploadedImageUrl = publicUrl.publicUrl;
          }
        } else {
          body = await readBody(event);
        }
        const requiredFields = ["name", "description", "price", "stock_quantity", "category_id", "sku"];
        for (const field of requiredFields) {
          if (!body[field]) {
            throw createError({
              statusCode: 400,
              statusMessage: `Campo requerido: ${field}`
            });
          }
        }
        const productId = crypto.randomUUID();
        const { data: newProduct, error: createErr } = await client.from("products").insert({
          id_product: productId,
          name: body.name,
          description: body.description,
          price: parseFloat(body.price),
          stock_quantity: parseInt(body.stock_quantity),
          category_id: body.category_id,
          brand: body.brand || "",
          sku: body.sku,
          image_url: uploadedImageUrl || body.image_url || null,
          is_active: body.is_active !== void 0 ? body.is_active : true,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }).select().single();
        if (createErr) throw createErr;
        return respondSuccess(newProduct, "Producto creado exitosamente");
      default:
        throw createError({
          statusCode: 405,
          statusMessage: "M\xE9todo no permitido"
        });
    }
  } catch (error) {
    console.error("Error en API de productos:", error);
    return respondError(error.statusMessage || error.message || "Error interno del servidor");
  }
});

export { index as default };
//# sourceMappingURL=index7.mjs.map
