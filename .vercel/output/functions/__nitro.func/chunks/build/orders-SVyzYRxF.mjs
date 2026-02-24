import { b as useNuxtApp, _ as __nuxt_component_1$1, a as __nuxt_component_0 } from './server.mjs';
import { ref, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "orders",
  __ssrInlineRender: true,
  setup(__props) {
    const ordersLoading = ref(false);
    const orders = ref([]);
    const { formatCOP } = useCurrency();
    const { $toast } = useNuxtApp();
    const orderStats = computed(() => {
      const stats = {
        pending: 0,
        confirmed: 0,
        shipped: 0,
        delivered: 0
      };
      orders.value.forEach((order) => {
        if (stats.hasOwnProperty(order.status)) {
          stats[order.status]++;
        }
      });
      return stats;
    });
    const totalSpent = computed(() => {
      return orders.value.filter((order) => ["confirmed", "shipped", "delivered"].includes(order.status)).reduce((total, order) => total + (order.total_amount || 0), 0);
    });
    const formatDate = (date) => new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    const getStatusClass = (status) => {
      const classes = {
        pending: "bg-yellow-100 text-yellow-800",
        confirmed: "bg-blue-100 text-blue-800",
        shipped: "bg-purple-100 text-purple-800",
        delivered: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const getStatusText = (status) => {
      const texts = {
        pending: "Pendiente",
        confirmed: "Confirmado",
        shipped: "Enviado",
        delivered: "Entregado",
        cancelled: "Cancelado"
      };
      return texts[status] || status;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen theme-container" }, _attrs))}><div class="max-w-6xl mx-auto p-4 sm:p-6"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"><div><h1 class="text-2xl sm:text-3xl font-bold theme-text-primary">Mis Pedidos</h1><p class="text-sm sm:text-base text-theme-text-secondary mt-1 sm:mt-2">Historial completo de tus compras</p></div><div class="flex flex-wrap items-center gap-2 sm:gap-4"><button${ssrIncludeBooleanAttr(unref(ordersLoading)) ? " disabled" : ""} class="inline-flex items-center px-3 py-2 sm:px-4 theme-button hover:theme-button-hover transition-colors text-sm sm:text-base">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:arrow-path",
        class: ["w-4 h-4 mr-2 shrink-0", { "animate-spin": unref(ordersLoading) }]
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(ordersLoading) ? "Actualizando..." : "Actualizar")}</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/shop/cart",
        class: "inline-flex items-center px-3 py-2 sm:px-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm sm:text-base"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "heroicons:shopping-cart",
              class: "w-5 h-5 mr-2 shrink-0"
            }, null, _parent2, _scopeId));
            _push2(` Ir al carrito `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "heroicons:shopping-cart",
                class: "w-5 h-5 mr-2 shrink-0"
              }),
              createTextVNode(" Ir al carrito ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8"><div class="theme-card-bg rounded-lg p-3 sm:p-4 border theme-card-border"><div class="flex items-center gap-2 sm:gap-3"><div class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:clock",
        class: "w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
      }, null, _parent));
      _push(`</div><div class="min-w-0"><div class="text-xs sm:text-sm theme-text-secondary">Pendientes</div><div class="text-base sm:text-lg font-semibold theme-text-primary truncate">${ssrInterpolate(unref(orderStats).pending)}</div></div></div></div><div class="theme-card-bg rounded-lg p-3 sm:p-4 border theme-card-border"><div class="flex items-center gap-2 sm:gap-3"><div class="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:check-circle",
        class: "w-4 h-4 sm:w-5 sm:h-5 text-green-600"
      }, null, _parent));
      _push(`</div><div class="min-w-0"><div class="text-xs sm:text-sm theme-text-secondary">Entregados</div><div class="text-base sm:text-lg font-semibold theme-text-primary truncate">${ssrInterpolate(unref(orderStats).delivered)}</div></div></div></div><div class="theme-card-bg rounded-lg p-3 sm:p-4 border theme-card-border"><div class="flex items-center gap-2 sm:gap-3"><div class="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:truck",
        class: "w-4 h-4 sm:w-5 sm:h-5 text-purple-600"
      }, null, _parent));
      _push(`</div><div class="min-w-0"><div class="text-xs sm:text-sm theme-text-secondary">Enviados</div><div class="text-base sm:text-lg font-semibold theme-text-primary truncate">${ssrInterpolate(unref(orderStats).shipped)}</div></div></div></div><div class="theme-card-bg rounded-lg p-3 sm:p-4 border theme-card-border"><div class="flex items-center gap-2 sm:gap-3"><div class="w-8 h-8 sm:w-10 sm:h-10 bg-pink-100 rounded-full flex items-center justify-center shrink-0">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:currency-dollar",
        class: "w-4 h-4 sm:w-5 sm:h-5 text-pink-600"
      }, null, _parent));
      _push(`</div><div class="min-w-0"><div class="text-xs sm:text-sm theme-text-secondary">Total Gastado</div><div class="text-base sm:text-lg font-semibold theme-text-primary truncate">${ssrInterpolate(unref(formatCOP)(unref(totalSpent)))}</div></div></div></div></div><div class="theme-card-bg rounded-lg shadow-sm"><div class="p-6 border-b theme-border"><h2 class="text-lg font-semibold theme-text-primary">Historial de Pedidos</h2></div>`);
      if (unref(ordersLoading)) {
        _push(`<div class="p-8 text-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:arrow-path",
          class: "w-8 h-8 mx-auto mb-4 text-pink-500 animate-spin"
        }, null, _parent));
        _push(`<p class="theme-text-secondary">Cargando pedidos...</p></div>`);
      } else if (unref(orders).length === 0) {
        _push(`<div class="p-8 text-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:shopping-bag",
          class: "w-16 h-16 mx-auto mb-4 text-gray-400"
        }, null, _parent));
        _push(`<h3 class="text-lg font-semibold theme-text-primary mb-2">No tienes pedidos</h3><p class="theme-text-secondary mb-4">Cuando realices tu primera compra, aparecer\xE1 aqu\xED.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/shop",
          class: "inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: "heroicons:shopping-bag",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Comenzar a Comprar `);
            } else {
              return [
                createVNode(_component_Icon, {
                  name: "heroicons:shopping-bag",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" Comenzar a Comprar ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="divide-y theme-border"><!--[-->`);
        ssrRenderList(unref(orders), (order) => {
          var _a;
          _push(`<div class="p-4 sm:p-6 hover:bg-gray-50 transition-colors"><div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4"><div class="flex items-center gap-3 sm:gap-4"><div class="w-10 h-10 sm:w-12 sm:h-12 bg-pink-100 rounded-full flex items-center justify-center shrink-0">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:receipt-percent",
            class: "w-5 h-5 sm:w-6 sm:h-6 text-pink-600"
          }, null, _parent));
          _push(`</div><div class="min-w-0"><h3 class="text-base sm:text-lg font-semibold theme-text-primary truncate"> Pedido #${ssrInterpolate((order.id_order || "").slice(0, 8))}</h3><p class="text-xs sm:text-sm theme-text-secondary">${ssrInterpolate(formatDate(order.created_at))}</p></div></div><div class="flex flex-wrap items-center gap-2 sm:gap-3"><span class="${ssrRenderClass([getStatusClass(order.status), "px-2.5 py-1 text-xs sm:text-sm font-medium rounded-full shrink-0"])}">${ssrInterpolate(getStatusText(order.status))}</span><div class="text-left sm:text-right w-full sm:w-auto"><div class="text-base sm:text-lg font-bold theme-text-primary">${ssrInterpolate(unref(formatCOP)(order.total_amount || 0))}</div><div class="text-xs theme-text-secondary">${ssrInterpolate(((_a = order.order_items) == null ? void 0 : _a.length) || 0)} producto(s)</div></div></div></div><div class="mb-4"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"><!--[-->`);
          ssrRenderList(order.order_items, (item) => {
            var _a2, _b, _c, _d;
            _push(`<div class="flex items-center gap-3 p-3 bg-white rounded-lg border"><div class="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">`);
            if ((_a2 = item.product) == null ? void 0 : _a2.image_url) {
              _push(`<img${ssrRenderAttr("src", item.product.image_url)}${ssrRenderAttr("alt", (_b = item.product) == null ? void 0 : _b.name)} class="w-full h-full object-cover">`);
            } else {
              _push(ssrRenderComponent(_component_Icon, {
                name: "heroicons:cube",
                class: "w-6 h-6 text-pink-500"
              }, null, _parent));
            }
            _push(`</div><div class="flex-1 min-w-0"><div class="font-medium theme-text-primary truncate">${ssrInterpolate((_c = item.product) == null ? void 0 : _c.name)}</div><div class="text-sm theme-text-secondary">SKU: ${ssrInterpolate((_d = item.product) == null ? void 0 : _d.sku)}</div><div class="text-sm theme-text-secondary">Cant: ${ssrInterpolate(item.quantity)}</div></div><div class="text-sm font-medium theme-text-primary">${ssrInterpolate(unref(formatCOP)(item.total_price || item.quantity * item.unit_price))}</div></div>`);
          });
          _push(`<!--]--></div></div><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t theme-border"><div class="flex flex-wrap items-center gap-2">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/orders/${order.id_order}`,
            class: "inline-flex items-center px-3 py-2 text-xs sm:text-sm theme-button hover:theme-button-hover transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_Icon, {
                  name: "heroicons:eye",
                  class: "w-4 h-4 mr-1 shrink-0"
                }, null, _parent2, _scopeId));
                _push2(` Ver Detalles `);
              } else {
                return [
                  createVNode(_component_Icon, {
                    name: "heroicons:eye",
                    class: "w-4 h-4 mr-1 shrink-0"
                  }),
                  createTextVNode(" Ver Detalles ")
                ];
              }
            }),
            _: 2
          }, _parent));
          if (order.status === "pending") {
            _push(`<button class="inline-flex items-center px-3 py-2 text-xs sm:text-sm text-red-600 hover:text-red-700 transition-colors">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:x-circle",
              class: "w-4 h-4 mr-1 shrink-0"
            }, null, _parent));
            _push(` Cancelar </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="text-xs sm:text-sm theme-text-secondary">`);
          if (order.status === "pending") {
            _push(`<div>`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:clock",
              class: "w-4 h-4 inline mr-1"
            }, null, _parent));
            _push(` Pendiente de pago </div>`);
          } else if (order.status === "confirmed") {
            _push(`<div>`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:check-circle",
              class: "w-4 h-4 inline mr-1 text-green-500"
            }, null, _parent));
            _push(` Confirmado </div>`);
          } else if (order.status === "shipped") {
            _push(`<div>`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:truck",
              class: "w-4 h-4 inline mr-1 text-blue-500"
            }, null, _parent));
            _push(` En camino </div>`);
          } else if (order.status === "delivered") {
            _push(`<div>`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:check-badge",
              class: "w-4 h-4 inline mr-1 text-green-500"
            }, null, _parent));
            _push(` Entregado </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/orders.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=orders-SVyzYRxF.mjs.map
