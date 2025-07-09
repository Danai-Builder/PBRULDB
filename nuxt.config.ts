import { defineNuxtConfig } from "nuxt/config";
import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  nitro: {
    preset: 'node-server',
    prerender: {
      crawlLinks: false,
      routes: ['/']
    }
  },
  vite:{
    plugins: [svgLoader()]
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/pbru-LDB.png' }
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-mongoose',
  ],
  mongoose: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/PBRU_Research_Management',
    options: {},
    modelsDir: 'models',
      // Add any mongoose options here if needed
    
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    public: {
      apiBase: '/api'
    }
  }
})
