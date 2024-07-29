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
      keyframes: {
        'bounce-stand': {
          '0%': { top: '-50px' },
          '100%': { top: '0px' },
        },
        'bounce-stand-back': {
          '0%': { top: '50px' },
          '100%': { top: '0px' },
        },
      },
      animation: {
        'bounce-stand': 'bounce-stand 0.4s ease-in forwards',
        'bounce-stand-back': 'bounce-stand-back 0.4s ease-in forwards',
      },
      colors: {
        'main-blue':'#263d56',
        'main-gray': '#ededed',
        'light-gray': 'rgb(235,235,235)',
        tag: 'rgb(228 238 243)',
        mian_color: '#0891b2',
      },
    },
  },
  plugins: [],
};
