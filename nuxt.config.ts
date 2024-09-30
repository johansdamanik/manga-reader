// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['nuxt-mongoose', '@nuxtjs/google-fonts', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  mongoose: {
    uri:
      process.env.MONGODB_URI ||
      'mongodb+srv://johansdamanik:C0ZLim3TsmErDC3V@manga-web.4yfw1.mongodb.net/?retryWrites=true&w=majority&appName=manga-web',
    options: {},
    modelsDir: 'models',
    devtools: true,
  },

  googleFonts: {
    families: {
      Anta: true,
      Inter: true,
      Roboto: [100, 300, 400, 500, 700, 900],
    },
  },
})
