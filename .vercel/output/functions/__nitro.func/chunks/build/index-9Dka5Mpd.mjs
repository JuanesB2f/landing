import { b as useNuxtApp, _ as __nuxt_component_1$1 } from './server.mjs';
import { ref, computed, unref, defineComponent, watch, mergeProps, reactive, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useCurrency } from './useCurrency-BsXMBrUs.mjs';
import { _ as _sfc_main$4 } from './ConfirmModal-BE9Uf8q9.mjs';
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

const _sfc_main$3 = {
  __name: "OrderModal",
  __ssrInlineRender: true,
  props: {
    order: {
      type: Object,
      default: null
    }
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const loading = ref(false);
    const customers = ref([]);
    const products = ref([]);
    const form = ref({
      customer_id: "",
      status: "pending",
      shipping_address: "",
      billing_address: "",
      payment_method: "",
      payment_status: "pending",
      tracking_number: "",
      tax_amount: 0,
      shipping_amount: 0,
      total_amount: 0,
      notes: "",
      order_items: [
        {
          product_id: "",
          quantity: 1,
          unit_price: 0,
          total_price: 0
        }
      ]
    });
    const subtotal = computed(() => {
      return form.value.order_items.reduce((sum, item) => sum + (item.total_price || 0), 0);
    });
    const total = computed(() => {
      return subtotal.value + (form.value.tax_amount || 0) + (form.value.shipping_amount || 0);
    });
    const { formatCOP } = useCurrency();
    const formatPrice = (price) => formatCOP(price);
    watch(() => props.order, (newOrder) => {
      var _a;
      if (newOrder) {
        form.value = {
          customer_id: newOrder.customer_id || "",
          status: newOrder.status || "pending",
          shipping_address: newOrder.shipping_address || "",
          billing_address: newOrder.billing_address || "",
          payment_method: newOrder.payment_method || "",
          payment_status: newOrder.payment_status || "pending",
          tracking_number: newOrder.tracking_number || "",
          tax_amount: newOrder.tax_amount || 0,
          shipping_amount: newOrder.shipping_amount || 0,
          total_amount: newOrder.total_amount || 0,
          notes: newOrder.notes || "",
          order_items: ((_a = newOrder.order_items) == null ? void 0 : _a.length) ? [...newOrder.order_items] : [
            {
              product_id: "",
              quantity: 1,
              unit_price: 0,
              total_price: 0
            }
          ]
        };
      } else {
        form.value = {
          customer_id: "",
          status: "pending",
          shipping_address: "",
          billing_address: "",
          payment_method: "",
          payment_status: "pending",
          tracking_number: "",
          tax_amount: 0,
          shipping_amount: 0,
          total_amount: 0,
          notes: "",
          order_items: [
            {
              product_id: "",
              quantity: 1,
              unit_price: 0,
              total_price: 0
            }
          ]
        };
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" }, _attrs))}><div class="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white"><div class="mt-3"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-medium text-gray-900">${ssrInterpolate(__props.order ? "Editar Pedido" : "Nuevo Pedido")}</h3><button class="text-gray-400 hover:text-gray-600">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:x-mark",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</button></div><form class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Cliente * </label><select required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).customer_id) ? ssrLooseContain(unref(form).customer_id, "") : ssrLooseEqual(unref(form).customer_id, "")) ? " selected" : ""}>Seleccionar cliente</option><!--[-->`);
      ssrRenderList(unref(customers), (customer) => {
        _push(`<option${ssrRenderAttr("value", customer.id_customer)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).customer_id) ? ssrLooseContain(unref(form).customer_id, customer.id_customer) : ssrLooseEqual(unref(form).customer_id, customer.id_customer)) ? " selected" : ""}>${ssrInterpolate(customer.first_name)} ${ssrInterpolate(customer.last_name)} - ${ssrInterpolate(customer.email)}</option>`);
      });
      _push(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Estado del Pedido </label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "pending") : ssrLooseEqual(unref(form).status, "pending")) ? " selected" : ""}>Pendiente</option><option value="confirmed"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "confirmed") : ssrLooseEqual(unref(form).status, "confirmed")) ? " selected" : ""}>Confirmado</option><option value="shipped"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "shipped") : ssrLooseEqual(unref(form).status, "shipped")) ? " selected" : ""}>Enviado</option><option value="delivered"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "delivered") : ssrLooseEqual(unref(form).status, "delivered")) ? " selected" : ""}>Entregado</option><option value="cancelled"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "cancelled") : ssrLooseEqual(unref(form).status, "cancelled")) ? " selected" : ""}>Cancelado</option></select></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Direcci\xF3n de Env\xEDo </label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Direcci\xF3n completa de env\xEDo">${ssrInterpolate(unref(form).shipping_address)}</textarea></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Direcci\xF3n de Facturaci\xF3n </label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Direcci\xF3n de facturaci\xF3n">${ssrInterpolate(unref(form).billing_address)}</textarea></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div><label class="block text-sm font-medium text-gray-700 mb-1"> M\xE9todo de Pago </label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).payment_method) ? ssrLooseContain(unref(form).payment_method, "") : ssrLooseEqual(unref(form).payment_method, "")) ? " selected" : ""}>Seleccionar m\xE9todo</option><option value="credit_card"${ssrIncludeBooleanAttr(Array.isArray(unref(form).payment_method) ? ssrLooseContain(unref(form).payment_method, "credit_card") : ssrLooseEqual(unref(form).payment_method, "credit_card")) ? " selected" : ""}>Tarjeta de Cr\xE9dito</option><option value="debit_card"${ssrIncludeBooleanAttr(Array.isArray(unref(form).payment_method) ? ssrLooseContain(unref(form).payment_method, "debit_card") : ssrLooseEqual(unref(form).payment_method, "debit_card")) ? " selected" : ""}>Tarjeta de D\xE9bito</option><option value="paypal"${ssrIncludeBooleanAttr(Array.isArray(unref(form).payment_method) ? ssrLooseContain(unref(form).payment_method, "paypal") : ssrLooseEqual(unref(form).payment_method, "paypal")) ? " selected" : ""}>PayPal</option><option value="cash"${ssrIncludeBooleanAttr(Array.isArray(unref(form).payment_method) ? ssrLooseContain(unref(form).payment_method, "cash") : ssrLooseEqual(unref(form).payment_method, "cash")) ? " selected" : ""}>Efectivo</option><option value="bank_transfer"${ssrIncludeBooleanAttr(Array.isArray(unref(form).payment_method) ? ssrLooseContain(unref(form).payment_method, "bank_transfer") : ssrLooseEqual(unref(form).payment_method, "bank_transfer")) ? " selected" : ""}>Transferencia Bancaria</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Estado del Pago </label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(unref(form).payment_status) ? ssrLooseContain(unref(form).payment_status, "pending") : ssrLooseEqual(unref(form).payment_status, "pending")) ? " selected" : ""}>Pendiente</option><option value="paid"${ssrIncludeBooleanAttr(Array.isArray(unref(form).payment_status) ? ssrLooseContain(unref(form).payment_status, "paid") : ssrLooseEqual(unref(form).payment_status, "paid")) ? " selected" : ""}>Pagado</option><option value="failed"${ssrIncludeBooleanAttr(Array.isArray(unref(form).payment_status) ? ssrLooseContain(unref(form).payment_status, "failed") : ssrLooseEqual(unref(form).payment_status, "failed")) ? " selected" : ""}>Fallido</option><option value="refunded"${ssrIncludeBooleanAttr(Array.isArray(unref(form).payment_status) ? ssrLooseContain(unref(form).payment_status, "refunded") : ssrLooseEqual(unref(form).payment_status, "refunded")) ? " selected" : ""}>Reembolsado</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> N\xFAmero de Seguimiento </label><input${ssrRenderAttr("value", unref(form).tracking_number)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="N\xFAmero de tracking"></div></div><div><div class="flex justify-between items-center mb-4"><h4 class="text-lg font-medium text-gray-900">Productos del Pedido</h4><button type="button" class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm transition-colors">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:plus",
        class: "w-4 h-4 inline mr-1"
      }, null, _parent));
      _push(` Agregar Producto </button></div><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(form).order_items, (item, index) => {
        _push(`<div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg"><div><label class="block text-sm font-medium text-gray-700 mb-1">Producto</label><select required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(item.product_id) ? ssrLooseContain(item.product_id, "") : ssrLooseEqual(item.product_id, "")) ? " selected" : ""}>Seleccionar producto</option><!--[-->`);
        ssrRenderList(unref(products), (product) => {
          _push(`<option${ssrRenderAttr("value", product.id_product)}${ssrIncludeBooleanAttr(Array.isArray(item.product_id) ? ssrLooseContain(item.product_id, product.id_product) : ssrLooseEqual(item.product_id, product.id_product)) ? " selected" : ""}>${ssrInterpolate(product.name)} - ${ssrInterpolate(unref(formatCOP)(product.price))}</option>`);
        });
        _push(`<!--]--></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Cantidad</label><input${ssrRenderAttr("value", item.quantity)} type="number" min="1" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Precio Unitario</label><input${ssrRenderAttr("value", item.unit_price)} type="number" step="0.01" min="0" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"></div><div class="flex items-end space-x-2"><div class="flex-1"><label class="block text-sm font-medium text-gray-700 mb-1">Total</label><input${ssrRenderAttr("value", item.total_price)} type="number" step="0.01" readonly class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"></div><button type="button" class="text-red-600 hover:text-red-800 p-2" title="Eliminar producto">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:trash",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-gray-50 p-4 rounded-lg"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-2"><div class="flex justify-between"><span class="text-sm text-gray-600">Subtotal:</span><span class="text-sm font-medium">$${ssrInterpolate(formatPrice(unref(subtotal)))}</span></div><div class="flex justify-between"><span class="text-sm text-gray-600">Impuestos:</span><span class="text-sm font-medium">$${ssrInterpolate(formatPrice(unref(form).tax_amount || 0))}</span></div><div class="flex justify-between"><span class="text-sm text-gray-600">Env\xEDo:</span><span class="text-sm font-medium">$${ssrInterpolate(formatPrice(unref(form).shipping_amount || 0))}</span></div><div class="border-t pt-2"><div class="flex justify-between"><span class="text-lg font-bold text-gray-900">Total:</span><span class="text-lg font-bold text-gray-900">$${ssrInterpolate(formatPrice(unref(total)))}</span></div></div></div><div class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Impuestos</label><input${ssrRenderAttr("value", unref(form).tax_amount)} type="number" step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Env\xEDo</label><input${ssrRenderAttr("value", unref(form).shipping_amount)} type="number" step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Total del Pedido</label><input${ssrRenderAttr("value", unref(form).total_amount)} type="number" step="0.01" readonly class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-bold text-lg"></div></div></div></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Notas</label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Notas adicionales del pedido">${ssrInterpolate(unref(form).notes)}</textarea></div><div class="flex space-x-3 pt-4"><button type="button" class="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"> Cancelar </button><button type="submit"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""} class="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">`);
      if (unref(loading)) {
        _push(`<span>Guardando...</span>`);
      } else {
        _push(`<span>${ssrInterpolate(__props.order ? "Actualizar" : "Crear")}</span>`);
      }
      _push(`</button></div></form></div></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/orders/OrderModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "StatusUpdateModal",
  __ssrInlineRender: true,
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  emits: ["close", "update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const loading = ref(false);
    const form = ref({
      status: "",
      tracking_number: "",
      notes: ""
    });
    const getStatusClass = (status) => {
      const classes = {
        pending: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800",
        confirmed: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800",
        shipped: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800",
        delivered: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800",
        cancelled: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
      };
      return classes[status] || "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800";
    };
    const getStatusText = (status) => {
      const texts = {
        pending: "Pendiente",
        confirmed: "Aprobado",
        shipped: "Enviado",
        delivered: "Entregado",
        cancelled: "Cancelado"
      };
      return texts[status] || "Desconocido";
    };
    const formatPrice = (price) => {
      return parseFloat(price || 0).toFixed(2);
    };
    watch(() => props.order, (newOrder) => {
      if (newOrder) {
        form.value = {
          status: newOrder.status || "",
          tracking_number: newOrder.tracking_number || "",
          notes: ""
        };
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" }, _attrs))}><div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"><div class="mt-3"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-medium text-gray-900"> Cambiar Estado del Pedido </h3><button class="text-gray-400 hover:text-gray-600">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:x-mark",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</button></div><div class="bg-gray-50 p-4 rounded-lg mb-4"><div class="text-sm text-gray-600"><p><strong>Pedido:</strong> #${ssrInterpolate((_b = (_a = __props.order) == null ? void 0 : _a.id_order) == null ? void 0 : _b.slice(0, 8))}</p><p><strong>Cliente:</strong> ${ssrInterpolate((_d = (_c = __props.order) == null ? void 0 : _c.customer) == null ? void 0 : _d.first_name)} ${ssrInterpolate((_f = (_e = __props.order) == null ? void 0 : _e.customer) == null ? void 0 : _f.last_name)}</p><p><strong>Total:</strong> $${ssrInterpolate(formatPrice((_g = __props.order) == null ? void 0 : _g.total_amount))}</p><p><strong>Estado Actual:</strong><span class="${ssrRenderClass(getStatusClass((_h = __props.order) == null ? void 0 : _h.status))}">${ssrInterpolate(getStatusText((_i = __props.order) == null ? void 0 : _i.status))}</span></p></div></div><form class="space-y-4"><div><label class="block text-sm font-medium text-gray-700 mb-1"> Nuevo Estado * </label><select required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "") : ssrLooseEqual(unref(form).status, "")) ? " selected" : ""}>Seleccionar estado</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "pending") : ssrLooseEqual(unref(form).status, "pending")) ? " selected" : ""}>Pendiente</option><option value="confirmed"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "confirmed") : ssrLooseEqual(unref(form).status, "confirmed")) ? " selected" : ""}>Confirmado</option><option value="shipped"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "shipped") : ssrLooseEqual(unref(form).status, "shipped")) ? " selected" : ""}>Enviado</option><option value="delivered"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "delivered") : ssrLooseEqual(unref(form).status, "delivered")) ? " selected" : ""}>Entregado</option><option value="cancelled"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "cancelled") : ssrLooseEqual(unref(form).status, "cancelled")) ? " selected" : ""}>Cancelado</option></select></div>`);
      if (unref(form).status === "shipped") {
        _push(`<div><label class="block text-sm font-medium text-gray-700 mb-1"> N\xFAmero de Seguimiento </label><input${ssrRenderAttr("value", unref(form).tracking_number)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="N\xFAmero de tracking"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div><label class="block text-sm font-medium text-gray-700 mb-1"> Notas del Cambio </label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Notas sobre el cambio de estado">${ssrInterpolate(unref(form).notes)}</textarea></div><div class="flex space-x-3 pt-4"><button type="button" class="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"> Cancelar </button><button type="submit"${ssrIncludeBooleanAttr(unref(loading) || !unref(form).status) ? " disabled" : ""} class="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">`);
      if (unref(loading)) {
        _push(`<span>Actualizando...</span>`);
      } else {
        _push(`<span>Actualizar Estado</span>`);
      }
      _push(`</button></div></form></div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/orders/StatusUpdateModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PaymentUpdateModal",
  __ssrInlineRender: true,
  props: {
    orderId: {}
  },
  emits: ["close", "saved"],
  setup(__props, { emit: __emit }) {
    const form = reactive({ payment_status: "paid", payment_method: "", payment_reference: "", notes: "" });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" }, _attrs))}><div class="bg-white rounded-lg w-full max-w-md p-6 space-y-4"><div class="flex items-center justify-between"><h3 class="text-lg font-semibold">Actualizar pago</h3><button class="p-2 rounded hover:bg-gray-100">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:x-mark",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</button></div><div class="space-y-3"><div><label class="block text-sm text-gray-600 mb-1">Estado de pago</label><select class="w-full px-3 py-2 border rounded"><option value="paid"${ssrIncludeBooleanAttr(Array.isArray(unref(form).payment_status) ? ssrLooseContain(unref(form).payment_status, "paid") : ssrLooseEqual(unref(form).payment_status, "paid")) ? " selected" : ""}>Pagado</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(unref(form).payment_status) ? ssrLooseContain(unref(form).payment_status, "pending") : ssrLooseEqual(unref(form).payment_status, "pending")) ? " selected" : ""}>Pendiente</option><option value="failed"${ssrIncludeBooleanAttr(Array.isArray(unref(form).payment_status) ? ssrLooseContain(unref(form).payment_status, "failed") : ssrLooseEqual(unref(form).payment_status, "failed")) ? " selected" : ""}>Fallido</option><option value="refunded"${ssrIncludeBooleanAttr(Array.isArray(unref(form).payment_status) ? ssrLooseContain(unref(form).payment_status, "refunded") : ssrLooseEqual(unref(form).payment_status, "refunded")) ? " selected" : ""}>Reembolsado</option></select></div><div><label class="block text-sm text-gray-600 mb-1">M\xE9todo de pago</label><input${ssrRenderAttr("value", unref(form).payment_method)} type="text" class="w-full px-3 py-2 border rounded" placeholder="Nequi, Bancolombia..."></div><div><label class="block text-sm text-gray-600 mb-1">Referencia</label><input${ssrRenderAttr("value", unref(form).payment_reference)} type="text" class="w-full px-3 py-2 border rounded" placeholder="# de transacci\xF3n"></div><div><label class="block text-sm text-gray-600 mb-1">Notas</label><textarea class="w-full px-3 py-2 border rounded" rows="3" placeholder="Notas opcionales">${ssrInterpolate(unref(form).notes)}</textarea></div></div><div class="flex justify-end gap-2 pt-2"><button class="px-4 py-2 border rounded">Cancelar</button><button class="px-4 py-2 bg-green-600 text-white rounded">Guardar</button></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/orders/PaymentUpdateModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const orders = ref([]);
    const reservations = ref([]);
    const loading = ref(false);
    const searchQuery = ref("");
    const selectedStatus = ref("");
    const selectedPaymentStatus = ref("");
    const selectedDate = ref("");
    const selectedSource = ref("");
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const showModal = ref(false);
    const showStatusModal = ref(false);
    const showPaymentModal = ref(false);
    const showConfirmModal = ref(false);
    const selectedOrder = ref(null);
    const orderToDelete = ref(null);
    const showReservationConfirmModal = ref(false);
    const reservationToDelete = ref(null);
    const filteredOrders = computed(() => {
      const reservationRows = (reservations.value || []).map((r) => {
        var _a, _b, _c;
        return {
          id_order: r.id_reservation,
          tracking_number: null,
          customer: r.user ? { first_name: r.user.first_name, last_name: r.user.last_name, email: r.user.email } : null,
          total_amount: ((_a = r.product) == null ? void 0 : _a.price) ? Number(r.product.price) * Number(r.quantity || 1) : 0,
          order_items: [{ quantity: r.quantity, unit_price: ((_b = r.product) == null ? void 0 : _b.price) || 0, total_price: (((_c = r.product) == null ? void 0 : _c.price) || 0) * (r.quantity || 1) }],
          status: r.status,
          payment_status: "pending",
          order_source: "reservation",
          created_at: r.created_at,
          _isReservation: true,
          _rawReservation: r
        };
      });
      let filtered = [...reservationRows, ...orders.value || []];
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(
          (order) => {
            var _a, _b;
            return String(order.id_order).toLowerCase().includes(query) || order.tracking_number && order.tracking_number.toLowerCase().includes(query) || ((_a = order.customer) == null ? void 0 : _a.first_name) && order.customer.first_name.toLowerCase().includes(query) || ((_b = order.customer) == null ? void 0 : _b.last_name) && order.customer.last_name.toLowerCase().includes(query);
          }
        );
      }
      if (selectedStatus.value) {
        filtered = filtered.filter((order) => order.status === selectedStatus.value);
      }
      if (selectedPaymentStatus.value) {
        filtered = filtered.filter((order) => order.payment_status === selectedPaymentStatus.value);
      }
      if (selectedDate.value) {
        const selectedDateObj = new Date(selectedDate.value);
        filtered = filtered.filter((order) => {
          const orderDate = new Date(order.created_at);
          return orderDate.toDateString() === selectedDateObj.toDateString();
        });
      }
      if (selectedSource.value) {
        if (selectedSource.value === "reservation") {
          filtered = filtered.filter((order) => order._isReservation);
        } else {
          filtered = filtered.filter((order) => order.order_source === selectedSource.value);
        }
      }
      return filtered;
    });
    const totalOrders = computed(() => filteredOrders.value.length);
    const totalPages = computed(() => Math.ceil(totalOrders.value / itemsPerPage.value));
    const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
    const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalOrders.value));
    const visiblePages = computed(() => {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages.value, start + maxVisible - 1);
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });
    const ordersSummary = ref({ total: 0, pending: 0, delivered: 0, cancelled: 0, paid: 0 });
    const fetchOrders = async () => {
      loading.value = true;
      try {
        const { data } = await $fetch("/api/orders");
        if (data.success) {
          orders.value = data.data;
        } else {
          console.error("Error en la respuesta de la API:", data.error);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        loading.value = false;
      }
    };
    const closeModal = () => {
      showModal.value = false;
      selectedOrder.value = null;
    };
    const closePaymentModal = () => {
      showPaymentModal.value = false;
      selectedOrder.value = null;
    };
    const { $toast } = useNuxtApp();
    const onPaymentSaved = async () => {
      await fetchOrders();
      $toast == null ? void 0 : $toast.success("Pago actualizado");
    };
    const closeStatusModal = () => {
      showStatusModal.value = false;
      selectedOrder.value = null;
    };
    const saveOrder = async (orderData) => {
      try {
        if (selectedOrder.value) {
          const { data } = await $fetch(`/api/orders/${selectedOrder.value.id_order}`, {
            method: "PUT",
            body: orderData
          });
          if (data.success) {
            console.log("Pedido actualizado exitosamente");
            await fetchOrders();
            closeModal();
          } else {
            console.error("Error actualizando pedido:", data.error);
          }
        } else {
          const { data } = await $fetch("/api/orders", {
            method: "POST",
            body: orderData
          });
          if (data.success) {
            console.log("Pedido creado exitosamente");
            await fetchOrders();
            closeModal();
          } else {
            console.error("Error creando pedido:", data.error);
          }
        }
      } catch (error) {
        console.error("Error saving order:", error);
      }
    };
    const fetchReservations = async () => {
      try {
        const { data } = await $fetch("/api/reservations", {
          params: { status: "pending" }
        });
        if (data.success) {
          reservations.value = data.data;
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    const updateOrderStatus = async (statusData) => {
      try {
        const { data } = await $fetch(`/api/orders/${selectedOrder.value.id_order}/update-status`, {
          method: "PATCH",
          body: statusData
        });
        if (data.success) {
          $toast == null ? void 0 : $toast.success("Estado actualizado", `Nuevo estado: ${statusData.status}`);
          await fetchOrders();
          closeStatusModal();
        } else {
          $toast == null ? void 0 : $toast.error("Error", data.error);
        }
      } catch (error) {
        $toast == null ? void 0 : $toast.error("Error", "No fue posible actualizar el estado");
      }
    };
    const deleteOrder = async () => {
      if (!orderToDelete.value) return;
      try {
        const { data } = await $fetch(`/api/orders/${orderToDelete.value.id_order}`, {
          method: "DELETE"
        });
        if (data.success) {
          $toast == null ? void 0 : $toast.success("Pedido eliminado");
          await fetchOrders();
          showConfirmModal.value = false;
          orderToDelete.value = null;
        } else {
          $toast == null ? void 0 : $toast.error("Error", data.error);
        }
      } catch (error) {
        $toast == null ? void 0 : $toast.error("Error", "No fue posible eliminar el pedido");
      }
    };
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
        confirmed: "Aprobado",
        shipped: "Enviado",
        delivered: "Entregado",
        cancelled: "Cancelado"
      };
      return texts[status] || "Desconocido";
    };
    const getPaymentStatusClass = (status) => {
      const classes = {
        paid: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        failed: "bg-red-100 text-red-800",
        refunded: "bg-gray-100 text-gray-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const getPaymentStatusText = (status) => {
      const texts = {
        paid: "Pagado",
        pending: "Pendiente",
        failed: "Fallido",
        refunded: "Reembolsado"
      };
      return texts[status] || "Desconocido";
    };
    const { formatCOP } = useCurrency();
    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const canApprove = (row) => {
      if (row._isReservation) return row.status === "pending";
      return row.status === "pending";
    };
    const canCancel = (row) => {
      if (row._isReservation) return row.status === "pending";
      return row.status === "pending";
    };
    const deleteReservation = async () => {
      const r = reservationToDelete.value;
      if (!r) return;
      try {
        const { data } = await $fetch(`/api/reservations/${r.id_reservation}`, { method: "DELETE" });
        if (data.success) {
          $toast == null ? void 0 : $toast.success("Registro eliminado");
          await fetchReservations();
          showReservationConfirmModal.value = false;
          reservationToDelete.value = null;
        } else {
          $toast == null ? void 0 : $toast.error("Error", data.error);
        }
      } catch (error) {
        $toast == null ? void 0 : $toast.error("Error", "No fue posible eliminar el registro");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      const _component_OrderModal = _sfc_main$3;
      const _component_StatusUpdateModal = _sfc_main$2;
      const _component_PaymentUpdateModal = _sfc_main$1;
      const _component_ConfirmModal = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6"><div><h1 class="text-xl sm:text-2xl font-bold theme-text-primary">Gesti\xF3n de Pedidos</h1><p class="text-sm sm:text-base theme-text-secondary mt-0.5">Administra todos los pedidos de tu tienda</p></div><div class="flex flex-wrap gap-2 sm:space-x-3"><button class="bg-green-600 hover:bg-green-700 text-white px-3 py-2 sm:px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors text-sm sm:text-base flex-1 sm:flex-none min-w-0">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:plus-circle",
        class: "w-5 h-5 shrink-0"
      }, null, _parent));
      _push(`<span>Nuevo Pedido</span></button><button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors text-sm sm:text-base flex-1 sm:flex-none min-w-0">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:arrow-down-tray",
        class: "w-5 h-5 shrink-0"
      }, null, _parent));
      _push(`<span>Exportar</span></button></div></div><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 mb-4 sm:mb-6"><div class="theme-card-bg p-3 sm:p-6 rounded-lg shadow-sm border theme-border"><div class="flex items-center gap-2 sm:gap-4"><div class="flex-shrink-0"><div class="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:shopping-bag",
        class: "w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
      }, null, _parent));
      _push(`</div></div><div class="min-w-0"><p class="text-xs sm:text-sm font-medium theme-text-muted">Total</p><p class="text-lg sm:text-2xl font-bold theme-text-primary truncate">${ssrInterpolate(unref(ordersSummary).total)}</p></div></div></div><div class="theme-card-bg p-3 sm:p-6 rounded-lg shadow-sm border theme-border"><div class="flex items-center gap-2 sm:gap-4"><div class="flex-shrink-0"><div class="w-7 h-7 sm:w-8 sm:h-8 bg-yellow-100 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:clock",
        class: "w-4 h-4 sm:w-5 sm:h-5 text-yellow-600"
      }, null, _parent));
      _push(`</div></div><div class="min-w-0"><p class="text-xs sm:text-sm font-medium theme-text-muted">Pendientes</p><p class="text-lg sm:text-2xl font-bold theme-text-primary truncate">${ssrInterpolate(unref(ordersSummary).pending)}</p></div></div></div><div class="theme-card-bg p-3 sm:p-6 rounded-lg shadow-sm border theme-border"><div class="flex items-center gap-2 sm:gap-4"><div class="flex-shrink-0"><div class="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:check-circle",
        class: "w-4 h-4 sm:w-5 sm:h-5 text-green-600"
      }, null, _parent));
      _push(`</div></div><div class="min-w-0"><p class="text-xs sm:text-sm font-medium theme-text-muted">Entregados</p><p class="text-lg sm:text-2xl font-bold theme-text-primary truncate">${ssrInterpolate(unref(ordersSummary).delivered)}</p></div></div></div><div class="theme-card-bg p-3 sm:p-6 rounded-lg shadow-sm border theme-border"><div class="flex items-center gap-2 sm:gap-4"><div class="flex-shrink-0"><div class="w-7 h-7 sm:w-8 sm:h-8 bg-red-100 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:x-circle",
        class: "w-4 h-4 sm:w-5 sm:h-5 text-red-600"
      }, null, _parent));
      _push(`</div></div><div class="min-w-0"><p class="text-xs sm:text-sm font-medium theme-text-muted">Cancelados</p><p class="text-lg sm:text-2xl font-bold theme-text-primary truncate">${ssrInterpolate(unref(ordersSummary).cancelled)}</p></div></div></div><div class="theme-card-bg p-3 sm:p-6 rounded-lg shadow-sm border theme-border col-span-2 sm:col-span-1"><div class="flex items-center gap-2 sm:gap-4"><div class="flex-shrink-0"><div class="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-100 rounded-lg flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:banknotes",
        class: "w-4 h-4 sm:w-5 sm:h-5 text-emerald-600"
      }, null, _parent));
      _push(`</div></div><div class="min-w-0"><p class="text-xs sm:text-sm font-medium theme-text-muted">Pagados</p><p class="text-lg sm:text-2xl font-bold theme-text-primary truncate">${ssrInterpolate(unref(ordersSummary).paid)}</p></div></div></div></div><div class="theme-card-bg p-3 sm:p-4 rounded-lg shadow-sm mb-4 sm:mb-6 border theme-border"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Buscar</label><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="ID, cliente, tracking..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Estado</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "") : ssrLooseEqual(unref(selectedStatus), "")) ? " selected" : ""}>Todos los estados</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "pending") : ssrLooseEqual(unref(selectedStatus), "pending")) ? " selected" : ""}>Pendiente</option><option value="confirmed"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "confirmed") : ssrLooseEqual(unref(selectedStatus), "confirmed")) ? " selected" : ""}>Confirmado</option><option value="shipped"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "shipped") : ssrLooseEqual(unref(selectedStatus), "shipped")) ? " selected" : ""}>Enviado</option><option value="delivered"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "delivered") : ssrLooseEqual(unref(selectedStatus), "delivered")) ? " selected" : ""}>Entregado</option><option value="cancelled"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedStatus)) ? ssrLooseContain(unref(selectedStatus), "cancelled") : ssrLooseEqual(unref(selectedStatus), "cancelled")) ? " selected" : ""}>Cancelado</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Pago</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedPaymentStatus)) ? ssrLooseContain(unref(selectedPaymentStatus), "") : ssrLooseEqual(unref(selectedPaymentStatus), "")) ? " selected" : ""}>Todos los pagos</option><option value="paid"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedPaymentStatus)) ? ssrLooseContain(unref(selectedPaymentStatus), "paid") : ssrLooseEqual(unref(selectedPaymentStatus), "paid")) ? " selected" : ""}>Pagado</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedPaymentStatus)) ? ssrLooseContain(unref(selectedPaymentStatus), "pending") : ssrLooseEqual(unref(selectedPaymentStatus), "pending")) ? " selected" : ""}>Pendiente</option><option value="failed"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedPaymentStatus)) ? ssrLooseContain(unref(selectedPaymentStatus), "failed") : ssrLooseEqual(unref(selectedPaymentStatus), "failed")) ? " selected" : ""}>Fallido</option><option value="refunded"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedPaymentStatus)) ? ssrLooseContain(unref(selectedPaymentStatus), "refunded") : ssrLooseEqual(unref(selectedPaymentStatus), "refunded")) ? " selected" : ""}>Reembolsado</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Fecha</label><input${ssrRenderAttr("value", unref(selectedDate))} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Origen</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedSource)) ? ssrLooseContain(unref(selectedSource), "") : ssrLooseEqual(unref(selectedSource), "")) ? " selected" : ""}>Todos</option><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedSource)) ? ssrLooseContain(unref(selectedSource), "admin") : ssrLooseEqual(unref(selectedSource), "admin")) ? " selected" : ""}>Admin</option><option value="user"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedSource)) ? ssrLooseContain(unref(selectedSource), "user") : ssrLooseEqual(unref(selectedSource), "user")) ? " selected" : ""}>User</option><option value="customer"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedSource)) ? ssrLooseContain(unref(selectedSource), "customer") : ssrLooseEqual(unref(selectedSource), "customer")) ? " selected" : ""}>Cliente</option></select></div><div class="flex items-end"><button class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"> Limpiar Filtros </button></div></div></div><div class="rounded-lg overflow-hidden border border-gray-200 dark:border-[var(--border-color)]"><div class="overflow-x-auto"><table class="min-w-full admin-table"><thead><tr><th>Pedido</th><th>Cliente</th><th>Total</th><th>Estado</th><th>Pago</th><th>Origen</th><th>Fecha</th><th>Acciones</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(filteredOrders), (row) => {
        var _a, _b, _c, _d;
        _push(`<tr><td class="whitespace-nowrap"><div class="flex items-center"><div class="flex-shrink-0 h-10 w-10"><div class="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:shopping-bag",
          class: "w-5 h-5 text-blue-600 dark:text-blue-300"
        }, null, _parent));
        _push(`</div></div><div class="ml-4"><div class="text-sm font-medium theme-text-primary">#${ssrInterpolate(String(row.id_order || "").slice(0, 8))}</div><div class="text-sm theme-text-muted">${ssrInterpolate(row.tracking_number || (row._isReservation ? "Reserva" : "Sin tracking"))}</div></div></div></td><td class="whitespace-nowrap"><div class="text-sm font-medium theme-text-primary">${ssrInterpolate((_a = row.customer) == null ? void 0 : _a.first_name)} ${ssrInterpolate((_b = row.customer) == null ? void 0 : _b.last_name)}</div><div class="text-sm theme-text-muted">${ssrInterpolate((_c = row.customer) == null ? void 0 : _c.email)}</div></td><td class="whitespace-nowrap"><div class="text-sm font-medium theme-text-primary">${ssrInterpolate(unref(formatCOP)(row.total_amount))}</div><div class="text-sm theme-text-muted">${ssrInterpolate(((_d = row.order_items) == null ? void 0 : _d.length) || 0)} productos</div></td><td class="whitespace-nowrap"><div class="flex items-center gap-2"><span class="${ssrRenderClass([
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          getStatusClass(row.status)
        ])}">${ssrInterpolate(getStatusText(row.status))}</span>`);
        if (row.status === "pending" && row.payment_status !== "paid" && !row._isReservation) {
          _push(`<span class="text-xs text-yellow-700">(pendiente de pago)</span>`);
        } else {
          _push(`<!---->`);
        }
        if (row.status === "pending" && row.payment_status === "paid" && !row._isReservation) {
          _push(`<span class="text-xs text-emerald-700">(pagado)</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></td><td class="whitespace-nowrap"><span class="${ssrRenderClass([
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          getPaymentStatusClass(row.payment_status)
        ])}">${ssrInterpolate(getPaymentStatusText(row.payment_status))}</span></td><td class="whitespace-nowrap text-sm theme-text-muted"><span class="uppercase">${ssrInterpolate(row._isReservation ? "RESERVA" : row.order_source || "")}</span></td><td class="whitespace-nowrap text-sm theme-text-muted">${ssrInterpolate(formatDate(row.created_at))}</td><td class="whitespace-nowrap text-sm font-medium"><div class="flex flex-wrap gap-2"><button${ssrIncludeBooleanAttr(!canApprove(row)) ? " disabled" : ""}${ssrRenderAttr("title", row._isReservation ? "Aprobar (desde reserva)" : "Aprobar pedido")} aria-label="Aprobar" class="inline-flex items-center justify-center w-9 h-9 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:check-circle",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><button${ssrIncludeBooleanAttr(!canCancel(row)) ? " disabled" : ""} title="Cancelar" aria-label="Cancelar" class="inline-flex items-center justify-center w-9 h-9 rounded border hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:x-circle",
          class: "w-5 h-5 text-red-600"
        }, null, _parent));
        _push(`</button><button title="Eliminar" aria-label="Eliminar" class="inline-flex items-center justify-center w-9 h-9 rounded border hover:bg-gray-50">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:trash",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
      if (unref(totalPages) > 1) {
        _push(`<div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"><div class="flex-1 flex justify-between sm:hidden"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> Anterior </button><button${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""} class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"> Siguiente </button></div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"><div><p class="text-sm text-gray-700"> Mostrando <span class="font-medium">${ssrInterpolate(unref(startIndex) + 1)}</span> a <span class="font-medium">${ssrInterpolate(unref(endIndex))}</span> de <span class="font-medium">${ssrInterpolate(unref(totalOrders))}</span> resultados </p></div><div><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-left",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><!--[-->`);
        ssrRenderList(unref(visiblePages), (page) => {
          _push(`<button class="${ssrRenderClass([
            "relative inline-flex items-center px-4 py-2 border text-sm font-medium",
            page === unref(currentPage) ? "z-10 bg-green-50 border-green-500 text-green-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
          ])}">${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]--><button${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""} class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-right",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></nav></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(showModal)) {
        _push(ssrRenderComponent(_component_OrderModal, {
          order: unref(selectedOrder),
          onClose: closeModal,
          onSave: saveOrder
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(showStatusModal)) {
        _push(ssrRenderComponent(_component_StatusUpdateModal, {
          order: unref(selectedOrder),
          onClose: closeStatusModal,
          onUpdate: updateOrderStatus
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(showPaymentModal) && unref(selectedOrder)) {
        _push(ssrRenderComponent(_component_PaymentUpdateModal, {
          "order-id": unref(selectedOrder).id_order,
          onClose: closePaymentModal,
          onSaved: onPaymentSaved
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(showConfirmModal)) {
        _push(ssrRenderComponent(_component_ConfirmModal, {
          title: "Eliminar Pedido",
          message: "\xBFEst\xE1s seguro de que quieres eliminar este pedido? Esta acci\xF3n no se puede deshacer.",
          onConfirm: deleteOrder,
          onCancel: ($event) => showConfirmModal.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(showReservationConfirmModal)) {
        _push(ssrRenderComponent(_component_ConfirmModal, {
          title: "Eliminar Apartado",
          message: "\xBFEst\xE1s seguro de que quieres eliminar este apartado? Esta acci\xF3n no se puede deshacer.",
          onConfirm: deleteReservation,
          onCancel: ($event) => showReservationConfirmModal.value = false
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/orders/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-9Dka5Mpd.mjs.map
