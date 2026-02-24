import { v as useToast, _ as __nuxt_component_1$1 } from './server.mjs';
import { ref, computed, unref, defineComponent, watch, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderTeleport } from 'vue/server-renderer';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProductAddModal",
  __ssrInlineRender: true,
  props: {
    product: { default: null },
    categories: { default: () => [] }
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const loading = ref(false);
    const form = ref({
      name: "",
      description: "",
      price: 0,
      stock_quantity: 0,
      category_id: "",
      brand: "",
      sku: "",
      is_active: true
    });
    const file = ref(null);
    const previewUrl = ref("");
    const isEditing = computed(() => !!props.product);
    const initForm = () => {
      if (props.product) {
        form.value = {
          name: props.product.name,
          description: props.product.description,
          price: props.product.price,
          stock_quantity: props.product.stock_quantity,
          category_id: props.product.category_id,
          brand: props.product.brand,
          sku: props.product.sku,
          is_active: props.product.is_active
        };
        previewUrl.value = props.product.image_url || "";
      } else {
        form.value = {
          name: "",
          description: "",
          price: 0,
          stock_quantity: 0,
          category_id: "",
          brand: "",
          sku: "",
          is_active: true
        };
        previewUrl.value = "";
        file.value = null;
      }
    };
    watch(() => props.product, initForm, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="fixed inset-0 z-[9998] overflow-y-auto" role="dialog" aria-modal="true"><div class="flex items-center justify-center min-h-screen p-4"><div class="fixed inset-0 bg-black/50"></div><div class="relative z-[9999] w-full max-w-2xl bg-white rounded-lg text-left overflow-hidden shadow-xl"><div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"><div class="sm:flex sm:items-start"><div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-pink-100 sm:mx-0 sm:h-10 sm:w-10">`);
        _push2(ssrRenderComponent(_component_Icon, {
          name: unref(isEditing) ? "heroicons:pencil-square" : "heroicons:plus",
          class: "h-6 w-6 text-pink-600"
        }, null, _parent));
        _push2(`</div><div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full"><h3 class="text-lg leading-6 font-medium text-gray-900">${ssrInterpolate(unref(isEditing) ? "Editar Producto" : "Crear Nuevo Producto")}</h3><form class="mt-4 space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="col-span-2"><label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label><input${ssrRenderAttr("value", unref(form).name)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Nombre del producto"></div><div class="col-span-2"><label class="block text-sm font-medium text-gray-700 mb-1">Descripci\xF3n *</label><textarea rows="3" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Describe el producto...">${ssrInterpolate(unref(form).description)}</textarea></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Precio *</label><div class="relative"><span class="absolute left-3 top-2 text-gray-500">$</span><input${ssrRenderAttr("value", unref(form).price)} type="number" step="0.01" min="0" required class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="0.00"></div></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Stock *</label><input${ssrRenderAttr("value", unref(form).stock_quantity)} type="number" min="0" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="0"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Categor\xEDa *</label><select required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}>Seleccionar categor\xEDa</option><!--[-->`);
        ssrRenderList(_ctx.categories, (category) => {
          _push2(`<option${ssrRenderAttr("value", category.id_category)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, category.id_category) : ssrLooseEqual(unref(form).category_id, category.id_category)) ? " selected" : ""}>${ssrInterpolate(category.name)}</option>`);
        });
        _push2(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Marca</label><input${ssrRenderAttr("value", unref(form).brand)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Marca"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">SKU *</label><input${ssrRenderAttr("value", unref(form).sku)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="SKU"></div><div class="col-span-2"><label class="block text-sm font-medium text-gray-700 mb-1">Imagen</label><input type="file" accept="image/*" class="w-full"></div><div class="col-span-2"><div class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" id="is_active" class="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"><label for="is_active" class="ml-2 block text-sm text-gray-900">Producto activo</label></div></div></div>`);
        if (unref(previewUrl)) {
          _push2(`<div class="col-span-2"><label class="block text-sm font-medium text-gray-700 mb-1">Vista previa</label><div class="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden"><img${ssrRenderAttr("src", unref(previewUrl))}${ssrRenderAttr("alt", unref(form).name)} class="w-full h-full object-cover"></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</form></div></div></div><div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full btn btn-primary sm:ml-3 sm:w-auto sm:text-sm">`);
        if (unref(loading)) {
          _push2(ssrRenderComponent(_component_Icon, {
            name: "heroicons:arrow-path",
            class: "w-4 h-4 mr-2 animate-spin"
          }, null, _parent));
        } else {
          _push2(`<!---->`);
        }
        _push2(` ${ssrInterpolate(unref(isEditing) ? "Actualizar" : "Crear")}</button><button type="button" class="mt-3 w-full btn btn-secondary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"> Cancelar </button></div></div></div></div>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/products/ProductAddModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "ProductDeleteModal",
  __ssrInlineRender: true,
  props: {
    product: { type: Object, required: true }
  },
  emits: ["confirm", "cancel"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      ssrRenderTeleport(_push, (_push2) => {
        var _a;
        _push2(`<div class="fixed inset-0 z-[9998] overflow-y-auto" role="dialog" aria-modal="true"><div class="flex items-center justify-center min-h-screen p-4"><div class="fixed inset-0 bg-black/50"></div><div class="relative z-[9999] w-full max-w-lg bg-white rounded-lg text-left overflow-hidden shadow-xl"><div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"><div class="sm:flex sm:items-start"><div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">`);
        _push2(ssrRenderComponent(_component_Icon, {
          name: "heroicons:exclamation-triangle",
          class: "h-6 w-6 text-red-600"
        }, null, _parent));
        _push2(`</div><div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"><h3 class="text-lg leading-6 font-medium text-gray-900">Eliminar Producto</h3><div class="mt-2"><p class="text-sm text-gray-500"> \xBFEst\xE1s seguro de que quieres eliminar el producto &#39;${ssrInterpolate((_a = __props.product) == null ? void 0 : _a.name)}&#39;? Esta acci\xF3n no se puede deshacer. </p></div></div></div></div><div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"><button type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"> Confirmar </button><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"> Cancelar </button></div></div></div></div>`);
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/products/ProductDeleteModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const products = ref([]);
    const categories = ref([]);
    const loading = ref(false);
    const searchQuery = ref("");
    const selectedCategory = ref("");
    const selectedStatus = ref("");
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const showModal = ref(false);
    const showDeleteModal = ref(false);
    const editingProduct = ref(null);
    const productToDelete = ref(null);
    const filteredProducts = computed(() => {
      let filtered = products.value;
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (product) => product.name.toLowerCase().includes(query) || product.sku.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
        );
      }
      if (selectedCategory.value) {
        filtered = filtered.filter((product) => product.category_id === selectedCategory.value);
      }
      if (selectedStatus.value !== "") {
        const isActive = selectedStatus.value === "true";
        filtered = filtered.filter((product) => product.is_active === isActive);
      }
      return filtered;
    });
    const totalProducts = computed(() => filteredProducts.value.length);
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
    const { formatCOP } = useCurrency();
    const fetchProducts = async () => {
      loading.value = true;
      try {
        const { data } = await $fetch("/api/products");
        if (data.success) {
          products.value = data.data;
        } else {
          console.error("Error en la respuesta de la API:", data.error);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        loading.value = false;
      }
    };
    const closeModal = () => {
      showModal.value = false;
      editingProduct.value = null;
    };
    const toast = useToast();
    const saveProduct = async (productData) => {
      try {
        if (editingProduct.value) {
          const { data } = await $fetch(`/api/products/${productData.get("id_product")}`, {
            method: "PUT",
            body: productData
          });
          if (data.success) {
            toast.add({ title: "Producto actualizado", color: "green" });
          } else {
            console.error("Error actualizando producto:", data.error);
            toast.add({ title: data.error || "Error actualizando producto", color: "red" });
            return;
          }
        } else {
          const { data } = await $fetch("/api/products", {
            method: "POST",
            body: productData
          });
          if (data.success) {
            toast.add({ title: "Producto creado", color: "green" });
          } else {
            console.error("Error creando producto:", data.error);
            toast.add({ title: data.error || "Error creando producto", color: "red" });
            return;
          }
        }
        await fetchProducts();
        closeModal();
      } catch (error) {
        console.error("Error saving product:", error);
        toast.add({ title: "Error guardando producto", color: "red" });
      }
    };
    const confirmDelete = async () => {
      try {
        const { data } = await $fetch(`/api/products/${productToDelete.value.id_product}`, {
          method: "DELETE"
        });
        if (data.success) {
          toast.add({ title: "Producto eliminado", color: "green" });
          await fetchProducts();
          nextTick(() => {
            showDeleteModal.value = false;
            productToDelete.value = null;
          });
        } else {
          console.error("Error eliminando producto:", data.error);
          toast.add({ title: data.error || "Error eliminando producto", color: "red" });
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.add({ title: "Error eliminando producto", color: "red" });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      const _component_ProductAddModal = _sfc_main$2;
      const _component_ProductDeleteModal = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6"><div><h1 class="text-xl sm:text-2xl font-bold theme-text-primary">Gesti\xF3n de Productos</h1><p class="text-sm sm:text-base theme-text-secondary mt-0.5">Administra el cat\xE1logo de productos de tu tienda</p></div><button class="bg-pink-600 hover:bg-pink-700 text-white px-3 py-2 sm:px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors text-sm sm:text-base w-full sm:w-auto shrink-0">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:plus",
        class: "w-5 h-5 shrink-0"
      }, null, _parent));
      _push(`<span>Agregar Producto</span></button></div><div class="theme-card-bg p-3 sm:p-4 rounded-lg shadow-sm mb-4 sm:mb-6 border theme-border"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Buscar</label><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Nombre, SKU o descripci\xF3n..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Categor\xEDa</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), "") : ssrLooseEqual(unref(selectedCategory), "")) ? " selected" : ""}>Todas las categor\xEDas</option><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(`<option${ssrRenderAttr("value", category.id_category)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), category.id_category) : ssrLooseEqual(unref(selectedCategory), category.id_category)) ? " selected" : ""}>${ssrInterpolate(category.name)}</option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Estado</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "") : ssrLooseEqual(unref(selectedStatus), "")) ? " selected" : ""}>Todos los estados</option><option value="true"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "true") : ssrLooseEqual(unref(selectedStatus), "true")) ? " selected" : ""}>Activo</option><option value="false"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "false") : ssrLooseEqual(unref(selectedStatus), "false")) ? " selected" : ""}>Inactivo</option></select></div><div class="flex items-end"><button class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"> Limpiar Filtros </button></div></div></div><div class="rounded-lg overflow-hidden border theme-border"><div class="overflow-x-auto -mx-3 sm:mx-0"><table class="min-w-full admin-table"><thead><tr><th>Producto</th><th>Categor\xEDa</th><th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(filteredProducts).slice(unref(startIndex), unref(endIndex)), (product) => {
        var _a;
        _push(`<tr><td class="whitespace-nowrap"><div class="flex items-center"><div class="flex-shrink-0 h-12 w-12">`);
        if (product.image_url) {
          _push(`<img${ssrRenderAttr("src", product.image_url)}${ssrRenderAttr("alt", product.name)} class="h-12 w-12 rounded-lg object-cover">`);
        } else {
          _push(`<div class="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:photo",
            class: "w-6 h-6 text-gray-400"
          }, null, _parent));
          _push(`</div>`);
        }
        _push(`</div><div class="ml-4"><div class="text-sm font-medium theme-text-primary">${ssrInterpolate(product.name)}</div><div class="text-sm theme-text-muted">${ssrInterpolate(product.sku)}</div></div></div></td><td class="whitespace-nowrap"><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">${ssrInterpolate(((_a = product.category) == null ? void 0 : _a.name) || "Sin categor\xEDa")}</span></td><td class="whitespace-nowrap text-sm theme-text-primary">${ssrInterpolate(unref(formatCOP)(product.price))}</td><td class="whitespace-nowrap"><span class="${ssrRenderClass([
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          product.stock_quantity > 10 ? "bg-green-100 text-green-800" : product.stock_quantity > 0 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
        ])}">${ssrInterpolate(product.stock_quantity)}</span></td><td class="whitespace-nowrap"><span class="${ssrRenderClass([
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          product.is_active ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
        ])}">${ssrInterpolate(product.is_active ? "Activo" : "Inactivo")}</span></td><td class="whitespace-nowrap text-sm font-medium"><div class="flex space-x-2"><button class="text-indigo-600 hover:text-indigo-900">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:pencil-square",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><button class="${ssrRenderClass([
          "hover:text-gray-900",
          product.is_active ? "text-red-600" : "text-green-600"
        ])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: product.is_active ? "heroicons:eye-slash" : "heroicons:eye",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><button class="text-red-600 hover:text-red-900">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:trash",
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
            page === unref(currentPage) ? "z-10 bg-pink-50 border-pink-500 text-pink-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
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
      if (unref(showModal)) {
        _push(ssrRenderComponent(_component_ProductAddModal, {
          product: unref(editingProduct),
          categories: unref(categories),
          onClose: closeModal,
          onSave: saveProduct
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(showDeleteModal)) {
        _push(ssrRenderComponent(_component_ProductDeleteModal, {
          product: unref(productToDelete),
          onConfirm: confirmDelete,
          onCancel: ($event) => showDeleteModal.value = false
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/products/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DyE-bPzi.mjs.map
