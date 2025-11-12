// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: ["@nuxt/image", "@nuxt/ui", "@pinia/nuxt", "@nuxt/fonts"],
    css: ["@/assets/css/main.css"],
    image: {
        dir: "assets/img",
    },
    runtimeConfig: {
        public: {
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
        },
    },
});
