import { defineStore } from 'pinia'
import { useColorMode } from '@vueuse/core'

export const useThemeStore = defineStore('theme', () => {
  // States
  const selectedTheme = useColorMode({
    modes: { dark: 'dark', space: 'space' },
    emitAuto: true,
  })
  const availableThemes = [
    {
      key: 'dark',
      name: 'Dark',
    },
    { key: 'light', name: 'Light' },
    { key: 'space', name: 'Space' },
    { key: 'old', name: 'Old School' },
    { key: 'auto', name: 'System Preference' },
  ]

  // Actions
  const switchTheme = (theme) => {
    selectedTheme.value = theme
  }

  return { selectedTheme, availableThemes, switchTheme }
})
