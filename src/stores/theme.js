import { defineStore } from 'pinia'
import { useColorMode } from '@vueuse/core'

const theme = useColorMode({
  modes: {
    // custom colors
    dark: 'dark',
    space: 'space',
  },
  emitAuto: true,
})

export const useThemeStore = defineStore('theme', {
  state: () => ({
    selectedTheme: theme.value,
    availableThemes: ['auto', 'light', 'dark', 'space'],
  }),
  actions: {
    switchTheme(selectedTheme) {
      this.selectedTheme = selectedTheme
      theme.value = selectedTheme
    },
  },
})
