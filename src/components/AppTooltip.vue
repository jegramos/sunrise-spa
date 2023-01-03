<template>
  <div
    :id="props.id"
    role="tooltip"
    class="inline-block absolute invisible z-10 py-2 px-3 text-xs font-medium bg-theme-tooling text-theme-tooling rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip"
  >
    <div class="flex items-center">
      <slot name="icon"></slot>
      <slot name="text"></slot>
    </div>
    <div class="tooltip-arrow" data-popper-arrow></div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
</script>
