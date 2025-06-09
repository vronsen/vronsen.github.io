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
    "@nuxtjs/color-mode",
    "@tresjs/nuxt",
    "@vee-validate/nuxt",
    "@nuxtjs/i18n",
  ],
  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "de", name: "German", file: "de.json" },
    ],
    strategy: 'no_prefix',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  site: {
    url: "http://localhost:3000/",
    name: "My Portfolio Website",
  },
  colorMode: {
    preference: "system",
    fallback: "light",
    storage: "localStorage",
  },
});
