import { r as useRoute, b as useNuxtApp, a as __nuxt_component_0, _ as __nuxt_component_1$1 } from './server.mjs';
import { ref, computed, mergeProps, withCtx, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderSlot, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
import { u as useTheme } from './useTheme-D-CPSc8o.mjs';
import { u as useAuth } from './useAuth-DSEa5iIv.mjs';
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
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const moreOpen = ref(false);
    const { isDark, toggleTheme } = useTheme();
    const { $themeOptimizer } = useNuxtApp();
    ($themeOptimizer == null ? void 0 : $themeOptimizer.optimizedToggleTheme) || toggleTheme;
    useAuth();
    ref(0);
    const pageTitle = computed(() => {
      const titles = {
        "/dashboard": "Dashboard",
        "/admin": "Dashboard",
        "/admin/products": "Productos",
        "/admin/categories": "Categor\xEDas",
        "/admin/inventory": "Inventario",
        "/admin/providers": "Proveedores",
        "/admin/orders": "Pedidos",
        "/admin/customers": "Clientes",
        "/admin/profiles": "Usuarios",
        "/admin/offers": "Ofertas"
      };
      return titles[route.path] || "Administraci\xF3n";
    });
    const userInitials = ref("AD");
    const userName = ref("Administrador");
    const userRole = ref("Admin");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen w-full max-w-[100vw] transition-colors duration-300 theme-container pb-20 lg:pb-0" }, _attrs))}><aside class="hidden lg:flex fixed inset-y-0 left-0 z-40 w-64 shadow-lg transition-all duration-300 theme-sidebar flex-col translate-x-0"><div class="flex items-center justify-center h-14 sm:h-16 theme-header px-3"><h1 class="text-lg sm:text-xl font-bold transition-colors theme-text-primary truncate">Admin Panel</h1></div><nav class="mt-4 sm:mt-8 flex-1 overflow-y-auto"><div class="px-3 sm:px-4 space-y-1 sm:space-y-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard",
        class: ["flex items-center px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors theme-nav-item text-sm sm:text-base", { "theme-nav-active": _ctx.$route.path === "/dashboard" }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:home",
              class: "w-5 h-5 mr-2 sm:mr-3 shrink-0"
            }, null, _parent2, _scopeId));
            _push2(` Dashboard `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:home",
                class: "w-5 h-5 mr-2 sm:mr-3 shrink-0"
              }),
              createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/products",
        class: ["flex items-center px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors theme-nav-item text-sm sm:text-base", { "theme-nav-active": _ctx.$route.path.startsWith("/admin/products") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:cube",
              class: "w-5 h-5 mr-2 sm:mr-3 shrink-0"
            }, null, _parent2, _scopeId));
            _push2(` Productos `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:cube",
                class: "w-5 h-5 mr-2 sm:mr-3 shrink-0"
              }),
              createTextVNode(" Productos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/categories",
        class: ["flex items-center px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors theme-nav-item text-sm sm:text-base", { "theme-nav-active": _ctx.$route.path.startsWith("/admin/categories") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:tag",
              class: "w-5 h-5 mr-2 sm:mr-3 shrink-0"
            }, null, _parent2, _scopeId));
            _push2(` Categor\xEDas `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:tag",
                class: "w-5 h-5 mr-2 sm:mr-3 shrink-0"
              }),
              createTextVNode(" Categor\xEDas ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/inventory",
        class: ["flex items-center px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors theme-nav-item text-sm sm:text-base", { "theme-nav-active": _ctx.$route.path.startsWith("/admin/inventory") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:archive-box",
              class: "w-5 h-5 mr-2 sm:mr-3 shrink-0"
            }, null, _parent2, _scopeId));
            _push2(` Inventario `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:archive-box",
                class: "w-5 h-5 mr-2 sm:mr-3 shrink-0"
              }),
              createTextVNode(" Inventario ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/providers",
        class: ["flex items-center px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors theme-nav-item text-sm sm:text-base", { "theme-nav-active": _ctx.$route.path.startsWith("/admin/providers") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:truck",
              class: "w-5 h-5 mr-2 sm:mr-3 shrink-0"
            }, null, _parent2, _scopeId));
            _push2(` Proveedores `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:truck",
                class: "w-5 h-5 mr-2 sm:mr-3 shrink-0"
              }),
              createTextVNode(" Proveedores ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/orders",
        class: ["flex items-center px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors theme-nav-item text-sm sm:text-base", { "theme-nav-active": _ctx.$route.path.startsWith("/admin/orders") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:shopping-bag",
              class: "w-5 h-5 mr-2 sm:mr-3 shrink-0"
            }, null, _parent2, _scopeId));
            _push2(` Pedidos `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:shopping-bag",
                class: "w-5 h-5 mr-2 sm:mr-3 shrink-0"
              }),
              createTextVNode(" Pedidos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/customers",
        class: ["flex items-center px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors theme-nav-item text-sm sm:text-base", { "theme-nav-active": _ctx.$route.path.startsWith("/admin/customers") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:users",
              class: "w-5 h-5 mr-2 sm:mr-3 shrink-0"
            }, null, _parent2, _scopeId));
            _push2(` Clientes `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:users",
                class: "w-5 h-5 mr-2 sm:mr-3 shrink-0"
              }),
              createTextVNode(" Clientes ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/profiles",
        class: ["flex items-center px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors theme-nav-item text-sm sm:text-base", { "theme-nav-active": _ctx.$route.path.startsWith("/admin/profiles") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:user-circle",
              class: "w-5 h-5 mr-2 sm:mr-3 shrink-0"
            }, null, _parent2, _scopeId));
            _push2(` Usuarios `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:user-circle",
                class: "w-5 h-5 mr-2 sm:mr-3 shrink-0"
              }),
              createTextVNode(" Usuarios ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/offers",
        class: ["flex items-center px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors theme-nav-item text-sm sm:text-base", { "theme-nav-active": _ctx.$route.path.startsWith("/admin/offers") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:tag",
              class: "w-5 h-5 mr-2 sm:mr-3 shrink-0"
            }, null, _parent2, _scopeId));
            _push2(` Ofertas `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:tag",
                class: "w-5 h-5 mr-2 sm:mr-3 shrink-0"
              }),
              createTextVNode(" Ofertas ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></nav><div class="p-3 sm:p-4 border-t transition-colors duration-300 theme-header-bar mt-auto"><div class="bg-gray-50 dark:bg-white/5 rounded-lg p-2.5 sm:p-3"><div class="flex items-center gap-2 sm:gap-3"><div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center text-xs sm:text-sm font-semibold shadow-sm shrink-0">${ssrInterpolate(unref(userInitials))}</div><div class="min-w-0 flex-1"><p class="text-xs sm:text-sm font-semibold transition-colors theme-text-primary truncate">${ssrInterpolate(unref(userName))}</p><p class="text-[10px] sm:text-xs transition-colors theme-text-secondary truncate">${ssrInterpolate(unref(userRole))}</p></div><div class="flex items-center gap-1 sm:gap-2 shrink-0"><button class="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"${ssrRenderAttr("title", unref(isDark) ? "Cambiar a tema claro" : "Cambiar a tema oscuro")}>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: unref(isDark) ? "heroicons:sun" : "heroicons:moon",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button><button class="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"${ssrRenderAttr("title", "Notificaciones")}>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:bell",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button><button class="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"${ssrRenderAttr("title", "Cerrar sesi\xF3n")}${ssrIncludeBooleanAttr(false) ? " disabled" : ""}>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:arrow-right-on-rectangle",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button></div></div></div></div></aside><div class="lg:ml-64 min-h-screen flex flex-col"><header class="admin-page-header shadow-sm border-b transition-colors duration-300 sticky top-0 z-30"><div class="flex justify-center items-center h-14 sm:h-16 px-3 sm:px-4 lg:px-6"><h2 class="text-base sm:text-lg font-semibold transition-colors theme-text-primary truncate">${ssrInterpolate(unref(pageTitle))}</h2></div></header><main class="flex-1 p-3 sm:p-4 lg:p-6 min-h-0">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div><nav class="lg:hidden fixed bottom-0 left-0 right-0 z-[100] theme-header border-t theme-border w-full max-w-[100vw]" style="${ssrRenderStyle({ "padding-bottom": "env(safe-area-inset-bottom, 0)" })}"><div class="flex items-stretch justify-around h-14">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard",
        class: ["flex flex-col items-center justify-center flex-1 py-1.5 min-w-0 text-[10px] font-medium transition-colors theme-nav-item", { "theme-nav-active text-accent": _ctx.$route.path === "/dashboard" || _ctx.$route.path === "/admin" }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:home",
              class: "w-6 h-6 mb-0.5 shrink-0"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Inicio</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:home",
                class: "w-6 h-6 mb-0.5 shrink-0"
              }),
              createVNode("span", null, "Inicio")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/products",
        class: ["flex flex-col items-center justify-center flex-1 py-1.5 min-w-0 text-[10px] font-medium transition-colors theme-nav-item", { "theme-nav-active text-accent": _ctx.$route.path.startsWith("/admin/products") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:cube",
              class: "w-6 h-6 mb-0.5 shrink-0"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Productos</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:cube",
                class: "w-6 h-6 mb-0.5 shrink-0"
              }),
              createVNode("span", null, "Productos")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/orders",
        class: ["flex flex-col items-center justify-center flex-1 py-1.5 min-w-0 text-[10px] font-medium transition-colors theme-nav-item", { "theme-nav-active text-accent": _ctx.$route.path.startsWith("/admin/orders") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:shopping-bag",
              class: "w-6 h-6 mb-0.5 shrink-0"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Pedidos</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:shopping-bag",
                class: "w-6 h-6 mb-0.5 shrink-0"
              }),
              createVNode("span", null, "Pedidos")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button type="button" class="${ssrRenderClass([{ "theme-nav-active text-accent": unref(moreOpen) }, "flex flex-col items-center justify-center flex-1 py-1.5 min-w-0 text-[10px] font-medium transition-colors theme-nav-item"])}">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:squares-2x2",
        class: "w-6 h-6 mb-0.5 shrink-0"
      }, null, _parent));
      _push(`<span>M\xE1s</span></button><button type="button" class="flex flex-col items-center justify-center flex-1 py-1.5 min-w-0 text-[10px] font-medium text-red-600 dark:text-red-400 hover:opacity-80 transition-opacity" title="Cerrar sesi\xF3n">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:arrow-right-on-rectangle",
        class: "w-6 h-6 mb-0.5 shrink-0"
      }, null, _parent));
      _push(`<span>Salir</span></button></div></nav>`);
      if (unref(moreOpen)) {
        _push(`<div class="lg:hidden fixed inset-0 z-40 bg-black/50" aria-hidden="true"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(moreOpen)) {
        _push(`<div class="lg:hidden fixed bottom-0 left-0 right-0 z-50 theme-sidebar border-t theme-border rounded-t-2xl shadow-2xl max-h-[70vh] overflow-hidden flex flex-col" style="${ssrRenderStyle({ "padding-bottom": "env(safe-area-inset-bottom, 0)" })}"><div class="flex items-center justify-between p-4 border-b theme-border"><h3 class="font-semibold theme-text-primary">M\xE1s secciones</h3><button type="button" class="p-2 rounded-lg theme-nav-item">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:x-mark",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div><div class="overflow-y-auto p-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/categories",
          onClick: ($event) => moreOpen.value = false,
          class: ["flex items-center px-4 py-3 rounded-lg theme-nav-item", { "theme-nav-active": _ctx.$route.path.startsWith("/admin/categories") }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:tag",
                class: "w-5 h-5 mr-3 shrink-0"
              }, null, _parent2, _scopeId));
              _push2(` Categor\xEDas `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:tag",
                  class: "w-5 h-5 mr-3 shrink-0"
                }),
                createTextVNode(" Categor\xEDas ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/inventory",
          onClick: ($event) => moreOpen.value = false,
          class: ["flex items-center px-4 py-3 rounded-lg theme-nav-item", { "theme-nav-active": _ctx.$route.path.startsWith("/admin/inventory") }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:archive-box",
                class: "w-5 h-5 mr-3 shrink-0"
              }, null, _parent2, _scopeId));
              _push2(` Inventario `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:archive-box",
                  class: "w-5 h-5 mr-3 shrink-0"
                }),
                createTextVNode(" Inventario ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/providers",
          onClick: ($event) => moreOpen.value = false,
          class: ["flex items-center px-4 py-3 rounded-lg theme-nav-item", { "theme-nav-active": _ctx.$route.path.startsWith("/admin/providers") }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:truck",
                class: "w-5 h-5 mr-3 shrink-0"
              }, null, _parent2, _scopeId));
              _push2(` Proveedores `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:truck",
                  class: "w-5 h-5 mr-3 shrink-0"
                }),
                createTextVNode(" Proveedores ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/customers",
          onClick: ($event) => moreOpen.value = false,
          class: ["flex items-center px-4 py-3 rounded-lg theme-nav-item", { "theme-nav-active": _ctx.$route.path.startsWith("/admin/customers") }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:users",
                class: "w-5 h-5 mr-3 shrink-0"
              }, null, _parent2, _scopeId));
              _push2(` Clientes `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:users",
                  class: "w-5 h-5 mr-3 shrink-0"
                }),
                createTextVNode(" Clientes ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/profiles",
          onClick: ($event) => moreOpen.value = false,
          class: ["flex items-center px-4 py-3 rounded-lg theme-nav-item", { "theme-nav-active": _ctx.$route.path.startsWith("/admin/profiles") }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:user-circle",
                class: "w-5 h-5 mr-3 shrink-0"
              }, null, _parent2, _scopeId));
              _push2(` Usuarios `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:user-circle",
                  class: "w-5 h-5 mr-3 shrink-0"
                }),
                createTextVNode(" Usuarios ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/offers",
          onClick: ($event) => moreOpen.value = false,
          class: ["flex items-center px-4 py-3 rounded-lg theme-nav-item", { "theme-nav-active": _ctx.$route.path.startsWith("/admin/offers") }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:sparkles",
                class: "w-5 h-5 mr-3 shrink-0"
              }, null, _parent2, _scopeId));
              _push2(` Ofertas `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:sparkles",
                  class: "w-5 h-5 mr-3 shrink-0"
                }),
                createTextVNode(" Ofertas ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="border-t theme-border p-2 mt-2"><button type="button" class="flex items-center w-full px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-right-on-rectangle",
          class: "w-5 h-5 mr-3 shrink-0"
        }, null, _parent));
        _push(` Cerrar sesi\xF3n </button></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-QxhdULOY.mjs.map
