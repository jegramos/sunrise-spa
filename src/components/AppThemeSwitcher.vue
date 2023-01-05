<template>
  <popover class="relative">
    <!-- Start button -->
    <popover-button
      class="bg-theme-section text-theme-base text-sm py-1 px-2 flex align-center rounded-2xl hover:bg-theme-section-hover focus:outline-none focus:outline-theme-primary focus:outline-1"
    >
      <swatch-icon class="w-4 h-4 mr-1" />
      <div>Select theme</div>
      <div class="bg-theme-inverted mt-1.5 ml-1.5 border-0 rounded-3xl">
        <chevron-down-icon
          class="w-2.5 h-2.5 text-theme-section ui-open:rotate-180 ui-open:transform transition-all duration-300"
        />
      </div>
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
      <popover-panel class="absolute z-10 mt-2 rounded bg-theme-tooling text-theme-tooling">
        <div class="flex flex-col justify-start items-baseline pl-1 pr-3">
          <div v-for="t in theme.availableThemes" :key="t">
            <button class="p-2" @click="theme.switchTheme(t)">
              {{ t[0].toUpperCase() + t.substring(1) + ' mode in another life of the word' }}
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
