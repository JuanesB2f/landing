import { r as useRoute, b as useNuxtApp, _ as __nuxt_component_1$1, a as __nuxt_component_0 } from './server.mjs';
import { ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useCartStore } from './cart-E1qf9VCw.mjs';
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

const pageSize = 12;
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const categoryId = route.params.id;
    const { formatCOP } = useCurrency();
    useCartStore();
    const { $toast } = useNuxtApp();
    const category = ref(null);
    const allCategories = ref([]);
    const products = ref([]);
    const loading = ref(true);
    const page = ref(1);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_Icon = __nuxt_component_1$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center py-20">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "svg-spinners:180-ring-with-bg",
          class: "w-16 h-16 text-pink-600"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div><div class="text-center mb-8"><h1 class="text-4xl md:text-5xl font-bold mb-4"><span class="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">${ssrInterpolate(((_a = unref(category)) == null ? void 0 : _a.name) || "Categor\xEDa")}</span></h1><p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">${ssrInterpolate(((_b = unref(category)) == null ? void 0 : _b.description) || "Explora nuestros productos")}</p><div class="flex flex-wrap justify-center gap-2 mb-8">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/shop",
          class: "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Todas `);
            } else {
              return [
                createTextVNode(" Todas ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--[-->`);
        ssrRenderList(unref(allCategories), (cat) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: cat.id_category,
            to: `/shop/category/${cat.id_category}`,
            class: [
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
              cat.id_category === unref(categoryId) ? "bg-pink-600 text-white border-pink-600 shadow-md transform scale-105" : "bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50"
            ]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(cat.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(cat.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
        if ((_c = unref(category)) == null ? void 0 : _c.image_url) {
          _push(`<div class="flex justify-center mb-12"><div class="w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-white"><img${ssrRenderAttr("src", unref(category).image_url)}${ssrRenderAttr("alt", unref(category).name)} class="w-full h-full object-cover"></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(products).length === 0) {
          _push(`<div class="text-center py-12 bg-white rounded-xl shadow-sm max-w-2xl mx-auto">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:shopping-bag",
            class: "w-16 h-16 mx-auto text-gray-300 mb-4"
          }, null, _parent));
          _push(`<h3 class="text-lg font-medium text-gray-900"> No hay productos en esta categor\xEDa </h3><p class="text-gray-500 mt-2"> Vuelve pronto para ver nuevas colecciones </p>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/shop",
            class: "mt-6 inline-block text-pink-600 hover:text-pink-700 font-medium"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Ver todos los productos `);
              } else {
                return [
                  createTextVNode(" Ver todos los productos ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"><!--[-->`);
          ssrRenderList(unref(products), (product) => {
            _push(`<div class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-pink-100"><div class="relative h-64 bg-gray-100 overflow-hidden">`);
            if (product.image_url) {
              _push(`<img${ssrRenderAttr("src", product.image_url)}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">`);
            } else {
              _push(`<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">`);
              _push(ssrRenderComponent(_component_Icon, {
                name: "heroicons:photo",
                class: "w-16 h-16 text-pink-300"
              }, null, _parent));
              _push(`</div>`);
            }
            if (product.stock_quantity <= 0) {
              _push(`<div class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"> AGOTADO </div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><div class="p-6"><h3 class="font-bold text-xl text-gray-800 mb-2 group-hover:text-pink-600 transition-colors truncate"${ssrRenderAttr("title", product.name)}>${ssrInterpolate(product.name)}</h3><p class="text-gray-600 text-sm mb-4 line-clamp-2 h-10">${ssrInterpolate(product.description)}</p><div class="flex justify-between items-center"><span class="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">${ssrInterpolate(unref(formatCOP)(product.price))}</span><button${ssrIncludeBooleanAttr(product.stock_quantity <= 0) ? " disabled" : ""} class="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"><span class="flex items-center gap-2">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:shopping-cart",
              class: "w-5 h-5"
            }, null, _parent));
            _push(` Agregar </span></button></div></div></div>`);
          });
          _push(`<!--]--></div>`);
        }
        if (unref(products).length > 0) {
          _push(`<div class="mt-12 flex justify-center gap-4"><button${ssrIncludeBooleanAttr(unref(page) <= 1) ? " disabled" : ""} class="px-6 py-2 bg-white border border-pink-200 rounded-full text-pink-600 hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"> Anterior </button><button${ssrIncludeBooleanAttr(unref(products).length < pageSize) ? " disabled" : ""} class="px-6 py-2 bg-white border border-pink-200 rounded-full text-pink-600 hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"> Siguiente </button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="text-center mt-16">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/shop",
          class: "inline-flex items-center bg-white text-gray-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 hover:text-pink-600 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:arrow-left",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Volver al Cat\xE1logo `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:arrow-left",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" Volver al Cat\xE1logo ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shop/category/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-iz8swzZ8.mjs.map
