// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';
import { defineNuxtConfig } from 'nuxt/config'
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  alias: {
    '@': resolve(__dirname, './')
  },
  modules: [
    '@nuxtjs/tailwindcss',
    async (_options, nuxt) => {
      const vuetify = await import('vite-plugin-vuetify');
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify.default());
      });
    }
  ],
  css: ['@/assets/styles/main.scss', 'vuetify/lib/styles/main.sass'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  build: {
    transpile: ['vuetify']
  },
  vite: {
    plugins: [vuetify()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './')
      }
    },
    define: {
      'process.env.DEBUG': false
    },
    ssr: {
      noExternal: ['vuetify']
    }
  },
  runtimeConfig: {
    public: {
      appName: process.env.NUXT_APP_NAME ?? 'App Name',
      appLogo: process.env.NUXT_APP_LOGO ?? '/logo.png',
      apiUrl: process.env.NUXT_API_URL ?? 'http://localhost:3001/api'
    }
  }
});