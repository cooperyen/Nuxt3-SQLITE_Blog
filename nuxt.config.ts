import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import { fileURLToPath } from 'url';
import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },

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

  robots: {
    disallow: ['/admin'],
  },

  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@zadigetvoltaire/nuxt-gtm',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
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

  // image: {
  //   provider: 'twicpics',
  //   twicpics: {
  //     baseURL: '/',
  //   },
  // },

  compatibilityDate: '2024-08-16',

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    cacheMaxAgeSeconds: 2 * 60 * 60, // 2 hours.
  },

  site: {
    url: 'https://blog.hwaseng.com.tw/',
    name: '華生水資源 BLOG',
  },

  gtm: {
    id: 'GTM-5B3GPBP8', // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
    // queryParams: {
    //   // Add URL query string when loading gtm.js with GTM ID (required when using custom environments)
    //   gtm_auth: 'AB7cDEf3GHIjkl-MnOP8qr',
    //   gtm_preview: 'env-4',
    //   gtm_cookies_win: 'x',
    // },
    defer: false, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
    compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
    nonce: '2726c7f26c', // Will add `nonce` to the script tag
    enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
    debug: false, // Whether or not display console logs debugs (optional)
    loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
    enableRouterSync: true, // Pass the router instance of your app to automatically sync with router (optional)
    ignoredViews: ['admin'], // Don't trigger events for specified router names (optional)
    trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
    devtools: false, // (optional)
  },
});
