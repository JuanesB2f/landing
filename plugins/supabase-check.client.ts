export default defineNuxtPlugin(() => {
  if (process.client) {
    console.log('🔍 Verificando configuración de Supabase...')
    
    const supabase = useSupabaseClient<any>()
    
    if (supabase) {
      console.log('✅ Cliente Supabase encontrado')
      // Evitar acceder a propiedades protegidas para no romper tipos
      const configInfo = {
        hasAuth: Boolean((supabase as any).auth),
        hasFrom: Boolean((supabase as any).from)
      }
      console.log('🔧 Configuración:', configInfo)
    } else {
      console.error('❌ Cliente Supabase no encontrado')
      console.error('🔧 Variables de entorno necesarias:')
      console.error('- NUXT_SUPABASE_URL')
      console.error('- NUXT_SUPABASE_KEY')
      console.error('- NUXT_SUPABASE_SERVICE_KEY')
    }
  }
})

