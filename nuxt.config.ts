export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:5005',
    },
  },

  app: {
    head: {
      title: 'Contact Manager',
      meta: [
        { name: 'description', content: 'Java Spring Boot Contact API — Vue/Nuxt Frontend' },
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },

  compatibilityDate: '2024-04-03',
})
