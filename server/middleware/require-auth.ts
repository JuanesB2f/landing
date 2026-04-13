import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Solo aplicar a navegación de páginas (no APIs ni assets)
  const url = getRequestURL(event)
  const path = url.pathname || '/'

  // Allowlist explícita para páginas públicas
  const isPublic = (): boolean => {
    if (path === '/' || path === '/about' || path === '/login' || path === '/registro' || path === '/unauthorized' || path === '/callback' || path === '/completar-perfil') return true
    // Páginas de tienda públicas (excepto carrito)
    if (path === '/shop') return true
    if (path.startsWith('/shop/category/')) return true
    if (path.startsWith('/shop/product/')) return true
    // Archivos públicos
    if (path === '/robots.txt' || path === '/favicon.ico') return true
    return false
  }
  if (isPublic()) return

  // Ignorar APIs y recursos
  if (path.startsWith('/api') || path.startsWith('/_nuxt') || path.startsWith('/public') || path.startsWith('/favicon') || path.startsWith('/__nuxt')) return

  try {
    // serverSupabaseUser lanza "Auth session missing!" sin sesión; getSession devuelve null sin excepción
    const supabase = await serverSupabaseClient(event)
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      console.error('[require-auth] getSession:', error)
      return sendRedirect(event, '/login')
    }
    if (!session) {
      return sendRedirect(event, '/login')
    }
  } catch (e) {
    // En Vercel, cookies o env pueden fallar; no dejar que la función crashee con 500
    console.error('[require-auth] Error verificando sesión:', e)
    return sendRedirect(event, '/login')
  }
})


