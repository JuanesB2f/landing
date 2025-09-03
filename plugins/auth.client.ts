/**
 * Plugin de autenticación
 * Se ejecuta solo en el cliente para inicializar el estado de autenticación
 */

export default defineNuxtPlugin(async () => {
  const supabase = useSupabaseClient()
  const { checkAuth } = useAuth()
  
  console.log('🔐 Plugin de autenticación iniciado')
  
  // Verificar sesión de Supabase al cargar la aplicación
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('❌ Error obteniendo sesión:', error)
      return
    }
    
    if (session) {
      console.log('✅ Sesión encontrada para usuario:', session.user.email)
      
      // Usar el método checkAuth del composable para manejar la autenticación
      const isAuthenticated = await checkAuth()
      
      if (isAuthenticated) {
        console.log('✅ Usuario autenticado como admin')
      } else {
        console.log('❌ Usuario no es admin o error en autenticación')
      }
    } else {
      console.log('ℹ️ No hay sesión activa')
    }
  } catch (error) {
    console.error('❌ Error verificando sesión:', error)
  }
  
  // Escuchar cambios en la autenticación
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('🔄 Cambio de estado de autenticación:', event)
    
    if (event === 'SIGNED_IN' && session) {
      console.log('✅ Usuario inició sesión:', session.user.email)
      await checkAuth()
    } else if (event === 'SIGNED_OUT') {
      console.log('🚪 Usuario cerró sesión')
      // Limpiar estado local si es necesario
    }
  })
})


