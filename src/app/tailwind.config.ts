import type { Config } from 'tailwindcss'

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'rgba(0, 220, 130, 1)',
        'primary-hover': 'rgba(0, 220, 130, .75)',
        'secondary': 'rgba(226, 232, 240, 1)',
        'secondary-hover': 'rgba(226, 232, 240, .75)',
        'header-bg-color': 'rgba(2, 4, 32, 0.75)',
        'footer-bg-color': 'rgba(2, 4, 32, .5)',
        'text-primary-color': 'rgba(15, 23, 42, 1)',
        'text-primary-color-hover': 'rgba(15, 23, 42, .75)',
        'text-secondary-color': 'rgba(226, 232, 240, 1)',
        'text-secondary-color-hover': 'rgba(226, 232, 240, .75)',
      }
    }
  },
  plugins: [],
} satisfies Config

