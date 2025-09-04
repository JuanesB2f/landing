export default defineNuxtRouteMiddleware(async (to: any) => {
  // Solo proteger rutas del área de administración
  if (!to.path.startsWith('/admin')) return

  // Ejecutar únicamente en el cliente para mantenerse consistente con el resto del proyecto
  if (!process.client) return

  const supabase = useSupabaseClient()

  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error || !session) {
      return navigateTo('/login')
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    const userRole = (profile as any)?.role
    if (profileError || !userRole || userRole !== 'admin') {
      return navigateTo('/unauthorized')
    }
  } catch (e) {
    return navigateTo('/login')
  }
})


