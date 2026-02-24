import { u as useRouter, _ as __nuxt_component_1$1, a as __nuxt_component_0 } from './server.mjs';
import { ref, reactive, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useCartStore } from './cart-E1qf9VCw.mjs';
import { u as useCurrency } from './useCurrency-BsXMBrUs.mjs';
import { u as useAuth } from './useAuth-DSEa5iIv.mjs';
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
    const loading = ref(true);
    const offers = ref([]);
    const { formatCOP } = useCurrency();
    const cart = useCartStore();
    const quantities = reactive({});
    ref([]);
    useRouter();
    const { user } = useAuth();
    const isCustomer = computed(() => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.role) === "customer";
    });
    const discountedPrice = (price, percent) => {
      if (!price) return 0;
      return Math.round(Number(price) * (1 - Number(percent || 0) / 100));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))} data-v-d10507e2>`);
      if (unref(isCustomer)) {
        _push(`<div class="pb-20 relative theme-container" data-v-d10507e2><div class="absolute inset-0 overflow-hidden pointer-events-none" data-v-d10507e2><div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" data-v-d10507e2></div><div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" data-v-d10507e2></div><div class="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" data-v-d10507e2></div></div><div class="relative h-[35vh] min-h-[240px] sm:h-[40vh] sm:min-h-[300px] overflow-hidden" data-v-d10507e2><div class="absolute inset-0 bg-gradient-to-r from-pink-900/80 to-purple-900/80 z-10" data-v-d10507e2></div><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&amp;w=2070&amp;auto=format&amp;fit=crop" class="absolute inset-0 w-full h-full object-cover" alt="Cover" data-v-d10507e2><div class="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4" data-v-d10507e2><h1 class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-2 sm:mb-4 animate-fade-in-up px-2" data-v-d10507e2> Colecci\xF3n Exclusiva </h1><p class="text-sm sm:text-base md:text-lg lg:text-xl font-light max-w-2xl opacity-90 animate-fade-in-up animation-delay-200 px-2" data-v-d10507e2> Descubre las \xFAltimas tendencias seleccionadas especialmente para ti. Disponibles para compra en nuestra boutique. </p></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16 lg:-mt-20 relative z-30" data-v-d10507e2>`);
        if (unref(loading)) {
          _push(`<div class="flex justify-center py-20" data-v-d10507e2>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "svg-spinners:180-ring-with-bg",
            class: "w-12 h-12 text-white"
          }, null, _parent));
          _push(`</div>`);
        } else if (unref(offers).length === 0) {
          _push(`<div class="bg-white/90 backdrop-blur rounded-2xl p-12 text-center shadow-xl" data-v-d10507e2>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:sparkles",
            class: "w-16 h-16 mx-auto text-pink-300 mb-4"
          }, null, _parent));
          _push(`<h3 class="text-xl font-medium text-gray-900" data-v-d10507e2>Pr\xF3ximamente</h3><p class="text-gray-500" data-v-d10507e2> Estamos preparando nuevas ofertas exclusivas para ti. </p></div>`);
        } else {
          _push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8" data-v-d10507e2><!--[-->`);
          ssrRenderList(unref(offers), (offer) => {
            var _a, _b, _c, _d, _e, _f;
            _push(`<div class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2" data-v-d10507e2><div class="relative h-64 sm:h-80 lg:h-96 overflow-hidden" data-v-d10507e2><div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 z-10" data-v-d10507e2></div>`);
            if ((_a = offer.product) == null ? void 0 : _a.image_url) {
              _push(`<img${ssrRenderAttr("src", offer.product.image_url)}${ssrRenderAttr("alt", (_b = offer.product) == null ? void 0 : _b.name)} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-v-d10507e2>`);
            } else {
              _push(`<div class="w-full h-full bg-gray-100 flex items-center justify-center" data-v-d10507e2>`);
              _push(ssrRenderComponent(_component_Icon, {
                name: "heroicons:photo",
                class: "w-16 h-16 text-gray-300"
              }, null, _parent));
              _push(`</div>`);
            }
            _push(`<div class="absolute top-4 right-4 z-20 flex flex-col gap-2" data-v-d10507e2><span class="bg-white/90 backdrop-blur text-pink-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm" data-v-d10507e2> -${ssrInterpolate(offer.discount_percent)}% OFF </span></div><div class="absolute bottom-0 left-0 w-full p-4 sm:p-6 z-20 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300" data-v-d10507e2><h3 class="text-lg sm:text-xl lg:text-2xl font-serif font-bold mb-1" data-v-d10507e2>${ssrInterpolate((_c = offer.product) == null ? void 0 : _c.name)}</h3><p class="text-xs sm:text-sm opacity-90 mb-2 sm:mb-3 line-clamp-1" data-v-d10507e2>${ssrInterpolate(((_d = offer.product) == null ? void 0 : _d.description) || "Producto exclusivo")}</p><div class="flex items-center justify-between border-t border-white/20 pt-3" data-v-d10507e2><div class="flex flex-col" data-v-d10507e2><span class="text-xs opacity-75 line-through" data-v-d10507e2>${ssrInterpolate(unref(formatCOP)((_e = offer.product) == null ? void 0 : _e.price))}</span><span class="text-xl font-bold text-pink-200" data-v-d10507e2>${ssrInterpolate(unref(formatCOP)(
              discountedPrice(
                (_f = offer.product) == null ? void 0 : _f.price,
                offer.discount_percent
              )
            ))}</span></div><div class="flex items-center text-xs font-medium bg-white/20 backdrop-blur px-3 py-1.5 rounded-lg" data-v-d10507e2>`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:map-pin",
              class: "w-3 h-3 mr-1"
            }, null, _parent));
            _push(` En Boutique </div></div></div></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<div class="max-w-6xl mx-auto p-4 sm:p-6 theme-container" data-v-d10507e2><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6" data-v-d10507e2><h1 class="text-xl sm:text-2xl font-bold theme-text-primary" data-v-d10507e2>Mi Perfil</h1>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/shop/cart",
          class: "inline-flex items-center justify-center px-4 py-2.5 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors shadow-md text-sm sm:text-base w-full sm:w-auto"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:shopping-cart",
                class: "w-5 h-5 mr-2 shrink-0"
              }, null, _parent2, _scopeId));
              _push2(` Ir al carrito (${ssrInterpolate(unref(cart).count)}) `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:shopping-cart",
                  class: "w-5 h-5 mr-2 shrink-0"
                }),
                createTextVNode(" Ir al carrito (" + toDisplayString(unref(cart).count) + ") ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (unref(loading)) {
          _push(`<div class="flex justify-center py-12" data-v-d10507e2>`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "svg-spinners:180-ring-with-bg",
            class: "w-10 h-10 text-pink-600"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<div data-v-d10507e2>`);
          if (unref(offers).length === 0) {
            _push(`<div class="bg-white rounded-lg p-8 text-center text-gray-600 shadow-sm border border-gray-100" data-v-d10507e2>`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:shopping-bag",
              class: "w-12 h-12 mx-auto text-gray-300 mb-3"
            }, null, _parent));
            _push(` No hay ofertas disponibles por el momento. </div>`);
          } else {
            _push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" data-v-d10507e2><!--[-->`);
            ssrRenderList(unref(offers), (offer) => {
              var _a, _b, _c, _d, _e, _f, _g, _h;
              _push(`<div class="bg-white rounded-xl shadow-sm overflow-hidden border border-pink-100 hover:shadow-md transition-shadow" data-v-d10507e2><div class="h-40 sm:h-48 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center overflow-hidden relative group" data-v-d10507e2>`);
              if ((_a = offer.product) == null ? void 0 : _a.image_url) {
                _push(`<img${ssrRenderAttr("src", offer.product.image_url)}${ssrRenderAttr("alt", (_b = offer.product) == null ? void 0 : _b.name)} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-v-d10507e2>`);
              } else {
                _push(ssrRenderComponent(_component_Icon, {
                  name: "heroicons:sparkles",
                  class: "w-16 h-16 text-pink-500"
                }, null, _parent));
              }
              _push(`<div class="absolute top-2 right-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded shadow" data-v-d10507e2> -${ssrInterpolate(offer.discount_percent)}% </div></div><div class="p-3 sm:p-4 space-y-2 sm:space-y-3" data-v-d10507e2><div data-v-d10507e2><h3 class="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1" data-v-d10507e2>${ssrInterpolate((_c = offer.product) == null ? void 0 : _c.name)}</h3><div class="text-xs sm:text-sm text-gray-500" data-v-d10507e2> SKU: ${ssrInterpolate((_d = offer.product) == null ? void 0 : _d.sku)}</div></div><div class="flex items-center justify-between" data-v-d10507e2><div class="flex flex-col min-w-0" data-v-d10507e2>`);
              if ((_e = offer.product) == null ? void 0 : _e.price) {
                _push(`<span class="text-xs text-gray-400 line-through" data-v-d10507e2>${ssrInterpolate(unref(formatCOP)(offer.product.price))}</span>`);
              } else {
                _push(`<!---->`);
              }
              _push(`<span class="text-base sm:text-lg font-bold text-pink-600 truncate" data-v-d10507e2>${ssrInterpolate(unref(formatCOP)(
                discountedPrice(
                  (_f = offer.product) == null ? void 0 : _f.price,
                  offer.discount_percent
                )
              ))}</span></div></div><div class="pt-2 flex flex-wrap items-center gap-2 border-t border-gray-100 mt-2" data-v-d10507e2><input${ssrRenderAttr("value", unref(quantities)[offer.id_offer])} type="number" min="1"${ssrRenderAttr("max", ((_g = offer.product) == null ? void 0 : _g.stock_quantity) || 1)} class="w-14 sm:w-16 px-2 py-2 border border-gray-200 rounded-lg text-center text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent" data-v-d10507e2><button class="flex-1 min-w-0 inline-flex items-center justify-center px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base" data-v-d10507e2>`);
              _push(ssrRenderComponent(_component_Icon, {
                name: "heroicons:plus",
                class: "w-4 h-4 sm:w-5 sm:h-5 mr-1 shrink-0"
              }, null, _parent));
              _push(` Agregar </button></div>`);
              if (((_h = offer.product) == null ? void 0 : _h.stock_quantity) <= 0) {
                _push(`<div class="text-xs text-red-600 font-medium flex items-center" data-v-d10507e2>`);
                _push(ssrRenderComponent(_component_Icon, {
                  name: "heroicons:exclamation-circle",
                  class: "w-3 h-3 mr-1"
                }, null, _parent));
                _push(` Agotado </div>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div></div>`);
            });
            _push(`<!--]--></div>`);
          }
          _push(`</div>`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d10507e2"]]);

export { index as default };
//# sourceMappingURL=index-BdNt1efZ.mjs.map
