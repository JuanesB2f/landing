/**
 * Plugin de autenticación
 * Se ejecuta solo en el cliente para inicializar el estado de autenticación
 */

export default defineNuxtPlugin(async () => {
  const supabase = useSupabaseClient<any>()
  
  // Verificar sesión de Supabase al cargar la aplicación
  try {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (session) {
      // Obtener perfil del usuario
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
      
      if (profile && profile.role === 'admin') {
        // Usuario autenticado como admin, actualizar estado
        const { user } = useAuth()
        user.value = {
          id: profile.id,
          email: profile.email,
          role: profile.role,
          name: profile.name,
          avatar: profile.avatar_url,
          created_at: profile.created_at,
          updated_at: profile.updated_at
        }
        
        // Actualizar localStorage
        localStorage.setItem('user', JSON.stringify(user.value))
        localStorage.setItem('isAuthenticated', 'true')
      }
    }
  } catch (error) {
    console.error('Error verificando sesión:', error)
  }
})


