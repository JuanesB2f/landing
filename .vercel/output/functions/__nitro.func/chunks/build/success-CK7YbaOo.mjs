import { b as useNuxtApp, r as useRoute, s as useHead, _ as __nuxt_component_1$1, a as __nuxt_component_0 } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "success",
  __ssrInlineRender: true,
  setup(__props) {
    const { formatCOP } = useCurrency();
    const { $toast } = useNuxtApp();
    const route = useRoute();
    const loading = ref(true);
    const error = ref("");
    const orderDetails = ref(null);
    route.query.order_id;
    const getStatusText = (status) => {
      const statusMap = {
        paid: "Pagado",
        pending: "Pendiente",
        failed: "Fallido",
        refunded: "Reembolsado"
      };
      return statusMap[status] || status;
    };
    useHead({
      title: "Pago Exitoso - Mi E-commerce",
      meta: [
        { name: "description", content: "Tu pago ha sido procesado exitosamente. Gracias por tu compra." }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Icon = __nuxt_component_1$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4" }, _attrs))} data-v-020c17f6><div class="max-w-md w-full" data-v-020c17f6><div class="bg-white rounded-2xl shadow-xl p-8 text-center" data-v-020c17f6><div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6" data-v-020c17f6>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:check-circle",
        class: "w-12 h-12 text-green-600"
      }, null, _parent));
      _push(`</div><h1 class="text-2xl font-bold text-gray-900 mb-2" data-v-020c17f6>\xA1Pago Exitoso!</h1><p class="text-gray-600 mb-6" data-v-020c17f6> Tu pedido ha sido procesado correctamente. Recibir\xE1s un email de confirmaci\xF3n en breve. </p>`);
      if (unref(orderDetails)) {
        _push(`<div class="bg-gray-50 rounded-lg p-4 mb-6 text-left" data-v-020c17f6><h3 class="font-semibold text-gray-900 mb-3" data-v-020c17f6>Detalles del Pedido</h3><div class="space-y-2 text-sm" data-v-020c17f6><div class="flex justify-between" data-v-020c17f6><span class="text-gray-600" data-v-020c17f6>N\xFAmero de Pedido:</span><span class="font-medium" data-v-020c17f6>#${ssrInterpolate((_a = unref(orderDetails).id_order) == null ? void 0 : _a.slice(0, 8))}</span></div><div class="flex justify-between" data-v-020c17f6><span class="text-gray-600" data-v-020c17f6>Total Pagado:</span><span class="font-medium text-green-600" data-v-020c17f6>${ssrInterpolate(unref(formatCOP)(unref(orderDetails).total_amount))}</span></div><div class="flex justify-between" data-v-020c17f6><span class="text-gray-600" data-v-020c17f6>Estado:</span><span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full" data-v-020c17f6>${ssrInterpolate(getStatusText(unref(orderDetails).payment_status))}</span></div></div></div>`);
      } else if (unref(loading)) {
        _push(`<div class="bg-gray-50 rounded-lg p-4 mb-6" data-v-020c17f6><div class="flex items-center justify-center" data-v-020c17f6>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "svg-spinners:ring-resize",
          class: "w-6 h-6 text-pink-600 mr-2"
        }, null, _parent));
        _push(`<span class="text-gray-600" data-v-020c17f6>Cargando detalles del pedido...</span></div></div>`);
      } else if (unref(error)) {
        _push(`<div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6" data-v-020c17f6><div class="flex items-center" data-v-020c17f6>`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:exclamation-triangle",
          class: "w-5 h-5 text-red-500 mr-2"
        }, null, _parent));
        _push(`<span class="text-red-700 text-sm" data-v-020c17f6>${ssrInterpolate(unref(error))}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="space-y-3" data-v-020c17f6>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/user",
        class: "w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors inline-block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Ver Mis Pedidos `);
          } else {
            return [
              createTextVNode(" Ver Mis Pedidos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/shop",
        class: "w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Continuar Comprando `);
          } else {
            return [
              createTextVNode(" Continuar Comprando ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-6 pt-6 border-t border-gray-200" data-v-020c17f6><div class="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2" data-v-020c17f6>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:envelope",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span data-v-020c17f6>Recibir\xE1s un email de confirmaci\xF3n</span></div><div class="flex items-center justify-center gap-2 text-sm text-gray-500" data-v-020c17f6>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:clock",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span data-v-020c17f6>El admin revisar\xE1 tu pedido pronto</span></div></div></div><div class="text-center mt-6" data-v-020c17f6><div class="inline-flex items-center gap-2 text-sm text-gray-500" data-v-020c17f6>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:shield-check",
        class: "w-4 h-4 text-green-500"
      }, null, _parent));
      _push(`<span data-v-020c17f6>Pago procesado de forma segura con MercadoPago</span></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/success.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const success = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-020c17f6"]]);

export { success as default };
//# sourceMappingURL=success-CK7YbaOo.mjs.map
