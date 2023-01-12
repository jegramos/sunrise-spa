<template>
  <button
    :class="`${buttonShapeClass} ${buttonSizeClass} flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-theme-primary focus-visible:ring-offset-1 focus-visible:ring-offset-theme-section`"
  >
    <slot name="icon"></slot>

    <!-- Implicit default slot for text -->
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: Boolean,
    default: false,
  },
  height: {
    type: Number,
    default: null,
  },
  width: {
    type: Number,
    default: null,
  },
})

const buttonShapeClass = computed(() => {
  if (props.icon) {
    return 'rounded-3xl hover:scale-125'
  }
  return 'py-2 px-3 rounded-xl hover:scale-105'
})

const buttonSizeClass = computed(() => {
  return `${props.height ? 'h-' + props.height : ''} + ${props.width ? 'w-' + props.width : ''}`
})
</script>
