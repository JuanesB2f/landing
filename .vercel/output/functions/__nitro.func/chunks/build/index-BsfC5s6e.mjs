import { v as useToast, _ as __nuxt_component_1$1 } from './server.mjs';
import { ref, computed, unref, watch, useSSRContext } from 'vue';
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

const _sfc_main$2 = {
  __name: "ProviderModal",
  __ssrInlineRender: true,
  props: {
    provider: {
      type: Object,
      default: null
    }
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const loading = ref(false);
    const form = ref({
      name: "",
      email: "",
      phone: "",
      contact_person: "",
      address: "",
      city: "",
      is_active: true
    });
    watch(() => props.provider, (newProvider) => {
      if (newProvider) {
        form.value = {
          name: newProvider.name || "",
          email: newProvider.email || "",
          phone: newProvider.phone || "",
          contact_person: newProvider.contact_person || "",
          address: newProvider.address || "",
          city: newProvider.city || "",
          is_active: newProvider.is_active !== void 0 ? newProvider.is_active : true
        };
      } else {
        form.value = {
          name: "",
          email: "",
          phone: "",
          contact_person: "",
          address: "",
          city: "",
          is_active: true
        };
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="fixed inset-0 z-[9998] overflow-y-auto" role="dialog" aria-modal="true"><div class="flex items-center justify-center min-h-screen p-4"><div class="fixed inset-0 bg-black/50"></div><div class="relative z-[9999] w-full max-w-2xl bg-white rounded-lg text-left overflow-hidden shadow-xl"><div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"><div class="sm:flex sm:items-start"><div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">`);
        _push2(ssrRenderComponent(_component_Icon, {
          name: "heroicons:building-storefront",
          class: "h-6 w-6 text-green-600"
        }, null, _parent));
        _push2(`</div><div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full"><h3 class="text-lg leading-6 font-medium text-gray-900">${ssrInterpolate(__props.provider ? "Editar Proveedor" : "Nuevo Proveedor")}</h3><form class="mt-4 space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Nombre * </label><input${ssrRenderAttr("value", unref(form).name)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Nombre del proveedor"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Email </label><input${ssrRenderAttr("value", unref(form).email)} type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="email@proveedor.com"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Tel\xE9fono </label><input${ssrRenderAttr("value", unref(form).phone)} type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="+52 123 456 7890"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Persona de Contacto </label><input${ssrRenderAttr("value", unref(form).contact_person)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Nombre del contacto"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Direcci\xF3n </label><textarea rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Direcci\xF3n completa">${ssrInterpolate(unref(form).address)}</textarea></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Ciudad </label><input${ssrRenderAttr("value", unref(form).city)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Ciudad"></div><div class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" id="is_active" class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"><label for="is_active" class="ml-2 block text-sm text-gray-900"> Proveedor activo </label></div></form></div></div></div><div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">`);
        if (unref(loading)) {
          _push2(ssrRenderComponent(_component_Icon, {
            name: "heroicons:arrow-path",
            class: "w-4 h-4 mr-2 animate-spin"
          }, null, _parent));
        } else {
          _push2(`<!---->`);
        }
        _push2(` ${ssrInterpolate(__props.provider ? "Actualizar" : "Crear")}</button><button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"> Cancelar </button></div></div></div></div>`);
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/providers/ProviderModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "ProviderDeleteModal",
  __ssrInlineRender: true,
  props: {
    provider: { type: Object, required: true }
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
        _push2(`</div><div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"><h3 class="text-lg leading-6 font-medium text-gray-900">Eliminar Proveedor</h3><div class="mt-2"><p class="text-sm text-gray-500"> \xBFEst\xE1s seguro de que quieres eliminar el proveedor &#39;${ssrInterpolate((_a = __props.provider) == null ? void 0 : _a.name)}&#39;? Esta acci\xF3n no se puede deshacer. </p></div></div></div></div><div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"><button type="button" class="w-full btn btn-danger sm:ml-3 sm:w-auto sm:text-sm"> Confirmar </button><button type="button" class="mt-3 w-full btn btn-secondary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"> Cancelar </button></div></div></div></div>`);
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/providers/ProviderDeleteModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const providers = ref([]);
    const loading = ref(false);
    const searchQuery = ref("");
    const selectedStatus = ref("");
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const showModal = ref(false);
    const showConfirmModal = ref(false);
    const selectedProvider = ref(null);
    const providerToDelete = ref(null);
    const filteredProviders = computed(() => {
      let filtered = providers.value;
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (provider) => provider.name.toLowerCase().includes(query) || provider.email && provider.email.toLowerCase().includes(query) || provider.contact_person && provider.contact_person.toLowerCase().includes(query)
        );
      }
      if (selectedStatus.value !== "") {
        filtered = filtered.filter((provider) => provider.is_active.toString() === selectedStatus.value);
      }
      return filtered;
    });
    const totalProviders = computed(() => filteredProviders.value.length);
    const totalPages = computed(() => Math.ceil(totalProviders.value / itemsPerPage.value));
    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
    const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalProviders.value));
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
    const fetchProviders = async () => {
      loading.value = true;
      try {
        const { data } = await $fetch("/api/providers");
        if (data.success) {
          providers.value = data.data;
        } else {
          console.error("Error en la respuesta de la API:", data.error);
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        loading.value = false;
      }
    };
    const closeModal = () => {
      showModal.value = false;
      selectedProvider.value = null;
    };
    const saveProvider = async (providerData) => {
      try {
        if (selectedProvider.value) {
          const { data } = await $fetch(`/api/providers/${selectedProvider.value.id_provider}`, {
            method: "PUT",
            body: providerData
          });
          if (data.success) {
            toast.add({ title: "Proveedor actualizado", color: "green" });
            await fetchProviders();
            closeModal();
          } else {
            console.error("Error actualizando proveedor:", data.error);
            toast.add({ title: data.error || "Error actualizando proveedor", color: "red" });
          }
        } else {
          const { data } = await $fetch("/api/providers", {
            method: "POST",
            body: providerData
          });
          if (data.success) {
            toast.add({ title: "Proveedor creado", color: "green" });
            await fetchProviders();
            closeModal();
          } else {
            console.error("Error creando proveedor:", data.error);
            toast.add({ title: data.error || "Error creando proveedor", color: "red" });
          }
        }
      } catch (error) {
        console.error("Error saving provider:", error);
        const e = error;
        const msg = e && e.data && e.data.error || e && e.message || "Error guardando proveedor";
        toast.add({ title: msg, color: "red" });
      }
    };
    const toast = useToast();
    const deleteProvider = async () => {
      if (!providerToDelete.value) return;
      try {
        const { data } = await $fetch(`/api/providers/${providerToDelete.value.id_provider}`, {
          method: "DELETE"
        });
        if (data.success) {
          toast.add({ title: "Proveedor eliminado", color: "green" });
          await fetchProviders();
          showConfirmModal.value = false;
          providerToDelete.value = null;
        } else {
          console.error("Error eliminando proveedor:", data.error);
          toast.add({ title: data.error || "Error eliminando proveedor", color: "red" });
        }
      } catch (error) {
        console.error("Error deleting provider:", error);
        const e = error;
        const msg = e && e.data && e.data.error || e && e.message || "Error eliminando proveedor";
        toast.add({ title: msg, color: "red" });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      const _component_ProviderModal = _sfc_main$2;
      const _component_ProviderDeleteModal = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-between items-center mb-6"><div><h1 class="text-2xl font-bold text-gray-900">Gesti\xF3n de Proveedores</h1><p class="text-gray-600">Administra los proveedores de tu tienda</p></div><button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:plus-circle",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`<span>Nuevo Proveedor</span></button></div><div class="bg-white p-4 rounded-lg shadow-sm mb-6"><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Buscar</label><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Nombre, email, contacto..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Estado</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "") : ssrLooseEqual(unref(selectedStatus), "")) ? " selected" : ""}>Todos los estados</option><option value="true"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "true") : ssrLooseEqual(unref(selectedStatus), "true")) ? " selected" : ""}>Activo</option><option value="false"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "false") : ssrLooseEqual(unref(selectedStatus), "false")) ? " selected" : ""}>Inactivo</option></select></div><div class="flex items-end"><button class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"> Limpiar Filtros </button></div></div></div><div class="rounded-lg overflow-hidden border border-gray-200 dark:border-[var(--border-color)]"><div class="overflow-x-auto"><table class="min-w-full admin-table"><thead><tr><th>Proveedor</th><th>Contacto</th><th>Direcci\xF3n</th><th>Estado</th><th>Productos</th><th>Acciones</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(filteredProviders).slice(unref(startIndex), unref(endIndex)), (provider) => {
        _push(`<tr><td class="whitespace-nowrap"><div class="flex items-center"><div class="flex-shrink-0 h-10 w-10"><div class="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:truck",
          class: "w-5 h-5 text-green-600 dark:text-green-300"
        }, null, _parent));
        _push(`</div></div><div class="ml-4"><div class="text-sm font-medium theme-text-primary">${ssrInterpolate(provider.name)}</div><div class="text-sm theme-text-muted">${ssrInterpolate(provider.email)}</div></div></div></td><td class="whitespace-nowrap"><div class="text-sm theme-text-primary">${ssrInterpolate(provider.contact_person || "N/A")}</div><div class="text-sm theme-text-muted">${ssrInterpolate(provider.phone || "N/A")}</div></td><td class="whitespace-nowrap"><div class="text-sm theme-text-primary">${ssrInterpolate(provider.address || "N/A")}</div><div class="text-sm theme-text-muted">${ssrInterpolate(provider.city || "N/A")}</div></td><td class="whitespace-nowrap"><span class="${ssrRenderClass([
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          provider.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        ])}">${ssrInterpolate(provider.is_active ? "Activo" : "Inactivo")}</span></td><td class="whitespace-nowrap text-sm theme-text-muted">${ssrInterpolate(provider.product_count || 0)} productos </td><td class="whitespace-nowrap text-sm font-medium"><div class="flex space-x-2"><button class="text-blue-600 hover:text-blue-900" title="Editar proveedor">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:pencil",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><button class="${ssrRenderClass([
          "hover:text-gray-900",
          provider.is_active ? "text-orange-600" : "text-green-600"
        ])}"${ssrRenderAttr("title", provider.is_active ? "Desactivar" : "Activar")}>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: provider.is_active ? "heroicons:pause" : "heroicons:play",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><button class="text-red-600 hover:text-red-900" title="Eliminar proveedor">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:trash",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
      if (unref(totalPages) > 1) {
        _push(`<div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"><div class="flex-1 flex justify-between sm:hidden"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> Anterior </button><button${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""} class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> Siguiente </button></div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"><div><p class="text-sm text-gray-700"> Mostrando <span class="font-medium">${ssrInterpolate(unref(startIndex) + 1)}</span> a <span class="font-medium">${ssrInterpolate(unref(endIndex))}</span> de <span class="font-medium">${ssrInterpolate(unref(totalProviders))}</span> resultados </p></div><div><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">`);
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
      if (unref(showModal)) {
        _push(ssrRenderComponent(_component_ProviderModal, {
          provider: unref(selectedProvider),
          onClose: closeModal,
          onSave: saveProvider
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(showConfirmModal) && unref(providerToDelete)) {
        _push(ssrRenderComponent(_component_ProviderDeleteModal, {
          provider: unref(providerToDelete),
          onConfirm: deleteProvider,
          onCancel: ($event) => showConfirmModal.value = false
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/providers/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BsfC5s6e.mjs.map
