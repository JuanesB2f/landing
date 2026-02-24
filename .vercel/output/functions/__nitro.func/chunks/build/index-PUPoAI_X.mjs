import { _ as __nuxt_component_1$1, a as __nuxt_component_0 } from './server.mjs';
import { useSSRContext, ref, mergeProps, withCtx, createVNode, createTextVNode, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useCurrency } from './useCurrency-BsXMBrUs.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { formatCOP } = useCurrency();
    const features = [
      {
        icon: "heroicons:truck",
        title: "Env\xEDo Gratis",
        description: "Env\xEDo gratuito en compras superiores a $100.000. Recibe tus productos en la comodidad de tu hogar."
      },
      {
        icon: "heroicons:shield-check",
        title: "Compra Segura",
        description: "Protegemos tus datos con tecnolog\xEDa de encriptaci\xF3n avanzada. Tu seguridad es nuestra prioridad."
      },
      {
        icon: "heroicons:arrow-path",
        title: "Devoluciones F\xE1ciles",
        description: "30 d\xEDas para devolver o cambiar cualquier producto. Proceso simple y sin complicaciones."
      },
      {
        icon: "heroicons:heart",
        title: "Productos Premium",
        description: "Seleccionamos cuidadosamente cada producto para garantizar la mejor calidad y elegancia."
      }
    ];
    const activeOffers = ref([]);
    ref({
      offers: false
    });
    const calculateDiscountedPrice = (price, discountPercent) => {
      return price * (1 - discountPercent / 100);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen theme-login-bg" }, _attrs))} data-v-c7f25654><section class="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden px-4" data-v-c7f25654><div class="absolute inset-0 overflow-hidden" data-v-c7f25654><div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" data-v-c7f25654></div><div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" data-v-c7f25654></div><div class="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" data-v-c7f25654></div></div><div class="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center" data-v-c7f25654><div class="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-accent-soft dark:bg-gradient-to-r dark:from-accent/30 dark:to-accent-secondary/30 rounded-full mb-4 sm:mb-8 animate-fade-in-up" data-v-c7f25654>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:sparkles",
        class: "w-4 h-4 sm:w-5 sm:h-5 text-accent"
      }, null, _parent));
      _push(`<span class="text-xs sm:text-sm font-semibold text-accent" data-v-c7f25654>Nueva Colecci\xF3n 2024</span></div><h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight animate-fade-in-up animation-delay-200" data-v-c7f25654><span class="block text-gray-900 dark:text-gray-100 mb-1 sm:mb-2" data-v-c7f25654>Bienvenida a</span><span class="hero-byloto-text block bg-gradient-to-r from-accent via-accent-secondary to-accent bg-clip-text text-transparent bg-300% animate-gradient dark:bg-none dark:bg-transparent dark:bg-clip-border dark:text-[#F4E1E0]" data-v-c7f25654> BylotoStore </span></h1><p class="text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 font-light leading-relaxed animate-fade-in-up animation-delay-400 px-1" data-v-c7f25654> Descubre la elegancia y el estilo en cada detalle.<br class="hidden sm:block" data-v-c7f25654><span class="sm:inline block" data-v-c7f25654>Tu destino exclusivo de <span class="font-semibold text-accent" data-v-c7f25654>moda y belleza</span>.</span></p><div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 animate-fade-in-up animation-delay-600 w-full max-w-md sm:max-w-none mx-auto" data-v-c7f25654>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/shop",
        class: "hero-cta-primary group relative px-8 py-4 bg-black dark:bg-black text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden hover:bg-gray-800 dark:hover:bg-gray-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="relative z-10 flex items-center gap-2" data-v-c7f25654${_scopeId}> Explorar Colecci\xF3n `);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:arrow-right",
              class: "w-5 h-5 group-hover:translate-x-1 transition-transform"
            }, null, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", { class: "relative z-10 flex items-center gap-2" }, [
                createTextVNode(" Explorar Colecci\xF3n "),
                createVNode(_component_Icon, {
                  name: "heroicons:arrow-right",
                  class: "w-5 h-5 group-hover:translate-x-1 transition-transform"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/shop?sort=price_asc",
        class: "btn-accent-strong-outline transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Ver Ofertas `);
          } else {
            return [
              createTextVNode(" Ver Ofertas ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-800" data-v-c7f25654><div class="text-center" data-v-c7f25654><div class="text-2xl sm:text-3xl font-bold text-accent mb-0.5 sm:mb-1" data-v-c7f25654>100%</div><div class="text-xs sm:text-sm text-gray-600 dark:text-gray-300" data-v-c7f25654>Productos Originales</div></div><div class="text-center" data-v-c7f25654><div class="text-2xl sm:text-3xl font-bold text-accent mb-0.5 sm:mb-1" data-v-c7f25654>24/7</div><div class="text-xs sm:text-sm text-gray-600 dark:text-gray-300" data-v-c7f25654>Atenci\xF3n al Cliente</div></div><div class="text-center" data-v-c7f25654><div class="text-2xl sm:text-3xl font-bold text-accent mb-0.5 sm:mb-1" data-v-c7f25654>\u2713</div><div class="text-xs sm:text-sm text-gray-600 dark:text-gray-300" data-v-c7f25654>Env\xEDo Gratis</div></div><div class="text-center" data-v-c7f25654><div class="text-2xl sm:text-3xl font-bold text-accent mb-0.5 sm:mb-1" data-v-c7f25654>\u2605</div><div class="text-xs sm:text-sm text-gray-600 dark:text-gray-300" data-v-c7f25654>Calidad Premium</div></div></div></div><div class="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block" data-v-c7f25654>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:chevron-down",
        class: "w-6 h-6 text-gray-400 dark:text-gray-500"
      }, null, _parent));
      _push(`</div></section><section class="features-section py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50" data-v-c7f25654><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-c7f25654><div class="text-center mb-10 sm:mb-16" data-v-c7f25654><h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 px-2" data-v-c7f25654> \xBFPor qu\xE9 elegir <span class="text-accent" data-v-c7f25654>BylotoStore</span>? </h2><p class="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto px-2" data-v-c7f25654> Ofrecemos una experiencia de compra \xFAnica con los mejores productos y servicios </p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" data-v-c7f25654><!--[-->`);
      ssrRenderList(features, (feature, index2) => {
        _push(`<div class="group p-5 sm:p-6 lg:p-8 bg-white dark:bg-bg-card rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-border-color" data-v-c7f25654><div class="feature-icon-box w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-md" data-v-c7f25654>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: feature.icon,
          class: "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white"
        }, null, _parent));
        _push(`</div><h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3" data-v-c7f25654>${ssrInterpolate(feature.title)}</h3><p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed" data-v-c7f25654>${ssrInterpolate(feature.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></section>`);
      if (unref(activeOffers).length > 0) {
        _push(`<section data-section="offers" class="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-accent-soft/50 via-white to-accent-secondary/30 dark:from-bg-secondary dark:via-bg-primary dark:to-bg-secondary" data-v-c7f25654><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-c7f25654><div class="text-center mb-10 sm:mb-16" data-v-c7f25654><div class="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-accent to-accent-secondary text-white rounded-full mb-3 sm:mb-4" data-v-c7f25654>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:sparkles",
          class: "w-4 h-4 sm:w-5 sm:h-5"
        }, null, _parent));
        _push(`<span class="text-sm sm:text-base font-semibold" data-v-c7f25654>Ofertas Especiales</span></div><h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 px-2" data-v-c7f25654> Aprovecha Nuestras <span class="text-accent" data-v-c7f25654>Promociones</span></h2><p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2" data-v-c7f25654> Descuentos exclusivos en productos seleccionados </p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8" data-v-c7f25654><!--[-->`);
        ssrRenderList(unref(activeOffers).slice(0, 3), (offer) => {
          _push(`<div class="group relative bg-white dark:bg-bg-card rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-accent/30 dark:border-border-color" data-v-c7f25654><div class="absolute top-4 right-4 z-10" data-v-c7f25654><div class="bg-gradient-to-r from-accent to-accent-secondary text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg" data-v-c7f25654> -${ssrInterpolate(offer.discount_percent)}% </div></div><div class="p-4 sm:p-6" data-v-c7f25654>`);
          if (offer.product) {
            _push(`<div class="mb-3 sm:mb-4" data-v-c7f25654><div class="h-40 sm:h-48 bg-gradient-to-br from-accent-soft to-accent-secondary/20 dark:from-accent/20 dark:to-accent-secondary/20 rounded-xl overflow-hidden mb-3 sm:mb-4" data-v-c7f25654>`);
            if (offer.product.image_url) {
              _push(`<img${ssrRenderAttr("src", offer.product.image_url)}${ssrRenderAttr("alt", offer.product.name)} loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-v-c7f25654>`);
            } else {
              _push(`<div class="w-full h-full flex items-center justify-center" data-v-c7f25654>`);
              _push(ssrRenderComponent(_component_Icon, {
                name: "heroicons:photo",
                class: "w-16 h-16 text-accent"
              }, null, _parent));
              _push(`</div>`);
            }
            _push(`</div><h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2 line-clamp-2" data-v-c7f25654>${ssrInterpolate(offer.product.name)}</h3><div class="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4" data-v-c7f25654><span class="text-xl sm:text-2xl font-bold text-accent" data-v-c7f25654>${ssrInterpolate(unref(formatCOP)(calculateDiscountedPrice(offer.product.price, offer.discount_percent)))}</span><span class="text-lg text-gray-400 dark:text-gray-500 line-through" data-v-c7f25654>${ssrInterpolate(unref(formatCOP)(offer.product.price))}</span></div>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: "/shop",
              class: "block w-full text-center px-6 py-3 bg-gradient-to-r from-accent to-accent-secondary text-white rounded-xl font-semibold hover:from-accent-hover hover:to-accent-secondary transition-all duration-300"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Ver Oferta `);
                } else {
                  return [
                    createTextVNode(" Ver Oferta ")
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-accent via-accent-secondary to-accent relative overflow-hidden" data-v-c7f25654><div class="absolute inset-0 bg-black/10" data-v-c7f25654></div><div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-v-c7f25654><h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-1" data-v-c7f25654> \xBFLista para comenzar tu experiencia de compra? </h2><p class="text-base sm:text-lg md:text-xl text-black mb-6 sm:mb-8 max-w-2xl mx-auto px-1" data-v-c7f25654> \xDAnete a miles de clientas que ya conf\xEDan en BylotoStore para sus compras de moda y belleza </p><div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4" data-v-c7f25654>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/shop",
        class: "px-8 py-4 bg-white text-accent rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Explorar Tienda `);
          } else {
            return [
              createTextVNode(" Explorar Tienda ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        class: "px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-semibold text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Conocer M\xE1s `);
          } else {
            return [
              createTextVNode(" Conocer M\xE1s ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="py-10 sm:py-14 lg:py-16 bg-gray-50 dark:bg-bg-secondary" data-v-c7f25654><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-v-c7f25654>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:quote",
        class: "w-10 h-10 sm:w-12 sm:h-12 text-accent mx-auto mb-4 sm:mb-6"
      }, null, _parent));
      _push(`<blockquote class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif italic text-gray-700 dark:text-gray-300 leading-relaxed mb-3 sm:mb-4 px-2" data-v-c7f25654> &quot;La belleza comienza en el momento en que decides ser t\xFA misma.&quot; </blockquote><cite class="block text-base sm:text-lg text-accent font-medium not-italic" data-v-c7f25654> \u2014 Coco Chanel </cite></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c7f25654"]]);

export { index as default };
//# sourceMappingURL=index-PUPoAI_X.mjs.map
