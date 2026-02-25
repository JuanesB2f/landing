// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxtjs/supabase"
  ],
  
  // Configuración de Supabase (el módulo usa runtimeConfig en servidor; aquí solo para build/dev)
  supabase: {
    url: process.env.NUXT_SUPABASE_URL || process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_SUPABASE_KEY || process.env.NUXT_PUBLIC_SUPABASE_KEY,
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
        { rel: "icon", href: "/favicon.ico" }
      ],
      script: [
        {
          tagPosition: 'head',
          children: `;(function(){try{var t=localStorage.getItem('theme');var d=t==='dark';var e=document.documentElement;e.classList.remove('theme-light','theme-dark','dark');if(d){e.classList.add('theme-dark');e.classList.add('dark');}else{e.classList.add('theme-light');}}catch(_e){}})();`
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    keepalive: false
  },

  colorMode: { preference: "light" },
  
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
  
  // Configuración de Nitro
  nitro: {
    // Solo usar preset de Vercel en producción/build, no en desarrollo
    ...(process.env.NODE_ENV === 'production' ? { preset: 'vercel' } : {}),
    // Comprimir assets solo en producción
    compressPublicAssets: process.env.NODE_ENV === 'production',
    routeRules: {
      // Cache para APIs (solo en producción)
      ...(process.env.NODE_ENV === 'production' ? {
        '/api/**': { headers: { 'cache-control': 's-maxage=60' } },
        '/_nuxt/**': { headers: { 'cache-control': 'max-age=31536000' } }
      } : {}),
      // Prerenderizar páginas públicas SOLO en build, no en desarrollo
      ...(process.env.NODE_ENV === 'production' ? {
        '/': { prerender: true },
        '/shop': { prerender: true },
        '/about': { prerender: true }
      } : {})
    }
  },
  
  vite: {
    optimizeDeps: {
      include: ['vue-chartjs', 'chart.js', 'vue', '@vue/runtime-core', '@vue/runtime-dom']
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
