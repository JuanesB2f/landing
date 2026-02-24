import { y as useSupabaseUser, b as useNuxtApp, a as __nuxt_component_0, _ as __nuxt_component_1$1, u as useRouter, n as navigateTo } from './server.mjs';
import { computed, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';
import { u as useCartStore } from './cart-E1qf9VCw.mjs';
import { u as useAuth, a as useSupabaseClient } from './useAuth-DSEa5iIv.mjs';
import { u as useTheme } from './useTheme-D-CPSc8o.mjs';
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

const useUserNavigation = () => {
  useRouter();
  const supabase = useSupabaseClient();
  const verifySessionAndNavigate = async (path, fallbackUrl) => {
    try {
      console.log(`\u{1F9ED} Navegando a ${path}...`);
      const sessionPromise = supabase.auth.getSession();
      const timeoutPromise = new Promise(
        (_, reject) => setTimeout(() => reject(new Error("Session timeout")), 3e3)
      );
      const { data: { session }, error } = await Promise.race([sessionPromise, timeoutPromise]);
      if (error || !session) {
        console.log("\u274C No hay sesi\xF3n, redirigiendo al login");
        await navigateTo("/login");
        return false;
      }
      const profilePromise = supabase.from("profiles").select("role, is_active").eq("id", session.user.id).single();
      const profileTimeoutPromise = new Promise(
        (_, reject) => setTimeout(() => reject(new Error("Profile timeout")), 3e3)
      );
      const { data: profile } = await Promise.race([profilePromise, profileTimeoutPromise]);
      const role = profile == null ? void 0 : profile.role;
      const active = profile == null ? void 0 : profile.is_active;
      const isUserRole = role === "user" || role === "customer";
      if (!role || active === false || !isUserRole) {
        console.log("\u274C Usuario no autorizado");
        await navigateTo("/unauthorized");
        return false;
      }
      console.log(`\u2705 Navegando a ${path}`);
      await navigateTo(path);
      return true;
    } catch (error) {
      console.error(`\u274C Error navegando a ${path}:`, error);
      if (fallbackUrl || path) {
        console.log(`\u{1F504} Usando fallback para navegar a ${fallbackUrl || path}`);
        (void 0).location.href = fallbackUrl || path;
      }
      return false;
    }
  };
  const navigateToOffers = async () => {
    return await verifySessionAndNavigate("/user", "/user");
  };
  const navigateToCart = async () => {
    return await verifySessionAndNavigate("/shop/cart", "/shop/cart");
  };
  const navigateToUserPage = async (path) => {
    return await verifySessionAndNavigate(path, path);
  };
  return {
    verifySessionAndNavigate,
    navigateToOffers,
    navigateToCart,
    navigateToUserPage
  };
};
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    var _a2;
    var _a;
    const cartStore = (_a2 = (_a = useCartStore) == null ? void 0 : _a()) != null ? _a2 : null;
    const cartItemsCount = computed(() => {
      var _a3;
      return (_a3 = cartStore == null ? void 0 : cartStore.count) != null ? _a3 : 0;
    });
    const authUser = useSupabaseUser();
    useAuth();
    const { user } = useAuth();
    const isUser = computed(() => {
      var _a22;
      return ((_a22 = user.value) == null ? void 0 : _a22.role) === "user";
    });
    const isAdmin = computed(() => {
      var _a22;
      return ((_a22 = user.value) == null ? void 0 : _a22.role) === "admin";
    });
    const isCustomer = computed(() => {
      var _a22;
      return ((_a22 = user.value) == null ? void 0 : _a22.role) === "customer";
    });
    const { isDark, toggleTheme } = useTheme();
    const { $themeOptimizer } = useNuxtApp();
    ($themeOptimizer == null ? void 0 : $themeOptimizer.optimizedToggleTheme) || toggleTheme;
    ref(0);
    useUserNavigation();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen w-full max-w-[100vw] transition-colors duration-300 theme-container pb-20 md:pb-0" }, _attrs))}>`);
      if (!unref(isCustomer)) {
        _push(`<header class="header-diffused sticky top-0 z-50"><div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true"><div class="absolute -top-20 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-accent/25 via-accent-secondary/20 to-accent/25 rounded-full blur-3xl animate-blob"></div><div class="absolute -bottom-16 left-0 w-56 h-56 sm:w-72 sm:h-72 bg-gradient-to-tr from-accent-secondary/25 via-accent/20 to-accent-secondary/25 rounded-full blur-3xl animate-blob animation-delay-2000"></div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-60 sm:h-60 bg-gradient-to-r from-accent/15 to-accent-secondary/15 rounded-full blur-3xl animate-blob animation-delay-4000"></div></div><div class="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-14 sm:h-16 lg:h-20 gap-2"><div class="flex items-center min-w-0 flex-shrink-0">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "flex items-center space-x-1.5 sm:space-x-2 group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-accent to-accent-secondary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0 logo-icon-wrap"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:sparkles",
                class: "w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white dark:text-white logo-icon"
              }, null, _parent2, _scopeId));
              _push2(`</div><span class="header-logo-text text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent truncate dark:bg-clip-text dark:text-transparent"${_scopeId}> BylotoStore </span>`);
            } else {
              return [
                createVNode("div", { class: "w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-accent to-accent-secondary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0 logo-icon-wrap" }, [
                  createVNode(_component_Icon, {
                    name: "heroicons:sparkles",
                    class: "w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white dark:text-white logo-icon"
                  })
                ]),
                createVNode("span", { class: "header-logo-text text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent truncate dark:bg-clip-text dark:text-transparent" }, " BylotoStore ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><nav class="hidden md:flex space-x-6 lg:space-x-8">`);
        if (unref(isUser)) {
          _push(`<button class="relative theme-nav-item hover:text-accent transition-colors font-medium group"> Mis Ofertas <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-secondary group-hover:w-full transition-all duration-300"></span></button>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(isUser) || unref(isAdmin)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/shop",
            class: "relative theme-nav-item hover:text-accent transition-colors font-medium group"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Productos <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-secondary group-hover:w-full transition-all duration-300"${_scopeId}></span>`);
              } else {
                return [
                  createTextVNode(" Productos "),
                  createVNode("span", { class: "absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-secondary group-hover:w-full transition-all duration-300" })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(isUser) || unref(isAdmin)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/about",
            class: "relative theme-nav-item hover:text-accent transition-colors font-medium group"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Nosotros <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-secondary group-hover:w-full transition-all duration-300"${_scopeId}></span>`);
              } else {
                return [
                  createTextVNode(" Nosotros "),
                  createVNode("span", { class: "absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-secondary group-hover:w-full transition-all duration-300" })
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</nav><div class="flex items-center gap-2"><button class="p-2.5 rounded-full theme-button hover:theme-button-hover transition-all duration-300 flex items-center justify-center"${ssrRenderAttr("aria-label", unref(isDark) ? "Cambiar a tema claro" : "Cambiar a tema oscuro")}>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: unref(isDark) ? "heroicons:sun" : "heroicons:moon",
          class: "w-5 h-5 theme-text-primary"
        }, null, _parent));
        _push(`</button><div class="hidden md:flex items-center space-x-4 lg:space-x-6">`);
        if (unref(isUser)) {
          _push(`<button class="relative theme-text-primary hover:text-accent transition-colors group"><div class="header-cart-icon-wrap p-2 rounded-full bg-gradient-to-r from-accent to-accent-secondary group-hover:from-accent-hover group-hover:to-accent-secondary transition-all duration-300 shadow-lg hover:shadow-xl">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:shopping-cart",
            class: "w-6 h-6 text-white"
          }, null, _parent));
          _push(`</div>`);
          if (unref(cartItemsCount) > 0) {
            _push(`<span class="header-cart-count absolute -top-1 -right-1 bg-gradient-to-r from-accent to-accent-secondary text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">${ssrInterpolate(unref(cartItemsCount))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        if (!unref(authUser)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/login",
            class: "px-4 py-2 sm:px-6 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base bg-accent-soft border-2 border-accent text-[#0E1627] hover:bg-accent hover:text-white dark:bg-gradient-to-r dark:from-accent dark:to-accent-secondary dark:border-0 dark:text-white dark:hover:from-accent-hover dark:hover:to-accent-secondary"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Iniciar Sesi\xF3n `);
              } else {
                return [
                  createTextVNode(" Iniciar Sesi\xF3n ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<button class="theme-button text-theme-text-primary px-4 py-2 sm:px-6 rounded-full font-medium hover:theme-button-hover transition-all duration-300 shadow-sm text-sm sm:text-base"> Cerrar sesi\xF3n </button>`);
        }
        _push(`</div></div></div></div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<nav class="md:hidden fixed bottom-0 left-0 right-0 z-[100] theme-header border-t theme-border w-full max-w-[100vw]" style="${ssrRenderStyle({ "padding-bottom": "env(safe-area-inset-bottom, 0)" })}"><div class="flex items-stretch justify-around h-14">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: ["flex flex-col items-center justify-center flex-1 py-1.5 min-w-0 text-[10px] font-medium transition-colors theme-nav-item", { "theme-nav-active text-accent": _ctx.$route.path === "/" }]
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
        to: "/shop",
        class: ["flex flex-col items-center justify-center flex-1 py-1.5 min-w-0 text-[10px] font-medium transition-colors theme-nav-item", { "theme-nav-active text-accent": _ctx.$route.path.startsWith("/shop") && _ctx.$route.path !== "/shop/cart" }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:shopping-bag",
              class: "w-6 h-6 mb-0.5 shrink-0"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Tienda</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:shopping-bag",
                class: "w-6 h-6 mb-0.5 shrink-0"
              }),
              createVNode("span", null, "Tienda")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(isUser)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/shop/cart",
          class: ["flex flex-col items-center justify-center flex-1 py-1.5 min-w-0 text-[10px] font-medium transition-colors theme-nav-item relative", { "theme-nav-active text-accent": _ctx.$route.path === "/shop/cart" }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="relative inline-block"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:shopping-cart",
                class: "w-6 h-6 mb-0.5 shrink-0"
              }, null, _parent2, _scopeId));
              if (unref(cartItemsCount) > 0) {
                _push2(`<span class="absolute -top-2 -right-2 bg-accent text-white text-[10px] rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-0.5 font-bold"${_scopeId}>${ssrInterpolate(unref(cartItemsCount) > 99 ? "99+" : unref(cartItemsCount))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</span><span${_scopeId}>Carrito</span>`);
            } else {
              return [
                createVNode("span", { class: "relative inline-block" }, [
                  createVNode(_component_Icon, {
                    name: "heroicons:shopping-cart",
                    class: "w-6 h-6 mb-0.5 shrink-0"
                  }),
                  unref(cartItemsCount) > 0 ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "absolute -top-2 -right-2 bg-accent text-white text-[10px] rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-0.5 font-bold"
                  }, toDisplayString(unref(cartItemsCount) > 99 ? "99+" : unref(cartItemsCount)), 1)) : createCommentVNode("", true)
                ]),
                createVNode("span", null, "Carrito")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(isUser) || unref(isAdmin)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/user",
          class: ["flex flex-col items-center justify-center flex-1 py-1.5 min-w-0 text-[10px] font-medium transition-colors theme-nav-item", { "theme-nav-active text-accent": _ctx.$route.path.startsWith("/user") }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:user-circle",
                class: "w-6 h-6 mb-0.5 shrink-0"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Cuenta</span>`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:user-circle",
                  class: "w-6 h-6 mb-0.5 shrink-0"
                }),
                createVNode("span", null, "Cuenta")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: ["flex flex-col items-center justify-center flex-1 py-1.5 min-w-0 text-[10px] font-medium transition-colors theme-nav-item", { "theme-nav-active text-accent": _ctx.$route.path === "/login" }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:user",
                class: "w-6 h-6 mb-0.5 shrink-0"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Cuenta</span>`);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:user",
                  class: "w-6 h-6 mb-0.5 shrink-0"
                }),
                createVNode("span", null, "Cuenta")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      if (unref(authUser)) {
        _push(`<button type="button" class="flex flex-col items-center justify-center flex-1 py-1.5 min-w-0 text-[10px] font-medium transition-colors theme-nav-item text-red-600 dark:text-red-400">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-right-on-rectangle",
          class: "w-6 h-6 mb-0.5 shrink-0"
        }, null, _parent));
        _push(`<span>Salir</span></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></nav><main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="footer-theme bg-gradient-to-r from-accent-soft to-accent-secondary dark:from-bg-primary dark:to-bg-secondary text-[#0E1627] dark:text-white relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-r from-accent/10 to-accent-secondary/10"></div><div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent-secondary to-accent"></div><div class="relative max-w-7xl mx-auto py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12"><div class="space-y-4 sm:col-span-2 lg:col-span-1"><div class="flex items-center space-x-2"><div class="w-8 h-8 bg-gradient-to-r from-accent to-accent-secondary rounded-full flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:sparkles",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`</div><h3 class="text-lg sm:text-xl font-bold text-[#0E1627] dark:text-white">BylotoStore</h3></div><p class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base"> Tu tienda de belleza y moda femenina con los mejores productos seleccionados especialmente para la mujer moderna y elegante. </p><div class="flex space-x-4"><a href="#" class="w-10 h-10 bg-gradient-to-r from-accent to-accent-secondary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:globe-alt",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`</a><a href="#" class="w-10 h-10 bg-gradient-to-r from-accent to-accent-secondary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:heart",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`</a><a href="#" class="w-10 h-10 bg-gradient-to-r from-accent to-accent-secondary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:star",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`</a></div></div><div><h4 class="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-accent dark:text-accent">Productos</h4><ul class="space-y-3"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/shop/category/1",
        class: "text-gray-600 dark:text-gray-300 hover:text-accent transition-colors flex items-center space-x-2 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:sparkles",
              class: "w-4 h-4 group-hover:scale-110 transition-transform"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Loci\xF3n</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:sparkles",
                class: "w-4 h-4 group-hover:scale-110 transition-transform"
              }),
              createVNode("span", null, "Loci\xF3n")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/shop/category/2",
        class: "text-gray-600 dark:text-gray-300 hover:text-accent transition-colors flex items-center space-x-2 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:tag",
              class: "w-4 h-4 group-hover:scale-110 transition-transform"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Ropa</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:tag",
                class: "w-4 h-4 group-hover:scale-110 transition-transform"
              }),
              createVNode("span", null, "Ropa")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/shop/category/3",
        class: "text-gray-600 dark:text-gray-300 hover:text-accent transition-colors flex items-center space-x-2 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:eye",
              class: "w-4 h-4 group-hover:scale-110 transition-transform"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Maquillaje</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:eye",
                class: "w-4 h-4 group-hover:scale-110 transition-transform"
              }),
              createVNode("span", null, "Maquillaje")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/shop/category/4",
        class: "text-gray-600 dark:text-gray-300 hover:text-accent transition-colors flex items-center space-x-2 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:shopping-bag",
              class: "w-4 h-4 group-hover:scale-110 transition-transform"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>Bolsos</span>`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:shopping-bag",
                class: "w-4 h-4 group-hover:scale-110 transition-transform"
              }),
              createVNode("span", null, "Bolsos")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div><h4 class="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-accent dark:text-accent">Soporte</h4><ul class="space-y-3"><li><a href="#" class="text-gray-600 dark:text-gray-300 hover:text-accent transition-colors flex items-center space-x-2 group">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:envelope",
        class: "w-4 h-4 group-hover:scale-110 transition-transform"
      }, null, _parent));
      _push(`<span>Contacto</span></a></li><li><a href="#" class="text-gray-600 dark:text-gray-300 hover:text-accent transition-colors flex items-center space-x-2 group">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:truck",
        class: "w-4 h-4 group-hover:scale-110 transition-transform"
      }, null, _parent));
      _push(`<span>Env\xEDos</span></a></li><li><a href="#" class="text-gray-600 dark:text-gray-300 hover:text-accent transition-colors flex items-center space-x-2 group">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:arrow-path",
        class: "w-4 h-4 group-hover:scale-110 transition-transform"
      }, null, _parent));
      _push(`<span>Devoluciones</span></a></li><li><a href="#" class="text-gray-600 dark:text-gray-300 hover:text-accent transition-colors flex items-center space-x-2 group">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:question-mark-circle",
        class: "w-4 h-4 group-hover:scale-110 transition-transform"
      }, null, _parent));
      _push(`<span>FAQ</span></a></li></ul></div><div class="sm:col-span-2 lg:col-span-1"><h4 class="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-accent dark:text-accent">Newsletter</h4><p class="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base"> Suscr\xEDbete para recibir ofertas exclusivas </p><div class="flex flex-col sm:flex-row gap-2 sm:space-x-2 sm:gap-0"><input type="email" placeholder="Tu email" class="flex-1 min-w-0 px-3 py-2 sm:px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-[#0E1627] dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"><button class="px-4 py-2 bg-gradient-to-r from-accent to-accent-secondary text-white rounded-lg hover:from-accent-hover hover:to-accent-secondary transition-all duration-300 flex items-center justify-center shrink-0">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:paper-airplane",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button></div></div></div><div class="border-t border-gray-300 dark:border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center"><p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base"> \xA9 2024 BylotoStore. Todos los derechos reservados. </p></div></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-tEdNNdeE.mjs.map
