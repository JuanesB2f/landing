// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2024-11-01",
  devtools: { enabled: process.env.NODE_ENV === "development" },

  modules: [
    "@nuxtjs/supabase",
    "@nuxt/ui",
    "@pinia/nuxt"
  ],
  
  // Configuración de Supabase (el módulo usa runtimeConfig en servidor; aquí solo para build/dev)
  supabase: {
    url: process.env.NUXT_SUPABASE_URL || process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_SUPABASE_KEY || process.env.NUXT_PUBLIC_SUPABASE_KEY,
    serviceKey: process.env.NUXT_SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_KEY,
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/callback',
      exclude: ['/', '/about', '/shop', '/shop/*']
    },
    clientOptions: {
      auth: {
        flowType: "pkce",
        detectSessionInUrl: true,
        autoRefreshToken: true,
        persistSession: true
      },
    }
  },
  
  css: ["~/assets/css/main.css"],
  
  components: [
    { path: "~/components", pathPrefix: false }
  ],
  
  // Configuración experimental - valores seguros que funcionan
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: false,
    componentIslands: false,
    inlineSSRStyles: false,
    viewTransition: false,
    typedPages: false,
    appManifest: true,
    headNext: false
  },
  
  app: {
    head: {
      title: "BylotoStore - Tu E-commerce Femenino",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Tu tienda de belleza y moda femenina con los mejores productos seleccionados especialmente para la mujer moderna y elegante." },
        { name: "theme-color", content: "#F4E1E0" }
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/flor.png" }
      ],
      script: [
        {
          tagPosition: 'head',
          children: `;(function(){try{var t=localStorage.getItem('theme');var d=t==='dark';var e=document.documentElement;e.classList.remove('theme-light','theme-dark','dark');if(d){e.classList.add('theme-dark');e.classList.add('dark');}else{e.classList.add('theme-light');}}catch(_e){}})();`
        }
      ]
    },
    // Sin transición global: menos trabajo en cada navegación y sensación más rápida
    pageTransition: false,
    layoutTransition: false,
    keepalive: false
  },

  /** Caché ISR en edge (Vercel): segundos hasta revalidar HTML de rutas mayormente públicas */
  routeRules: {
    "/about": { isr: 86400 },
    "/shop": { isr: 120 },
    "/shop/**": { isr: 120 }
  },

  colorMode: { preference: "light" },

  // Nuxt UI (como en proyecto de referencia)
  ui: {
    colorMode: true,
    fonts: true,
    theme: { transitions: true },
  },

  // Runtime config: acepta NUXT_SUPABASE_* (local .env) y NUXT_PUBLIC_SUPABASE_* (Vercel)
  runtimeConfig: {
    supabaseServiceKey: process.env.NUXT_SUPABASE_SERVICE_KEY || '',
    public: {
      supabaseUrl: process.env.NUXT_SUPABASE_URL || process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabaseKey: process.env.NUXT_SUPABASE_KEY || process.env.NUXT_PUBLIC_SUPABASE_KEY || '',
      /** URL pública del sitio (ej. https://tu-app.vercel.app). En Vercel: NUXT_PUBLIC_SITE_URL. */
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
    }
  },
  
  build: {
    transpile: ["vue-chartjs", "@iconify/utils"]
  },
  
  // Nitro: mismo patrón que el proyecto de referencia (solo preset vercel)
  nitro: {
    preset: 'vercel',
    compressPublicAssets: true,
    future: {
      nativeSWR: true
    }
  },
  
  vite: {
    optimizeDeps: {
      include: ['vue-chartjs', 'chart.js', 'vue', '@vue/runtime-core', '@vue/runtime-dom']
    },
    build: {
      chunkSizeWarningLimit: 900,
      cssCodeSplit: true
    },
    define: {
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_OPTIONS_API__: false
    }
    // Nota: La configuración de vite.server se omite para evitar errores de hot reload
    // Si necesitas configurar HMR, hazlo a través de variables de entorno o
    // reinicia manualmente el servidor después de cambios
  }
})
