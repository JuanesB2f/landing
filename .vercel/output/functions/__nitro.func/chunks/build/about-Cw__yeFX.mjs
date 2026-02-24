import { _ as __nuxt_component_1$1 } from './server.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-6 sm:py-8" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-8 sm:mb-12"><h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2">Sobre Nosotros</h1><p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2"> BylotoStore es tu destino preferido para productos de belleza y moda femenina. Nos dedicamos a ofrecer productos de alta calidad con un servicio excepcional. </p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12"><div class="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"><div class="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:heart",
        class: "w-6 h-6 sm:w-8 sm:h-8 text-pink-600"
      }, null, _parent));
      _push(`</div><h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Nuestra Misi\xF3n</h3><p class="text-sm sm:text-base text-gray-600 dark:text-gray-300"> Empoderar a las mujeres a trav\xE9s de productos de belleza y moda de alta calidad, ofreciendo una experiencia de compra \xFAnica y personalizada. </p></div><div class="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"><div class="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:eye",
        class: "w-6 h-6 sm:w-8 sm:h-8 text-purple-600"
      }, null, _parent));
      _push(`</div><h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Nuestra Visi\xF3n</h3><p class="text-sm sm:text-base text-gray-600 dark:text-gray-300"> Ser la tienda l\xEDder en belleza y moda femenina, reconocida por la calidad de nuestros productos y la excelencia en el servicio al cliente. </p></div></div><div class="mb-8 sm:mb-12"><h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6 sm:mb-8 px-2">Nuestros Valores</h2><div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"><div class="text-center p-4"><div class="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:star",
        class: "w-6 h-6 sm:w-8 sm:h-8 text-pink-600"
      }, null, _parent));
      _push(`</div><h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Calidad</h3><p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">Solo ofrecemos productos de la m\xE1s alta calidad</p></div><div class="text-center p-4"><div class="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:shield-check",
        class: "w-6 h-6 sm:w-8 sm:h-8 text-purple-600"
      }, null, _parent));
      _push(`</div><h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Confianza</h3><p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">Construimos relaciones duraderas con nuestros clientes</p></div><div class="text-center p-4"><div class="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:sparkles",
        class: "w-6 h-6 sm:w-8 sm:h-8 text-pink-600"
      }, null, _parent));
      _push(`</div><h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Innovaci\xF3n</h3><p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">Siempre buscamos las \xFAltimas tendencias y productos</p></div></div></div><div class="mb-8 sm:mb-12"><h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6 sm:mb-8 px-2">Nuestro Equipo</h2><div class="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"><div class="text-center p-4"><div class="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:user",
        class: "w-12 h-12 sm:w-16 sm:h-16 text-pink-500"
      }, null, _parent));
      _push(`</div><h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Mar\xEDa Garc\xEDa</h3><p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2">CEO &amp; Fundadora</p><p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">M\xE1s de 10 a\xF1os de experiencia en el sector de la belleza</p></div><div class="text-center p-4"><div class="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:user",
        class: "w-12 h-12 sm:w-16 sm:h-16 text-purple-500"
      }, null, _parent));
      _push(`</div><h3 class="text-lg font-semibold text-gray-900 mb-2">Ana Rodr\xEDguez</h3><p class="text-gray-600 mb-2">Directora de Compras</p><p class="text-sm text-gray-500">Especialista en selecci\xF3n de productos de calidad</p></div><div class="text-center"><div class="w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:user",
        class: "w-16 h-16 text-pink-500"
      }, null, _parent));
      _push(`</div><h3 class="text-lg font-semibold text-gray-900 mb-2">Laura Mart\xEDnez</h3><p class="text-gray-600 mb-2">Directora de Atenci\xF3n al Cliente</p><p class="text-sm text-gray-500">Comprometida con la satisfacci\xF3n del cliente</p></div></div></div><div class="bg-white p-8 rounded-lg shadow-sm"><h2 class="text-3xl font-bold text-center text-gray-900 mb-8">Cont\xE1ctanos</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-8"><div><h3 class="text-lg font-semibold text-gray-900 mb-4">Informaci\xF3n de Contacto</h3><div class="space-y-3"><div class="flex items-center space-x-3">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:envelope",
        class: "w-5 h-5 text-pink-600"
      }, null, _parent));
      _push(`<span class="text-gray-600">info@beautystore.com</span></div><div class="flex items-center space-x-3">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:phone",
        class: "w-5 h-5 text-pink-600"
      }, null, _parent));
      _push(`<span class="text-gray-600">+1 (555) 123-4567</span></div><div class="flex items-center space-x-3">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:map-pin",
        class: "w-5 h-5 text-pink-600"
      }, null, _parent));
      _push(`<span class="text-gray-600">123 Beauty Street, Fashion City</span></div></div></div><div><h3 class="text-lg font-semibold text-gray-900 mb-4">Horarios de Atenci\xF3n</h3><div class="space-y-2 text-gray-600"><p>Lunes - Viernes: 9:00 AM - 8:00 PM</p><p>S\xE1bados: 10:00 AM - 6:00 PM</p><p>Domingos: 12:00 PM - 5:00 PM</p></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-Cw__yeFX.mjs.map
