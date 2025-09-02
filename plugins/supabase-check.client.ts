export default defineNuxtPlugin(() => {
  if (process.client) {
    console.log('🔍 Verificando configuración de Supabase...')
    
    const supabase = useSupabaseClient<any>()
    
    if (supabase) {
      console.log('✅ Cliente Supabase encontrado')
      console.log('🔧 Configuración:', {
        url: supabase.supabaseUrl,
        hasAuth: !!supabase.auth,
        hasFrom: !!supabase.from
      })
    } else {
      console.error('❌ Cliente Supabase no encontrado')
      console.error('🔧 Variables de entorno necesarias:')
      console.error('- NUXT_SUPABASE_URL')
      console.error('- NUXT_SUPABASE_KEY')
      console.error('- NUXT_SUPABASE_SERVICE_KEY')
    }
  }
})

