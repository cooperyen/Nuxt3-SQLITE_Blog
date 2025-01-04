/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

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
        'top-to-bottom': {
          '0%': { transform: '-500px' },
          '100%': { translateY: '0px' },
        },
      },
      animation: {
        'bounce-stand': 'bounce-stand 0.4s ease-in forwards',
        'bounce-stand-back': 'bounce-stand-back 0.4s ease-in forwards',
        'top-to-bottom': 'top-to-bottom 0.4s ease-in forwards',
      },
      colors: {
        ...colors,
        background: 'rgb(253,253,253)',
        'main-blue': '#263d56',
        'main-gray': '#ededed',
        'light-gray': 'rgb(235,235,235)',
        tag: 'rgb(228 238 243)',
        mian_color: '#0891b2',
      },
    },
    animation: {
      'bounce-stand': 'bounce-stand 0.4s ease-in forwards',
      'bounce-stand-back': 'bounce-stand-back 0.4s ease-in forwards',
      'top-to-bottom': 'top-to-bottom 0.4s ease-in forwards',
    },
    colors: {
      background: 'rgb(253,253,253)',
      'main-blue': '#263d56',
      'main-gray': '#ededed',
      'light-gray': 'rgb(235,235,235)',
      tag: 'rgb(228 238 243)',
      mian_color: '#0891b2',
    },
  },
};
export const plugins = [];
