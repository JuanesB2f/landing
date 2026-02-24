import { _ as __nuxt_component_1$1 } from './server.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "UserDeleteModal",
  __ssrInlineRender: true,
  props: {
    user: {}
  },
  emits: ["close", "confirm"],
  setup(__props, { emit: __emit }) {
    const loading = ref(false);
    const confirmText = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" }, _attrs))}><div class="bg-white rounded-lg w-full max-w-md p-6 space-y-4"><div class="flex items-center justify-between"><h3 class="text-lg font-semibold">Eliminar usuario</h3><button class="p-2 rounded hover:bg-gray-100">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:x-mark",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button></div><div class="space-y-3 text-sm text-gray-600"><p> Vas a eliminar al usuario <span class="font-semibold">${ssrInterpolate((_a = _ctx.user) == null ? void 0 : _a.first_name)} ${ssrInterpolate((_b = _ctx.user) == null ? void 0 : _b.last_name)}</span>`);
      if ((_c = _ctx.user) == null ? void 0 : _c.email) {
        _push(`<span class="text-gray-500">(${ssrInterpolate(_ctx.user.email)})</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`. </p><p>Esta acci\xF3n es permanente y no se puede deshacer.</p><div class="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded p-3"> Si el usuario tiene pedidos asociados, no se permitir\xE1 la eliminaci\xF3n. </div></div><div class="space-y-2"><label class="block text-sm text-gray-700">Escribe ELIMINAR para confirmar</label><input${ssrRenderAttr("value", confirmText.value)} type="text" class="w-full px-3 py-2 border rounded" placeholder="ELIMINAR"></div><div class="flex justify-end gap-2 pt-2"><button class="px-4 py-2 border rounded">Cancelar</button><button${ssrIncludeBooleanAttr(confirmText.value !== "ELIMINAR" || loading.value) ? " disabled" : ""} class="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50">Eliminar</button></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/profiles/UserDeleteModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "UserModal",
  __ssrInlineRender: true,
  props: {
    user: {
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
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      birth_date: "",
      gender: "",
      role: "",
      is_active: true,
      notes: ""
    });
    const loading = ref(false);
    watch(() => props.user, (newUser) => {
      if (newUser) {
        form.value = {
          first_name: newUser.first_name || "",
          last_name: newUser.last_name || "",
          email: newUser.email || "",
          password: "",
          confirmPassword: "",
          phone: newUser.phone || "",
          address: newUser.address || "",
          city: newUser.city || "",
          state: newUser.state || "",
          postal_code: newUser.postal_code || "",
          country: newUser.country || "",
          birth_date: newUser.birth_date ? newUser.birth_date.split("T")[0] : "",
          gender: newUser.gender || "",
          role: newUser.role || "",
          is_active: newUser.is_active !== void 0 ? newUser.is_active : true,
          notes: newUser.notes || ""
        };
      } else {
        form.value = {
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          postal_code: "",
          country: "",
          birth_date: "",
          gender: "",
          role: "",
          is_active: true,
          notes: ""
        };
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" }, _attrs))}><div class="relative top-10 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white"><div class="mt-3"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-medium text-gray-900">${ssrInterpolate(__props.user ? "Editar Usuario" : "Nuevo Usuario")}</h3><button class="text-gray-400 hover:text-gray-600">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:x-mark",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</button></div><form class="space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Nombre <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", unref(form).first_name)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Nombre"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Apellido <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", unref(form).last_name)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Apellido"></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Email <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", unref(form).email)} type="email" required${ssrIncludeBooleanAttr(!!__props.user) ? " disabled" : ""} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100" placeholder="email@ejemplo.com">`);
      if (__props.user) {
        _push(`<p class="text-xs text-gray-500 mt-1"> El email no se puede cambiar una vez creado el usuario </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Tel\xE9fono </label><input${ssrRenderAttr("value", unref(form).phone)} type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="+52 55 1234 5678"></div></div>`);
      if (!__props.user) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Contrase\xF1a <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", unref(form).password)} type="password" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Contrase\xF1a" minlength="6"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Confirmar Contrase\xF1a <span class="text-red-500">*</span></label><input${ssrRenderAttr("value", unref(form).confirmPassword)} type="password" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Confirmar contrase\xF1a" minlength="6"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Calle y N\xFAmero </label><input${ssrRenderAttr("value", unref(form).address)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Av. Insurgentes 123"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Ciudad </label><input${ssrRenderAttr("value", unref(form).city)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Ciudad de M\xE9xico"></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Estado/Provincia </label><input${ssrRenderAttr("value", unref(form).state)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="CDMX"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> C\xF3digo Postal </label><input${ssrRenderAttr("value", unref(form).postal_code)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="12345"></div></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Pa\xEDs </label><input${ssrRenderAttr("value", unref(form).country)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="M\xE9xico"></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Fecha de Nacimiento </label><input${ssrRenderAttr("value", unref(form).birth_date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> G\xE9nero </label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "") : ssrLooseEqual(unref(form).gender, "")) ? " selected" : ""}>Seleccionar</option><option value="M"${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "M") : ssrLooseEqual(unref(form).gender, "M")) ? " selected" : ""}>Masculino</option><option value="F"${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "F") : ssrLooseEqual(unref(form).gender, "F")) ? " selected" : ""}>Femenino</option><option value="O"${ssrIncludeBooleanAttr(Array.isArray(unref(form).gender) ? ssrLooseContain(unref(form).gender, "O") : ssrLooseEqual(unref(form).gender, "O")) ? " selected" : ""}>Otro</option></select></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Rol <span class="text-red-500">*</span></label><select required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).role) ? ssrLooseContain(unref(form).role, "") : ssrLooseEqual(unref(form).role, "")) ? " selected" : ""}>Seleccionar rol</option><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(unref(form).role) ? ssrLooseContain(unref(form).role, "admin") : ssrLooseEqual(unref(form).role, "admin")) ? " selected" : ""}>Administrador</option><option value="user"${ssrIncludeBooleanAttr(Array.isArray(unref(form).role) ? ssrLooseContain(unref(form).role, "user") : ssrLooseEqual(unref(form).role, "user")) ? " selected" : ""}>Usuario</option><option value="customer"${ssrIncludeBooleanAttr(Array.isArray(unref(form).role) ? ssrLooseContain(unref(form).role, "customer") : ssrLooseEqual(unref(form).role, "customer")) ? " selected" : ""}>Cliente</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Estado </label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option${ssrRenderAttr("value", true)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, true) : ssrLooseEqual(unref(form).is_active, true)) ? " selected" : ""}>Activo</option><option${ssrRenderAttr("value", false)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, false) : ssrLooseEqual(unref(form).is_active, false)) ? " selected" : ""}>Inactivo</option></select></div></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Notas </label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Informaci\xF3n adicional sobre el usuario...">${ssrInterpolate(unref(form).notes)}</textarea></div><div class="flex justify-end space-x-3 pt-4"><button type="button" class="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"> Cancelar </button><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">`);
      if (unref(loading)) {
        _push(`<span>Guardando...</span>`);
      } else {
        _push(`<span>${ssrInterpolate(__props.user ? "Actualizar" : "Crear")}</span>`);
      }
      _push(`</button></div></form></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/profiles/UserModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const UserDeleteModal = _sfc_main$2;
    const users = ref([]);
    const loading = ref(false);
    const searchQuery = ref("");
    const selectedRole = ref("");
    const selectedStatus = ref("");
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const showModal = ref(false);
    const showConfirmModal = ref(false);
    const selectedUser = ref(null);
    const userToDelete = ref(null);
    const filteredUsers = computed(() => {
      let filtered = users.value;
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (user) => user.full_name && user.full_name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query) || user.role.toLowerCase().includes(query)
        );
      }
      if (selectedRole.value) {
        filtered = filtered.filter((user) => user.role === selectedRole.value);
      }
      if (selectedStatus.value !== "") {
        filtered = filtered.filter((user) => user.is_active.toString() === selectedStatus.value);
      }
      return filtered;
    });
    const totalUsers = computed(() => filteredUsers.value.length);
    const totalPages = computed(() => Math.ceil(totalUsers.value / itemsPerPage.value));
    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
    const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalUsers.value));
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
    const usersSummary = computed(() => {
      const total = users.value.length;
      const admins = users.value.filter((u) => u.role === "admin").length;
      const active = users.value.filter((u) => u.is_active).length;
      const thirtyDaysAgo = /* @__PURE__ */ new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const newUsers = users.value.filter((u) => new Date(u.created_at) > thirtyDaysAgo).length;
      return { total, admins, active, newUsers };
    });
    const fetchUsers = async () => {
      loading.value = true;
      try {
        const { data } = await $fetch("/api/profiles");
        if (data.success) {
          users.value = data.data;
        } else {
          console.error("Error en la respuesta de la API:", data.error);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        loading.value = false;
      }
    };
    const closeModal = () => {
      showModal.value = false;
      selectedUser.value = null;
    };
    const saveUser = async (userData) => {
      try {
        if (selectedUser.value) {
          const { data } = await $fetch(`/api/profiles/${selectedUser.value.id}`, {
            method: "PUT",
            body: userData
          });
          if (data.success) {
            console.log("Usuario actualizado exitosamente");
            await fetchUsers();
            closeModal();
          } else {
            console.error("Error actualizando usuario:", data.error);
          }
        } else {
          const { data } = await $fetch("/api/profiles", {
            method: "POST",
            body: userData
          });
          if (data.success) {
            console.log("Usuario creado exitosamente");
            await fetchUsers();
            closeModal();
          } else {
            console.error("Error creando usuario:", data.error);
          }
        }
      } catch (error) {
        console.error("Error saving user:", error);
      }
    };
    const deleteUser = async () => {
      var _a, _b;
      if (!userToDelete.value) return;
      try {
        const res = await $fetch(`/api/profiles/${userToDelete.value.id}`, { method: "DELETE" });
        if ((_a = res == null ? void 0 : res.data) == null ? void 0 : _a.success) {
          console.log("Usuario eliminado exitosamente");
          await fetchUsers();
          showConfirmModal.value = false;
          userToDelete.value = null;
        } else {
          console.error("Error eliminando usuario:", ((_b = res == null ? void 0 : res.data) == null ? void 0 : _b.error) || "Respuesta inv\xE1lida");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };
    const getRoleClass = (role) => {
      switch (role) {
        case "admin":
          return "bg-purple-100 text-purple-800";
        case "user":
          return "bg-blue-100 text-blue-800";
        case "customer":
          return "bg-green-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };
    const getRoleText = (role) => {
      switch (role) {
        case "admin":
          return "Administrador";
        case "user":
          return "Usuario";
        case "customer":
          return "Cliente";
        default:
          return role;
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
      const _component_UserModal = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-between items-center mb-6"><div><h1 class="text-2xl font-bold text-gray-900">Gesti\xF3n de Usuarios</h1><p class="text-gray-600">Administra todos los usuarios del sistema</p></div><div class="flex space-x-3"><button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:plus-circle",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`<span>Nuevo Usuario</span></button><button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:arrow-down-tray",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`<span>Exportar</span></button></div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"><div class="bg-white p-6 rounded-lg shadow-sm"><div class="flex items-center"><div class="flex-shrink-0"><div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:users",
        class: "w-5 h-5 text-blue-600"
      }, null, _parent));
      _push(`</div></div><div class="ml-4"><p class="text-sm font-medium text-gray-500">Total Usuarios</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(usersSummary).total)}</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm"><div class="flex items-center"><div class="flex-shrink-0"><div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:shield-check",
        class: "w-5 h-5 text-purple-600"
      }, null, _parent));
      _push(`</div></div><div class="ml-4"><p class="text-sm font-medium text-gray-500">Administradores</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(usersSummary).admins)}</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm"><div class="flex items-center"><div class="flex-shrink-0"><div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:check-circle",
        class: "w-5 h-5 text-green-600"
      }, null, _parent));
      _push(`</div></div><div class="ml-4"><p class="text-sm font-medium text-gray-500">Activos</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(usersSummary).active)}</p></div></div></div><div class="bg-white p-6 rounded-lg shadow-sm"><div class="flex items-center"><div class="flex-shrink-0"><div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:clock",
        class: "w-5 h-5 text-yellow-600"
      }, null, _parent));
      _push(`</div></div><div class="ml-4"><p class="text-sm font-medium text-gray-500">Nuevos (30 d\xEDas)</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(usersSummary).new)}</p></div></div></div></div><div class="bg-white p-4 rounded-lg shadow-sm mb-6"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Buscar</label><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Nombre, email, rol..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Rol</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedRole)) ? ssrLooseContain(unref(selectedRole), "") : ssrLooseEqual(unref(selectedRole), "")) ? " selected" : ""}>Todos los roles</option><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedRole)) ? ssrLooseContain(unref(selectedRole), "admin") : ssrLooseEqual(unref(selectedRole), "admin")) ? " selected" : ""}>Administrador</option><option value="user"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedRole)) ? ssrLooseContain(unref(selectedRole), "user") : ssrLooseEqual(unref(selectedRole), "user")) ? " selected" : ""}>Usuario</option><option value="customer"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedRole)) ? ssrLooseContain(unref(selectedRole), "customer") : ssrLooseEqual(unref(selectedRole), "customer")) ? " selected" : ""}>Cliente</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Estado</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "") : ssrLooseEqual(unref(selectedStatus), "")) ? " selected" : ""}>Todos los estados</option><option value="true"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "true") : ssrLooseEqual(unref(selectedStatus), "true")) ? " selected" : ""}>Activo</option><option value="false"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "false") : ssrLooseEqual(unref(selectedStatus), "false")) ? " selected" : ""}>Inactivo</option></select></div><div class="flex items-end"><button class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"> Limpiar Filtros </button></div></div></div><div class="rounded-lg overflow-hidden border border-gray-200 dark:border-[var(--border-color)]"><div class="overflow-x-auto"><table class="min-w-full admin-table"><thead><tr><th>Usuario</th><th>Informaci\xF3n</th><th>Rol</th><th>Estado</th><th>\xDAltimo Acceso</th><th>Acciones</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(filteredUsers).slice(unref(startIndex), unref(endIndex)), (user) => {
        _push(`<tr><td class="whitespace-nowrap"><div class="flex items-center"><div class="flex-shrink-0 h-10 w-10"><div class="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:user",
          class: "w-5 h-5 text-blue-600 dark:text-blue-300"
        }, null, _parent));
        _push(`</div></div><div class="ml-4"><div class="text-sm font-medium theme-text-primary">${ssrInterpolate(user.full_name || user.email)}</div><div class="text-sm theme-text-muted">${ssrInterpolate(user.email)}</div></div></div></td><td class="whitespace-nowrap"><div class="text-sm theme-text-primary">${ssrInterpolate(user.phone || "N/A")}</div><div class="text-sm theme-text-muted">${ssrInterpolate(user.city || "N/A")}</div></td><td class="whitespace-nowrap"><span class="${ssrRenderClass([
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          getRoleClass(user.role)
        ])}">${ssrInterpolate(getRoleText(user.role))}</span></td><td class="px-6 py-4 whitespace-nowrap"><span class="${ssrRenderClass([
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          user.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        ])}">${ssrInterpolate(user.is_active ? "Activo" : "Inactivo")}</span></td><td class="whitespace-nowrap text-sm theme-text-muted">${ssrInterpolate(formatDate(user.last_sign_in_at))}</td><td class="whitespace-nowrap text-sm font-medium"><div class="flex space-x-2"><button class="text-blue-600 hover:text-blue-900" title="Ver usuario">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:eye",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><button class="text-green-600 hover:text-green-900" title="Editar usuario">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:pencil",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><button class="${ssrRenderClass([
          "hover:text-gray-900",
          user.is_active ? "text-orange-600" : "text-green-600"
        ])}"${ssrRenderAttr("title", user.is_active ? "Desactivar" : "Activar")}>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: user.is_active ? "heroicons:pause" : "heroicons:play",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><button class="text-red-600 hover:text-red-900" title="Eliminar usuario">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:trash",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
      if (unref(totalPages) > 1) {
        _push(`<div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"><div class="flex-1 flex justify-between sm:hidden"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> Anterior </button><button${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""} class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> Siguiente </button></div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"><div><p class="text-sm text-gray-700"> Mostrando <span class="font-medium">${ssrInterpolate(unref(startIndex) + 1)}</span> a <span class="font-medium">${ssrInterpolate(unref(endIndex))}</span> de <span class="font-medium">${ssrInterpolate(unref(totalUsers))}</span> resultados </p></div><div><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">`);
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
        _push(ssrRenderComponent(_component_UserModal, {
          user: unref(selectedUser),
          onClose: closeModal,
          onSave: saveUser
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(showConfirmModal)) {
        _push(ssrRenderComponent(unref(UserDeleteModal), {
          user: unref(userToDelete),
          onConfirm: deleteUser,
          onClose: ($event) => showConfirmModal.value = false
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/profiles/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B77ONW5v.mjs.map
