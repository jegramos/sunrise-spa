<template>
  <div class="flex items-center">
    <div class="mb-0.5 mr-2 rounded-3xl p-0.5 ring-2 ring-theme-primary">
      <fire-icon :class="`text-theme-primary ${'w-' + props.iconSize + ' h-' + props.iconSize}`" />
    </div>
    <h5 class="font-logo font-extrabold tracking-wide text-theme-base">
      Camp<span class="font-extrabold text-theme-primary underline decoration-2 underline-offset-4">fire</span>
    </h5>
  </div>
</template>

<script setup>
import { FireIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  iconSize: {
    type: Number,
    default: 6,
  },
})
</script>
