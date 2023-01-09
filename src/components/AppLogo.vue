<template>
  <div class="flex items-center">
    <div class="rounded-3xl p-0.5 ring-2 ring-theme-primary mb-0.5 mr-2">
      <fire-icon :class="`text-theme-primary w-${props.iconSize} h-${iconSize}`" />
    </div>
    <h5 :class="`font-logo tracking-wide text-theme-base font-extrabold text-${props.textSize}`">
      Camp<span class="font-extrabold text-theme-primary underline decoration-2 underline-offset-4">fire</span>
    </h5>
  </div>
</template>

<script setup>
import { FireIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  iconSize: {
    type: Number,
    default: 5,
  },
  textSize: {
    type: String,
    default: '2xl',
    validator: (value) => {
      return ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'].includes(value)
    },
  },
})
</script>
