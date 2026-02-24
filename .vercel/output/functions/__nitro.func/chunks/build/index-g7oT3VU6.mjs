import { _ as __nuxt_component_1$1 } from './server.mjs';
import { defineComponent, ref, reactive, computed, unref, isRef, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { u as useCurrency } from './useCurrency-BsXMBrUs.mjs';
import '../_/nitro.mjs';
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
import 'pinia';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'unhead/plugins';

const pageSize = 10;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductPickerDrawer",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue", "select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const loading = ref(false);
    const categories = ref([]);
    const products = ref([]);
    const page = ref(1);
    const hasMore = ref(false);
    const selectedCategory = ref("");
    const search = ref("");
    const { formatCOP } = useCurrency();
    const unwrap = (raw) => {
      const inner = raw && typeof raw === "object" && "data" in raw ? raw.data : raw;
      return inner;
    };
    const isApiSuccess = (env) => {
      return !!env && env.success === true && "data" in env;
    };
    const fetchCategories = async () => {
      try {
        const env = unwrap(await $fetch(`/api/categories`));
        if (isApiSuccess(env)) {
          categories.value = env.data || [];
        }
      } catch (e) {
        console.error(e);
      }
    };
    const fetchProducts = async (goToPage) => {
      page.value = goToPage;
      loading.value = true;
      try {
        const params = new URLSearchParams();
        if (selectedCategory.value) params.set("category_id", selectedCategory.value);
        if (search.value) params.set("search", search.value);
        params.set("page", String(page.value));
        params.set("page_size", String(pageSize));
        const env = unwrap(await $fetch(`/api/products?${params.toString()}`));
        if (isApiSuccess(env)) {
          const list = env.data || [];
          products.value = list;
          hasMore.value = list.length === pageSize;
        }
      } catch (e) {
        console.error(e);
      } finally {
        loading.value = false;
      }
    };
    watch(() => props.modelValue, (v) => {
      if (v) {
        fetchCategories();
        fetchProducts(1);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      if (_ctx.modelValue) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50" }, _attrs))}><div class="absolute inset-0 bg-black/40"></div><div class="absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-xl flex flex-col"><div class="p-4 border-b flex items-center justify-between"><h3 class="text-lg font-semibold">Seleccionar producto</h3><button class="p-2 rounded hover:bg-gray-100">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:x-mark",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div><div class="p-4 border-b grid grid-cols-1 gap-3"><div class="flex gap-2"><select class="px-3 py-2 border rounded w-1/2"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), "") : ssrLooseEqual(unref(selectedCategory), "")) ? " selected" : ""}>Todas las categor\xEDas</option><!--[-->`);
        ssrRenderList(unref(categories), (c) => {
          _push(`<option${ssrRenderAttr("value", c.id_category)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), c.id_category) : ssrLooseEqual(unref(selectedCategory), c.id_category)) ? " selected" : ""}>${ssrInterpolate(c.name)}</option>`);
        });
        _push(`<!--]--></select><input${ssrRenderAttr("value", unref(search))} type="text" placeholder="Buscar por nombre o SKU" class="px-3 py-2 border rounded w-full"><button class="px-4 py-2 border rounded">Buscar</button></div></div><div class="flex-1 overflow-auto">`);
        if (unref(loading)) {
          _push(`<div class="p-6 text-gray-600">Cargando...</div>`);
        } else {
          _push(`<ul class="divide-y"><!--[-->`);
          ssrRenderList(unref(products), (p) => {
            var _a;
            _push(`<li class="p-4 flex items-center gap-4">`);
            if (p.image_url) {
              _push(`<img${ssrRenderAttr("src", p.image_url)}${ssrRenderAttr("alt", p.name)} class="w-14 h-14 object-cover rounded">`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="flex-1 min-w-0"><div class="font-medium text-gray-900 truncate">${ssrInterpolate(p.name)}</div><div class="text-sm text-gray-500 truncate">SKU: ${ssrInterpolate(p.sku)} \u2022 ${ssrInterpolate((_a = p.category) == null ? void 0 : _a.name)}</div><div class="text-sm text-gray-700">${ssrInterpolate(unref(formatCOP)(p.price))}</div></div><button class="px-3 py-2 bg-pink-600 text-white rounded">Seleccionar</button></li>`);
          });
          _push(`<!--]--></ul>`);
        }
        _push(`</div><div class="p-4 border-t flex items-center justify-between"><button${ssrIncludeBooleanAttr(unref(page) === 1) ? " disabled" : ""} class="px-3 py-2 border rounded disabled:opacity-50">Anterior</button><div class="text-sm text-gray-600">P\xE1gina ${ssrInterpolate(unref(page))}</div><button${ssrIncludeBooleanAttr(!unref(hasMore)) ? " disabled" : ""} class="px-3 py-2 border rounded disabled:opacity-50">Siguiente</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/products/ProductPickerDrawer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const offers = ref([]);
    const filters = reactive({ sku: "" });
    const showModal = ref(false);
    const editing = ref(false);
    const form = reactive({
      id_offer: null,
      product_id: "",
      discount_percent: 0,
      is_active: true,
      valid_from: "",
      valid_to: "",
      notes: ""
    });
    const openPicker = ref(false);
    const selectedProduct = ref(null);
    const { formatCOP } = useCurrency();
    const discountedPrice = (price, percent) => {
      if (!price) return 0;
      return Math.round(Number(price) * (1 - Number(percent || 0) / 100));
    };
    const offersList = computed(() => offers.value);
    const filteredOffersList = computed(() => {
      const list = offersList.value;
      return list.filter((o) => {
        var _a;
        const skuOk = !filters.sku || (((_a = o.product) == null ? void 0 : _a.sku) || "").toLowerCase().includes(filters.sku.toLowerCase());
        return skuOk;
      });
    });
    const filteredOffersForTemplate = computed(() => filteredOffersList.value);
    const onPick = (p) => {
      selectedProduct.value = p;
      form.product_id = p.id_product;
    };
    const formatDate = (v) => new Date(v).toLocaleString();
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Icon = __nuxt_component_1$1;
      const _component_ProductPickerDrawer = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex items-center justify-between mb-6"><div><h1 class="text-2xl font-bold text-gray-900">Gesti\xF3n de Ofertas</h1><p class="text-gray-600">Descuentos visibles para todos los usuarios</p></div><button class="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:plus",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`<span>Nueva Oferta</span></button></div><div class="bg-white rounded-lg shadow-sm overflow-hidden"><div class="p-4 border-b flex gap-4"><input${ssrRenderAttr("value", unref(filters).sku)} type="text" placeholder="Filtrar por SKU" class="px-3 py-2 border rounded w-64"><button class="px-4 py-2 border rounded">Aplicar</button><button class="px-4 py-2 border rounded">Limpiar</button></div><div class="overflow-x-auto"><table class="min-w-full admin-table"><thead><tr><th>Producto</th><th>Descuento</th><th>Vigencia</th><th>Estado</th><th>Acciones</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(filteredOffersForTemplate), (o) => {
        var _a2, _b;
        _push(`<tr><td><div class="text-sm font-medium theme-text-primary">${ssrInterpolate((_a2 = o.product) == null ? void 0 : _a2.name)}</div><div class="text-sm theme-text-muted">SKU: ${ssrInterpolate((_b = o.product) == null ? void 0 : _b.sku)}</div></td><td><span class="text-accent-strong font-semibold">-${ssrInterpolate(o.discount_percent)}%</span></td><td class="text-sm theme-text-primary"><div>${ssrInterpolate(o.valid_from ? formatDate(o.valid_from) : "\u2014")} \u2192 ${ssrInterpolate(o.valid_to ? formatDate(o.valid_to) : "\u2014")}</div></td><td><span class="${ssrRenderClass([o.is_active ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200", "px-2 py-1 rounded text-xs"])}">${ssrInterpolate(o.is_active ? "Activa" : "Inactiva")}</span></td><td class="text-sm"><div class="flex gap-2"><button class="text-indigo-600 hover:text-indigo-900">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:pencil-square",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><button class="text-red-600 hover:text-red-900">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:trash",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
      if (unref(showModal)) {
        _push(`<div class="fixed inset-0 bg-black/40 flex items-center justify-center p-4"><div class="bg-white rounded-lg w-full max-w-lg p-6 space-y-4"><h3 class="text-lg font-semibold">${ssrInterpolate(unref(editing) ? "Editar" : "Nueva")} oferta</h3><div class="grid grid-cols-1 gap-3"><div><div class="flex items-center gap-2"><input${ssrRenderAttr("value", unref(form).product_id)} type="text" placeholder="Product ID" class="px-3 py-2 border rounded flex-1"><button type="button" class="px-3 py-2 border rounded">Buscar producto</button></div>`);
        if (unref(selectedProduct)) {
          _push(`<div class="mt-2 p-3 border rounded bg-gray-50 flex items-center gap-3">`);
          if (unref(selectedProduct).image_url) {
            _push(`<img${ssrRenderAttr("src", unref(selectedProduct).image_url)} class="w-12 h-12 object-cover rounded">`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="text-sm"><div class="font-medium">${ssrInterpolate(unref(selectedProduct).name)}</div><div class="text-gray-500">SKU: ${ssrInterpolate(unref(selectedProduct).sku)}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="grid grid-cols-2 gap-3 items-end"><div><label class="block text-xs text-gray-600 mb-1">Descuento %</label><input${ssrRenderAttr("value", unref(form).discount_percent)} type="number" min="0" max="100" placeholder="Descuento %" class="px-3 py-2 border rounded w-full"></div>`);
        if (unref(selectedProduct)) {
          _push(`<div class="text-sm">`);
          if (unref(selectedProduct).price) {
            _push(`<div class="text-gray-500 line-through">${ssrInterpolate(unref(formatCOP)(unref(selectedProduct).price))}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="text-pink-600 font-semibold">${ssrInterpolate(unref(formatCOP)(discountedPrice((_a = unref(selectedProduct)) == null ? void 0 : _a.price, unref(form).discount_percent)))}</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><label class="flex items-center gap-2 text-sm"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""}> Activa</label><div class="grid grid-cols-2 gap-3"><div><label class="block text-xs text-gray-600 mb-1">Inicio</label><input${ssrRenderAttr("value", unref(form).valid_from)} type="datetime-local" class="px-3 py-2 border rounded w-full"></div><div><label class="block text-xs text-gray-600 mb-1">Fin</label><input${ssrRenderAttr("value", unref(form).valid_to)} type="datetime-local" class="px-3 py-2 border rounded w-full"></div></div><textarea placeholder="Notas" class="px-3 py-2 border rounded">${ssrInterpolate(unref(form).notes)}</textarea></div><div class="flex justify-end gap-2 pt-2"><button class="px-4 py-2 border rounded">Cancelar</button><button class="px-4 py-2 bg-pink-600 text-white rounded">Guardar</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ProductPickerDrawer, {
        modelValue: unref(openPicker),
        "onUpdate:modelValue": ($event) => isRef(openPicker) ? openPicker.value = $event : null,
        onSelect: onPick
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/offers/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-g7oT3VU6.mjs.map
