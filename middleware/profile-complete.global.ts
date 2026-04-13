import type { RouteLocationNormalized } from 'vue-router'
import { needsProfileCompletion } from '~/utils/profileCompletion'

/**
 * Obliga a completar datos básicos (nombre, apellido, fecha de nacimiento) antes de usar áreas privadas.
 * No aplica a admin/manager ni a rutas públicas (login, registro, tienda de solo lectura, etc.).
 */
export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized) => {
  if (!import.meta.client) return

  const allow = new Set([
    '/login',
    '/registro',
    '/callback',
    '/completar-perfil',
    '/unauthorized'
  ])
  if (allow.has(to.path)) return

  if (to.path === '/' || to.path === '/shop' || (to.path.startsWith('/shop/') && to.path !== '/shop/cart')) return

  const supabase = useSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return

  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name, birth_date, role')
    .eq('id', session.user.id)
    .maybeSingle()

  if (!needsProfileCompletion(profile)) return

  if (to.path === '/completar-perfil') return

  return navigateTo({ path: '/completar-perfil', query: { redirect: to.fullPath } })
})
