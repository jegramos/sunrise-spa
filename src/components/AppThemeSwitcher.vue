<template>
  <popover class="relative">
    <!-- Start button -->
    <popover-button
      class="flex items-center bg-theme-section text-theme-base text-sm py-1 px-2 rounded-2xl hover:bg-theme-section-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-theme-primary"
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
        class="absolute right-0 origin-top-right w-60 z-10 mt-2 rounded bg-theme-tooling text-theme-tooling text-sm"
      >
        <div class="flex flex-col p-2">
          <div v-for="t in theme.availableThemes" :key="t.key">
            <button class="p-2 w-full text-left" @click="theme.switchTheme(t.key)">
              {{ t.name }}
            </button>
          </div>
        </div>
      </popover-panel>
      <!-- End themes list -->
    </transition>
    <!-- End transition for panel -->
  </popover>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme.js'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon, SwatchIcon } from '@heroicons/vue/20/solid'
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
