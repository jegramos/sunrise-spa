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
    availableThemes: [
      { key: 'light', name: 'Light' },
      {
        key: 'dark',
        name: 'Dark',
      },
      { key: 'space', name: 'Space' },
      { key: 'auto', name: 'System Preference' },
    ],
  }),
  actions: {
    switchTheme(selectedTheme) {
      this.selectedTheme = selectedTheme
      theme.value = selectedTheme
    },
  },
})
