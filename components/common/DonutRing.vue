<template>
  <div class="relative" :style="{ width: sizePx, height: sizePx }">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" class="block drop-shadow-[0_4px_16px_rgba(189,142,137,0.25)]">
      <defs>
        <linearGradient :id="gradId" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" :stop-color="gradientFrom" />
          <stop offset="100%" :stop-color="gradientTo" />
        </linearGradient>
      </defs>
      <circle
        :cx="size/2"
        :cy="size/2"
        :r="radius"
        :stroke="trackStrokeResolved"
        :stroke-width="stroke"
        fill="transparent"
        stroke-linecap="round"
      />
      <circle
        :cx="size/2"
        :cy="size/2"
        :r="radius"
        :stroke="progressStrokeResolved"
        :stroke-width="stroke"
        fill="transparent"
        stroke-linecap="round"
        :style="{
          strokeDasharray: circumference + ' ' + circumference,
          strokeDashoffset: dashOffset,
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%'
        }"
      />
    </svg>
    <div class="absolute inset-0 flex items-center justify-center text-[0.85em] font-semibold tabular-nums tracking-tight theme-text-primary">
      <slot>{{ clamped }}%</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'

/** IDs válidos en SVG url(#…) */
const gradId = `ios-donut-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`

const props = withDefaults(
  defineProps<{
    percent: number
    size?: number
    stroke?: number
    /** Trazo sólido (si no usas gradiente en el arco) */
    color?: string
    trackColor?: string
    /** Degradado mauve tipo iOS Charts */
    gradientFrom?: string
    gradientTo?: string
    /** Si true, el arco usa el degradado; si false, `color` sólido */
    useGradient?: boolean
  }>(),
  {
    size: 128,
    stroke: 16,
    color: '#bd8e89',
    trackColor: 'var(--ios-donut-track)',
    gradientFrom: '#E8D4D1',
    gradientTo: '#BD8E89',
    useGradient: true
  }
)

const clamped = computed(() => {
  const p = Math.max(0, Math.min(100, Math.round(props.percent)))
  return p
})

const size = computed(() => props.size)
const sizePx = computed(() => `${size.value}px`)
const stroke = computed(() => props.stroke)
const radius = computed(() => (size.value - stroke.value) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => ((100 - clamped.value) / 100) * circumference.value)

const trackStrokeResolved = computed(() => props.trackColor)

const progressStrokeResolved = computed(() =>
  props.useGradient ? `url(#${gradId})` : props.color
)
</script>
