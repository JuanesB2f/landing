import { b as useNuxtApp, _ as __nuxt_component_1$1, a as __nuxt_component_0 } from './server.mjs';
import { ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, defineComponent, reactive, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { u as useCartStore } from './cart-E1qf9VCw.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MercadoPagoModal",
  __ssrInlineRender: true,
  props: {
    orderId: {}
  },
  emits: ["close", "success"],
  setup(__props, { emit: __emit }) {
    const cart = useCartStore();
    const { formatCOP } = useCurrency();
    const { $toast } = useNuxtApp();
    const processing = ref(false);
    const acceptTerms = ref(false);
    const shippingInfo = reactive({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postal_code: ""
    });
    const canProcessPayment = computed(() => {
      return acceptTerms.value && shippingInfo.name.trim() && shippingInfo.phone.trim() && shippingInfo.address.trim() && shippingInfo.city.trim() && shippingInfo.state.trim() && shippingInfo.postal_code.trim();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" }, _attrs))} data-v-3b2cc5eb><div class="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" data-v-3b2cc5eb><div class="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl" data-v-3b2cc5eb><div class="flex items-center justify-between" data-v-3b2cc5eb><h2 class="text-2xl font-bold text-gray-900" data-v-3b2cc5eb>Finalizar Compra</h2><button class="p-2 rounded-lg hover:bg-gray-100 transition-colors" data-v-3b2cc5eb>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:x-mark",
        class: "w-6 h-6 text-gray-500"
      }, null, _parent));
      _push(`</button></div></div><div class="p-6 space-y-6" data-v-3b2cc5eb><div class="bg-gray-50 rounded-lg p-4" data-v-3b2cc5eb><h3 class="text-lg font-semibold text-gray-900 mb-3" data-v-3b2cc5eb>Resumen del Pedido</h3><div class="space-y-2" data-v-3b2cc5eb><!--[-->`);
      ssrRenderList(unref(cart).items, (item) => {
        _push(`<div class="flex items-center justify-between" data-v-3b2cc5eb><div class="flex items-center gap-3" data-v-3b2cc5eb><div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden" data-v-3b2cc5eb>`);
        if (item.image_url) {
          _push(`<img${ssrRenderAttr("src", item.image_url)}${ssrRenderAttr("alt", item.name)} class="w-full h-full object-cover" data-v-3b2cc5eb>`);
        } else {
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:shopping-bag",
            class: "w-6 h-6 text-pink-500"
          }, null, _parent));
        }
        _push(`</div><div data-v-3b2cc5eb><div class="font-medium text-gray-900" data-v-3b2cc5eb>${ssrInterpolate(item.name)}</div><div class="text-sm text-gray-500" data-v-3b2cc5eb>Cantidad: ${ssrInterpolate(item.quantity)}</div></div></div><div class="text-right" data-v-3b2cc5eb><div class="font-semibold text-gray-900" data-v-3b2cc5eb>${ssrInterpolate(unref(formatCOP)(item.price * item.quantity))}</div></div></div>`);
      });
      _push(`<!--]--></div><div class="border-t border-gray-200 mt-4 pt-4 space-y-2" data-v-3b2cc5eb><div class="flex justify-between text-sm" data-v-3b2cc5eb><span class="text-gray-600" data-v-3b2cc5eb>Subtotal</span><span class="font-medium" data-v-3b2cc5eb>${ssrInterpolate(unref(formatCOP)(unref(cart).subtotal))}</span></div><div class="flex justify-between text-sm" data-v-3b2cc5eb><span class="text-gray-600" data-v-3b2cc5eb>Env\xEDo</span><span class="font-medium" data-v-3b2cc5eb>${ssrInterpolate(unref(formatCOP)(unref(cart).shippingAmount))}</span></div><div class="flex justify-between text-sm" data-v-3b2cc5eb><span class="text-gray-600" data-v-3b2cc5eb>Impuestos</span><span class="font-medium" data-v-3b2cc5eb>${ssrInterpolate(unref(formatCOP)(unref(cart).taxAmount))}</span></div><div class="flex justify-between text-lg font-bold border-t border-gray-200 pt-2" data-v-3b2cc5eb><span class="text-gray-900" data-v-3b2cc5eb>Total</span><span class="text-pink-600" data-v-3b2cc5eb>${ssrInterpolate(unref(formatCOP)(unref(cart).total))}</span></div></div></div><div class="space-y-4" data-v-3b2cc5eb><h3 class="text-lg font-semibold text-gray-900" data-v-3b2cc5eb>Informaci\xF3n de Env\xEDo</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-3b2cc5eb><div data-v-3b2cc5eb><label class="block text-sm font-medium text-gray-700 mb-1" data-v-3b2cc5eb>Nombre Completo</label><input${ssrRenderAttr("value", unref(shippingInfo).name)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Tu nombre completo" data-v-3b2cc5eb></div><div data-v-3b2cc5eb><label class="block text-sm font-medium text-gray-700 mb-1" data-v-3b2cc5eb>Tel\xE9fono</label><input${ssrRenderAttr("value", unref(shippingInfo).phone)} type="tel" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="+57 300 123 4567" data-v-3b2cc5eb></div></div><div data-v-3b2cc5eb><label class="block text-sm font-medium text-gray-700 mb-1" data-v-3b2cc5eb>Direcci\xF3n</label><input${ssrRenderAttr("value", unref(shippingInfo).address)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Calle 123 #45-67" data-v-3b2cc5eb></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-3b2cc5eb><div data-v-3b2cc5eb><label class="block text-sm font-medium text-gray-700 mb-1" data-v-3b2cc5eb>Ciudad</label><input${ssrRenderAttr("value", unref(shippingInfo).city)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Bogot\xE1" data-v-3b2cc5eb></div><div data-v-3b2cc5eb><label class="block text-sm font-medium text-gray-700 mb-1" data-v-3b2cc5eb>Departamento</label><input${ssrRenderAttr("value", unref(shippingInfo).state)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Cundinamarca" data-v-3b2cc5eb></div><div data-v-3b2cc5eb><label class="block text-sm font-medium text-gray-700 mb-1" data-v-3b2cc5eb>C\xF3digo Postal</label><input${ssrRenderAttr("value", unref(shippingInfo).postal_code)} type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="110111" data-v-3b2cc5eb></div></div></div><div class="space-y-4" data-v-3b2cc5eb><h3 class="text-lg font-semibold text-gray-900" data-v-3b2cc5eb>M\xE9todo de Pago</h3><div class="border border-gray-200 rounded-lg p-4" data-v-3b2cc5eb><div class="flex items-center gap-3 mb-3" data-v-3b2cc5eb><img src="https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg" alt="MercadoPago" class="w-8 h-8" data-v-3b2cc5eb><div data-v-3b2cc5eb><div class="font-medium text-gray-900" data-v-3b2cc5eb>Pago Seguro con MercadoPago</div><div class="text-sm text-gray-500" data-v-3b2cc5eb>Tarjetas, PSE, Nequi, Daviplata y m\xE1s</div></div></div><div class="flex items-center gap-2 text-sm text-gray-600" data-v-3b2cc5eb>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:shield-check",
        class: "w-4 h-4 text-green-500"
      }, null, _parent));
      _push(`<span data-v-3b2cc5eb>Transacci\xF3n 100% segura y encriptada</span></div></div></div><div class="flex items-start gap-3" data-v-3b2cc5eb><input${ssrIncludeBooleanAttr(Array.isArray(unref(acceptTerms)) ? ssrLooseContain(unref(acceptTerms), null) : unref(acceptTerms)) ? " checked" : ""} type="checkbox" required class="mt-1 rounded border-gray-300 text-pink-600 focus:ring-pink-500" data-v-3b2cc5eb><label class="text-sm text-gray-600" data-v-3b2cc5eb> Acepto los <a href="#" class="text-pink-600 hover:text-pink-700 underline" data-v-3b2cc5eb>t\xE9rminos y condiciones</a> y la <a href="#" class="text-pink-600 hover:text-pink-700 underline" data-v-3b2cc5eb>pol\xEDtica de privacidad</a></label></div></div><div class="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-xl" data-v-3b2cc5eb><div class="flex items-center justify-between" data-v-3b2cc5eb><div class="text-sm text-gray-500" data-v-3b2cc5eb>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:lock-closed",
        class: "w-4 h-4 inline mr-1"
      }, null, _parent));
      _push(` Pago seguro y protegido </div><div class="flex items-center gap-3" data-v-3b2cc5eb><button class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors" data-v-3b2cc5eb> Cancelar </button><button${ssrIncludeBooleanAttr(!unref(canProcessPayment) || unref(processing)) ? " disabled" : ""} class="px-8 py-2 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2" data-v-3b2cc5eb>`);
      if (unref(processing)) {
        _push(ssrRenderComponent(_component_Icon, {
          name: "svg-spinners:ring-resize",
          class: "w-4 h-4"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(unref(processing) ? "Procesando..." : `Pagar ${unref(formatCOP)(unref(cart).total)}`)}</button></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/checkout/MercadoPagoModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-3b2cc5eb"]]);
const _sfc_main = {
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const cart = useCartStore();
    const { formatCOP } = useCurrency();
    const { $toast } = useNuxtApp();
    const showPaymentModal = ref(false);
    const closePaymentModal = () => {
      showPaymentModal.value = false;
    };
    const onPaymentSuccess = () => {
      showPaymentModal.value = false;
    };
    const myReservations = ref([]);
    const reservationStatus = (productId) => {
      var _a;
      const list = myReservations.value.filter((r) => r.product_id === productId).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      return ((_a = list[0]) == null ? void 0 : _a.status) || null;
    };
    const badgeClass = (status) => {
      const map = {
        pending: "bg-yellow-100 text-yellow-800",
        converted: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800"
      };
      return map[status] || "bg-gray-100 text-gray-800";
    };
    const badgeText = (status) => {
      const map = { pending: "Pendiente", converted: "Aprobado", cancelled: "Cancelado" };
      return map[status] || "Estado";
    };
    const myOrders = ref([]);
    const autoRefresh = ref(false);
    const formatDate = (d) => new Date(d).toLocaleString();
    const getStatusClass = (s) => ({ pending: "bg-yellow-100 text-yellow-800", confirmed: "bg-blue-100 text-blue-800", shipped: "bg-purple-100 text-purple-800", delivered: "bg-green-100 text-green-800", cancelled: "bg-red-100 text-red-800" })[s] || "bg-gray-100 text-gray-800";
    const getStatusText = (s) => ({ pending: "Pendiente", confirmed: "Confirmado", shipped: "Enviado", delivered: "Entregado", cancelled: "Cancelado" })[s] || s;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_MercadoPagoModal = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-8" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h1 class="text-3xl font-bold text-gray-900 mb-8">Carrito de Compras</h1>`);
      if (unref(cart).items.length > 0) {
        _push(`<div class="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6 mb-8 border border-pink-200"><div class="flex items-center justify-between"><div class="flex items-center gap-4"><div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:shopping-cart",
          class: "w-6 h-6 text-pink-600"
        }, null, _parent));
        _push(`</div><div><h2 class="text-lg font-semibold text-gray-900">Tu Carrito</h2><p class="text-sm text-gray-600">${ssrInterpolate(unref(cart).count)} producto(s) \u2022 Total: ${ssrInterpolate(unref(formatCOP)(unref(cart).total))}</p></div></div><div class="text-right"><div class="text-2xl font-bold text-pink-600">${ssrInterpolate(unref(formatCOP)(unref(cart).total))}</div><div class="text-sm text-gray-500">Incluye env\xEDo e impuestos</div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2"><div class="bg-white rounded-lg shadow-sm"><div class="p-6 border-b flex items-center justify-between"><h2 class="text-lg font-semibold text-gray-900">Productos (${ssrInterpolate(unref(cart).count)})</h2><div class="flex items-center gap-2"><button class="px-3 py-2 text-sm border rounded hover:bg-gray-50">Refrescar estados</button><label class="inline-flex items-center gap-2 text-sm text-gray-600"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(autoRefresh)) ? ssrLooseContain(unref(autoRefresh), null) : unref(autoRefresh)) ? " checked" : ""} class="rounded border-gray-300"> Auto </label></div></div>`);
      if (unref(cart).items.length === 0) {
        _push(`<div class="p-6 text-gray-600">Tu carrito est\xE1 vac\xEDo.</div>`);
      } else {
        _push(`<div><!--[-->`);
        ssrRenderList(unref(cart).items, (it) => {
          _push(`<div class="p-6 border-b"><div class="flex items-center space-x-4"><div class="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">`);
          if (it.image_url) {
            _push(`<img${ssrRenderAttr("src", it.image_url)}${ssrRenderAttr("alt", it.name)} class="w-full h-full object-cover">`);
          } else {
            _push(ssrRenderComponent(_component_Icon, {
              name: "heroicons:shopping-bag",
              class: "w-8 h-8 text-pink-500"
            }, null, _parent));
          }
          _push(`</div><div class="flex-1 min-w-0"><h3 class="font-semibold text-gray-900 truncate">${ssrInterpolate(it.name)}</h3><p class="text-gray-600 text-sm">SKU: ${ssrInterpolate(it.sku)}</p><div class="flex items-center space-x-4 mt-2"><div class="flex items-center border border-gray-300 rounded-lg"><button class="px-3 py-1 hover:bg-gray-100">-</button><span class="px-3 py-1">${ssrInterpolate(it.quantity)}</span><button class="px-3 py-1 hover:bg-gray-100">+</button></div><span class="text-lg font-bold text-pink-600">${ssrInterpolate(unref(formatCOP)(it.price * it.quantity))}</span></div></div><div class="flex items-center gap-3">`);
          if (reservationStatus(it.product_id)) {
            _push(`<span class="${ssrRenderClass([
              "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded",
              badgeClass(reservationStatus(it.product_id))
            ])}">${ssrInterpolate(badgeText(reservationStatus(it.product_id)))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="text-red-500 hover:text-red-700">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:trash",
            class: "w-5 h-5"
          }, null, _parent));
          _push(`</button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div><div class="lg:col-span-1"><div class="bg-white rounded-lg shadow-sm p-6"><h2 class="text-lg font-semibold text-gray-900 mb-4">Resumen del Pedido</h2><div class="space-y-3 mb-6"><div class="flex justify-between"><span class="text-gray-600">Subtotal</span><span class="font-semibold">${ssrInterpolate(unref(formatCOP)(unref(cart).subtotal))}</span></div><div class="flex justify-between"><span class="text-gray-600">Env\xEDo</span><span class="font-semibold">${ssrInterpolate(unref(formatCOP)(unref(cart).shippingAmount))}</span></div><div class="flex justify-between"><span class="text-gray-600">Impuestos</span><span class="font-semibold">${ssrInterpolate(unref(formatCOP)(unref(cart).taxAmount))}</span></div><div class="border-t pt-3"><div class="flex justify-between"><span class="text-lg font-bold text-gray-900">Total</span><span class="text-lg font-bold text-pink-600">${ssrInterpolate(unref(formatCOP)(unref(cart).total))}</span></div></div></div><button class="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"> Proceder al Pago </button><div class="mt-4 text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/shop",
        class: "text-pink-600 hover:text-pink-700 text-sm"
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
      _push(`</div><div class="mt-8"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-gray-900">Mis Pedidos</h3><button class="text-pink-600 hover:text-pink-700 text-sm font-medium">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:arrow-path",
        class: "w-4 h-4 inline mr-1"
      }, null, _parent));
      _push(` Actualizar </button></div>`);
      if (unref(myOrders).length === 0) {
        _push(`<div class="text-center py-8 text-gray-600">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:shopping-bag",
          class: "w-12 h-12 mx-auto mb-2 text-gray-400"
        }, null, _parent));
        _push(`<p class="text-sm">A\xFAn no tienes pedidos.</p><p class="text-xs text-gray-500 mt-1">Tus pedidos aparecer\xE1n aqu\xED despu\xE9s de completar una compra.</p></div>`);
      } else {
        _push(`<div class="space-y-4 max-h-96 overflow-auto"><!--[-->`);
        ssrRenderList(unref(myOrders), (o) => {
          var _a;
          _push(`<div class="border border-gray-200 rounded-lg p-4 bg-gray-50"><div class="flex items-center justify-between mb-3"><div class="flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/orders/${o.id_order}`,
            class: "font-semibold text-pink-600 hover:text-pink-700"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Pedido #${ssrInterpolate((o.id_order || "").slice(0, 8))}`);
              } else {
                return [
                  createTextVNode(" Pedido #" + toDisplayString((o.id_order || "").slice(0, 8)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<span class="text-xs text-gray-500">${ssrInterpolate(formatDate(o.created_at))}</span></div><span class="${ssrRenderClass([getStatusClass(o.status), "px-2 py-1 text-xs font-medium rounded-full"])}">${ssrInterpolate(getStatusText(o.status))}</span></div><div class="space-y-2 mb-3"><!--[-->`);
          ssrRenderList((o.order_items || []).slice(0, 2), (item) => {
            var _a2, _b, _c;
            _push(`<div class="flex items-center gap-2 text-sm"><div class="w-8 h-8 bg-white rounded flex items-center justify-center overflow-hidden">`);
            if ((_a2 = item.product) == null ? void 0 : _a2.image_url) {
              _push(`<img${ssrRenderAttr("src", item.product.image_url)}${ssrRenderAttr("alt", (_b = item.product) == null ? void 0 : _b.name)} class="w-full h-full object-cover">`);
            } else {
              _push(ssrRenderComponent(_component_Icon, {
                name: "heroicons:cube",
                class: "w-4 h-4 text-pink-500"
              }, null, _parent));
            }
            _push(`</div><div class="flex-1 min-w-0"><div class="font-medium text-gray-900 truncate">${ssrInterpolate((_c = item.product) == null ? void 0 : _c.name)}</div><div class="text-xs text-gray-500">Cant: ${ssrInterpolate(item.quantity)}</div></div><div class="text-xs font-medium text-gray-900">${ssrInterpolate(unref(formatCOP)(item.total_price || item.quantity * item.unit_price))}</div></div>`);
          });
          _push(`<!--]-->`);
          if ((o.order_items || []).length > 2) {
            _push(`<div class="text-xs text-gray-500 pl-10"> +${ssrInterpolate((o.order_items || []).length - 2)} producto(s) m\xE1s </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex items-center justify-between pt-2 border-t border-gray-200"><div class="text-sm"><span class="text-gray-600">${ssrInterpolate(((_a = o.order_items) == null ? void 0 : _a.length) || 0)} producto(s)</span><span class="text-gray-400 mx-2">\u2022</span><span class="text-gray-600">Total: </span><span class="font-semibold text-pink-600">${ssrInterpolate(unref(formatCOP)(o.total_amount || 0))}</span></div><div class="flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/orders/${o.id_order}`,
            class: "text-xs text-pink-600 hover:text-pink-700 font-medium"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Ver detalles `);
              } else {
                return [
                  createTextVNode(" Ver detalles ")
                ];
              }
            }),
            _: 2
          }, _parent));
          if (o.status === "pending") {
            _push(`<button class="text-xs text-red-600 hover:text-red-700 font-medium"> Cancelar </button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (unref(myOrders).length > 0) {
        _push(`<div class="mt-4 text-center">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/user/orders",
          class: "text-sm text-pink-600 hover:text-pink-700 font-medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Ver todos mis pedidos `);
            } else {
              return [
                createTextVNode(" Ver todos mis pedidos ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></div>`);
      if (unref(showPaymentModal)) {
        _push(ssrRenderComponent(_component_MercadoPagoModal, {
          onClose: closePaymentModal,
          onSuccess: onPaymentSuccess
        }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shop/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cart-BfIR1SXO.mjs.map
