/** @type {import("tailwindcss").Config} */
module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,jsx,js,ts,tsx}', './node_modules/flowbite/**/*.js'],
  darkMode: 'class',
  safelist: ['theme-aqua', 'theme-dark'],
  theme: {
    extend: {
      textColor: {
        theme: {
          primary: 'var(--color-primary)',
          base: 'var(--color-text-base)',
          tooling: 'var(--color-text-tooling)',
        },
      },
      backgroundColor: {
        theme: {
          base: 'var(--color-bg-content-base)',
          section: 'var(--color-bg-content-section)',
          'section-hover': 'var(--color-bg-content-section-hover)',
          tooling: 'var(--color-bg-tooling)',
          primary: 'var(--color-primary)',
          info: 'var(--color-bg-info)',
          success: 'var(--color-bg-success)',
          warning: 'var(--color-bg-warning)',
          error: 'var(--color-bg-error)',
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
