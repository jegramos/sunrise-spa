export const useApplyTheme = (selectedTheme, availableThemes) => {
  // remove existing theme classes
  for (const themeName of availableThemes) {
    if (selectedTheme !== themeName.key) {
      document.body.classList.remove(`theme-${themeName.key}`)
      continue
    }

    // Add base color to the <body>
    document.body.classList.add('bg-theme-section', 'dark:theme-dark')

    // Check the system pref if Auto is selected
    if (themeName.key === 'auto') continue

    // Inject the selected class to the parent tag
    document.body.classList.add(`theme-${themeName.key}`)
  }
}
