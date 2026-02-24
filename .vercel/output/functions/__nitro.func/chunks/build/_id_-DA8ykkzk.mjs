import { r as useRoute, a as __nuxt_component_0, _ as __nuxt_component_1$1 } from './server.mjs';
import { ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const loading = ref(true);
    const order = ref(null);
    const { formatCOP } = useCurrency();
    const formatDate = (d) => new Date(d).toLocaleString();
    const statusClass = (s) => ({
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    })[s] || "bg-gray-100 text-gray-800";
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-5xl mx-auto p-6" }, _attrs))}><div class="flex items-center justify-between mb-6"><h1 class="text-2xl font-bold text-gray-900">Pedido #${ssrInterpolate((((_a = unref(order)) == null ? void 0 : _a.id_order) || "").slice(0, 8))}</h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/shop/cart",
        class: "text-pink-600 hover:text-pink-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Volver al carrito`);
          } else {
            return [
              createTextVNode("Volver al carrito")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(loading)) {
        _push(`<div class="text-gray-600">Cargando pedido...</div>`);
      } else if (!unref(order)) {
        _push(`<div class="text-gray-600">Pedido no encontrado.</div>`);
      } else {
        _push(`<div class="space-y-6"><div class="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"><div class="space-y-1"><div class="text-sm text-gray-500">Fecha: ${ssrInterpolate(formatDate(unref(order).created_at))}</div><div class="text-sm text-gray-500">Estado de pago: ${ssrInterpolate(unref(order).payment_status || "pending")}</div></div><div class="flex items-center gap-3"><span class="${ssrRenderClass([statusClass(unref(order).status), "px-2 py-1 rounded text-xs font-medium"])}">${ssrInterpolate(unref(order).status)}</span>`);
        if (unref(order).status === "pending") {
          _push(`<button class="px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"> Cancelar pedido </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="bg-white rounded-lg shadow-sm"><div class="p-4 border-b text-lg font-semibold text-gray-900">Productos</div><div><!--[-->`);
        ssrRenderList(unref(order).order_items || [], (it) => {
          var _a2, _b, _c, _d;
          _push(`<div class="p-4 border-b flex items-center gap-4"><div class="w-16 h-16 rounded bg-gray-100 flex items-center justify-center overflow-hidden">`);
          if ((_a2 = it.product) == null ? void 0 : _a2.image_url) {
            _push(`<img${ssrRenderAttr("src", it.product.image_url)}${ssrRenderAttr("alt", (_b = it.product) == null ? void 0 : _b.name)} class="w-full h-full object-cover">`);
          } else {
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:shopping-bag",
              class: "w-6 h-6 text-pink-500"
            }, null, _parent));
          }
          _push(`</div><div class="flex-1 min-w-0"><div class="font-medium text-gray-900 truncate">${ssrInterpolate((_c = it.product) == null ? void 0 : _c.name)}</div><div class="text-sm text-gray-600">SKU: ${ssrInterpolate((_d = it.product) == null ? void 0 : _d.sku)} \xB7 Cant: ${ssrInterpolate(it.quantity)}</div></div><div class="text-sm font-semibold text-gray-900">${ssrInterpolate(unref(formatCOP)(it.total_price || it.quantity * it.unit_price))}</div></div>`);
        });
        _push(`<!--]--></div><div class="p-4 text-right space-y-1"><div class="text-gray-700">Subtotal: ${ssrInterpolate(unref(formatCOP)(unref(order).subtotal || 0))}</div><div class="text-gray-700">Impuestos: ${ssrInterpolate(unref(formatCOP)(unref(order).tax_amount || 0))}</div><div class="text-gray-900 font-bold">Total: ${ssrInterpolate(unref(formatCOP)(unref(order).total_amount || 0))}</div></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/orders/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-DA8ykkzk.mjs.map
