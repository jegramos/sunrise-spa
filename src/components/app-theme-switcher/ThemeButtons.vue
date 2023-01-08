<template>
  <div class="flex flex-col p-2 justify-center">
    <div
      v-for="t in theme.availableThemes.filter((th) => th.key !== 'auto')"
      :key="t.key"
      :class="`flex m-1 px-2 rounded hover:scale-105 transition-transform duration-200 ease-in theme-${t.key} bg-theme-base hover:cursor-pointer focus:ring-theme-primary focus:ring-1`"
      @click="theme.switchTheme(t.key)"
    >
      <div class="flex items-center">
        <div :class="`w-2 h-2 bg-theme-primary mr-1 rounded-lg`"></div>
        <div :class="`w-2 h-2 bg-theme-info mr-1 rounded-lg`"></div>
        <div :class="`w-2 h-2 bg-theme-error mr-1 rounded-lg`"></div>
        <div :class="`w-2 h-2 bg-theme-warning mr-1 rounded-lg`"></div>
      </div>
      <button
        class="flex items-center justify-between p-2 w-full text-left text-theme-base focus-visible:outline-none focus-visible:outline-none focus-visible:ring-theme-primary focus-visible:ring-1"
      >
        <span>{{ t.name }}</span>
        <check-badge-icon v-if="t.key === theme.selectedTheme" class="w-4 h-4" />
      </button>
    </div>
  </div>
  <!-- Start System Pref (auto) -->
  <div
    class="flex border border-theme-tooling-text items-center text-theme-tooling mx-3 mb-2 px-2 rounded hover:scale-105 transition-transform duration-200 ease-in hover:cursor-pointer focus:ring-theme-primary focus:ring-1"
  >
    <wrench-screwdriver-icon class="w-3 h-3 mr-1" />
    <button
      class="flex items-center justify-between p-2 w-full text-left focus-visible:outline-none focus-visible:outline-none focus-visible:ring-theme-primary focus-visible:ring-1"
      @click="theme.switchTheme('auto')"
    >
      <span>Browser Preference</span>
      <check-badge-icon v-if="theme.selectedTheme === 'auto'" class="w-4 h-4" />
    </button>
  </div>
  <!-- End System Pref (auto) -->
</template>

<script setup>
import { CheckBadgeIcon, WrenchScrewdriverIcon } from '@heroicons/vue/20/solid'
import { useThemeStore } from '@/stores/theme.js'

const theme = useThemeStore()
</script>
