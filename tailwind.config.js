/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1d1d1d',
        brick: '#9c4b4b',
        cream: '#FAF0E6'
      },
      fontFamily: {
        anta: ['Anta', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
      },
      fontSize: {
        xxs: ['0.625rem', { lineHeight: '1rem' }],
      },
    },
    container: {
      center: true,
      screens: {
        xl: '1280px',
      },
    },
  },
  plugins: [],
}
