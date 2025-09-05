// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Configuración básica
  ssr: true,
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  
  // Módulos principales
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxtjs/supabase"
  ],
  
  // Configuración de Supabase
  supabase: {
    // Usa variables de entorno para URL y KEY. No exponer serviceKey en cliente.
    url: process.env.NUXT_SUPABASE_URL,
    key: process.env.NUXT_SUPABASE_KEY,
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
  
  // CSS y estilos
  css: ["~/assets/css/main.css"],
  
  // Componentes
  components: [
    { path: "~/components", pathPrefix: false }
  ],
  
  // Optimizaciones de rendimiento
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: false
  },
  
  // Configuración de la aplicación
  app: {
    head: {
      title: "BylotoStore - Tu E-commerce Femenino",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Tu tienda de belleza y moda femenina con los mejores productos seleccionados especialmente para la mujer moderna y elegante." },
        { name: "theme-color", content: "#ec4899" }
      ],
      link: [
        { rel: "icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap" }
      ],
      script: [
        {
          // Establecer tema lo antes posible para evitar FOUC
          children: `;(function(){try{var t=localStorage.getItem('theme');var isDark=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var e=document.documentElement;e.classList.remove('theme-light','theme-dark');e.classList.add(isDark?'theme-dark':'theme-light');e.classList.toggle('dark',isDark);}catch(_e){}})();`
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  // Color Mode Nuxt UI
  colorMode: { preference: "light" },

  // UI Nuxt Module
  ui: {
    colorMode: true,
    fonts: true,
    theme: {
      transitions: true,
    },
  },
  
  // Configuración de runtime
  runtimeConfig: {
    supabaseServiceKey: process.env.NUXT_SUPABASE_SERVICE_KEY,
    public: {
      supabaseUrl: process.env.NUXT_SUPABASE_URL,
      supabaseKey: process.env.NUXT_SUPABASE_KEY,
    }
  },
  
  // Configuración de build optimizada
  build: {
    transpile: ["vue-chartjs"]
  },
  
  // Configuración de Nitro
  nitro: {
    preset: 'vercel',
    compressPublicAssets: true,
    minify: true
  },
  
  // Configuración de Vite optimizada
  vite: {
    optimizeDeps: {
      include: ['vue-chartjs', 'chart.js']
    },
    build: {
      sourcemap: false, // Deshabilitar sourcemaps para evitar warnings
      rollupOptions: {
        output: {
          manualChunks: {
            'chart': ['vue-chartjs', 'chart.js']
          }
        }
      }
    }
  }
})
