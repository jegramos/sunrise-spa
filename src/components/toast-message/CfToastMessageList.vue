<template>
  <div
    :class="`${positionClass} fixed z-20 flex h-auto w-full max-w-sm flex-col rounded-2xl px-3 sm:w-[43%] sm:px-0 lg:w-[30%]`"
  >
    <transition-group
      name="toast-messages"
      tag="div"
      enter-active-class="duration-300 ease-out transition-transform"
      enter-from-class="scale-50 opacity-0"
      enter-to-class="opacity-100 scale-100"
    >
      <cf-toast-message
        v-for="toast in globalStore.toastMessages"
        :key="toast.id"
        v-model="toast.show"
        :title="toast.title"
        :description="toast.description"
        :type="toast.type"
        :timeout="toast.timeout"
        :icon-class="toast.iconClass"
      />
    </transition-group>
  </div>
</template>
<script setup>
import CfToastMessage from '@/components/toast-message/CfToastMessage.vue'
import { useGlobalStore } from '@/stores/global'
import { computed } from 'vue'

const props = defineProps({
  position: {
    type: String,
    default: 'top-right',
    validator: (value) =>
      ['top-right', 'top-mid', 'top-left', 'bottom-right', 'bottom-left', 'bottom-mid'].includes(value),
  },
})

const positionClass = computed(() => {
  // Toasts will always appear at the top with full width on mobile view
  let positionClass
  switch (props.position) {
    case 'top-right':
      positionClass = `top-20 sm:right-4`
      break
    case 'top-left':
      positionClass = 'top-14 sm:left-4'
      break
    case 'top-mid':
      positionClass = 'top-14 left-1/2 -translate-x-1/2'
      break
    case 'bottom-right':
      positionClass = 'top-14 sm:top-auto sm:bottom-20 sm:right-4'
      break
    case 'bottom-left':
      positionClass = 'top-14 sm:top-auto sm:bottom-20 sm:left-4'
      break
    case 'bottom-mid':
      positionClass = 'top-14 sm:top-auto sm:bottom-20 left-1/2 -translate-x-1/2'
      break
    default:
      positionClass = 'top-14 sm:right-4'
  }

  return positionClass
})

const globalStore = useGlobalStore()
</script>
