<template>
  <popover class="relative">
    <!-- Start button -->
    <popover-button
      class="flex items-center bg-theme-section text-theme-base text-sm py-1 px-2 rounded-2xl hover:bg-theme-section-hover focus:outline-none focus-visible:outline-none focus-visible:only:ring-theme-primary focus-visible:only:ring-1"
    >
      <swatch-icon class="w-4 h-4 mr-1" />
      <div>Select theme</div>
      <chevron-down-icon
        class="w-4 h-4 ml-1 text-theme-base ui-open:rotate-180 ui-open:transform transition-all duration-300"
      />
    </popover-button>
    <!-- End button -->
    <!-- Start transition for the panel -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <!-- Start themes list -->
      <popover-panel
        class="absolute right-0 origin-top-right w-60 z-10 mt-2 rounded-lg bg-theme-tooling text-theme-tooling text-sm"
      >
        <!-- Start theme buttons -->
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
              class="flex items-center p-2 w-full text-left text-theme-base focus-visible:outline-none focus-visible:outline-none focus-visible:ring-theme-primary focus-visible:ring-1"
            >
              <span>{{ t.name }}</span>
              <check-badge-icon v-if="t.key === theme.selectedTheme" class="w-3 h-3 ml-1.5" />
            </button>
          </div>
        </div>
        <!-- End theme buttons -->
        <!-- Start System Pref (auto) -->
        <div
          class="flex my-1 mx-1.5 mb-4 justify-center items-center rounded hover:scale-105 transition-all duration-200 ease-in"
        >
          <button
            class="flex items-center px-2 w-full text-left text-theme-tooling focus-visible:only:outline-none focus-visible:only:ring-theme-primary focus-visible:only:ring-1"
            @click="theme.switchTheme('auto')"
          >
            <wrench-screwdriver-icon class="w-3 h-3 ml-1.5 mr-1.5" />
            <span class="text-theme-tooling">Use System Preferences</span>
            <check-badge-icon v-if="theme.selectedTheme === 'auto'" class="w-3 h-3 ml-1.5" />
          </button>
        </div>
        <!-- End System Pref (auto) -->
      </popover-panel>
      <!-- End themes list -->
    </transition>
    <!-- End transition for panel -->
  </popover>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme.js'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon, SwatchIcon, CheckBadgeIcon, WrenchScrewdriverIcon } from '@heroicons/vue/20/solid'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useApplyTheme } from '@/composables/theme'

const theme = useThemeStore()
const { selectedTheme } = storeToRefs(theme)

// Listen for theme selection and change CSS classes accordingly
watch(selectedTheme, () => {
  useApplyTheme(selectedTheme.value, theme.availableThemes)
})
</script>

<style scoped></style>
