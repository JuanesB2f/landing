import { _ as __nuxt_component_1$1 } from './server.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const _sfc_main = {
  __name: "unauthorized",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center p-4" }, _attrs))} data-v-08354675><div class="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center" data-v-08354675><div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6" data-v-08354675>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:shield-exclamation",
        class: "h-8 w-8 text-red-600"
      }, null, _parent));
      _push(`</div><h1 class="text-2xl font-bold text-gray-900 mb-4" data-v-08354675>Acceso Denegado</h1><p class="text-gray-600 mb-6" data-v-08354675> No tienes permisos para acceder a esta p\xE1gina. Solo los administradores pueden acceder al panel de administraci\xF3n. </p><div class="space-y-3" data-v-08354675><button class="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors" data-v-08354675> Ir al Inicio </button><button class="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors" data-v-08354675> Iniciar Sesi\xF3n </button></div><div class="mt-6 p-4 bg-gray-50 rounded-lg" data-v-08354675><p class="text-sm text-gray-500" data-v-08354675> Si crees que esto es un error, contacta al administrador del sistema. </p></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/unauthorized.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const unauthorized = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-08354675"]]);

export { unauthorized as default };
//# sourceMappingURL=unauthorized-CuEcc8ae.mjs.map
