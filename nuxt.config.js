import localeEn from './locales/en.json';

require('dotenv').config();

export default {
  ssr: 'false',
  target: 'static',
  head: {
    title: 'frontend-starter-kit-2',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
    ],
  },
  css: [
    '@/assets/scss/main.scss',
  ],
  plugins: [
    { src: '@plugins/main.js' },
    { src: '@plugins/vee-validate.js' },
    { src: '@plugins/injectComponents.js' },
  ],
  components: true,
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/color-mode',
    'nuxt-svg-loader',
  ],
  styleResources: {
    scss: ['./assets/scss/resourses.scss'],
  },
  modules: [
    '@nuxtjs/style-resources',
    'bootstrap-vue/nuxt',
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'nuxt-svg-loader',
  ],
  build: {
    transpile: [
      'vee-validate/dist/rules',
    ],
  },
  // bootstrapVue: {
  //   // bootstrapCSS: false, // Or `css: false`
  //   // bootstrapVueCSS: false, // Or `bvCSS: false`
  //   img: true,
  // },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: {
      messages: {
        en: localeEn,
        ru: localeRu,
      },
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
    },
  },
  env: {

  },
};
