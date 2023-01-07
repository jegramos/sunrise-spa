<template>
  <float
    :show="show"
    :placement="props.placement"
    :offset="8"
    shift
    arrow
    enter="transition duration-200 ease-out"
    enter-from="opacity-0 scale-75"
    enter-to="opacity-100 scale-100"
    leave="transition duration-150 ease-in"
    leave-from="opacity-100 scale-100"
    leave-to="opacity-0 scale-75"
  >
    <div @mouseover="show = true" @mouseleave="show = false">
      <slot name="tooltip-target"></slot>
    </div>
    <div class="text-xs bg-theme-tooling text-theme-tooling py-2 px-3 rounded">
      <float-arrow class="absolute bg-theme-tooling border border-theme-tooling w-3 h-3 rotate-45 ml-0.5" />
      <div class="items-center flex justify-center">
        <slot name="tooltip-icon"></slot>
        <slot name="tooltip-text"></slot>
      </div>
    </div>
  </float>
</template>

<script setup>
import { Float, FloatArrow } from '@headlessui-float/vue'
import { ref } from 'vue'

const props = defineProps({
  placement: {
    type: String,
    default: 'bottom',
    validator: (value) =>
      [
        'right',
        'bottom',
        'left',
        'top-start',
        'top-end',
        'right-start',
        'right-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
      ].includes(value),
  },
})

const show = ref(false)
</script>

<style scoped></style>
