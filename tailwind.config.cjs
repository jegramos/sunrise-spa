/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgba(var(${variableName}))`
  }
}

const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,jsx,js,ts,tsx}', './node_modules/flowbite/**/*.js'],
  darkMode: 'class',
  safelist: ['theme-space', 'theme-dark', 'theme-light', 'theme-old'],
  theme: {
    extend: {
      transitionProperty: {
        right: 'right',
      },
      fontFamily: {
        logo: ['Josefin Slab', 'serif'],
        content: ['Lato', 'sans-serif'],
      },
      colors: {
        primary: withOpacity('--color-primary'),
        section: withOpacity('--color-bg-content-section'),
        base: withOpacity('--color-bg-content-base'),
        tooling: withOpacity('--color-bg-tooling'),
        info: withOpacity('--color-bg-info'),
        success: withOpacity('--color-bg-success'),
        warning: withOpacity('--color-bg-warning'),
        error: withOpacity('--color-bg-error'),
        inverted: withOpacity('--color-text-base'),
        input: withOpacity('--color-bg-input'),
      },
      textColor: {
        theme: {
          primary: withOpacity('--color-primary'),
          base: withOpacity('--color-text-base'),
          muted: withOpacity('--color-text-muted'),
          inverted: withOpacity('--color-text-inverted'),
          tooling: withOpacity('--color-text-tooling'),
          section: withOpacity('--color-bg-content-section'),
          input: withOpacity('--color-text-input'),
        },
      },
      backgroundColor: {
        theme: {
          base: withOpacity('--color-bg-content-base'),
          section: withOpacity('--color-bg-content-section'),
          'section-hover': withOpacity('--color-bg-content-section-hover'),
          tooling: withOpacity('--color-bg-tooling'),
          neutral: withOpacity('--color-text-base'),
          primary: withOpacity('--color-primary'),
          info: withOpacity('--color-bg-info'),
          success: withOpacity('--color-bg-success'),
          warning: withOpacity('--color-bg-warning'),
          error: withOpacity('--color-bg-error'),
          inverted: withOpacity('--color-text-base'),
          input: withOpacity('--color-bg-input'),
        },
      },
      ringColor: {
        theme: {
          base: withOpacity('--color-bg-content-base'),
          section: withOpacity('--color-bg-content-section'),
          'section-hover': withOpacity('--color-bg-content-section-hover'),
          tooling: withOpacity('--color-bg-tooling'),
          primary: withOpacity('--color-primary'),
          info: withOpacity('--color-bg-info'),
          success: withOpacity('--color-bg-success'),
          warning: withOpacity('--color-bg-warning'),
          error: withOpacity('--color-bg-error'),
        },
      },
      borderColor: {
        theme: {
          primary: withOpacity('--color-primary'),
          base: withOpacity('--color-text-base'),
          muted: withOpacity('--color-text-muted'),
          inverted: withOpacity('--color-text-inverted'),
          tooling: withOpacity('--color-bg-tooling'),
          'tooling-text': withOpacity('--color-text-tooling'),
        },
      },
      textDecorationColor: {
        theme: {
          primary: withOpacity('--color-primary'),
          base: withOpacity('--color-text-base'),
          muted: withOpacity('--color-text-muted'),
          inverted: withOpacity('--color-text-inverted'),
          tooling: withOpacity('--color-text-tooling'),
          section: withOpacity('--color-bg-content-section'),
        },
      },
      ringOffsetColor: {
        theme: {
          primary: withOpacity('--color-primary'),
          section: withOpacity('--color-bg-content-section'),
          base: withOpacity('--color-bg-content-base'),
          tooling: withOpacity('--color-bg-tooling'),
          info: withOpacity('--color-bg-info'),
          success: withOpacity('--color-bg-success'),
          warning: withOpacity('--color-bg-warning'),
          error: withOpacity('--color-bg-error'),
        },
      },
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/forms'),
    plugin(function ({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus']) // custom hover and focus variant
    }),
  ],
}
