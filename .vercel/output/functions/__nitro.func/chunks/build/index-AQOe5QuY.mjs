import { _ as __nuxt_component_1$1 } from './server.mjs';
import { ref, computed, unref, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './ConfirmModal-BE9Uf8q9.mjs';
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

const _sfc_main$1 = {
  __name: "CustomerModal",
  __ssrInlineRender: true,
  props: {
    customer: {
      type: Object,
      default: null
    }
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const form = ref({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      birth_date: "",
      gender: "",
      notes: "",
      is_active: true
    });
    const loading = ref(false);
    watch(() => props.customer, (newCustomer) => {
      if (newCustomer) {
        form.value = {
          first_name: newCustomer.first_name || "",
          last_name: newCustomer.last_name || "",
          email: newCustomer.email || "",
          phone: newCustomer.phone || "",
          address: newCustomer.address || "",
          city: newCustomer.city || "",
          state: newCustomer.state || "",
          postal_code: newCustomer.postal_code || "",
          country: newCustomer.country || "",
          birth_date: newCustomer.birth_date ? newCustomer.birth_date.split("T")[0] : "",
          gender: newCustomer.gender || "",
          notes: newCustomer.notes || "",
          is_active: newCustomer.is_active !== void 0 ? newCustomer.is_active : true
        };
      } else {
        form.value = {
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          postal_code: "",
          country: "",
          birth_date: "",
          gender: "",
          notes: "",
          is_active: true
        };
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" }, _attrs))}><div class="relative top-10 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white"><div class="mt-3"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-medium text-gray-900">${ssrInterpolate(__props.customer ? "Editar Cliente" : "Nuevo Cliente")}</h3><button class="text-gray-400 hover:text-gray-600">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:x-mark",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</button></div><form class="space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Nombre <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", unref(form).first_name)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Nombre"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Apellido <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", unref(form).last_name)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Apellido"></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Email <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", unref(form).email)} type="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="email@ejemplo.com"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Tel\xE9fono </label><input${ssrRenderAttr("value", unref(form).phone)} type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="+52 55 1234 5678"></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Calle y N\xFAmero </label><input${ssrRenderAttr("value", unref(form).address)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Av. Insurgentes 123"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Ciudad </label><input${ssrRenderAttr("value", unref(form).city)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Ciudad de M\xE9xico"></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Estado/Provincia </label><input${ssrRenderAttr("value", unref(form).state)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="CDMX"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> C\xF3digo Postal </label><input${ssrRenderAttr("value", unref(form).postal_code)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="12345"></div></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Pa\xEDs </label><input${ssrRenderAttr("value", unref(form).country)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="M\xE9xico"></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Fecha de Nacimiento </label><input${ssrRenderAttr("value", unref(form).birth_date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> G\xE9nero </label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "") : ssrLooseEqual(unref(form).gender, "")) ? " selected" : ""}>Seleccionar</option><option value="M"${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "M") : ssrLooseEqual(unref(form).gender, "M")) ? " selected" : ""}>Masculino</option><option value="F"${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "F") : ssrLooseEqual(unref(form).gender, "F")) ? " selected" : ""}>Femenino</option><option value="O"${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "O") : ssrLooseEqual(unref(form).gender, "O")) ? " selected" : ""}>Otro</option></select></div></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Notas </label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Informaci\xF3n adicional sobre el cliente...">${ssrInterpolate(unref(form).notes)}</textarea></div><div class="flex items-center"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" id="is_active" class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"><label for="is_active" class="ml-2 block text-sm text-gray-900"> Cliente activo </label></div><div class="flex justify-end space-x-3 pt-4"><button type="button" class="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"> Cancelar </button><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">`);
      if (unref(loading)) {
        _push(`<span>Guardando...</span>`);
      } else {
        _push(`<span>${ssrInterpolate(__props.customer ? "Actualizar" : "Crear")}</span>`);
      }
      _push(`</button></div></form></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/customers/CustomerModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const customers = ref([]);
    const loading = ref(false);
    const searchQuery = ref("");
    const selectedStatus = ref("");
    const selectedCity = ref("");
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const showModal = ref(false);
    const showConfirmModal = ref(false);
    const selectedCustomer = ref(null);
    const customerToDelete = ref(null);
    const filteredCustomers = computed(() => {
      let filtered = customers.value;
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (customer) => customer.first_name.toLowerCase().includes(query) || customer.last_name.toLowerCase().includes(query) || customer.email.toLowerCase().includes(query) || customer.phone && customer.phone.toLowerCase().includes(query)
        );
      }
      if (selectedStatus.value !== "") {
        filtered = filtered.filter((customer) => customer.is_active.toString() === selectedStatus.value);
      }
      if (selectedCity.value) {
        filtered = filtered.filter((customer) => customer.city === selectedCity.value);
      }
      return filtered;
    });
    const totalCustomers = computed(() => filteredCustomers.value.length);
    const totalPages = computed(() => Math.ceil(totalCustomers.value / itemsPerPage.value));
    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
    const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalCustomers.value));
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
    const cities = computed(() => {
      const citySet = /* @__PURE__ */ new Set();
      customers.value.forEach((customer) => {
        if (customer.city) citySet.add(customer.city);
      });
      return Array.from(citySet).sort();
    });
    const customersSummary = computed(() => {
      const total = customers.value.length;
      const active = customers.value.filter((c) => c.is_active).length;
      const thirtyDaysAgo = /* @__PURE__ */ new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const newCustomers = customers.value.filter((c) => new Date(c.created_at) > thirtyDaysAgo).length;
      const withOrders = customers.value.filter((c) => (c.order_count || 0) > 0).length;
      return { total, active, newCustomers, withOrders };
    });
    const fetchCustomers = async () => {
      loading.value = true;
      try {
        const { data } = await $fetch("/api/customers");
        if (data.success) {
          customers.value = data.data;
        } else {
          console.error("Error en la respuesta de la API:", data.error);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        loading.value = false;
      }
    };
    const closeModal = () => {
      showModal.value = false;
      selectedCustomer.value = null;
    };
    const saveCustomer = async (customerData) => {
      try {
        if (selectedCustomer.value) {
          const { data } = await $fetch(`/api/customers/${selectedCustomer.value.id_customer}`, {
            method: "PUT",
            body: customerData
          });
          if (data.success) {
            console.log("Cliente actualizado exitosamente");
            await fetchCustomers();
            closeModal();
          } else {
            console.error("Error actualizando cliente:", data.error);
          }
        } else {
          const { data } = await $fetch("/api/customers", {
            method: "POST",
            body: customerData
          });
          if (data.success) {
            console.log("Cliente creado exitosamente");
            await fetchCustomers();
            closeModal();
          } else {
            console.error("Error creando cliente:", data.error);
          }
        }
      } catch (error) {
        console.error("Error saving customer:", error);
      }
    };
    const deleteCustomer = async () => {
      if (!customerToDelete.value) return;
      try {
        const { data } = await $fetch(`/api/customers/${customerToDelete.value.id_customer}`, {
          method: "DELETE"
        });
        if (data.success) {
          console.log("Cliente eliminado exitosamente");
          await fetchCustomers();
          showConfirmModal.value = false;
          customerToDelete.value = null;
        } else {
          console.error("Error eliminando cliente:", data.error);
        }
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      const _component_CustomerModal = _sfc_main$1;
      const _component_ConfirmModal = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-between items-center mb-6"><div><h1 class="text-2xl font-bold text-gray-900">Gesti\xF3n de Clientes</h1><p class="text-gray-600">Administra todos los clientes de tu tienda</p></div><div class="flex space-x-3"><button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:plus-circle",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`<span>Nuevo Cliente</span></button><button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:arrow-down-tray",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`<span>Exportar</span></button></div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"><div class="bg-white p-6 rounded-lg shadow-sm"><div class="flex items-center"><div class="flex-shrink-0"><div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:users",
        class: "w-5 h-5 text-blue-600"
      }, null, _parent));
      _push(`</div></div><div class="ml-4"><p class="text-sm font-medium text-gray-500">Total Clientes</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(customersSummary).total)}</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm"><div class="flex items-center"><div class="flex-shrink-0"><div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:check-circle",
        class: "w-5 h-5 text-green-600"
      }, null, _parent));
      _push(`</div></div><div class="ml-4"><p class="text-sm font-medium text-gray-500">Activos</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(customersSummary).active)}</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm"><div class="flex items-center"><div class="flex-shrink-0"><div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:clock",
        class: "w-5 h-5 text-yellow-600"
      }, null, _parent));
      _push(`</div></div><div class="ml-4"><p class="text-sm font-medium text-gray-500">Nuevos (30 d\xEDas)</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(customersSummary).newCustomers)}</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm"><div class="flex items-center"><div class="flex-shrink-0"><div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:shopping-bag",
        class: "w-5 h-5 text-purple-600"
      }, null, _parent));
      _push(`</div></div><div class="ml-4"><p class="text-sm font-medium text-gray-500">Con Pedidos</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(customersSummary).withOrders)}</p></div></div></div></div><div class="bg-white p-4 rounded-lg shadow-sm mb-6"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Buscar</label><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Nombre, email, tel\xE9fono..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Estado</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "") : ssrLooseEqual(unref(selectedStatus), "")) ? " selected" : ""}>Todos los estados</option><option value="true"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "true") : ssrLooseEqual(unref(selectedStatus), "true")) ? " selected" : ""}>Activo</option><option value="false"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "false") : ssrLooseEqual(unref(selectedStatus), "false")) ? " selected" : ""}>Inactivo</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Ciudad</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCity)) ? ssrLooseContain(unref(selectedCity), "") : ssrLooseEqual(unref(selectedCity), "")) ? " selected" : ""}>Todas las ciudades</option><!--[-->`);
      ssrRenderList(unref(cities), (city) => {
        _push(`<option${ssrRenderAttr("value", city)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCity)) ? ssrLooseContain(unref(selectedCity), city) : ssrLooseEqual(unref(selectedCity), city)) ? " selected" : ""}>${ssrInterpolate(city)}</option>`);
      });
      _push(`<!--]--></select></div><div class="flex items-end"><button class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"> Limpiar Filtros </button></div></div></div><div class="rounded-lg overflow-hidden border border-gray-200 dark:border-[var(--border-color)]"><div class="overflow-x-auto"><table class="min-w-full admin-table"><thead><tr><th>Cliente</th><th>Contacto</th><th>Ubicaci\xF3n</th><th>Estado</th><th>Pedidos</th><th>Acciones</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(filteredCustomers).slice(unref(startIndex), unref(endIndex)), (customer) => {
        var _a;
        _push(`<tr><td class="whitespace-nowrap"><div class="flex items-center"><div class="flex-shrink-0 h-10 w-10"><div class="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:user",
          class: "w-5 h-5 text-blue-600 dark:text-blue-300"
        }, null, _parent));
        _push(`</div></div><div class="ml-4"><div class="text-sm font-medium theme-text-primary">${ssrInterpolate(customer.first_name)} ${ssrInterpolate(customer.last_name)}</div><div class="text-sm theme-text-muted">${ssrInterpolate(customer.email)}</div></div></div></td><td class="whitespace-nowrap"><div class="text-sm theme-text-primary">${ssrInterpolate(customer.phone || "N/A")}</div><div class="text-sm theme-text-muted">${ssrInterpolate(((_a = customer.user) == null ? void 0 : _a.role) || "Cliente")}</div></td><td class="whitespace-nowrap"><div class="text-sm theme-text-primary">${ssrInterpolate(customer.city || "N/A")}</div><div class="text-sm theme-text-muted">${ssrInterpolate(customer.state || "N/A")}</div></td><td class="whitespace-nowrap"><span class="${ssrRenderClass([
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          customer.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        ])}">${ssrInterpolate(customer.is_active ? "Activo" : "Inactivo")}</span></td><td class="whitespace-nowrap text-sm theme-text-muted">${ssrInterpolate(customer.order_count || 0)} pedidos </td><td class="whitespace-nowrap text-sm font-medium"><div class="flex space-x-2"><button class="text-blue-600 hover:text-blue-900" title="Ver cliente">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:eye",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><button class="text-green-600 hover:text-green-900" title="Editar cliente">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:pencil",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><button class="${ssrRenderClass([
          "hover:text-gray-900",
          customer.is_active ? "text-orange-600" : "text-green-600"
        ])}"${ssrRenderAttr("title", customer.is_active ? "Desactivar" : "Activar")}>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: customer.is_active ? "heroicons:pause" : "heroicons:play",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><button class="text-red-600 hover:text-red-900" title="Eliminar cliente">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:trash",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
      if (unref(totalPages) > 1) {
        _push(`<div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"><div class="flex-1 flex justify-between sm:hidden"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> Anterior </button><button${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""} class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:cursor-not-allowed"> Siguiente </button></div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"><div><p class="text-sm text-gray-700"> Mostrando <span class="font-medium">${ssrInterpolate(unref(startIndex) + 1)}</span> a <span class="font-medium">${ssrInterpolate(unref(endIndex))}</span> de <span class="font-medium">${ssrInterpolate(unref(totalCustomers))}</span> resultados </p></div><div><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">`);
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
        _push(ssrRenderComponent(_component_CustomerModal, {
          customer: unref(selectedCustomer),
          onClose: closeModal,
          onSave: saveCustomer
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(showConfirmModal)) {
        _push(ssrRenderComponent(_component_ConfirmModal, {
          title: "Eliminar Cliente",
          message: "\xBFEst\xE1s seguro de que quieres eliminar este cliente? Esta acci\xF3n no se puede deshacer.",
          onConfirm: deleteCustomer,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/customers/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-AQOe5QuY.mjs.map
