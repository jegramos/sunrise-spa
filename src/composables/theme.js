import { useColorMode } from '@vueuse/core'

const availableThemes = ['light', 'dark', 'aqua']
const theme = useColorMode({
  modes: {
    // custom colors
    dark: 'dark',
    aqua: 'aqua',
    auto: 'auto',
  },
})

export const useInitTheme = () => {
  if (!theme) theme.value = 'auto'

  if (theme && availableThemes.includes(theme.value)) {
    const themeName = `theme-${theme.value}`
    document.getElementById('app-wrapper').classList.add(themeName)
  }

  return { theme }
}

export const useToggleTheme = () => {
  const themeLength = availableThemes.length
  const currentThemeIndex = availableThemes.indexOf(theme.value)
  const isLastElement = themeLength - 1 === currentThemeIndex

  if (availableThemes.indexOf(theme.value) > -1) {
    const nextTheme = !isLastElement ? availableThemes[currentThemeIndex + 1] : availableThemes[0]
    theme.value = nextTheme
    const themeName = `theme-${nextTheme}`

    // remove existing theme classes
    for (const classTheme of availableThemes) {
      document.getElementById('app-wrapper').classList.remove(`theme-${classTheme}`)
    }

    // set the tooltip text for the theme mode switcher
    setupThemeSwitcherTooltipText(nextTheme)

    // don't add any new classes for night mode, we'll use the default one
    if (nextTheme === 'light') {
      return
    }

    // we add the theme-${name} class for every other themes
    document.getElementById('app-wrapper').classList.add(themeName)
  }
}

const setupThemeSwitcherTooltipText = (theme) => {
  let text
  switch (theme) {
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
  document.getElementById('theme-switcher-tooltip-text').innerText = text
}
