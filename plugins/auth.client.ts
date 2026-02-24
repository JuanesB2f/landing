/**
 * Plugin de autenticación
 * Se ejecuta solo en el cliente para inicializar el estado de autenticación
 */

export default defineNuxtPlugin(() => {
  const supabase = useSupabaseClient()
  const { checkAuth } = useAuth()
  const { user } = useAuth()
  const router = useRouter()
  
  if (import.meta.env.DEV) console.log('🔐 Plugin de autenticación iniciado')
  
  // Helper: esperar hasta que el perfil exista y tenga rol (optimizado)
  const waitForProfileRole = async (userId: string, maxMs = 2000) => {
    const start = Date.now()
    let lastRole: string | null = null
    while (Date.now() - start < maxMs) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .maybeSingle()
        const roleVal = (data as { role?: string } | null)?.role
        if (!error && roleVal) {
          lastRole = String(roleVal)
          break
        }
      } catch {}
      await new Promise(r => setTimeout(r, 200)) // Reducir frecuencia de polling
    }
    return lastRole
  }
  
  // Verificar sesión de Supabase al cargar la aplicación (optimizado)
  const initAuth = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
    
      if (error) {
        console.error('❌ Error obteniendo sesión:', error)
        return
      }
      
      if (session) {
        if (import.meta.env.DEV) console.log('✅ Sesión encontrada para usuario:', session.user.email)
        
        // Optimización: verificar auth solo una vez
        const ok = await checkAuth()
        if (ok) {
          try {
            const role = (user.value?.role as unknown as string)
            // Solo redirigir si estamos en la página principal
            if (router.currentRoute.value.path === '/') {
              // Verificar si estamos haciendo logout antes de redirigir
              if (isLoggingOut) {
                console.log('🚫 Ignorando redirección inicial por logout en progreso')
                return
              }
              
              if (role === 'admin') await router.replace('/dashboard')
              else if (role === 'user') await router.replace('/user')
            }
          } catch (_e) {}
        }
      } else {
        if (import.meta.env.DEV) console.log('ℹ️ No hay sesión activa')
      }
    } catch (error) {
      console.error('❌ Error verificando sesión:', error)
    }
  }
  
  // Ejecutar inicialización
  initAuth()
  
  // Flag para controlar redirecciones automáticas
  let isLoggingOut = false

  // Escuchar cambios en la autenticación (optimizado)
  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('🔄 Cambio de estado de autenticación:', event)
    
    if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session) {
      // No redirigir si estamos en proceso de logout
      if (isLoggingOut) {
        console.log('🚫 Ignorando redirección por logout en progreso')
        return
      }
      
      // No redirigir si estamos en la página de login
      if (typeof window !== 'undefined' && window.location.pathname === '/login') {
        console.log('🚫 Ignorando redirección porque estamos en /login')
        return
      }
      
      if (import.meta.env.DEV) console.log('✅ Usuario inició sesión:', session.user.email)
      
      // Optimización: hacer upsert de perfil de forma asíncrona sin bloquear
      $fetch('/api/auth/upsert-profile', { method: 'POST' }).catch(e => {
        console.warn('No se pudo actualizar perfil tras login', e)
      })
      
      // Optimización: verificar auth y redirigir de forma más eficiente
      try {
        await checkAuth()
        const role = (user.value?.role as unknown as string)

        // Si ya estamos en otra página (por ejemplo /admin/orders),
        // no forzar navegación automática; solo usamos este redirect
        // como atajo cuando el usuario está en la raíz o en /login.
        const currentPath = router.currentRoute.value.path
        if (currentPath !== '/' && currentPath !== '/login') {
          return
        }
        
        // Verificar nuevamente si estamos haciendo logout antes de redirigir
        if (isLoggingOut) {
          console.log('🚫 Ignorando redirección por logout en progreso (después de checkAuth)')
          return
        }
        
        if (role === 'admin') await router.replace('/dashboard')
        else if (role === 'user' || role === 'customer') await router.replace('/user')
      } catch (_e) {}
    } else if (event === 'SIGNED_OUT') {
      if (import.meta.env.DEV) console.log('🚪 Usuario cerró sesión')
      isLoggingOut = false // Reset flag
      
      // Solo limpiar localStorage si no se hizo desde useAuth().logout()
      const currentUser = user.value
      if (currentUser && typeof window !== 'undefined') {
        localStorage.removeItem('user')
        localStorage.removeItem('isAuthenticated')
      }
      
      // No redirigir automáticamente, dejar que el componente maneje la redirección
    }
  })

  // Exponer flag para control desde componentes
  return {
    provide: {
      setLoggingOut: (value: boolean) => { isLoggingOut = value }
    }
  }
})


