import { v as useToast, _ as __nuxt_component_1$1 } from './server.mjs';
import { ref, computed, unref, defineComponent, watch, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderTeleport } from 'vue/server-renderer';
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
  __name: "CategoryAddModal",
  __ssrInlineRender: true,
  props: {
    category: { type: Object, default: null }
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const loading = ref(false);
    const form = ref({
      name: "",
      description: "",
      is_active: true
    });
    const file = ref(null);
    const previewUrl = ref("");
    const isEditing = computed(() => !!props.category);
    const initForm = () => {
      if (props.category) {
        form.value = {
          name: props.category.name,
          description: props.category.description || "",
          is_active: props.category.is_active
        };
        previewUrl.value = props.category.image_url || "";
      } else {
        form.value = { name: "", description: "", is_active: true };
        previewUrl.value = "";
        file.value = null;
      }
    };
    watch(() => props.category, initForm, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="fixed inset-0 z-[9998] overflow-y-auto" role="dialog" aria-modal="true"><div class="flex items-center justify-center min-h-screen p-4"><div class="fixed inset-0 bg-black/50"></div><div class="relative z-[9999] w-full max-w-xl bg-white rounded-lg text-left overflow-hidden shadow-xl"><div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"><div class="sm:flex sm:items-start"><div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">`);
        _push2(ssrRenderComponent(_component_Icon, {
          name: unref(isEditing) ? "heroicons:pencil-square" : "heroicons:plus",
          class: "h-6 w-6 text-blue-600"
        }, null, _parent));
        _push2(`</div><div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full"><h3 class="text-lg leading-6 font-medium text-gray-900">${ssrInterpolate(unref(isEditing) ? "Editar Categor\xEDa" : "Crear Nueva Categor\xEDa")}</h3><form class="mt-4 space-y-4"><div class="grid grid-cols-1 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label><input${ssrRenderAttr("value", unref(form).name)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nombre de la categor\xEDa"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Descripci\xF3n</label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Descripci\xF3n (opcional)">${ssrInterpolate(unref(form).description)}</textarea></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Imagen (opcional)</label><input type="file" accept="image/*" class="w-full"></div><div class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" id="is_active" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"><label for="is_active" class="ml-2 block text-sm text-gray-900">Categor\xEDa activa</label></div></div>`);
        if (unref(previewUrl)) {
          _push2(`<div class="col-span-2"><label class="block text-sm font-medium text-gray-700 mb-1">Vista previa</label><div class="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden"><img${ssrRenderAttr("src", unref(previewUrl))}${ssrRenderAttr("alt", unref(form).name)} class="w-full h-full object-cover"></div></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</form></div></div></div><div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">`);
        if (unref(loading)) {
          _push2(ssrRenderComponent(_component_Icon, {
            name: "heroicons:arrow-path",
            class: "w-4 h-4 mr-2 animate-spin"
          }, null, _parent));
        } else {
          _push2(`<!---->`);
        }
        _push2(` ${ssrInterpolate(unref(isEditing) ? "Actualizar" : "Crear")}</button><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"> Cancelar </button></div></div></div></div>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/categories/CategoryAddModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "CategoryDeleteModal",
  __ssrInlineRender: true,
  props: { category: { type: Object, required: true } },
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
        _push2(`</div><div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"><h3 class="text-lg leading-6 font-medium text-gray-900">Eliminar Categor\xEDa</h3><div class="mt-2"><p class="text-sm text-gray-500">\xBFEst\xE1s seguro de eliminar &#39;${ssrInterpolate((_a = __props.category) == null ? void 0 : _a.name)}&#39;? Esta acci\xF3n no se puede deshacer.</p></div></div></div></div><div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"><button type="button" class="w-full btn btn-danger sm:ml-3 sm:w-auto sm:text-sm"> Confirmar </button><button type="button" class="mt-3 w-full btn btn-secondary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"> Cancelar </button></div></div></div></div>`);
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/categories/CategoryDeleteModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const categories = ref([]);
    const loading = ref(false);
    const searchQuery = ref("");
    const selectedStatus = ref("");
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const showModal = ref(false);
    const showDeleteModal = ref(false);
    const editingCategory = ref(null);
    const categoryToDelete = ref(null);
    const filteredCategories = computed(() => {
      let filtered = categories.value;
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (category) => category.name.toLowerCase().includes(query) || category.description && category.description.toLowerCase().includes(query)
        );
      }
      if (selectedStatus.value !== "") {
        const isActive = selectedStatus.value === "true";
        filtered = filtered.filter((category) => category.is_active === isActive);
      }
      return filtered;
    });
    const totalCategories = computed(() => filteredCategories.value.length);
    const totalPages = computed(() => Math.ceil(totalCategories.value / itemsPerPage.value));
    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
    const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalCategories.value));
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
    const fetchCategories = async () => {
      loading.value = true;
      try {
        const { data } = await $fetch("/api/categories");
        if (data.success) {
          categories.value = data.data;
        } else {
          console.error("Error en la respuesta de la API:", data.error);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        loading.value = false;
      }
    };
    const toast = useToast();
    const closeModal = () => {
      showModal.value = false;
      editingCategory.value = null;
    };
    const saveCategory = async (categoryData) => {
      try {
        if (editingCategory.value) {
          const endpoint = `/api/categories/${editingCategory.value.id_category}`;
          const { data } = await $fetch(endpoint, { method: "PUT", body: categoryData });
          if (data.success) {
            toast.add({ title: "Categor\xEDa actualizada", color: "green" });
          } else {
            console.error("Error actualizando categor\xEDa:", data.error);
            toast.add({ title: data.error || "Error actualizando categor\xEDa", color: "red" });
            return;
          }
        } else {
          const { data } = await $fetch("/api/categories", { method: "POST", body: categoryData });
          if (data.success) {
            toast.add({ title: "Categor\xEDa creada", color: "green" });
          } else {
            console.error("Error creando categor\xEDa:", data.error);
            toast.add({ title: data.error || "Error creando categor\xEDa", color: "red" });
            return;
          }
        }
        await fetchCategories();
        closeModal();
      } catch (error) {
        console.error("Error saving category:", error);
        toast.add({ title: "Error guardando categor\xEDa", color: "red" });
      }
    };
    const confirmDelete = async () => {
      try {
        const { data } = await $fetch(`/api/categories/${categoryToDelete.value.id_category}`, { method: "DELETE" });
        if (data.success) {
          toast.add({ title: "Categor\xEDa eliminada", color: "green" });
          await fetchCategories();
          nextTick(() => {
            showDeleteModal.value = false;
            categoryToDelete.value = null;
          });
        } else {
          console.error("Error eliminando categor\xEDa:", data.error);
          toast.add({ title: data.error || "Error eliminando categor\xEDa", color: "red" });
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.add({ title: "Error eliminando categor\xEDa", color: "red" });
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
      const _component_CategoryAddModal = _sfc_main$2;
      const _component_CategoryDeleteModal = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6"><div><h1 class="text-xl sm:text-2xl font-bold theme-text-primary">Gesti\xF3n de Categor\xEDas</h1><p class="text-sm sm:text-base theme-text-secondary mt-0.5">Administra las categor\xEDas de productos de tu tienda</p></div><button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors text-sm sm:text-base w-full sm:w-auto">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:plus",
        class: "w-5 h-5 shrink-0"
      }, null, _parent));
      _push(`<span>Agregar Categor\xEDa</span></button></div><div class="theme-card-bg p-3 sm:p-4 rounded-lg shadow-sm mb-4 sm:mb-6 border theme-border"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Buscar</label><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Nombre o descripci\xF3n..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Estado</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "") : ssrLooseEqual(unref(selectedStatus), "")) ? " selected" : ""}>Todos los estados</option><option value="true"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "true") : ssrLooseEqual(unref(selectedStatus), "true")) ? " selected" : ""}>Activa</option><option value="false"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "false") : ssrLooseEqual(unref(selectedStatus), "false")) ? " selected" : ""}>Inactiva</option></select></div><div class="flex items-end"><button class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"> Limpiar Filtros </button></div></div></div><div class="rounded-lg overflow-hidden border border-gray-200 dark:border-[var(--border-color)]"><div class="overflow-x-auto"><table class="min-w-full admin-table"><thead><tr><th>Categor\xEDa</th><th>Descripci\xF3n</th><th>Productos</th><th>Estado</th><th>Fecha Creaci\xF3n</th><th>Acciones</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(filteredCategories).slice(unref(startIndex), unref(endIndex)), (category) => {
        _push(`<tr><td class="whitespace-nowrap"><div class="flex items-center"><div class="flex-shrink-0 h-10 w-10"><div class="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:tag",
          class: "w-5 h-5 text-blue-600 dark:text-blue-300"
        }, null, _parent));
        _push(`</div></div><div class="ml-4"><div class="text-sm font-medium theme-text-primary">${ssrInterpolate(category.name)}</div></div></div></td><td><div class="text-sm max-w-xs truncate theme-text-primary">${ssrInterpolate(category.description || "Sin descripci\xF3n")}</div></td><td class="whitespace-nowrap"><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">${ssrInterpolate(category.product_count || 0)} productos </span></td><td class="whitespace-nowrap"><span class="${ssrRenderClass([
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          category.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        ])}">${ssrInterpolate(category.is_active ? "Activa" : "Inactiva")}</span></td><td class="whitespace-nowrap text-sm theme-text-muted">${ssrInterpolate(formatDate(category.created_at))}</td><td class="whitespace-nowrap text-sm font-medium"><div class="flex space-x-2"><button class="text-indigo-600 hover:text-indigo-900" title="Editar categor\xEDa">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:pencil-square",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><button class="${ssrRenderClass([
          "hover:text-gray-900",
          category.is_active ? "text-red-600" : "text-green-600"
        ])}"${ssrRenderAttr("title", category.is_active ? "Desactivar categor\xEDa" : "Activar categor\xEDa")}>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: category.is_active ? "heroicons:eye-slash" : "heroicons:eye",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><button class="text-red-600 hover:text-red-900" title="Eliminar categor\xEDa">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:trash",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
      if (unref(totalPages) > 1) {
        _push(`<div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"><div class="flex-1 flex justify-between sm:hidden"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> Anterior </button><button${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""} class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> Siguiente </button></div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"><div><p class="text-sm text-gray-700"> Mostrando <span class="font-medium">${ssrInterpolate(unref(startIndex) + 1)}</span> a <span class="font-medium">${ssrInterpolate(unref(endIndex))}</span> de <span class="font-medium">${ssrInterpolate(unref(totalCategories))}</span> resultados </p></div><div><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-left",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><!--[-->`);
        ssrRenderList(unref(visiblePages), (page) => {
          _push(`<button class="${ssrRenderClass([
            "relative inline-flex items-center px-4 py-2 border text-sm font-medium",
            page === unref(currentPage) ? "z-10 bg-blue-50 border-blue-500 text-blue-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
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
        _push(ssrRenderComponent(_component_CategoryAddModal, {
          category: unref(editingCategory),
          onClose: closeModal,
          onSave: saveCategory
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(showDeleteModal)) {
        _push(ssrRenderComponent(_component_CategoryDeleteModal, {
          category: unref(categoryToDelete),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/categories/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BWUgj4_D.mjs.map
