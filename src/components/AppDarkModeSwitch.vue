<template>
  <!-- Start Button -->
  <button data-tooltip-target="tooltip-dark-mode-switch" class="navbar-item rounded-3xl" @click="useToggleTheme">
    <sun-icon v-if="true" class="hover:text-theme-primary hover:scale-125 transition-all duration-300"></sun-icon>
    <moon-icon v-else class="hover:text-theme-primary hover:scale-125 transition-all duration-300"></moon-icon>
  </button>
  <!-- End Button -->
  <!-- Start tooltip -->
  <app-tooltip id="tooltip-dark-mode-switch">
    <template #icon>
      <light-bulb-icon class="h-3 w-3 mr-1"></light-bulb-icon>
    </template>
    <template #text>
      <span id="theme-switcher-tooltip-text">{{ toolTipText }}</span>
    </template>
  </app-tooltip>
  <!-- End tooltip -->
</template>

<script setup>
import { LightBulbIcon, MoonIcon, SunIcon } from '@heroicons/vue/24/solid'
import AppTooltip from '@/components/AppTooltip.vue'
import { useToggleTheme } from '@/composables/theme'
import { computed, ref } from 'vue'

const theme = ref(localStorage.getItem('vueuse-color-scheme'))

const toolTipText = computed(() => {
  let text
  switch (theme.value) {
    case 'dark':
      text = 'Switch to Aqua theme'
      break
    case 'aqua':
      text = 'Switch to Light theme'
      break
    case 'light':
      text = 'Switch to Dark theme'
      break
    default:
      text = 'Switch theme'
  }

  return text
})
</script>
