export const useApplyTheme = (selectedTheme, availableThemes) => {
  // remove existing theme classes
  for (const themeName of availableThemes) {
    if (selectedTheme !== themeName) {
      document.getElementById('app-wrapper').classList.remove(`theme-${themeName}`)
      continue
    }

    // Check the system pref if Auto is selected
    if (themeName === 'auto') continue

    // Inject the selected class to the parent tag
    document.getElementById('app-wrapper').classList.add(`theme-${themeName}`)
  }
}
