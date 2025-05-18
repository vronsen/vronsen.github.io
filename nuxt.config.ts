import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  modules: [
    "@nuxt/content",
    "@nuxt/icon",
    "@nuxt/ui",
    "@nuxtjs/sitemap",
    "nuxt-og-image",
    "@nuxtjs/color-mode"
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  site: {
    url: 'http://localhost:3000/',
    name: 'My Portfolio Website'
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    storage: 'localStorage', 
    
  }
});