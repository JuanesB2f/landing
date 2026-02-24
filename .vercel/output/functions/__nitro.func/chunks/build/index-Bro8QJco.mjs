import { b as useNuxtApp, _ as __nuxt_component_1$1, i as useLocale, c as useAppConfig, j as usePortal, d as useFormField, e as useButtonGroup, f as useComponentIcons, t as tv, k as isArrayOfArray, m as get, o as compare, g as _sfc_main$d, h as _sfc_main$b, p as _sfc_main$c, q as getDisplayValue, l as looseToNumber } from './server.mjs';
import { ref, watch, mergeProps, unref, isRef, mergeModels, useSlots, useModel, toRef, computed, withCtx, createVNode, renderSlot, createTextVNode, toDisplayString, withModifiers, createBlock, createCommentVNode, openBlock, Fragment, renderList, toRaw, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderSlot } from 'vue/server-renderer';
import { useFilter, useForwardPropsEmits, ComboboxGroup, ComboboxItem, ComboboxRoot, ComboboxAnchor, ComboboxTrigger, ComboboxPortal, ComboboxContent, FocusScope, ComboboxInput, ComboboxEmpty, ComboboxLabel, ComboboxSeparator, ComboboxItemIndicator, ComboboxArrow, Primitive } from 'reka-ui';
import { G as defu } from '../_/nitro.mjs';
import { reactivePick, createReusableTemplate, useVModel } from '@vueuse/core';
import { u as useCartStore } from './cart-E1qf9VCw.mjs';
import { u as useCurrency } from './useCurrency-BsXMBrUs.mjs';
import { u as useAuth } from './useAuth-DSEa5iIv.mjs';
import 'pinia';
import 'vue-router';
import '@supabase/ssr';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'tailwind-variants';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'unhead/plugins';
import '@supabase/supabase-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'consola';
import 'node:fs';
import 'node:path';

