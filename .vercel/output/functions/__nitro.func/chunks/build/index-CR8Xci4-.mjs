import { _ as __nuxt_component_1$1 } from './server.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrRenderSlot } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-DSEa5iIv.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DonutRing",
  __ssrInlineRender: true,
  props: {
    percent: {},
    size: { default: 128 },
    stroke: { default: 16 },
    color: { default: "#2563eb" },
    trackColor: { default: "#e5e7eb" }
  },
  setup(__props) {
    const props = __props;
    const clamped = computed(() => {
      const p = Math.max(0, Math.min(100, Math.round(props.percent)));
      return p;
    });
    const size = computed(() => props.size);
    const sizePx = computed(() => `${size.value}px`);
    const stroke = computed(() => props.stroke);
    const radius = computed(() => (size.value - stroke.value) / 2);
    const circumference = computed(() => 2 * Math.PI * radius.value);
    const dashOffset = computed(() => (100 - clamped.value) / 100 * circumference.value);
    const color = computed(() => props.color);
    const trackColor = computed(() => props.trackColor);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "relative",
        style: { width: sizePx.value, height: sizePx.value }
      }, _attrs))}><svg${ssrRenderAttr("width", size.value)}${ssrRenderAttr("height", size.value)}${ssrRenderAttr("viewBox", `0 0 ${size.value} ${size.value}`)} class="block"><circle${ssrRenderAttr("cx", size.value / 2)}${ssrRenderAttr("cy", size.value / 2)}${ssrRenderAttr("r", radius.value)}${ssrRenderAttr("stroke", trackColor.value)}${ssrRenderAttr("stroke-width", stroke.value)} fill="transparent" stroke-linecap="round"></circle><circle${ssrRenderAttr("cx", size.value / 2)}${ssrRenderAttr("cy", size.value / 2)}${ssrRenderAttr("r", radius.value)}${ssrRenderAttr("stroke", color.value)}${ssrRenderAttr("stroke-width", stroke.value)} fill="transparent" stroke-linecap="round" style="${ssrRenderStyle({ strokeDasharray: circumference.value + " " + circumference.value, strokeDashoffset: dashOffset.value, transform: "rotate(-90deg)", transformOrigin: "50% 50%" })}"></circle></svg><div class="absolute inset-0 flex items-center justify-center">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`${ssrInterpolate(clamped.value)}%`);
      }, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/DonutRing.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { user } = useAuth();
    const userName = computed(() => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.name) || null;
    });
    useTheme();
    const dashboardStats = ref({
      totalUsers: 0,
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      totalCustomers: 0,
      weeklySales: 0,
      newProducts: 0,
      weeklyOrders: 0
    });
    const weeklySeries = ref([]);
    computed(() => weeklySeries.value.reduce((s, d) => s + d.sales, 0));
    const productsStats = ref({ totalProducts: 0, newProducts: 0 });
    const productsPercent = computed(() => {
      const total = productsStats.value.totalProducts || 1;
      const pct = Math.round(productsStats.value.newProducts / total * 100);
      return isNaN(pct) ? 0 : pct;
    });
    const percentNumber = () => productsPercent.value;
    ref([]);
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("es-ES", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    };
    const formatDay = (dateStr) => {
      const d = new Date(dateStr);
      return d.toLocaleDateString("es-ES", { weekday: "short" });
    };
    const barWidth = (value) => {
      const max = Math.max(...weeklySeries.value.map((d) => d.sales), 1);
      const pct = Math.round(value / max * 100);
      return `${pct}%`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen p-3 sm:p-4 lg:p-6 transition-colors duration-300 theme-container" }, _attrs))}><div class="mb-6 sm:mb-8"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"><div><h1 class="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 transition-colors theme-text-primary">Dashboard</h1><p class="text-sm sm:text-base transition-colors theme-text-secondary">Bienvenido de vuelta, ${ssrInterpolate(unref(userName) || "Admin")}! Aqu\xED tienes un resumen de tu negocio.</p></div></div></div><div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8"><div class="card card-hover hover:shadow-lg transition-all duration-300"><div class="flex items-center justify-between mb-2 sm:mb-4"><div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center shrink-0">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:users",
        class: "w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400"
      }, null, _parent));
      _push(`</div><div class="text-right min-w-0"><p class="text-xl sm:text-2xl font-bold theme-text-primary truncate">${ssrInterpolate(unref(dashboardStats).totalUsers || 0)}</p><p class="text-green-600 dark:text-green-400 text-sm font-medium">+12% este mes</p></div></div><p class="text-xs sm:text-sm font-medium theme-text-secondary">Total Usuarios</p><div class="mt-2 sm:mt-4 flex items-center space-x-2"><div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2"><div class="bg-blue-600 dark:bg-blue-400 h-1.5 sm:h-2 rounded-full transition-all duration-500" style="${ssrRenderStyle({ "width": "75%" })}"></div></div><span class="text-[10px] sm:text-xs theme-text-muted shrink-0">75%</span></div></div><div class="card card-hover hover:shadow-lg transition-all duration-300"><div class="flex items-center justify-between mb-2 sm:mb-4"><div class="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center shrink-0">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:cube",
        class: "w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400"
      }, null, _parent));
      _push(`</div><div class="text-right min-w-0"><p class="text-xl sm:text-2xl font-bold theme-text-primary truncate">${ssrInterpolate(unref(dashboardStats).totalProducts || 0)}</p><p class="text-green-600 dark:text-green-400 text-sm font-medium">+8% este mes</p></div></div><p class="text-xs sm:text-sm font-medium theme-text-secondary">Total Productos</p><div class="mt-2 sm:mt-4 flex items-center space-x-2"><div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2"><div class="bg-green-600 dark:bg-green-400 h-1.5 sm:h-2 rounded-full transition-all duration-500" style="${ssrRenderStyle({ "width": "60%" })}"></div></div><span class="text-[10px] sm:text-xs theme-text-muted shrink-0">60%</span></div></div><div class="card card-hover hover:shadow-lg transition-all duration-300"><div class="flex items-center justify-between mb-2 sm:mb-4"><div class="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center shrink-0">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:shopping-cart",
        class: "w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400"
      }, null, _parent));
      _push(`</div><div class="text-right min-w-0"><p class="text-xl sm:text-2xl font-bold theme-text-primary truncate">${ssrInterpolate(unref(dashboardStats).totalOrders || 0)}</p><p class="text-green-600 dark:text-green-400 text-sm font-medium">+15% este mes</p></div></div><p class="text-xs sm:text-sm font-medium theme-text-secondary">Total \xD3rdenes</p><div class="mt-2 sm:mt-4 flex items-center space-x-2"><div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2"><div class="bg-yellow-600 dark:bg-yellow-400 h-1.5 sm:h-2 rounded-full transition-all duration-500" style="${ssrRenderStyle({ "width": "85%" })}"></div></div><span class="text-[10px] sm:text-xs theme-text-muted shrink-0">85%</span></div></div><div class="card card-hover hover:shadow-lg transition-all duration-300"><div class="flex items-center justify-between mb-2 sm:mb-4"><div class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center shrink-0">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:currency-dollar",
        class: "w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400"
      }, null, _parent));
      _push(`</div><div class="text-right min-w-0"><p class="text-lg sm:text-2xl font-bold theme-text-primary truncate">$${ssrInterpolate(formatCurrency(unref(dashboardStats).totalRevenue || 0))}</p><p class="text-green-600 dark:text-green-400 text-sm font-medium">+20% este mes</p></div></div><p class="text-xs sm:text-sm font-medium theme-text-secondary">Ingresos Totales</p><div class="mt-2 sm:mt-4 flex items-center space-x-2"><div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2"><div class="bg-purple-600 dark:bg-purple-400 h-1.5 sm:h-2 rounded-full transition-all duration-500" style="${ssrRenderStyle({ "width": "90%" })}"></div></div><span class="text-[10px] sm:text-xs theme-text-muted shrink-0">90%</span></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8"><div class="card"><div class="flex items-center justify-between mb-6"><div><h3 class="text-xl font-bold theme-text-primary">Ventas</h3><p class="text-sm theme-text-secondary">\xDAltimos 7 d\xEDas</p></div><div class="text-right"><p class="text-2xl font-bold theme-text-primary">$${ssrInterpolate(formatCurrency(unref(dashboardStats).weeklySales || 0))}</p><p class="text-green-600 dark:text-green-400 text-sm font-medium">+12.5%</p></div></div><div class="space-y-3"><!--[-->`);
      ssrRenderList(unref(weeklySeries), (d) => {
        _push(`<div class="flex items-center space-x-2"><span class="text-xs w-16 theme-text-muted">${ssrInterpolate(formatDay(d.date))}</span><div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3"><div class="bg-blue-600 dark:bg-blue-400 h-3 rounded-full transition-all duration-500" style="${ssrRenderStyle({ width: barWidth(d.sales) })}"></div></div><span class="text-xs w-16 theme-text-muted">$${ssrInterpolate(formatCurrency(d.sales))}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="card"><div class="flex items-center justify-between mb-6"><div><h3 class="text-xl font-bold theme-text-primary">Productos</h3><p class="text-sm theme-text-secondary">Nuevos \xFAltimos 7 d\xEDas</p></div><div class="text-right"><p class="text-2xl font-bold theme-text-primary">${ssrInterpolate(unref(productsStats).newProducts)}</p></div></div><div class="flex items-center justify-center mb-4">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        percent: percentNumber(),
        size: 128,
        stroke: 16,
        color: "#2563eb",
        "track-color": "#374151"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-2xl font-bold theme-text-primary"${_scopeId}>${ssrInterpolate(percentNumber())}%</span>`);
          } else {
            return [
              createVNode("span", { class: "text-2xl font-bold theme-text-primary" }, toDisplayString(percentNumber()) + "%", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="text-center text-sm theme-text-secondary">${ssrInterpolate(unref(productsStats).newProducts)} nuevos de ${ssrInterpolate(unref(productsStats).totalProducts)}</p></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"><div class="card"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-bold theme-text-primary">Total \xD3rdenes</h3><select class="text-sm rounded-lg px-3 py-1 theme-select"><option>Esta Semana</option><option>Este Mes</option><option>Este A\xF1o</option></select></div><div class="space-y-2"><div class="flex items-center space-x-2"><div class="w-16 h-8 bg-blue-600 dark:bg-blue-400 rounded-tl-lg rounded-tr-lg"></div><div class="w-16 h-12 bg-blue-400 dark:bg-blue-300 rounded-tl-lg rounded-tr-lg"></div><div class="w-16 h-6 bg-blue-500 dark:bg-blue-500 rounded-tl-lg rounded-tr-lg"></div><div class="w-16 h-10 bg-blue-300 dark:bg-blue-600 rounded-tl-lg rounded-tr-lg"></div><div class="w-16 h-8 bg-blue-600 dark:bg-blue-400 rounded-tl-lg rounded-tr-lg"></div><div class="w-16 h-14 bg-blue-400 dark:bg-blue-300 rounded-tl-lg rounded-tr-lg"></div><div class="w-16 h-9 bg-blue-500 dark:bg-blue-500 rounded-tl-lg rounded-tr-lg"></div></div></div><div class="mt-4 text-center"><p class="text-2xl font-bold theme-text-primary">${ssrInterpolate(unref(dashboardStats).weeklyOrders || 0)}</p><p class="text-sm theme-text-secondary">\xD3rdenes esta semana</p></div></div><div class="card"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-bold theme-text-primary">Clientes</h3><span class="text-green-600 dark:text-green-400 text-sm font-medium">+26.5%</span></div><div class="text-center mb-4"><p class="text-3xl font-bold theme-text-primary">${ssrInterpolate(unref(dashboardStats).totalCustomers || 0)}</p><p class="text-sm theme-text-secondary">Total de clientes</p></div><div class="space-y-2"><div class="flex items-center space-x-2"><div class="w-8 h-4 bg-blue-600 dark:bg-blue-400 rounded-tl-lg rounded-tr-lg"></div><div class="w-8 h-6 bg-blue-400 dark:bg-blue-300 rounded-tl-lg rounded-tr-lg"></div><div class="w-8 h-3 bg-blue-500 dark:bg-blue-500 rounded-tl-lg rounded-tr-lg"></div><div class="w-8 h-7 bg-blue-300 dark:bg-blue-600 rounded-tl-lg rounded-tr-lg"></div><div class="w-8 h-5 bg-blue-600 dark:bg-blue-400 rounded-tl-lg rounded-tr-lg"></div><div class="w-8 h-8 bg-blue-400 dark:bg-blue-300 rounded-tl-lg rounded-tr-lg"></div><div class="w-8 h-6 bg-blue-500 dark:bg-blue-500 rounded-tl-lg rounded-tr-lg"></div></div></div><p class="text-center text-sm mt-4 theme-text-secondary">Abril 07 - Abril 14</p></div></div><div class="fixed bottom-6 right-6"><button class="w-14 h-14 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center theme-accent-button">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:cog-6-tooth",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CR8Xci4-.mjs.map
