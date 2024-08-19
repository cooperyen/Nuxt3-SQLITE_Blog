import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import { fileURLToPath } from 'url';
import type { NuxtPage } from 'nuxt/schema';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },

  typescript: {
    typeCheck: true,
  },

  app: {
    // layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  routeRules: {
    '/admin/**': { ssr: false },
  },

  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  alias: {
    images: fileURLToPath(new URL('./', import.meta.url)),
  },

  googleFonts: {
    families: {
      'Noto+Sans+TC': {
        wght: '200..900',
        ital: '200..700',
      },
    },
    display: 'swap',
    prefetch: false,
    preconnect: false,
    preload: false,
    download: true,
    base64: false,
  },

  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    plugins: [
      ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_colors.scss" as *;',
        },
      },
    },
  },

  build: {
    transpile: ['@fortawesome/vue-fontawesome'],
  },

  image: {
    provider: 'twicpics',
    twicpics: {
      baseURL: '/',
    },
  },

  compatibilityDate: '2024-08-16',
});
