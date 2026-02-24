import { _ as __nuxt_component_1$1, w as __nuxt_component_0$1 } from './server.mjs';
import { ref, computed, unref, defineComponent, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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

const _sfc_main$2 = {
  __name: "StockAdjustmentModal",
  __ssrInlineRender: true,
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    ref(false);
    ref([]);
    const form = ref({
      product_id: "",
      adjustment_type: "",
      quantity: 0,
      reason: "",
      description: "",
      adjustment_date: ""
    });
    computed(() => !!props.product);
    const initializeForm = () => {
      if (props.product) {
        form.value.product_id = props.product.id_product;
      }
      const now = /* @__PURE__ */ new Date();
      const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 6e4);
      form.value.adjustment_date = localDateTime.toISOString().slice(0, 16);
    };
    watch(() => props.product, () => {
      initializeForm();
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/inventory/StockAdjustmentModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MovementsHistoryModal",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const loading = ref(false);
    const movements = ref([]);
    const formatDate = (d) => {
      if (!d) return "N/A";
      return new Date(d).toLocaleString("es-ES", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black/50 flex items-center justify-center z-50" }, _attrs))}><div class="bg-white rounded-lg shadow-xl w-full max-w-2xl p-4"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-bold">Historial de movimientos</h3><button class="text-gray-600 hover:text-gray-800">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:x-mark",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button></div><div class="max-h-[60vh] overflow-y-auto"><table class="min-w-full admin-table"><thead><tr><th>Fecha</th><th>Tipo</th><th>Cantidad</th><th>Stock</th><th>Motivo</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(movements), (m) => {
        _push(`<tr><td class="text-sm">${ssrInterpolate(formatDate(m.movement_date || m.created_at))}</td><td class="text-sm">${ssrInterpolate(m.movement_type)}</td><td class="text-sm">${ssrInterpolate(m.quantity)}</td><td class="text-sm">${ssrInterpolate(m.stock_before)} \u2192 ${ssrInterpolate(m.stock_after)}</td><td class="text-sm">${ssrInterpolate(m.reason)}</td></tr>`);
      });
      _push(`<!--]-->`);
      if (!unref(loading) && unref(movements).length === 0) {
        _push(`<tr><td colspan="5" class="py-6 text-center text-sm theme-text-muted">Sin movimientos</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table>`);
      if (unref(loading)) {
        _push(`<div class="py-6 text-center text-sm text-gray-500">Cargando...</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/inventory/MovementsHistoryModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const products = ref([]);
    const categories = ref([]);
    const providers = ref([]);
    const loading = ref(false);
    const searchQuery = ref("");
    const selectedCategory = ref("");
    const selectedStockStatus = ref("");
    const selectedProvider = ref("");
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const showAdjustmentModal = ref(false);
    const showMovementsModal = ref(false);
    const selectedProduct = ref(null);
    const filteredInventory = computed(() => {
      let filtered = products.value;
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (product) => product.name.toLowerCase().includes(query) || product.sku.toLowerCase().includes(query)
        );
      }
      if (selectedCategory.value) {
        filtered = filtered.filter((product) => product.category_id === selectedCategory.value);
      }
      if (selectedStockStatus.value) {
        filtered = filtered.filter((product) => {
          const status = getStockStatus(product.stock_quantity, product.min_stock);
          return status === selectedStockStatus.value;
        });
      }
      if (selectedProvider.value) {
        filtered = filtered.filter((product) => product.provider_id === selectedProvider.value);
      }
      return filtered;
    });
    const totalProducts = computed(() => filteredInventory.value.length);
    const totalPages = computed(() => Math.ceil(totalProducts.value / itemsPerPage.value));
    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
    const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalProducts.value));
    const visiblePages = computed(() => {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages.value, start + maxVisible - 1);
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });
    const inventorySummary = computed(() => {
      const total = products.value.length;
      const adequate = products.value.filter((p) => getStockStatus(p.stock_quantity, p.min_stock) === "adequate").length;
      const low = products.value.filter((p) => getStockStatus(p.stock_quantity, p.min_stock) === "low").length;
      const out = products.value.filter((p) => getStockStatus(p.stock_quantity, p.min_stock) === "out").length;
      return { totalProducts: total, adequateStock: adequate, lowStock: low, outOfStock: out };
    });
    const fetchInventory = async () => {
      loading.value = true;
      try {
        const { data } = await $fetch("/api/inventory");
        if (data.success) {
          products.value = data.data;
        } else {
          console.error("Error en la respuesta de la API:", data.error);
        }
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        loading.value = false;
      }
    };
    const closeAdjustmentModal = () => {
      showAdjustmentModal.value = false;
      selectedProduct.value = null;
    };
    const closeMovementsModal = () => {
      showMovementsModal.value = false;
      selectedProduct.value = null;
    };
    const saveAdjustment = async (adjustmentData) => {
      try {
        const { data } = await $fetch("/api/inventory/adjustments", {
          method: "POST",
          body: adjustmentData
        });
        if (data.success) {
          console.log("Ajuste de stock realizado exitosamente");
          await fetchInventory();
          closeAdjustmentModal();
        } else {
          console.error("Error realizando ajuste:", data.error);
        }
      } catch (error) {
        console.error("Error saving adjustment:", error);
      }
    };
    const getStockStatus = (stock, minStock) => {
      if (stock <= 0) return "out";
      if (stock <= (minStock || 5)) return "low";
      return "adequate";
    };
    const getStockStatusText = (stock, minStock) => {
      const status = getStockStatus(stock, minStock);
      switch (status) {
        case "out":
          return "Sin Stock";
        case "low":
          return "Stock Bajo";
        case "adequate":
          return "Stock Adecuado";
        default:
          return "Desconocido";
      }
    };
    const getStockStatusClass = (stock, minStock) => {
      const status = getStockStatus(stock, minStock);
      switch (status) {
        case "out":
          return "bg-red-100 text-red-800";
        case "low":
          return "bg-yellow-100 text-yellow-800";
        case "adequate":
          return "bg-green-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };
    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      const _component_StockAdjustmentModal = _sfc_main$2;
      const _component_MovementsHistoryModal = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-between items-center mb-6"><div><h1 class="text-2xl font-bold text-gray-900">Gesti\xF3n de Inventario</h1><p class="text-gray-600">Controla el stock y movimientos de productos de tu tienda</p></div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"><div class="bg-white p-6 rounded-lg shadow-sm"><div class="flex items-center"><div class="flex-shrink-0"><div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:cube",
        class: "w-5 h-5 text-blue-600"
      }, null, _parent));
      _push(`</div></div><div class="ml-4"><p class="text-sm font-medium text-gray-500">Total Productos</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(inventorySummary).totalProducts)}</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm"><div class="flex items-center"><div class="flex-shrink-0"><div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:check-circle",
        class: "w-5 h-5 text-green-600"
      }, null, _parent));
      _push(`</div></div><div class="ml-4"><p class="text-sm font-medium text-gray-500">Stock Adecuado</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(inventorySummary).adequateStock)}</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm"><div class="flex items-center"><div class="flex-shrink-0"><div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:exclamation-triangle",
        class: "w-5 h-5 text-yellow-600"
      }, null, _parent));
      _push(`</div></div><div class="ml-4"><p class="text-sm font-medium text-gray-500">Stock Bajo</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(inventorySummary).lowStock)}</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm"><div class="flex items-center"><div class="flex-shrink-0"><div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:x-circle",
        class: "w-5 h-5 text-red-600"
      }, null, _parent));
      _push(`</div></div><div class="ml-4"><p class="text-sm font-medium text-gray-500">Sin Stock</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(inventorySummary).outOfStock)}</p></div></div></div></div><div class="bg-white p-4 rounded-lg shadow-sm mb-6"><div class="grid grid-cols-1 md:grid-cols-5 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Buscar</label><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Nombre, SKU..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Categor\xEDa</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), "") : ssrLooseEqual(unref(selectedCategory), "")) ? " selected" : ""}>Todas las categor\xEDas</option><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(`<option${ssrRenderAttr("value", category.id_category)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), category.id_category) : ssrLooseEqual(unref(selectedCategory), category.id_category)) ? " selected" : ""}>${ssrInterpolate(category.name)}</option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Estado Stock</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStockStatus)) ? ssrLooseContain(unref(selectedStockStatus), "") : ssrLooseEqual(unref(selectedStockStatus), "")) ? " selected" : ""}>Todos los estados</option><option value="adequate"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStockStatus)) ? ssrLooseContain(unref(selectedStockStatus), "adequate") : ssrLooseEqual(unref(selectedStockStatus), "adequate")) ? " selected" : ""}>Stock Adecuado</option><option value="low"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStockStatus)) ? ssrLooseContain(unref(selectedStockStatus), "low") : ssrLooseEqual(unref(selectedStockStatus), "low")) ? " selected" : ""}>Stock Bajo</option><option value="out"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStockStatus)) ? ssrLooseContain(unref(selectedStockStatus), "out") : ssrLooseEqual(unref(selectedStockStatus), "out")) ? " selected" : ""}>Sin Stock</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Proveedor</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedProvider)) ? ssrLooseContain(unref(selectedProvider), "") : ssrLooseEqual(unref(selectedProvider), "")) ? " selected" : ""}>Todos los proveedores</option><!--[-->`);
      ssrRenderList(unref(providers), (provider) => {
        _push(`<option${ssrRenderAttr("value", provider.id_provider)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedProvider)) ? ssrLooseContain(unref(selectedProvider), provider.id_provider) : ssrLooseEqual(unref(selectedProvider), provider.id_provider)) ? " selected" : ""}>${ssrInterpolate(provider.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="flex items-end"><button class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"> Limpiar Filtros </button></div></div></div><div class="rounded-lg overflow-hidden border border-gray-200 dark:border-[var(--border-color)]"><div class="overflow-x-auto"><table class="min-w-full admin-table"><thead><tr><th>Producto</th><th>Categor\xEDa</th><th>Stock Actual</th><th>Stock M\xEDnimo</th><th>Estado</th><th>\xDAltimo Movimiento</th><th>Acciones</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(filteredInventory).slice(unref(startIndex), unref(endIndex)), (product) => {
        var _a;
        _push(`<tr><td class="whitespace-nowrap"><div class="flex items-center"><div class="flex-shrink-0 h-12 w-12">`);
        if (product.image_url) {
          _push(`<img${ssrRenderAttr("src", product.image_url)}${ssrRenderAttr("alt", product.name)} class="h-12 w-12 rounded-lg object-cover">`);
        } else {
          _push(`<div class="h-12 w-12 rounded-lg bg-gray-200 dark:bg-white/10 flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:photo",
            class: "w-6 h-6 theme-text-muted"
          }, null, _parent));
          _push(`</div>`);
        }
        _push(`</div><div class="ml-4"><div class="text-sm font-medium theme-text-primary">${ssrInterpolate(product.name)}</div><div class="text-sm theme-text-muted">${ssrInterpolate(product.sku)}</div></div></div></td><td class="whitespace-nowrap"><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">${ssrInterpolate(((_a = product.category) == null ? void 0 : _a.name) || "Sin categor\xEDa")}</span></td><td class="whitespace-nowrap"><div class="text-sm font-medium theme-text-primary">${ssrInterpolate(product.stock_quantity)}</div><div class="text-xs theme-text-muted">unidades</div></td><td class="whitespace-nowrap"><div class="text-sm theme-text-primary">${ssrInterpolate(product.min_stock || 0)}</div></td><td class="whitespace-nowrap"><span class="${ssrRenderClass([
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          getStockStatusClass(product.stock_quantity, product.min_stock)
        ])}">${ssrInterpolate(getStockStatusText(product.stock_quantity, product.min_stock))}</span></td><td class="whitespace-nowrap text-sm theme-text-muted">${ssrInterpolate(formatDate(product.last_movement_date))}</td><td class="whitespace-nowrap text-sm font-medium"><div class="flex space-x-2"><button class="text-blue-600 hover:text-blue-900" title="Ver movimientos">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:eye",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><button class="text-orange-600 hover:text-orange-900" title="Ajustar stock">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:adjustments-horizontal",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
      if (unref(totalPages) > 1) {
        _push(`<div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"><div class="flex-1 flex justify-between sm:hidden"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> Anterior </button><button${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""} class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> Siguiente </button></div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"><div><p class="text-sm text-gray-700"> Mostrando <span class="font-medium">${ssrInterpolate(unref(startIndex) + 1)}</span> a <span class="font-medium">${ssrInterpolate(unref(endIndex))}</span> de <span class="font-medium">${ssrInterpolate(unref(totalProducts))}</span> resultados </p></div><div><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-left",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><!--[-->`);
        ssrRenderList(unref(visiblePages), (page) => {
          _push(`<button class="${ssrRenderClass([
            "relative inline-flex items-center px-4 py-2 border text-sm font-medium",
            page === unref(currentPage) ? "z-10 bg-green-50 border-green-500 text-green-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
          ])}">${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]--><button${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""} class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-right",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></nav></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(showAdjustmentModal)) {
        _push(ssrRenderComponent(_component_StockAdjustmentModal, {
          product: unref(selectedProduct),
          onClose: closeAdjustmentModal,
          onSave: saveAdjustment
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(showMovementsModal)) {
        _push(ssrRenderComponent(_component_MovementsHistoryModal, {
          product: unref(selectedProduct),
          onClose: closeMovementsModal
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/inventory/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BIiBWY5F.mjs.map
