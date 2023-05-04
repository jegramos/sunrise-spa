<template>
  <div
    v-if="props.modelValue"
    :class="`flex justify-between rounded-3xl p-4 bg-theme-${props.panelType} text-theme-${props.panelType}-panel`"
  >
    <!-- Start main content -->
    <div class="flex">
      <!-- Start icon -->
      <div class="mr-3 mt-1 flex">
        <font-awesome-icon :icon="iconName" class="h-5 w-5"></font-awesome-icon>
      </div>
      <!-- End icon -->
      <!-- Start text -->
      <div class="flex flex-col font-medium">
        <div class="text-sm font-bold">
          <slot></slot>
        </div>
        <div class="text-xs">
          <slot name="description"></slot>
        </div>
      </div>
      <!-- End text -->
    </div>
    <!-- End main content -->
    <!-- Start dismiss icon -->
    <cf-button v-if="dismissible" class="h-5 w-5" icon @click="$emit('update:modelValue', false)">
      <font-awesome-icon
        icon="fa-solid fa-xmark hocus:scale-105 duration-200 transition-all border"
      ></font-awesome-icon>
    </cf-button>
    <!-- End dismiss icon -->
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import CfButton from '@/components/campfire/buttons/CfButton.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
  panelType: {
    type: String,
    default: 'base',
    validator: (value) => {
      return ['base', 'section', 'tooling', 'success', 'error', 'warning', 'info', 'tooling'].includes(value)
    },
  },
  dismissible: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])

const iconName = computed(() => {
  let iconClass
  switch (props.panelType) {
    case 'success':
      iconClass = 'fa-solid fa-circle-check'
      break
    case 'error':
      iconClass = 'fa-solid fa-circle-xmark'
      break
    case 'info':
      iconClass = 'fa-solid fa-circle-info'
      break
    case 'warning':
      iconClass = 'fa-solid fa-triangle-exclamation'
      break
    default:
      iconClass = 'fa-solid fa-fire-flame-curved'
      break
  }
  return iconClass
})
</script>
