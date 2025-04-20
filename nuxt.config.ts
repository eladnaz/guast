import tailwindcss from "@tailwindcss/vite";
import { MyPreset } from "./constants/prime-preset";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/eslint", "@nuxtjs/eslint-module", "@primevue/nuxt-module"],
  primevue: {
    options: {
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: ".dark",
        },
      },
    },
  },
  ssr: false,
  vite: {
    plugins: [tailwindcss()],
  },
  serverDir: "server/",
});
