import { u as useRouter, a as __nuxt_component_0 } from './server.mjs';
import { ref, mergeProps, unref, withCtx, createBlock, createVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useAuth, a as useSupabaseClient } from './useAuth-DSEa5iIv.mjs';
import { u as useTheme } from './useTheme-D-CPSc8o.mjs';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(false);
    const error = ref("");
    const email = ref("");
    const password = ref("");
    useAuth();
    useSupabaseClient();
    useRouter();
    const { isDark } = useTheme();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["min-h-screen theme-login-bg relative overflow-hidden", { "dark-theme": unref(isDark) }]
      }, _attrs))} data-v-918ee837><div class="absolute inset-0 overflow-hidden" data-v-918ee837><div class="login-blob login-blob-1 absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" data-v-918ee837></div><div class="login-blob login-blob-2 absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" data-v-918ee837></div><div class="login-blob login-blob-3 absolute top-40 left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" data-v-918ee837></div></div><div class="relative z-10 min-h-screen flex items-center justify-center p-4" data-v-918ee837><div class="w-full max-w-md" data-v-918ee837><div class="mb-6 flex justify-start" data-v-918ee837>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "back-to-home-btn group inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" data-v-918ee837${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-918ee837${_scopeId}></path></svg><span class="font-medium text-sm" data-v-918ee837${_scopeId}>Volver al Inicio</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                "stroke-width": "2"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                })
              ])),
              createVNode("span", { class: "font-medium text-sm" }, "Volver al Inicio")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="theme-login-card backdrop-blur-xl rounded-2xl shadow-2xl theme-login-border p-8" data-v-918ee837><div class="text-center mb-8" data-v-918ee837><div class="login-card-icon inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent to-accent-secondary rounded-full mb-6 shadow-lg" data-v-918ee837><svg class="w-8 h-8 text-white login-card-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-918ee837><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-918ee837></path></svg></div><h1 class="text-3xl font-bold theme-login-text mb-2" data-v-918ee837>Iniciar Sesi\xF3n</h1><p class="theme-login-text-secondary" data-v-918ee837>Accede a tu cuenta de administrador</p></div><form class="space-y-6" data-v-918ee837><div class="space-y-2" data-v-918ee837><label for="email" class="block text-sm font-medium theme-login-label" data-v-918ee837> Correo Electr\xF3nico </label><div class="relative" data-v-918ee837><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-v-918ee837><svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-918ee837><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" data-v-918ee837></path></svg></div><input id="email"${ssrRenderAttr("value", unref(email))} type="email" required class="w-full pl-10 pr-4 py-3 theme-login-input border theme-login-border rounded-xl theme-login-text placeholder-theme-login-placeholder focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 backdrop-blur-sm" placeholder="admin@ejemplo.com"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-v-918ee837></div></div><div class="space-y-2" data-v-918ee837><label for="password" class="block text-sm font-medium theme-login-label" data-v-918ee837> Contrase\xF1a </label><div class="relative" data-v-918ee837><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-v-918ee837><svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-918ee837><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-918ee837></path></svg></div><input id="password"${ssrRenderAttr("value", unref(password))} type="password" required class="w-full pl-10 pr-4 py-3 theme-login-input border theme-login-border rounded-xl theme-login-text placeholder-theme-login-placeholder focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 backdrop-blur-sm" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} data-v-918ee837></div></div>`);
      if (unref(error)) {
        _push(`<div class="bg-red-500/20 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm" data-v-918ee837><div class="flex items-center" data-v-918ee837><svg class="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-918ee837><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-918ee837></path></svg><p class="text-red-300 text-sm" data-v-918ee837>${ssrInterpolate(unref(error))}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="login-submit-btn group relative w-full bg-gradient-to-r from-accent to-accent-secondary text-white py-3 px-4 rounded-xl font-semibold hover:from-accent-hover hover:to-accent-secondary focus:outline-none focus:ring-4 focus:ring-accent/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl" data-v-918ee837>`);
      if (unref(loading)) {
        _push(`<span class="flex items-center justify-center" data-v-918ee837><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns=" http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-918ee837><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-918ee837></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-918ee837></path></svg> Iniciando sesi\xF3n... </span>`);
      } else {
        _push(`<span class="flex items-center justify-center" data-v-918ee837><svg class="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-918ee837><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" data-v-918ee837></path></svg> Iniciar Sesi\xF3n </span>`);
      }
      _push(`</button><div class="flex items-center gap-4 my-4" data-v-918ee837><div class="h-px flex-1 bg-white/20" data-v-918ee837></div><span class="text-xs text-white/60" data-v-918ee837>o</span><div class="h-px flex-1 bg-white/20" data-v-918ee837></div></div><button type="button"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="w-full bg-white text-gray-900 py-3 px-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3 border border-gray-200 shadow-sm hover:shadow-md" data-v-918ee837><img alt="Google" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="w-5 h-5" data-v-918ee837><span class="text-gray-900 font-medium" data-v-918ee837>Continuar con Google</span></button></form><div class="mt-8 text-center" data-v-918ee837><div class="flex items-center justify-center space-x-2 text-gray-400" data-v-918ee837><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-918ee837><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-918ee837></path></svg><p class="text-sm" data-v-918ee837>Acceso exclusivo para administradores</p></div></div></div></div></div><div class="absolute top-20 left-10 w-2 h-2 login-dot login-dot-1 rounded-full animate-ping" data-v-918ee837></div><div class="absolute top-40 right-20 w-3 h-3 login-dot login-dot-2 rounded-full animate-ping animation-delay-1000" data-v-918ee837></div><div class="absolute bottom-20 left-20 w-2 h-2 login-dot login-dot-3 rounded-full animate-ping animation-delay-2000" data-v-918ee837></div><div class="fixed bottom-6 right-6 z-50" data-v-918ee837><button class="back-to-home-btn group inline-flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-xl"${ssrRenderAttr("title", unref(isDark) ? "Cambiar a tema claro" : "Cambiar a tema oscuro")} data-v-918ee837>`);
      if (unref(isDark)) {
        _push(`<svg class="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" data-v-918ee837><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" data-v-918ee837></path></svg>`);
      } else {
        _push(`<svg class="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" data-v-918ee837><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" data-v-918ee837></path></svg>`);
      }
      _push(`</button></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-918ee837"]]);

export { login as default };
//# sourceMappingURL=login-ehVLEMLf.mjs.map
