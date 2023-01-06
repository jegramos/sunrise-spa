export const useApplyTheme = (selectedTheme, availableThemes) => {
  // remove existing theme classes
  for (const themeName of availableThemes) {
    if (selectedTheme !== themeName.key) {
      document.getElementById('app-wrapper').classList.remove(`theme-${themeName.key}`)
      continue
    }

    // Check the system pref if Auto is selected
    if (themeName.key === 'auto') continue

    // Inject the selected class to the parent tag
    document.getElementById('app-wrapper').classList.add(`theme-${themeName.key}`)
  }
}
