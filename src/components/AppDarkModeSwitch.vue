<template>
  <!-- Start Button -->
  <button data-tooltip-target="tooltip-dark-mode-switch" class="navbar-item rounded-3xl" @click="useCycleThemes">
    <sun-icon
      class="hover:text-theme-primary hover:scale-110 transition-all duration-300 theme-switcher-light-icon"
    ></sun-icon>
    <moon-icon
      class="hover:text-theme-primary hover:scale-110 transition-all duration-300 theme-switcher-dark-icon"
    ></moon-icon>
    <star-icon
      class="hover:text-theme-primary hover:scale-110 transition-all duration-300 theme-switcher-space-icon"
    ></star-icon>
  </button>
  <!-- End Button -->
  <!-- Start tooltip -->
  <app-tooltip id="tooltip-dark-mode-switch">
    <template #icon>
      <light-bulb-icon class="h-3 w-3 mr-1"></light-bulb-icon>
    </template>
    <template #text>
      <span id="theme-switcher-tooltip-text">Switch theme</span>
    </template>
  </app-tooltip>
  <!-- End tooltip -->
</template>

<script setup>
import { LightBulbIcon, SunIcon, MoonIcon, StarIcon } from '@heroicons/vue/24/solid'
import AppTooltip from '@/components/AppTooltip.vue'
import { useCycleThemes } from '@/composables/theme'
</script>
