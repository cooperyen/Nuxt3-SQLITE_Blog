const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
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
      fontFamily: {
        sans: ['"Noto Sans TC"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'main-gray': '#ededed',
        'light-gray': 'rgb(235,235,235)',
        tag: 'rgb(228 238 243)',
        mian_color: '#0891b2',
      },
    },
  },
  plugins: [],
};