const theme$1 = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$2 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "Input",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    type: { type: null, required: false, default: "text" },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    autocomplete: { type: null, required: false, default: "off" },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    disabled: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    modelValue: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelModifiers: { type: Object, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    icon: { type: String, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: String, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: String, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: String, required: false }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const modelValue = useVModel(props, "modelValue", emits, { defaultValue: props.defaultValue });
    const appConfig = useAppConfig();
    const { emitFormBlur, emitFormInput, emitFormChange, size: formGroupSize, color, id, name, highlight, disabled, emitFormFocus, ariaAttrs } = useFormField(props, { deferInputValidation: true });
    const { orientation, size: buttonGroupSize } = useButtonGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
    const inputSize = computed(() => buttonGroupSize.value || formGroupSize.value);
    const ui = computed(() => {
      var _a;
      return tv({ extend: tv(theme$1), ...((_a = appConfig.ui) == null ? void 0 : _a.input) || {} })({
        type: props.type,
        color: color.value,
        variant: props.variant,
        size: inputSize == null ? void 0 : inputSize.value,
        loading: props.loading,
        highlight: highlight.value,
        leading: isLeading.value || !!props.avatar || !!slots.leading,
        trailing: isTrailing.value || !!slots.trailing,
        buttonGroup: orientation.value
      });
    });
    const inputRef = ref(null);
    function updateInput(value) {
      var _a2;
      var _a, _b, _c;
      if ((_a = props.modelModifiers) == null ? void 0 : _a.trim) {
        value = (_a2 = value == null ? void 0 : value.trim()) != null ? _a2 : null;
      }
      if (((_b = props.modelModifiers) == null ? void 0 : _b.number) || props.type === "number") {
        value = looseToNumber(value);
      }
      if ((_c = props.modelModifiers) == null ? void 0 : _c.nullify) {
        value || (value = null);
      }
      modelValue.value = value;
      emitFormInput();
    }
    function onInput(event) {
      var _a;
      if (!((_a = props.modelModifiers) == null ? void 0 : _a.lazy)) {
        updateInput(event.target.value);
      }
    }
    function onChange(event) {
      var _a, _b;
      const value = event.target.value;
      if ((_a = props.modelModifiers) == null ? void 0 : _a.lazy) {
        updateInput(value);
      }
      if ((_b = props.modelModifiers) == null ? void 0 : _b.trim) {
        event.target.value = value.trim();
      }
      emitFormChange();
      emits("change", event);
    }
    function onBlur(event) {
      emitFormBlur();
      emits("blur", event);
    }
    __expose({
      inputRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value.root({ class: [(_a = props.ui) == null ? void 0 : _a.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<input${ssrRenderAttrs(mergeProps({
              id: unref(id),
              ref_key: "inputRef",
              ref: inputRef,
              type: __props.type,
              value: unref(modelValue),
              name: unref(name),
              placeholder: __props.placeholder,
              class: ui.value.base({ class: (_a2 = props.ui) == null ? void 0 : _a2.base }),
              disabled: unref(disabled),
              required: __props.required,
              autocomplete: __props.autocomplete
            }, { ..._ctx.$attrs, ...unref(ariaAttrs) }))}${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            if (unref(isLeading) || !!__props.avatar || !!slots.leading) {
              _push2(`<span class="${ssrRenderClass(ui.value.leading({ class: (_b = props.ui) == null ? void 0 : _b.leading }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "leading", {}, () => {
                var _a3, _b2, _c2;
                if (unref(isLeading) && unref(leadingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$d, {
                    name: unref(leadingIconName),
                    class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                  }, null, _parent2, _scopeId));
                } else if (!!__props.avatar) {
                  _push2(ssrRenderComponent(_sfc_main$b, mergeProps({
                    size: ((_b2 = props.ui) == null ? void 0 : _b2.leadingAvatarSize) || ui.value.leadingAvatarSize()
                  }, __props.avatar, {
                    class: ui.value.leadingAvatar({ class: (_c2 = props.ui) == null ? void 0 : _c2.leadingAvatar })
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(isTrailing) || !!slots.trailing) {
              _push2(`<span class="${ssrRenderClass(ui.value.trailing({ class: (_c = props.ui) == null ? void 0 : _c.trailing }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "trailing", {}, () => {
                var _a3;
                if (unref(trailingIconName)) {
                  _push2(ssrRenderComponent(_sfc_main$d, {
                    name: unref(trailingIconName),
                    class: ui.value.trailingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.trailingIcon })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("input", mergeProps({
                id: unref(id),
                ref_key: "inputRef",
                ref: inputRef,
                type: __props.type,
                value: unref(modelValue),
                name: unref(name),
                placeholder: __props.placeholder,
                class: ui.value.base({ class: (_d = props.ui) == null ? void 0 : _d.base }),
                disabled: unref(disabled),
                required: __props.required,
                autocomplete: __props.autocomplete
              }, { ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                onInput,
                onBlur,
                onChange,
                onFocus: unref(emitFormFocus)
              }), null, 16, ["id", "type", "value", "name", "placeholder", "disabled", "required", "autocomplete", "onFocus"]),
              renderSlot(_ctx.$slots, "default"),
              unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                key: 0,
                class: ui.value.leading({ class: (_e = props.ui) == null ? void 0 : _e.leading })
              }, [
                renderSlot(_ctx.$slots, "leading", {}, () => {
                  var _a3, _b2, _c2;
                  return [
                    unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$d, {
                      key: 0,
                      name: unref(leadingIconName),
                      class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                    }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                      key: 1,
                      size: ((_b2 = props.ui) == null ? void 0 : _b2.leadingAvatarSize) || ui.value.leadingAvatarSize()
                    }, __props.avatar, {
                      class: ui.value.leadingAvatar({ class: (_c2 = props.ui) == null ? void 0 : _c2.leadingAvatar })
                    }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                  ];
                })
              ], 2)) : createCommentVNode("", true),
              unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                key: 1,
                class: ui.value.trailing({ class: (_f = props.ui) == null ? void 0 : _f.trailing })
              }, [
                renderSlot(_ctx.$slots, "trailing", {}, () => {
                  var _a3;
                  return [
                    unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$d, {
                      key: 0,
                      name: unref(trailingIconName),
                      class: ui.value.trailingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.trailingIcon })
                    }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                  ];
                })
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Input.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "base": [
      "relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed",
    "value": "truncate pointer-events-none",
    "placeholder": "truncate text-dimmed",
    "arrow": "fill-default",
    "content": [
      "max-h-60 w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
      "origin-(--reka-combobox-content-transform-origin) w-(--reka-combobox-trigger-width)"
    ],
    "viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
    "group": "p-1 isolate",
    "empty": "text-center text-muted",
    "label": "font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": [
      "group relative w-full flex items-center select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
      "transition-colors before:transition-colors"
    ],
    "itemLeadingIcon": [
      "shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
      "transition-colors"
    ],
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemLeadingChip": "shrink-0",
    "itemLeadingChipSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemLabel": "truncate",
    "input": "border-b border-default",
    "focusScope": "flex flex-col min-h-0"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1 text-[10px]/3 gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-1 text-xs"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-1.5 text-xs"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-1.5 text-sm"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-2 text-xs gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-2 text-sm"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6",
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailingIcon": "size-6",
        "empty": "p-2 text-base"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "SelectMenu",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    id: { type: String, required: false },
    placeholder: { type: String, required: false },
    searchInput: { type: [Boolean, Object], required: false, default: true },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    trailingIcon: { type: String, required: false },
    selectedIcon: { type: String, required: false },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    valueKey: { type: null, required: false },
    labelKey: { type: null, required: false, default: "label" },
    items: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    multiple: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    createItem: { type: [Boolean, String, Object], required: false },
    filterFields: { type: Array, required: false },
    ignoreFilter: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    name: { type: String, required: false },
    resetSearchTermOnBlur: { type: Boolean, required: false, default: true },
    resetSearchTermOnSelect: { type: Boolean, required: false, default: true },
    highlightOnHover: { type: Boolean, required: false },
    icon: { type: String, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: String, required: false },
    trailing: { type: Boolean, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: String, required: false }
  }, {
    "searchTerm": { type: String, ...{ default: "" } },
    "searchTermModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["update:open", "change", "blur", "focus", "create", "highlight", "update:modelValue"], ["update:searchTerm"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const searchTerm = useModel(__props, "searchTerm", { type: String, ...{ default: "" } });
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const { contains } = useFilter({ sensitivity: "base" });
    const rootProps = useForwardPropsEmits(reactivePick(props, "modelValue", "defaultValue", "open", "defaultOpen", "required", "multiple", "resetSearchTermOnBlur", "resetSearchTermOnSelect", "highlightOnHover"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8, position: "popper" }));
    const arrowProps = toRef(() => props.arrow);
    const searchInputProps = toRef(() => defu(props.searchInput, { placeholder: t("selectMenu.search"), variant: "none" }));
    const { emitFormBlur, emitFormFocus, emitFormInput, emitFormChange, size: formGroupSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField(props);
    const { orientation, size: buttonGroupSize } = useButtonGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, { trailingIcon: appConfig.ui.icons.chevronDown })));
    const selectSize = computed(() => buttonGroupSize.value || formGroupSize.value);
    const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate();
    const ui = computed(() => {
      var _a;
      return tv({ extend: tv(theme), ...((_a = appConfig.ui) == null ? void 0 : _a.selectMenu) || {} })({
        color: color.value,
        variant: props.variant,
        size: selectSize == null ? void 0 : selectSize.value,
        loading: props.loading,
        highlight: highlight.value,
        leading: isLeading.value || !!props.avatar || !!slots.leading,
        trailing: isTrailing.value || !!slots.trailing,
        buttonGroup: orientation.value
      });
    });
    function displayValue(value) {
      if (props.multiple && Array.isArray(value)) {
        const displayedValues = value.map((item) => getDisplayValue(items.value, item, {
          labelKey: props.labelKey,
          valueKey: props.valueKey
        })).filter((v) => v != null && v !== "");
        return displayedValues.length > 0 ? displayedValues.join(", ") : void 0;
      }
      return getDisplayValue(items.value, value, {
        labelKey: props.labelKey,
        valueKey: props.valueKey
      });
    }
    const groups = computed(
      () => {
        var _a;
        return ((_a = props.items) == null ? void 0 : _a.length) ? isArrayOfArray(props.items) ? props.items : [props.items] : [];
      }
    );
    const items = computed(() => groups.value.flatMap((group) => group));
    const filteredGroups = computed(() => {
      if (props.ignoreFilter || !searchTerm.value) {
        return groups.value;
      }
      const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey];
      return groups.value.map((items2) => items2.filter((item) => {
        if (item === void 0 || item === null) {
          return false;
        }
        if (typeof item !== "object") {
          return contains(String(item), searchTerm.value);
        }
        if (item.type && ["label", "separator"].includes(item.type)) {
          return true;
        }
        return fields.some((field) => {
          const value = get(item, field);
          return value !== void 0 && value !== null && contains(String(value), searchTerm.value);
        });
      })).filter((group) => group.filter(
        (item) => !isSelectItem(item) || (!item.type || !["label", "separator"].includes(item.type))
      ).length > 0);
    });
    const filteredItems = computed(() => filteredGroups.value.flatMap((group) => group));
    const createItem = computed(() => {
      if (!props.createItem || !searchTerm.value) {
        return false;
      }
      const newItem = props.valueKey ? { [props.valueKey]: searchTerm.value } : searchTerm.value;
      if (typeof props.createItem === "object" && props.createItem.when === "always" || props.createItem === "always") {
        return !filteredItems.value.find((item) => compare(item, newItem, props.valueKey));
      }
      return !filteredItems.value.length;
    });
    const createItemPosition = computed(() => typeof props.createItem === "object" ? props.createItem.position : "bottom");
    const triggerRef = ref(null);
    function onUpdate(value) {
      if (toRaw(props.modelValue) === value) {
        return;
      }
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
      if (props.resetSearchTermOnSelect) {
        searchTerm.value = "";
      }
    }
    function onUpdateOpen(value) {
      let timeoutId;
      if (!value) {
        const event = new FocusEvent("blur");
        emits("blur", event);
        emitFormBlur();
        if (props.resetSearchTermOnBlur) {
          const STATE_ANIMATION_DELAY_MS = 100;
          timeoutId = setTimeout(() => {
            searchTerm.value = "";
          }, STATE_ANIMATION_DELAY_MS);
        }
      } else {
        const event = new FocusEvent("focus");
        emits("focus", event);
        emitFormFocus();
        clearTimeout(timeoutId);
      }
    }
    function onSelect(e, item) {
      var _a;
      if (!isSelectItem(item)) {
        return;
      }
      if (item.disabled) {
        e.preventDefault();
        return;
      }
      (_a = item.onSelect) == null ? void 0 : _a.call(item, e);
    }
    function isSelectItem(item) {
      return typeof item === "object" && item !== null;
    }
    __expose({
      triggerRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(DefineCreateItemTemplate), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(unref(ComboboxGroup), {
              class: ui.value.group({ class: (_a = props.ui) == null ? void 0 : _a.group })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ComboboxItem), {
                    class: ui.value.item({ class: (_a2 = props.ui) == null ? void 0 : _a2.item }),
                    value: searchTerm.value,
                    onSelect: ($event) => emits("create", searchTerm.value)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a3, _b3;
                      if (_push4) {
                        _push4(`<span class="${ssrRenderClass(ui.value.itemLabel({ class: (_a3 = props.ui) == null ? void 0 : _a3.itemLabel }))}"${_scopeId3}>`);
                        ssrRenderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => {
                          _push4(`${ssrInterpolate(unref(t)("selectMenu.create", { label: searchTerm.value }))}`);
                        }, _push4, _parent4, _scopeId3);
                        _push4(`</span>`);
                      } else {
                        return [
                          createVNode("span", {
                            class: ui.value.itemLabel({ class: (_b3 = props.ui) == null ? void 0 : _b3.itemLabel })
                          }, [
                            renderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => [
                              createTextVNode(toDisplayString(unref(t)("selectMenu.create", { label: searchTerm.value })), 1)
                            ])
                          ], 2)
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ComboboxItem), {
                      class: ui.value.item({ class: (_b2 = props.ui) == null ? void 0 : _b2.item }),
                      value: searchTerm.value,
                      onSelect: withModifiers(($event) => emits("create", searchTerm.value), ["prevent"])
                    }, {
                      default: withCtx(() => {
                        var _a3;
                        return [
                          createVNode("span", {
                            class: ui.value.itemLabel({ class: (_a3 = props.ui) == null ? void 0 : _a3.itemLabel })
                          }, [
                            renderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => [
                              createTextVNode(toDisplayString(unref(t)("selectMenu.create", { label: searchTerm.value })), 1)
                            ])
                          ], 2)
                        ];
                      }),
                      _: 3
                    }, 8, ["class", "value", "onSelect"])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ComboboxGroup), {
                class: ui.value.group({ class: (_b = props.ui) == null ? void 0 : _b.group })
              }, {
                default: withCtx(() => {
                  var _a2;
                  return [
                    createVNode(unref(ComboboxItem), {
                      class: ui.value.item({ class: (_a2 = props.ui) == null ? void 0 : _a2.item }),
                      value: searchTerm.value,
                      onSelect: withModifiers(($event) => emits("create", searchTerm.value), ["prevent"])
                    }, {
                      default: withCtx(() => {
                        var _a3;
                        return [
                          createVNode("span", {
                            class: ui.value.itemLabel({ class: (_a3 = props.ui) == null ? void 0 : _a3.itemLabel })
                          }, [
                            renderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => [
                              createTextVNode(toDisplayString(unref(t)("selectMenu.create", { label: searchTerm.value })), 1)
                            ])
                          ], 2)
                        ];
                      }),
                      _: 3
                    }, 8, ["class", "value", "onSelect"])
                  ];
                }),
                _: 3
              }, 8, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(unref(ComboboxRoot), mergeProps({ id: unref(id) }, { ...unref(rootProps), ..._ctx.$attrs, ...unref(ariaAttrs) }, {
        "ignore-filter": "",
        "as-child": "",
        name: unref(name),
        disabled: unref(disabled),
        "onUpdate:modelValue": onUpdate,
        "onUpdate:open": onUpdateOpen
      }), {
        default: withCtx(({ modelValue, open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ComboboxAnchor), { "as-child": "" }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ComboboxTrigger), {
                    ref_key: "triggerRef",
                    ref: triggerRef,
                    class: ui.value.base({ class: [(_a = props.ui) == null ? void 0 : _a.base, props.class] }),
                    tabindex: "0"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      var _a2, _b2, _c, _d;
                      if (_push4) {
                        if (unref(isLeading) || !!__props.avatar || !!slots.leading) {
                          _push4(`<span class="${ssrRenderClass(ui.value.leading({ class: (_a2 = props.ui) == null ? void 0 : _a2.leading }))}"${_scopeId3}>`);
                          ssrRenderSlot(_ctx.$slots, "leading", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => {
                            var _a3, _b3, _c2;
                            if (unref(isLeading) && unref(leadingIconName)) {
                              _push4(ssrRenderComponent(_sfc_main$d, {
                                name: unref(leadingIconName),
                                class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                              }, null, _parent4, _scopeId3));
                            } else if (!!__props.avatar) {
                              _push4(ssrRenderComponent(_sfc_main$b, mergeProps({
                                size: ((_b3 = props.ui) == null ? void 0 : _b3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                              }, __props.avatar, {
                                class: ui.value.itemLeadingAvatar({ class: (_c2 = props.ui) == null ? void 0 : _c2.itemLeadingAvatar })
                              }), null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                          _push4(`</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        ssrRenderSlot(_ctx.$slots, "default", {
                          modelValue,
                          open
                        }, () => {
                          _push4(`<!--[-->`);
                          ssrRenderList([displayValue(modelValue)], (displayedModelValue) => {
                            var _a4;
                            var _a3, _b3;
                            _push4(`<!--[-->`);
                            if (displayedModelValue !== void 0 && displayedModelValue !== null) {
                              _push4(`<span class="${ssrRenderClass(ui.value.value({ class: (_a3 = props.ui) == null ? void 0 : _a3.value }))}"${_scopeId3}>${ssrInterpolate(displayedModelValue)}</span>`);
                            } else {
                              _push4(`<span class="${ssrRenderClass(ui.value.placeholder({ class: (_b3 = props.ui) == null ? void 0 : _b3.placeholder }))}"${_scopeId3}>${ssrInterpolate((_a4 = __props.placeholder) != null ? _a4 : "\xA0")}</span>`);
                            }
                            _push4(`<!--]-->`);
                          });
                          _push4(`<!--]-->`);
                        }, _push4, _parent4, _scopeId3);
                        if (unref(isTrailing) || !!slots.trailing) {
                          _push4(`<span class="${ssrRenderClass(ui.value.trailing({ class: (_b2 = props.ui) == null ? void 0 : _b2.trailing }))}"${_scopeId3}>`);
                          ssrRenderSlot(_ctx.$slots, "trailing", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => {
                            var _a3;
                            if (unref(trailingIconName)) {
                              _push4(ssrRenderComponent(_sfc_main$d, {
                                name: unref(trailingIconName),
                                class: ui.value.trailingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.trailingIcon })
                              }, null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                          _push4(`</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: ui.value.leading({ class: (_c = props.ui) == null ? void 0 : _c.leading })
                          }, [
                            renderSlot(_ctx.$slots, "leading", {
                              modelValue,
                              open,
                              ui: ui.value
                            }, () => {
                              var _a3, _b3, _c2;
                              return [
                                unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$d, {
                                  key: 0,
                                  name: unref(leadingIconName),
                                  class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                                }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                  key: 1,
                                  size: ((_b3 = props.ui) == null ? void 0 : _b3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                }, __props.avatar, {
                                  class: ui.value.itemLeadingAvatar({ class: (_c2 = props.ui) == null ? void 0 : _c2.itemLeadingAvatar })
                                }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                              ];
                            })
                          ], 2)) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "default", {
                            modelValue,
                            open
                          }, () => [
                            (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                              var _a4;
                              var _a3, _b3;
                              return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [
                                displayedModelValue !== void 0 && displayedModelValue !== null ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: ui.value.value({ class: (_a3 = props.ui) == null ? void 0 : _a3.value })
                                }, toDisplayString(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: ui.value.placeholder({ class: (_b3 = props.ui) == null ? void 0 : _b3.placeholder })
                                }, toDisplayString((_a4 = __props.placeholder) != null ? _a4 : "\xA0"), 3))
                              ], 64);
                            }), 128))
                          ]),
                          unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                            key: 1,
                            class: ui.value.trailing({ class: (_d = props.ui) == null ? void 0 : _d.trailing })
                          }, [
                            renderSlot(_ctx.$slots, "trailing", {
                              modelValue,
                              open,
                              ui: ui.value
                            }, () => {
                              var _a3;
                              return [
                                unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$d, {
                                  key: 0,
                                  name: unref(trailingIconName),
                                  class: ui.value.trailingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.trailingIcon })
                                }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                              ];
                            })
                          ], 2)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ComboboxTrigger), {
                      ref_key: "triggerRef",
                      ref: triggerRef,
                      class: ui.value.base({ class: [(_b = props.ui) == null ? void 0 : _b.base, props.class] }),
                      tabindex: "0"
                    }, {
                      default: withCtx(() => {
                        var _a2, _b2;
                        return [
                          unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: ui.value.leading({ class: (_a2 = props.ui) == null ? void 0 : _a2.leading })
                          }, [
                            renderSlot(_ctx.$slots, "leading", {
                              modelValue,
                              open,
                              ui: ui.value
                            }, () => {
                              var _a3, _b3, _c;
                              return [
                                unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$d, {
                                  key: 0,
                                  name: unref(leadingIconName),
                                  class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                                }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                  key: 1,
                                  size: ((_b3 = props.ui) == null ? void 0 : _b3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                }, __props.avatar, {
                                  class: ui.value.itemLeadingAvatar({ class: (_c = props.ui) == null ? void 0 : _c.itemLeadingAvatar })
                                }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                              ];
                            })
                          ], 2)) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "default", {
                            modelValue,
                            open
                          }, () => [
                            (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                              var _a4;
                              var _a3, _b3;
                              return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [
                                displayedModelValue !== void 0 && displayedModelValue !== null ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: ui.value.value({ class: (_a3 = props.ui) == null ? void 0 : _a3.value })
                                }, toDisplayString(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: ui.value.placeholder({ class: (_b3 = props.ui) == null ? void 0 : _b3.placeholder })
                                }, toDisplayString((_a4 = __props.placeholder) != null ? _a4 : "\xA0"), 3))
                              ], 64);
                            }), 128))
                          ]),
                          unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                            key: 1,
                            class: ui.value.trailing({ class: (_b2 = props.ui) == null ? void 0 : _b2.trailing })
                          }, [
                            renderSlot(_ctx.$slots, "trailing", {
                              modelValue,
                              open,
                              ui: ui.value
                            }, () => {
                              var _a3;
                              return [
                                unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$d, {
                                  key: 0,
                                  name: unref(trailingIconName),
                                  class: ui.value.trailingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.trailingIcon })
                                }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                              ];
                            })
                          ], 2)) : createCommentVNode("", true)
                        ];
                      }),
                      _: 2
                    }, 1032, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ComboboxPortal), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ComboboxContent), mergeProps({
                    class: ui.value.content({ class: (_a = props.ui) == null ? void 0 : _a.content })
                  }, contentProps.value), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      var _a2, _b2, _c, _d;
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(FocusScope), {
                          trapped: "",
                          class: ui.value.focusScope({ class: (_a2 = props.ui) == null ? void 0 : _a2.focusScope })
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            var _a3, _b3, _c2, _d2;
                            if (_push5) {
                              ssrRenderSlot(_ctx.$slots, "content-top", {}, null, _push5, _parent5, _scopeId4);
                              if (!!__props.searchInput) {
                                _push5(ssrRenderComponent(unref(ComboboxInput), {
                                  modelValue: searchTerm.value,
                                  "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                  "display-value": () => searchTerm.value,
                                  "as-child": ""
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    var _a4, _b4;
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_sfc_main$2, mergeProps({
                                        autofocus: "",
                                        autocomplete: "off",
                                        size: __props.size
                                      }, searchInputProps.value, {
                                        class: ui.value.input({ class: (_a4 = props.ui) == null ? void 0 : _a4.input })
                                      }), null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_sfc_main$2, mergeProps({
                                          autofocus: "",
                                          autocomplete: "off",
                                          size: __props.size
                                        }, searchInputProps.value, {
                                          class: ui.value.input({ class: (_b4 = props.ui) == null ? void 0 : _b4.input })
                                        }), null, 16, ["size", "class"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(ssrRenderComponent(unref(ComboboxEmpty), {
                                class: ui.value.empty({ class: (_a3 = props.ui) == null ? void 0 : _a3.empty })
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    ssrRenderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => {
                                      _push6(`${ssrInterpolate(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData"))}`);
                                    }, _push6, _parent6, _scopeId5);
                                  } else {
                                    return [
                                      renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                        createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                                      ])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`<div role="presentation" class="${ssrRenderClass(ui.value.viewport({ class: (_b3 = props.ui) == null ? void 0 : _b3.viewport }))}"${_scopeId4}>`);
                              if (createItem.value && createItemPosition.value === "top") {
                                _push5(ssrRenderComponent(unref(ReuseCreateItemTemplate), null, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`<!--[-->`);
                              ssrRenderList(filteredGroups.value, (group, groupIndex) => {
                                var _a4;
                                _push5(ssrRenderComponent(unref(ComboboxGroup), {
                                  key: `group-${groupIndex}`,
                                  class: ui.value.group({ class: (_a4 = props.ui) == null ? void 0 : _a4.group })
                                }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(group, (item, index) => {
                                        var _a5, _b4, _c3, _d3, _e, _f;
                                        _push6(`<!--[-->`);
                                        if (isSelectItem(item) && item.type === "label") {
                                          _push6(ssrRenderComponent(unref(ComboboxLabel), {
                                            class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                          }, {
                                            default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
                                              } else {
                                                return [
                                                  createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        } else if (isSelectItem(item) && item.type === "separator") {
                                          _push6(ssrRenderComponent(unref(ComboboxSeparator), {
                                            class: ui.value.separator({ class: [(_c3 = props.ui) == null ? void 0 : _c3.separator, (_d3 = item.ui) == null ? void 0 : _d3.separator, item.class] })
                                          }, null, _parent6, _scopeId5));
                                        } else {
                                          _push6(ssrRenderComponent(unref(ComboboxItem), {
                                            class: ui.value.item({ class: [(_e = props.ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                            disabled: isSelectItem(item) && item.disabled,
                                            value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                            onSelect: ($event) => onSelect($event, item)
                                          }, {
                                            default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                ssrRenderSlot(_ctx.$slots, "item", {
                                                  item,
                                                  index
                                                }, () => {
                                                  var _a6, _b5, _c4, _d4;
                                                  ssrRenderSlot(_ctx.$slots, "item-leading", {
                                                    item,
                                                    index
                                                  }, () => {
                                                    var _a7, _b6, _c5, _d5, _e2, _f2, _g, _h, _i;
                                                    if (isSelectItem(item) && item.icon) {
                                                      _push7(ssrRenderComponent(_sfc_main$d, {
                                                        name: item.icon,
                                                        class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                      }, null, _parent7, _scopeId6));
                                                    } else if (isSelectItem(item) && item.avatar) {
                                                      _push7(ssrRenderComponent(_sfc_main$b, mergeProps({
                                                        size: ((_c5 = item.ui) == null ? void 0 : _c5.itemLeadingAvatarSize) || ((_d5 = props.ui) == null ? void 0 : _d5.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                      }, { ref_for: true }, item.avatar, {
                                                        class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                      }), null, _parent7, _scopeId6));
                                                    } else if (isSelectItem(item) && item.chip) {
                                                      _push7(ssrRenderComponent(_sfc_main$c, mergeProps({
                                                        size: ((_g = props.ui) == null ? void 0 : _g.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                        inset: "",
                                                        standalone: ""
                                                      }, { ref_for: true }, item.chip, {
                                                        class: ui.value.itemLeadingChip({ class: [(_h = props.ui) == null ? void 0 : _h.itemLeadingChip, (_i = item.ui) == null ? void 0 : _i.itemLeadingChip] })
                                                      }), null, _parent7, _scopeId6));
                                                    } else {
                                                      _push7(`<!---->`);
                                                    }
                                                  }, _push7, _parent7, _scopeId6);
                                                  _push7(`<span class="${ssrRenderClass(ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemLabel)] }))}"${_scopeId6}>`);
                                                  ssrRenderSlot(_ctx.$slots, "item-label", {
                                                    item,
                                                    index
                                                  }, () => {
                                                    _push7(`${ssrInterpolate(isSelectItem(item) ? unref(get)(item, props.labelKey) : item)}`);
                                                  }, _push7, _parent7, _scopeId6);
                                                  _push7(`</span><span class="${ssrRenderClass(ui.value.itemTrailing({ class: [(_c4 = props.ui) == null ? void 0 : _c4.itemTrailing, isSelectItem(item) && ((_d4 = item.ui) == null ? void 0 : _d4.itemTrailing)] }))}"${_scopeId6}>`);
                                                  ssrRenderSlot(_ctx.$slots, "item-trailing", {
                                                    item,
                                                    index
                                                  }, null, _push7, _parent7, _scopeId6);
                                                  _push7(ssrRenderComponent(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                    default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                      var _a7, _b6, _c5, _d5;
                                                      if (_push8) {
                                                        _push8(ssrRenderComponent(_sfc_main$d, {
                                                          name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                          class: ui.value.itemTrailingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b6 = item.ui) == null ? void 0 : _b6.itemTrailingIcon)] })
                                                        }, null, _parent8, _scopeId7));
                                                      } else {
                                                        return [
                                                          createVNode(_sfc_main$d, {
                                                            name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                            class: ui.value.itemTrailingIcon({ class: [(_c5 = props.ui) == null ? void 0 : _c5.itemTrailingIcon, isSelectItem(item) && ((_d5 = item.ui) == null ? void 0 : _d5.itemTrailingIcon)] })
                                                          }, null, 8, ["name", "class"])
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent7, _scopeId6));
                                                  _push7(`</span>`);
                                                }, _push7, _parent7, _scopeId6);
                                              } else {
                                                return [
                                                  renderSlot(_ctx.$slots, "item", {
                                                    item,
                                                    index
                                                  }, () => {
                                                    var _a6, _b5, _c4, _d4;
                                                    return [
                                                      renderSlot(_ctx.$slots, "item-leading", {
                                                        item,
                                                        index
                                                      }, () => {
                                                        var _a7, _b6, _c5, _d5, _e2, _f2, _g, _h, _i;
                                                        return [
                                                          isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$d, {
                                                            key: 0,
                                                            name: item.icon,
                                                            class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                          }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                                            key: 1,
                                                            size: ((_c5 = item.ui) == null ? void 0 : _c5.itemLeadingAvatarSize) || ((_d5 = props.ui) == null ? void 0 : _d5.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                          }, { ref_for: true }, item.avatar, {
                                                            class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                          }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                            key: 2,
                                                            size: ((_g = props.ui) == null ? void 0 : _g.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                            inset: "",
                                                            standalone: ""
                                                          }, { ref_for: true }, item.chip, {
                                                            class: ui.value.itemLeadingChip({ class: [(_h = props.ui) == null ? void 0 : _h.itemLeadingChip, (_i = item.ui) == null ? void 0 : _i.itemLeadingChip] })
                                                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                        ];
                                                      }),
                                                      createVNode("span", {
                                                        class: ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemLabel)] })
                                                      }, [
                                                        renderSlot(_ctx.$slots, "item-label", {
                                                          item,
                                                          index
                                                        }, () => [
                                                          createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                        ])
                                                      ], 2),
                                                      createVNode("span", {
                                                        class: ui.value.itemTrailing({ class: [(_c4 = props.ui) == null ? void 0 : _c4.itemTrailing, isSelectItem(item) && ((_d4 = item.ui) == null ? void 0 : _d4.itemTrailing)] })
                                                      }, [
                                                        renderSlot(_ctx.$slots, "item-trailing", {
                                                          item,
                                                          index
                                                        }),
                                                        createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                          default: withCtx(() => {
                                                            var _a7, _b6;
                                                            return [
                                                              createVNode(_sfc_main$d, {
                                                                name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                                class: ui.value.itemTrailingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b6 = item.ui) == null ? void 0 : _b6.itemTrailingIcon)] })
                                                              }, null, 8, ["name", "class"])
                                                            ];
                                                          }),
                                                          _: 2
                                                        }, 1024)
                                                      ], 2)
                                                    ];
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        }
                                        _push6(`<!--]-->`);
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                          var _a5, _b4, _c3, _d3, _e, _f;
                                          return openBlock(), createBlock(Fragment, {
                                            key: `group-${groupIndex}-${index}`
                                          }, [
                                            isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(ComboboxLabel), {
                                              key: 0,
                                              class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(ComboboxSeparator), {
                                              key: 1,
                                              class: ui.value.separator({ class: [(_c3 = props.ui) == null ? void 0 : _c3.separator, (_d3 = item.ui) == null ? void 0 : _d3.separator, item.class] })
                                            }, null, 8, ["class"])) : (openBlock(), createBlock(unref(ComboboxItem), {
                                              key: 2,
                                              class: ui.value.item({ class: [(_e = props.ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                              disabled: isSelectItem(item) && item.disabled,
                                              value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                              onSelect: ($event) => onSelect($event, item)
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "item", {
                                                  item,
                                                  index
                                                }, () => {
                                                  var _a6, _b5, _c4, _d4;
                                                  return [
                                                    renderSlot(_ctx.$slots, "item-leading", {
                                                      item,
                                                      index
                                                    }, () => {
                                                      var _a7, _b6, _c5, _d5, _e2, _f2, _g, _h, _i;
                                                      return [
                                                        isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$d, {
                                                          key: 0,
                                                          name: item.icon,
                                                          class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                        }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                                          key: 1,
                                                          size: ((_c5 = item.ui) == null ? void 0 : _c5.itemLeadingAvatarSize) || ((_d5 = props.ui) == null ? void 0 : _d5.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                        }, { ref_for: true }, item.avatar, {
                                                          class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                        }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                          key: 2,
                                                          size: ((_g = props.ui) == null ? void 0 : _g.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                          inset: "",
                                                          standalone: ""
                                                        }, { ref_for: true }, item.chip, {
                                                          class: ui.value.itemLeadingChip({ class: [(_h = props.ui) == null ? void 0 : _h.itemLeadingChip, (_i = item.ui) == null ? void 0 : _i.itemLeadingChip] })
                                                        }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                      ];
                                                    }),
                                                    createVNode("span", {
                                                      class: ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemLabel)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-label", {
                                                        item,
                                                        index
                                                      }, () => [
                                                        createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                      ])
                                                    ], 2),
                                                    createVNode("span", {
                                                      class: ui.value.itemTrailing({ class: [(_c4 = props.ui) == null ? void 0 : _c4.itemTrailing, isSelectItem(item) && ((_d4 = item.ui) == null ? void 0 : _d4.itemTrailing)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-trailing", {
                                                        item,
                                                        index
                                                      }),
                                                      createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                        default: withCtx(() => {
                                                          var _a7, _b6;
                                                          return [
                                                            createVNode(_sfc_main$d, {
                                                              name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                              class: ui.value.itemTrailingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b6 = item.ui) == null ? void 0 : _b6.itemTrailingIcon)] })
                                                            }, null, 8, ["name", "class"])
                                                          ];
                                                        }),
                                                        _: 2
                                                      }, 1024)
                                                    ], 2)
                                                  ];
                                                })
                                              ]),
                                              _: 2
                                            }, 1032, ["class", "disabled", "value", "onSelect"]))
                                          ], 64);
                                        }), 128))
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                              if (createItem.value && createItemPosition.value === "bottom") {
                                _push5(ssrRenderComponent(unref(ReuseCreateItemTemplate), null, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div>`);
                              ssrRenderSlot(_ctx.$slots, "content-bottom", {}, null, _push5, _parent5, _scopeId4);
                            } else {
                              return [
                                renderSlot(_ctx.$slots, "content-top"),
                                !!__props.searchInput ? (openBlock(), createBlock(unref(ComboboxInput), {
                                  key: 0,
                                  modelValue: searchTerm.value,
                                  "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                  "display-value": () => searchTerm.value,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => {
                                    var _a4;
                                    return [
                                      createVNode(_sfc_main$2, mergeProps({
                                        autofocus: "",
                                        autocomplete: "off",
                                        size: __props.size
                                      }, searchInputProps.value, {
                                        class: ui.value.input({ class: (_a4 = props.ui) == null ? void 0 : _a4.input })
                                      }), null, 16, ["size", "class"])
                                    ];
                                  }),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : createCommentVNode("", true),
                                createVNode(unref(ComboboxEmpty), {
                                  class: ui.value.empty({ class: (_c2 = props.ui) == null ? void 0 : _c2.empty })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                      createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"]),
                                createVNode("div", {
                                  role: "presentation",
                                  class: ui.value.viewport({ class: (_d2 = props.ui) == null ? void 0 : _d2.viewport })
                                }, [
                                  createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                                    var _a4;
                                    return openBlock(), createBlock(unref(ComboboxGroup), {
                                      key: `group-${groupIndex}`,
                                      class: ui.value.group({ class: (_a4 = props.ui) == null ? void 0 : _a4.group })
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                          var _a5, _b4, _c3, _d3, _e, _f;
                                          return openBlock(), createBlock(Fragment, {
                                            key: `group-${groupIndex}-${index}`
                                          }, [
                                            isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(ComboboxLabel), {
                                              key: 0,
                                              class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(ComboboxSeparator), {
                                              key: 1,
                                              class: ui.value.separator({ class: [(_c3 = props.ui) == null ? void 0 : _c3.separator, (_d3 = item.ui) == null ? void 0 : _d3.separator, item.class] })
                                            }, null, 8, ["class"])) : (openBlock(), createBlock(unref(ComboboxItem), {
                                              key: 2,
                                              class: ui.value.item({ class: [(_e = props.ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                              disabled: isSelectItem(item) && item.disabled,
                                              value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                              onSelect: ($event) => onSelect($event, item)
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "item", {
                                                  item,
                                                  index
                                                }, () => {
                                                  var _a6, _b5, _c4, _d4;
                                                  return [
                                                    renderSlot(_ctx.$slots, "item-leading", {
                                                      item,
                                                      index
                                                    }, () => {
                                                      var _a7, _b6, _c5, _d5, _e2, _f2, _g, _h, _i;
                                                      return [
                                                        isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$d, {
                                                          key: 0,
                                                          name: item.icon,
                                                          class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                        }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                                          key: 1,
                                                          size: ((_c5 = item.ui) == null ? void 0 : _c5.itemLeadingAvatarSize) || ((_d5 = props.ui) == null ? void 0 : _d5.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                        }, { ref_for: true }, item.avatar, {
                                                          class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                        }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                          key: 2,
                                                          size: ((_g = props.ui) == null ? void 0 : _g.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                          inset: "",
                                                          standalone: ""
                                                        }, { ref_for: true }, item.chip, {
                                                          class: ui.value.itemLeadingChip({ class: [(_h = props.ui) == null ? void 0 : _h.itemLeadingChip, (_i = item.ui) == null ? void 0 : _i.itemLeadingChip] })
                                                        }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                      ];
                                                    }),
                                                    createVNode("span", {
                                                      class: ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemLabel)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-label", {
                                                        item,
                                                        index
                                                      }, () => [
                                                        createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                      ])
                                                    ], 2),
                                                    createVNode("span", {
                                                      class: ui.value.itemTrailing({ class: [(_c4 = props.ui) == null ? void 0 : _c4.itemTrailing, isSelectItem(item) && ((_d4 = item.ui) == null ? void 0 : _d4.itemTrailing)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-trailing", {
                                                        item,
                                                        index
                                                      }),
                                                      createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                        default: withCtx(() => {
                                                          var _a7, _b6;
                                                          return [
                                                            createVNode(_sfc_main$d, {
                                                              name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                              class: ui.value.itemTrailingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b6 = item.ui) == null ? void 0 : _b6.itemTrailingIcon)] })
                                                            }, null, 8, ["name", "class"])
                                                          ];
                                                        }),
                                                        _: 2
                                                      }, 1024)
                                                    ], 2)
                                                  ];
                                                })
                                              ]),
                                              _: 2
                                            }, 1032, ["class", "disabled", "value", "onSelect"]))
                                          ], 64);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1032, ["class"]);
                                  }), 128)),
                                  createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
                                ], 2),
                                renderSlot(_ctx.$slots, "content-bottom")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        if (!!__props.arrow) {
                          _push4(ssrRenderComponent(unref(ComboboxArrow), mergeProps(arrowProps.value, {
                            class: ui.value.arrow({ class: (_b2 = props.ui) == null ? void 0 : _b2.arrow })
                          }), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode(unref(FocusScope), {
                            trapped: "",
                            class: ui.value.focusScope({ class: (_c = props.ui) == null ? void 0 : _c.focusScope })
                          }, {
                            default: withCtx(() => {
                              var _a3, _b3;
                              return [
                                renderSlot(_ctx.$slots, "content-top"),
                                !!__props.searchInput ? (openBlock(), createBlock(unref(ComboboxInput), {
                                  key: 0,
                                  modelValue: searchTerm.value,
                                  "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                  "display-value": () => searchTerm.value,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => {
                                    var _a4;
                                    return [
                                      createVNode(_sfc_main$2, mergeProps({
                                        autofocus: "",
                                        autocomplete: "off",
                                        size: __props.size
                                      }, searchInputProps.value, {
                                        class: ui.value.input({ class: (_a4 = props.ui) == null ? void 0 : _a4.input })
                                      }), null, 16, ["size", "class"])
                                    ];
                                  }),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : createCommentVNode("", true),
                                createVNode(unref(ComboboxEmpty), {
                                  class: ui.value.empty({ class: (_a3 = props.ui) == null ? void 0 : _a3.empty })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                      createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"]),
                                createVNode("div", {
                                  role: "presentation",
                                  class: ui.value.viewport({ class: (_b3 = props.ui) == null ? void 0 : _b3.viewport })
                                }, [
                                  createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                                    var _a4;
                                    return openBlock(), createBlock(unref(ComboboxGroup), {
                                      key: `group-${groupIndex}`,
                                      class: ui.value.group({ class: (_a4 = props.ui) == null ? void 0 : _a4.group })
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                          var _a5, _b4, _c2, _d2, _e, _f;
                                          return openBlock(), createBlock(Fragment, {
                                            key: `group-${groupIndex}-${index}`
                                          }, [
                                            isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(ComboboxLabel), {
                                              key: 0,
                                              class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(ComboboxSeparator), {
                                              key: 1,
                                              class: ui.value.separator({ class: [(_c2 = props.ui) == null ? void 0 : _c2.separator, (_d2 = item.ui) == null ? void 0 : _d2.separator, item.class] })
                                            }, null, 8, ["class"])) : (openBlock(), createBlock(unref(ComboboxItem), {
                                              key: 2,
                                              class: ui.value.item({ class: [(_e = props.ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                              disabled: isSelectItem(item) && item.disabled,
                                              value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                              onSelect: ($event) => onSelect($event, item)
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "item", {
                                                  item,
                                                  index
                                                }, () => {
                                                  var _a6, _b5, _c3, _d3;
                                                  return [
                                                    renderSlot(_ctx.$slots, "item-leading", {
                                                      item,
                                                      index
                                                    }, () => {
                                                      var _a7, _b6, _c4, _d4, _e2, _f2, _g, _h, _i;
                                                      return [
                                                        isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$d, {
                                                          key: 0,
                                                          name: item.icon,
                                                          class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                        }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                                          key: 1,
                                                          size: ((_c4 = item.ui) == null ? void 0 : _c4.itemLeadingAvatarSize) || ((_d4 = props.ui) == null ? void 0 : _d4.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                        }, { ref_for: true }, item.avatar, {
                                                          class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                        }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                          key: 2,
                                                          size: ((_g = props.ui) == null ? void 0 : _g.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                          inset: "",
                                                          standalone: ""
                                                        }, { ref_for: true }, item.chip, {
                                                          class: ui.value.itemLeadingChip({ class: [(_h = props.ui) == null ? void 0 : _h.itemLeadingChip, (_i = item.ui) == null ? void 0 : _i.itemLeadingChip] })
                                                        }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                      ];
                                                    }),
                                                    createVNode("span", {
                                                      class: ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemLabel)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-label", {
                                                        item,
                                                        index
                                                      }, () => [
                                                        createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                      ])
                                                    ], 2),
                                                    createVNode("span", {
                                                      class: ui.value.itemTrailing({ class: [(_c3 = props.ui) == null ? void 0 : _c3.itemTrailing, isSelectItem(item) && ((_d3 = item.ui) == null ? void 0 : _d3.itemTrailing)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-trailing", {
                                                        item,
                                                        index
                                                      }),
                                                      createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                        default: withCtx(() => {
                                                          var _a7, _b6;
                                                          return [
                                                            createVNode(_sfc_main$d, {
                                                              name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                              class: ui.value.itemTrailingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b6 = item.ui) == null ? void 0 : _b6.itemTrailingIcon)] })
                                                            }, null, 8, ["name", "class"])
                                                          ];
                                                        }),
                                                        _: 2
                                                      }, 1024)
                                                    ], 2)
                                                  ];
                                                })
                                              ]),
                                              _: 2
                                            }, 1032, ["class", "disabled", "value", "onSelect"]))
                                          ], 64);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1032, ["class"]);
                                  }), 128)),
                                  createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
                                ], 2),
                                renderSlot(_ctx.$slots, "content-bottom")
                              ];
                            }),
                            _: 3
                          }, 8, ["class"]),
                          !!__props.arrow ? (openBlock(), createBlock(unref(ComboboxArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            class: ui.value.arrow({ class: (_d = props.ui) == null ? void 0 : _d.arrow })
                          }), null, 16, ["class"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ComboboxContent), mergeProps({
                      class: ui.value.content({ class: (_b = props.ui) == null ? void 0 : _b.content })
                    }, contentProps.value), {
                      default: withCtx(() => {
                        var _a2, _b2;
                        return [
                          createVNode(unref(FocusScope), {
                            trapped: "",
                            class: ui.value.focusScope({ class: (_a2 = props.ui) == null ? void 0 : _a2.focusScope })
                          }, {
                            default: withCtx(() => {
                              var _a3, _b3;
                              return [
                                renderSlot(_ctx.$slots, "content-top"),
                                !!__props.searchInput ? (openBlock(), createBlock(unref(ComboboxInput), {
                                  key: 0,
                                  modelValue: searchTerm.value,
                                  "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                  "display-value": () => searchTerm.value,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => {
                                    var _a4;
                                    return [
                                      createVNode(_sfc_main$2, mergeProps({
                                        autofocus: "",
                                        autocomplete: "off",
                                        size: __props.size
                                      }, searchInputProps.value, {
                                        class: ui.value.input({ class: (_a4 = props.ui) == null ? void 0 : _a4.input })
                                      }), null, 16, ["size", "class"])
                                    ];
                                  }),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : createCommentVNode("", true),
                                createVNode(unref(ComboboxEmpty), {
                                  class: ui.value.empty({ class: (_a3 = props.ui) == null ? void 0 : _a3.empty })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                      createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"]),
                                createVNode("div", {
                                  role: "presentation",
                                  class: ui.value.viewport({ class: (_b3 = props.ui) == null ? void 0 : _b3.viewport })
                                }, [
                                  createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                                    var _a4;
                                    return openBlock(), createBlock(unref(ComboboxGroup), {
                                      key: `group-${groupIndex}`,
                                      class: ui.value.group({ class: (_a4 = props.ui) == null ? void 0 : _a4.group })
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                          var _a5, _b4, _c, _d, _e, _f;
                                          return openBlock(), createBlock(Fragment, {
                                            key: `group-${groupIndex}-${index}`
                                          }, [
                                            isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(ComboboxLabel), {
                                              key: 0,
                                              class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b4 = item.ui) == null ? void 0 : _b4.label, item.class] })
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(ComboboxSeparator), {
                                              key: 1,
                                              class: ui.value.separator({ class: [(_c = props.ui) == null ? void 0 : _c.separator, (_d = item.ui) == null ? void 0 : _d.separator, item.class] })
                                            }, null, 8, ["class"])) : (openBlock(), createBlock(unref(ComboboxItem), {
                                              key: 2,
                                              class: ui.value.item({ class: [(_e = props.ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                              disabled: isSelectItem(item) && item.disabled,
                                              value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                              onSelect: ($event) => onSelect($event, item)
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "item", {
                                                  item,
                                                  index
                                                }, () => {
                                                  var _a6, _b5, _c2, _d2;
                                                  return [
                                                    renderSlot(_ctx.$slots, "item-leading", {
                                                      item,
                                                      index
                                                    }, () => {
                                                      var _a7, _b6, _c3, _d3, _e2, _f2, _g, _h, _i;
                                                      return [
                                                        isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$d, {
                                                          key: 0,
                                                          name: item.icon,
                                                          class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b6 = item.ui) == null ? void 0 : _b6.itemLeadingIcon] })
                                                        }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                                          key: 1,
                                                          size: ((_c3 = item.ui) == null ? void 0 : _c3.itemLeadingAvatarSize) || ((_d3 = props.ui) == null ? void 0 : _d3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                        }, { ref_for: true }, item.avatar, {
                                                          class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                        }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                          key: 2,
                                                          size: ((_g = props.ui) == null ? void 0 : _g.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                          inset: "",
                                                          standalone: ""
                                                        }, { ref_for: true }, item.chip, {
                                                          class: ui.value.itemLeadingChip({ class: [(_h = props.ui) == null ? void 0 : _h.itemLeadingChip, (_i = item.ui) == null ? void 0 : _i.itemLeadingChip] })
                                                        }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                      ];
                                                    }),
                                                    createVNode("span", {
                                                      class: ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemLabel)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-label", {
                                                        item,
                                                        index
                                                      }, () => [
                                                        createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                      ])
                                                    ], 2),
                                                    createVNode("span", {
                                                      class: ui.value.itemTrailing({ class: [(_c2 = props.ui) == null ? void 0 : _c2.itemTrailing, isSelectItem(item) && ((_d2 = item.ui) == null ? void 0 : _d2.itemTrailing)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-trailing", {
                                                        item,
                                                        index
                                                      }),
                                                      createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                        default: withCtx(() => {
                                                          var _a7, _b6;
                                                          return [
                                                            createVNode(_sfc_main$d, {
                                                              name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                              class: ui.value.itemTrailingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b6 = item.ui) == null ? void 0 : _b6.itemTrailingIcon)] })
                                                            }, null, 8, ["name", "class"])
                                                          ];
                                                        }),
                                                        _: 2
                                                      }, 1024)
                                                    ], 2)
                                                  ];
                                                })
                                              ]),
                                              _: 2
                                            }, 1032, ["class", "disabled", "value", "onSelect"]))
                                          ], 64);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1032, ["class"]);
                                  }), 128)),
                                  createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
                                ], 2),
                                renderSlot(_ctx.$slots, "content-bottom")
                              ];
                            }),
                            _: 3
                          }, 8, ["class"]),
                          !!__props.arrow ? (openBlock(), createBlock(unref(ComboboxArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            class: ui.value.arrow({ class: (_b2 = props.ui) == null ? void 0 : _b2.arrow })
                          }), null, 16, ["class"])) : createCommentVNode("", true)
                        ];
                      }),
                      _: 3
                    }, 16, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ComboboxAnchor), { "as-child": "" }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode(unref(ComboboxTrigger), {
                      ref_key: "triggerRef",
                      ref: triggerRef,
                      class: ui.value.base({ class: [(_a = props.ui) == null ? void 0 : _a.base, props.class] }),
                      tabindex: "0"
                    }, {
                      default: withCtx(() => {
                        var _a2, _b;
                        return [
                          unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: ui.value.leading({ class: (_a2 = props.ui) == null ? void 0 : _a2.leading })
                          }, [
                            renderSlot(_ctx.$slots, "leading", {
                              modelValue,
                              open,
                              ui: ui.value
                            }, () => {
                              var _a3, _b2, _c;
                              return [
                                unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$d, {
                                  key: 0,
                                  name: unref(leadingIconName),
                                  class: ui.value.leadingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.leadingIcon })
                                }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                  key: 1,
                                  size: ((_b2 = props.ui) == null ? void 0 : _b2.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                }, __props.avatar, {
                                  class: ui.value.itemLeadingAvatar({ class: (_c = props.ui) == null ? void 0 : _c.itemLeadingAvatar })
                                }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                              ];
                            })
                          ], 2)) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "default", {
                            modelValue,
                            open
                          }, () => [
                            (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                              var _a4;
                              var _a3, _b2;
                              return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [
                                displayedModelValue !== void 0 && displayedModelValue !== null ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: ui.value.value({ class: (_a3 = props.ui) == null ? void 0 : _a3.value })
                                }, toDisplayString(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: ui.value.placeholder({ class: (_b2 = props.ui) == null ? void 0 : _b2.placeholder })
                                }, toDisplayString((_a4 = __props.placeholder) != null ? _a4 : "\xA0"), 3))
                              ], 64);
                            }), 128))
                          ]),
                          unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                            key: 1,
                            class: ui.value.trailing({ class: (_b = props.ui) == null ? void 0 : _b.trailing })
                          }, [
                            renderSlot(_ctx.$slots, "trailing", {
                              modelValue,
                              open,
                              ui: ui.value
                            }, () => {
                              var _a3;
                              return [
                                unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$d, {
                                  key: 0,
                                  name: unref(trailingIconName),
                                  class: ui.value.trailingIcon({ class: (_a3 = props.ui) == null ? void 0 : _a3.trailingIcon })
                                }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                              ];
                            })
                          ], 2)) : createCommentVNode("", true)
                        ];
                      }),
                      _: 2
                    }, 1032, ["class"])
                  ];
                }),
                _: 2
              }, 1024),
              createVNode(unref(ComboboxPortal), unref(portalProps), {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode(unref(ComboboxContent), mergeProps({
                      class: ui.value.content({ class: (_a = props.ui) == null ? void 0 : _a.content })
                    }, contentProps.value), {
                      default: withCtx(() => {
                        var _a2, _b;
                        return [
                          createVNode(unref(FocusScope), {
                            trapped: "",
                            class: ui.value.focusScope({ class: (_a2 = props.ui) == null ? void 0 : _a2.focusScope })
                          }, {
                            default: withCtx(() => {
                              var _a3, _b2;
                              return [
                                renderSlot(_ctx.$slots, "content-top"),
                                !!__props.searchInput ? (openBlock(), createBlock(unref(ComboboxInput), {
                                  key: 0,
                                  modelValue: searchTerm.value,
                                  "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                  "display-value": () => searchTerm.value,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => {
                                    var _a4;
                                    return [
                                      createVNode(_sfc_main$2, mergeProps({
                                        autofocus: "",
                                        autocomplete: "off",
                                        size: __props.size
                                      }, searchInputProps.value, {
                                        class: ui.value.input({ class: (_a4 = props.ui) == null ? void 0 : _a4.input })
                                      }), null, 16, ["size", "class"])
                                    ];
                                  }),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : createCommentVNode("", true),
                                createVNode(unref(ComboboxEmpty), {
                                  class: ui.value.empty({ class: (_a3 = props.ui) == null ? void 0 : _a3.empty })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                      createTextVNode(toDisplayString(searchTerm.value ? unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : unref(t)("selectMenu.noData")), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"]),
                                createVNode("div", {
                                  role: "presentation",
                                  class: ui.value.viewport({ class: (_b2 = props.ui) == null ? void 0 : _b2.viewport })
                                }, [
                                  createItem.value && createItemPosition.value === "top" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 0 })) : createCommentVNode("", true),
                                  (openBlock(true), createBlock(Fragment, null, renderList(filteredGroups.value, (group, groupIndex) => {
                                    var _a4;
                                    return openBlock(), createBlock(unref(ComboboxGroup), {
                                      key: `group-${groupIndex}`,
                                      class: ui.value.group({ class: (_a4 = props.ui) == null ? void 0 : _a4.group })
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                          var _a5, _b3, _c, _d, _e, _f;
                                          return openBlock(), createBlock(Fragment, {
                                            key: `group-${groupIndex}-${index}`
                                          }, [
                                            isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(ComboboxLabel), {
                                              key: 0,
                                              class: ui.value.label({ class: [(_a5 = props.ui) == null ? void 0 : _a5.label, (_b3 = item.ui) == null ? void 0 : _b3.label, item.class] })
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(ComboboxSeparator), {
                                              key: 1,
                                              class: ui.value.separator({ class: [(_c = props.ui) == null ? void 0 : _c.separator, (_d = item.ui) == null ? void 0 : _d.separator, item.class] })
                                            }, null, 8, ["class"])) : (openBlock(), createBlock(unref(ComboboxItem), {
                                              key: 2,
                                              class: ui.value.item({ class: [(_e = props.ui) == null ? void 0 : _e.item, isSelectItem(item) && ((_f = item.ui) == null ? void 0 : _f.item), isSelectItem(item) && item.class] }),
                                              disabled: isSelectItem(item) && item.disabled,
                                              value: props.valueKey && isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                              onSelect: ($event) => onSelect($event, item)
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "item", {
                                                  item,
                                                  index
                                                }, () => {
                                                  var _a6, _b4, _c2, _d2;
                                                  return [
                                                    renderSlot(_ctx.$slots, "item-leading", {
                                                      item,
                                                      index
                                                    }, () => {
                                                      var _a7, _b5, _c3, _d3, _e2, _f2, _g, _h, _i;
                                                      return [
                                                        isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$d, {
                                                          key: 0,
                                                          name: item.icon,
                                                          class: ui.value.itemLeadingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemLeadingIcon, (_b5 = item.ui) == null ? void 0 : _b5.itemLeadingIcon] })
                                                        }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                                          key: 1,
                                                          size: ((_c3 = item.ui) == null ? void 0 : _c3.itemLeadingAvatarSize) || ((_d3 = props.ui) == null ? void 0 : _d3.itemLeadingAvatarSize) || ui.value.itemLeadingAvatarSize()
                                                        }, { ref_for: true }, item.avatar, {
                                                          class: ui.value.itemLeadingAvatar({ class: [(_e2 = props.ui) == null ? void 0 : _e2.itemLeadingAvatar, (_f2 = item.ui) == null ? void 0 : _f2.itemLeadingAvatar] })
                                                        }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                          key: 2,
                                                          size: ((_g = props.ui) == null ? void 0 : _g.itemLeadingChipSize) || ui.value.itemLeadingChipSize(),
                                                          inset: "",
                                                          standalone: ""
                                                        }, { ref_for: true }, item.chip, {
                                                          class: ui.value.itemLeadingChip({ class: [(_h = props.ui) == null ? void 0 : _h.itemLeadingChip, (_i = item.ui) == null ? void 0 : _i.itemLeadingChip] })
                                                        }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                                      ];
                                                    }),
                                                    createVNode("span", {
                                                      class: ui.value.itemLabel({ class: [(_a6 = props.ui) == null ? void 0 : _a6.itemLabel, isSelectItem(item) && ((_b4 = item.ui) == null ? void 0 : _b4.itemLabel)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-label", {
                                                        item,
                                                        index
                                                      }, () => [
                                                        createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                      ])
                                                    ], 2),
                                                    createVNode("span", {
                                                      class: ui.value.itemTrailing({ class: [(_c2 = props.ui) == null ? void 0 : _c2.itemTrailing, isSelectItem(item) && ((_d2 = item.ui) == null ? void 0 : _d2.itemTrailing)] })
                                                    }, [
                                                      renderSlot(_ctx.$slots, "item-trailing", {
                                                        item,
                                                        index
                                                      }),
                                                      createVNode(unref(ComboboxItemIndicator), { "as-child": "" }, {
                                                        default: withCtx(() => {
                                                          var _a7, _b5;
                                                          return [
                                                            createVNode(_sfc_main$d, {
                                                              name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                              class: ui.value.itemTrailingIcon({ class: [(_a7 = props.ui) == null ? void 0 : _a7.itemTrailingIcon, isSelectItem(item) && ((_b5 = item.ui) == null ? void 0 : _b5.itemTrailingIcon)] })
                                                            }, null, 8, ["name", "class"])
                                                          ];
                                                        }),
                                                        _: 2
                                                      }, 1024)
                                                    ], 2)
                                                  ];
                                                })
                                              ]),
                                              _: 2
                                            }, 1032, ["class", "disabled", "value", "onSelect"]))
                                          ], 64);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1032, ["class"]);
                                  }), 128)),
                                  createItem.value && createItemPosition.value === "bottom" ? (openBlock(), createBlock(unref(ReuseCreateItemTemplate), { key: 1 })) : createCommentVNode("", true)
                                ], 2),
                                renderSlot(_ctx.$slots, "content-bottom")
                              ];
                            }),
                            _: 3
                          }, 8, ["class"]),
                          !!__props.arrow ? (openBlock(), createBlock(unref(ComboboxArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            class: ui.value.arrow({ class: (_b = props.ui) == null ? void 0 : _b.arrow })
                          }), null, 16, ["class"])) : createCommentVNode("", true)
                        ];
                      }),
                      _: 3
                    }, 16, ["class"])
                  ];
                }),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/SelectMenu.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const pageSize = 12;
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const products = ref([]);
    const categories = ref([]);
    const loading = ref(true);
    const searchQuery = ref("");
    const selectedCategory = ref("");
    const sortBy = ref("newest");
    const page = ref(1);
    const { formatCOP } = useCurrency();
    useCartStore();
    const { $toast } = useNuxtApp();
    useAuth();
    const fetchProducts = async () => {
      loading.value = true;
      try {
        const params = {
          page: page.value,
          page_size: pageSize,
          search: searchQuery.value || void 0,
          category_id: selectedCategory.value || void 0,
          sort: sortBy.value
        };
        const { data } = await $fetch("/api/products", { params });
        if (data == null ? void 0 : data.success) {
          products.value = data.data;
        }
      } catch (e) {
        console.error("Error cargando productos:", e);
        $toast == null ? void 0 : $toast.error("Error", "No se pudieron cargar los productos");
      } finally {
        loading.value = false;
      }
    };
    watch([selectedCategory, sortBy], () => {
      page.value = 1;
      fetchProducts();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1$1;
      const _component_USelectMenu = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-8" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="mb-8"><h1 class="text-3xl font-bold text-gray-900 mb-4"> Cat\xE1logo de Productos </h1><p class="text-gray-600"> Descubre nuestra colecci\xF3n completa de productos de belleza y moda </p></div><div class="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100"><div class="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-6"><div class="relative w-full md:w-96 shop-search-wrap">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "heroicons:magnifying-glass",
        class: "shop-search-icon absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none",
        "aria-hidden": ""
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Buscar productos..." class="shop-search-input w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500" aria-label="Buscar productos">`);
      if (unref(searchQuery)) {
        _push(`<button type="button" class="shop-search-clear absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-1 transition-colors" aria-label="Limpiar b\xFAsqueda">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:x-mark",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center space-x-3 w-full md:w-auto"><span class="text-sm text-gray-500 whitespace-nowrap">Ordenar por:</span>`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: unref(sortBy),
        "onUpdate:modelValue": ($event) => isRef(sortBy) ? sortBy.value = $event : null,
        options: [
          { label: "M\xE1s Recientes", value: "newest" },
          { label: "Precio: Menor a Mayor", value: "price_asc" },
          { label: "Precio: Mayor a Menor", value: "price_desc" },
          { label: "Nombre A-Z", value: "name_asc" }
        ],
        "option-attribute": "label",
        "value-attribute": "value",
        class: "w-full md:w-48"
      }, null, _parent));
      _push(`</div></div><div class="space-y-3 shop-category-filters"><h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider"> Categor\xEDas </h3><div class="flex flex-wrap gap-2 shop-category-pills"><button class="${ssrRenderClass([
        "shop-category-pill px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
        unref(selectedCategory) === "" ? "bg-pink-600 text-white border-pink-600 shadow-md transform scale-105" : "bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50"
      ])}"> Todas </button><!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(`<button class="${ssrRenderClass([
          "shop-category-pill px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
          unref(selectedCategory) === cat.id_category ? "bg-pink-600 text-white border-pink-600 shadow-md transform scale-105" : "bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50"
        ])}">${ssrInterpolate(cat.name)}</button>`);
      });
      _push(`<!--]--></div></div></div>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center py-12">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "svg-spinners:180-ring-with-bg",
          class: "w-12 h-12 text-pink-600"
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(products).length === 0) {
        _push(`<div class="text-center py-12 bg-white rounded-lg shadow-sm">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:shopping-bag",
          class: "w-16 h-16 mx-auto text-gray-300 mb-4"
        }, null, _parent));
        _push(`<h3 class="text-lg font-medium text-gray-900"> No se encontraron productos </h3><p class="text-gray-500 mt-2"> Intenta ajustar tus filtros de b\xFAsqueda </p><button class="mt-4 text-pink-600 hover:text-pink-700 font-medium"> Limpiar filtros </button></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"><!--[-->`);
        ssrRenderList(unref(products), (product) => {
          var _a;
          _push(`<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group"><div class="relative h-64 bg-gray-100 overflow-hidden">`);
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
          } else if (product.stock_quantity < 5) {
            _push(`<div class="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded"> \xA1\xDALTIMAS UNIDADES! </div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="p-4"><div class="mb-2"><span class="text-xs text-pink-600 font-medium bg-pink-50 px-2 py-1 rounded-full">${ssrInterpolate(((_a = product.category) == null ? void 0 : _a.name) || "General")}</span></div><h3 class="font-semibold text-gray-800 mb-1 truncate"${ssrRenderAttr("title", product.name)}>${ssrInterpolate(product.name)}</h3><p class="text-gray-600 text-sm mb-3 line-clamp-2 h-10">${ssrInterpolate(product.description)}</p><div class="flex justify-between items-center mt-4"><div class="flex flex-col"><span class="text-xl font-bold text-pink-600">${ssrInterpolate(unref(formatCOP)(product.price))}</span><span class="text-xs text-gray-400">SKU: ${ssrInterpolate(product.sku)}</span></div><button${ssrIncludeBooleanAttr(product.stock_quantity <= 0) ? " disabled" : ""} class="bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95 transition-all duration-200" title="Agregar al carrito">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "heroicons:shopping-cart",
            class: "w-5 h-5"
          }, null, _parent));
          _push(`</button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      if (unref(products).length > 0) {
        _push(`<div class="mt-12 flex justify-center items-center space-x-4"><button${ssrIncludeBooleanAttr(unref(page) <= 1) ? " disabled" : ""} class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-left",
          class: "w-5 h-5 mr-1"
        }, null, _parent));
        _push(` Anterior </button><span class="text-gray-600 font-medium">P\xE1gina ${ssrInterpolate(unref(page))}</span><button${ssrIncludeBooleanAttr(unref(products).length < pageSize) ? " disabled" : ""} class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"> Siguiente `);
        _push(ssrRenderComponent(_component_Icon, {
          name: "heroicons:chevron-right",
          class: "w-5 h-5 ml-1"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shop/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Bro8QJco.mjs.map
