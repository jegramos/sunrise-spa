<template>
  <div class="flex flex-col justify-center p-2">
    <div
      v-for="t in theme.availableThemes.filter((th) => th.key !== 'auto')"
      :key="t.key"
      :class="`m-1 flex rounded px-2 transition-transform duration-200 ease-in hover:scale-105 theme-${t.key} bg-theme-base hover:cursor-pointer focus:ring-1 focus:ring-theme-primary`"
      @click="theme.switchTheme(t.key)"
    >
      <div class="flex items-center">
        <div :class="`mr-1 h-2 w-2 rounded-lg bg-theme-primary`"></div>
        <div :class="`mr-1 h-2 w-2 rounded-lg bg-theme-info`"></div>
        <div :class="`mr-1 h-2 w-2 rounded-lg bg-theme-error`"></div>
        <div :class="`mr-1 h-2 w-2 rounded-lg bg-theme-warning`"></div>
      </div>
      <button
        class="flex w-full items-center justify-between p-2 text-left text-theme-base focus-visible:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-theme-primary"
      >
        <span>{{ t.name }}</span>
        <check-badge-icon v-if="t.key === theme.selectedTheme" class="h-4 w-4" />
      </button>
    </div>
  </div>
  <!-- Start System Pref (auto) -->
  <div
    class="mx-3 mb-2 flex items-center rounded border border-theme-tooling-text px-2 text-theme-tooling transition-transform duration-200 ease-in hover:scale-105 hover:cursor-pointer focus:ring-1 focus:ring-theme-primary"
  >
    <wrench-screwdriver-icon class="mr-1 h-3 w-3" />
    <button
      class="flex w-full items-center justify-between p-2 text-left focus-visible:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-theme-primary"
      @click="theme.switchTheme('auto')"
    >
      <span>Browser Preference</span>
      <check-badge-icon v-if="theme.selectedTheme === 'auto'" class="h-4 w-4" />
    </button>
  </div>
  <!-- End System Pref (auto) -->
</template>

<script setup>
import { CheckBadgeIcon, WrenchScrewdriverIcon } from '@heroicons/vue/20/solid'
import { useThemeStore } from '@/stores/theme.js'

const theme = useThemeStore()
</script>
