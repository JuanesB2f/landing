/**
 * Plugin para matar completamente la sesión de Supabase
 */

export default defineNuxtPlugin(() => {
  if (!process.client) return

  const CART_KEY_PREFIX = 'cart:'

  const snapshotCartKeys = (): Record<string, string> => {
    const out: Record<string, string> = {}
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i)
        if (k?.startsWith(CART_KEY_PREFIX)) {
          const v = localStorage.getItem(k)
          if (v != null) out[k] = v
        }
      }
    } catch (e) {
      console.warn('No se pudo respaldar carrito', e)
    }
    return out
  }

  const restoreCartKeys = (snap: Record<string, string>) => {
    for (const [k, v] of Object.entries(snap)) {
      try {
        localStorage.setItem(k, v)
      } catch (e) {
        console.warn('No se pudo restaurar clave de carrito', k, e)
      }
    }
  }

  // Función para matar la sesión completamente
  const killSession = () => {
    console.log('💀 Matando sesión completamente...')
    
    try {
      // 1. Obtener cliente de Supabase
      const supabase = useSupabaseClient()
      
      // 2. Cerrar sesión de Supabase
      supabase.auth.signOut().then(() => {
        console.log('✅ Supabase signOut completado')
      }).catch(error => {
        console.warn('⚠️ Error en Supabase signOut:', error)
      })
      
      // 3. Limpiar almacenamiento pero conservar carritos (comportamiento tipo marketplace)
      const cartBackup = snapshotCartKeys()
      localStorage.clear()
      sessionStorage.clear()
      restoreCartKeys(cartBackup)
      console.log('🧹 Almacenamiento limpiado (carrito preservado)')
      
      // 4. Limpiar cookies
      document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
      })
      console.log('🍪 Cookies limpiadas')
      
      // 5. Limpiar IndexedDB (si existe)
      if ('indexedDB' in window) {
        try {
          indexedDB.deleteDatabase('supabase')
          console.log('🗄️ IndexedDB limpiado')
        } catch (e) {
          console.warn('⚠️ Error limpiando IndexedDB:', e)
        }
      }
      
      // 6. Forzar redirección
      setTimeout(() => {
        console.log('🔄 Forzando redirección a /login')
        window.location.replace('/login')
      }, 100)
      
    } catch (error) {
      console.error('💥 Error matando sesión:', error)
      // Fallback: redirección directa
      window.location.replace('/login')
    }
  }

  // Exponer función globalmente
  ;(window as any).killSession = killSession

  return {
    provide: {
      killSession
    }
  }
})
