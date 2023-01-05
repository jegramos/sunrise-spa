import { useColorMode } from '@vueuse/core'

const availableThemes = ['light', 'dark', 'space']
const theme = useColorMode({
  modes: {
    // custom colors
    dark: 'dark',
    space: 'space',
  },
  emitAuto: true,
})

export const initTheme = (selectedTheme) => {
  const themeClassName = `theme-${selectedTheme}`
  document.getElementById('app-wrapper').classList.add(themeClassName)
  setupThemeSwitcherTooltipText(selectedTheme)
  setupThemeSwitcherIcon(selectedTheme)
}

export const useCycleThemes = () => {
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

    // set the theme switcher icon
    setupThemeSwitcherIcon(nextTheme)

    // don't add any new classes for night mode, we'll use the default one
    if (nextTheme === 'light') {
      return { theme }
    }

    // we add the theme-${name} class for every other themes
    document.getElementById('app-wrapper').classList.add(themeName)
    return { theme }
  }
}

const setupThemeSwitcherTooltipText = (currentTheme) => {
  const nextIndex = availableThemes.indexOf(currentTheme) + 1
  const nextTheme =
    nextIndex < availableThemes.length ? availableThemes[availableThemes.indexOf(currentTheme) + 1] : availableThemes[0]

  const themeName = nextTheme[0].toUpperCase() + nextTheme.substring(1)
  document.getElementById('theme-switcher-tooltip-text').innerText = `Switch to ${themeName} theme`
}

const setupThemeSwitcherIcon = (currentTheme) => {
  const nextIndex = availableThemes.indexOf(currentTheme) + 1
  const nextTheme =
    nextIndex < availableThemes.length ? availableThemes[availableThemes.indexOf(currentTheme) + 1] : availableThemes[0]

  // we're using classname instead of id because hero icons does not render the id attribute of SGVs
  document.getElementsByClassName(`theme-switcher-${nextTheme}-icon`).item(0).classList.remove('hidden')

  // hide the inactive theme icons
  for (const availableTheme of availableThemes) {
    if (nextTheme !== availableTheme) {
      document.getElementsByClassName(`theme-switcher-${availableTheme}-icon`).item(0).classList.add('hidden')
    }
  }
}
