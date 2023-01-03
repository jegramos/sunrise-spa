/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacity }) => {
    if (opacity) {
      return `rgba(var(${variableName}), ${opacity})`
    }
    return `rgba(var(${variableName}))`
  }
}

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,jsx,js,ts,tsx}', './node_modules/flowbite/**/*.js'],
  darkMode: 'class',
  safelist: ['theme-space', 'theme-dark'],
  theme: {
    extend: {
      textColor: {
        theme: {
          primary: withOpacity('--color-primary'),
          base: withOpacity('--color-text-base'),
          tooling: withOpacity('--color-text-tooling'),
        },
      },
      backgroundColor: {
        theme: {
          base: withOpacity('--color-bg-content-base'),
          section: withOpacity('--color-bg-content-section'),
          'section-hover': withOpacity('--color-bg-content-section-hover'),
          tooling: withOpacity('--color-bg-tooling'),
          primary: withOpacity('--color-primary'),
          info: withOpacity('var(--color-bg-info)'),
          success: withOpacity('--color-bg-success'),
          warning: withOpacity('--color-bg-warning'),
          error: withOpacity('--color-bg-error'),
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
