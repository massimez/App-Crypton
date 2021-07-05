export default {
  ssr: false,
  head: {
    title: 'Frontend knowledge base',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '@/assets/scss/main.scss'
  ],
  loading: {
    color: 'blue',
    height: '5px'
  },
  plugins: [
    { src: '@plugins/vee-validate.js' }
  ],
  styleResources: {
    scss: ['./assets/scss/resourses.scss']
  },
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/color-mode',
    'nuxt-svg-loader'
  ],
  modules: [
    '@nuxtjs/style-resources',
    '@nuxt/content',
    'nuxt-i18n',
    '@nuxtjs/color-mode',
    'nuxt-svg-loader'
  ],
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ],
    babel: {
      compact: false
    }
  },
  i18n: {
    locales: [
      {
        code: 'en', file: 'en.json'
      }
    ],
    lazy: true,
    langDir: '~/locales/',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: {
      messages: {
        en: 'localeEn'
      }
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      onlyOnRoot: true,
      cookieCrossOrigin: true
    }
  }
}
