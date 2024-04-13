// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  app: {
    head: {
      title: 'Technology Cambodia',

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        { name: 'format-detection', content: 'telephone=no' },
        {
          hid: 'description',
          name: 'description',
          content:
            "Tech-Cambodia is Cambodia's most popular technology website. We aim to provide Cambodian students and adults with all the necessary knowledge regarding technology.",
        },
        { name: 'keywords', content: 'tech-cambodia, technology cambodia' },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Technology Cambodia',
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Technology Cambodia',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content:
            "Tech-Cambodia is Cambodia's most popular technology website. We aim to provide Cambodian students and adults with all the necessary knowledge regarding technology.",
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: '/web_img.jpg',
        },
        {
          name: 'facebook-domain-verification',
          content: '1lsn7rrnkzzvwkssn52vyynjgst2z9',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap',
        },
      ],
      script: [
        {
          src: 'https://kit.fontawesome.com/7c7b227626.js',
        },
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-3FB6MBW2F3',
          async: true,
        },
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=UA-215906651-1',
          async: true,
        },
        {
          hid: 'gtmHead',
          innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3FB6MBW2F3');
          `,
        },
        {
          src: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0&appId=853816945294999&autoLogAppEvents=1',
          // defer: true,
          async: true,
          crossorigin: 'anonymous',
          nonce: 'RzfGg0xF',
        },
        {
          type: 'text/javascript',
          body: true,
          innerHTML: `
            /* The region will be automatically detected if "GLOBAL" is set. */
            /* Possible values: "SGP", "JPN", "US_WEST", "EU" */
            var _ase_region="SGP";
            var _ase  = _ase || [];
            /* load placement for account: Business Cambodia, site: tech-cambodia.com, zone size : 282x370 */
            _ase.push(['1700707438','1700709882']);
          `,
        },
        {
          type: 'text/javascript',
          body: true,
          src: '//gamma.cachefly.net/js/ad-exchange.js',
        },
        {
          type: 'text/javascript',
          body: true,
          src: '//ssp-cdn.gammaplatform.com/js/ad-exchange.js',
        },
      ],
    },
  },
  plugins: [],
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/index.css',
    'aos/dist/aos.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@nuxtjs/color-mode', '@vite-pwa/nuxt'],
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
  pwa: {
    manifest: {
      name: 'Technology Cambodia',
      short_name: 'Tech Cambodia',
      description:
        "Tech-Cambodia is Cambodia's most popular technology website. We aim to provide Cambodian students and adults with all the necessary knowledge regarding technology.",
      icons: [
        {
          src: 'icons/bc-logo-64_x_64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'icons/bc-logo-144_x_144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: 'icons/bc-logo-192_x_192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icons/bc-logo-512_x_512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },
});
