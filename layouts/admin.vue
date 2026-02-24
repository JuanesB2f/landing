<template>
  <div class="min-h-screen w-full max-w-[100vw] transition-colors duration-300 theme-container pb-20 lg:pb-0">
    <!-- Sidebar (solo desktop; en móvil se usa la barra inferior) -->
    <aside
      class="hidden lg:flex fixed inset-y-0 left-0 z-40 w-64 shadow-lg transition-all duration-300 theme-sidebar flex-col translate-x-0"
    >
      <div class="flex items-center justify-center h-14 sm:h-16 theme-header px-3">
        <h1 class="text-lg sm:text-xl font-bold transition-colors theme-text-primary truncate">Admin Panel</h1>
      </div>
      
      <nav class="mt-4 sm:mt-8 flex-1 overflow-y-auto">
        <div class="px-3 sm:px-4 space-y-1 sm:space-y-2">
          <NuxtLink 
            to="/dashboard"
            class="flex items-center px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors theme-nav-item text-sm sm:text-base"
            :class="{ 'theme-nav-active': $route.path === '/dashboard' }"
          >
            <Icon name="heroicons:home" class="w-5 h-5 mr-2 sm:mr-3 shrink-0" />
            Dashboard
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/products" 
            class="flex items-center px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors theme-nav-item text-sm sm:text-base"
            :class="{ 'theme-nav-active': $route.path.startsWith('/admin/products') }"
          >
            <Icon name="heroicons:cube" class="w-5 h-5 mr-2 sm:mr-3 shrink-0" />
            Productos
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/categories" 
            class="flex items-center px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors theme-nav-item text-sm sm:text-base"
            :class="{ 'theme-nav-active': $route.path.startsWith('/admin/categories') }"
          >
            <Icon name="heroicons:tag" class="w-5 h-5 mr-2 sm:mr-3 shrink-0" />
            Categorías
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/inventory" 
            class="flex items-center px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors theme-nav-item text-sm sm:text-base"
            :class="{ 'theme-nav-active': $route.path.startsWith('/admin/inventory') }"
          >
            <Icon name="heroicons:archive-box" class="w-5 h-5 mr-2 sm:mr-3 shrink-0" />
            Inventario
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/providers" 
            class="flex items-center px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors theme-nav-item text-sm sm:text-base"
            :class="{ 'theme-nav-active': $route.path.startsWith('/admin/providers') }"
          >
            <Icon name="heroicons:truck" class="w-5 h-5 mr-2 sm:mr-3 shrink-0" />
            Proveedores
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/orders" 
            class="flex items-center px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors theme-nav-item text-sm sm:text-base"
            :class="{ 'theme-nav-active': $route.path.startsWith('/admin/orders') }"
          >
            <Icon name="heroicons:shopping-bag" class="w-5 h-5 mr-2 sm:mr-3 shrink-0" />
            Pedidos
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/customers" 
            class="flex items-center px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors theme-nav-item text-sm sm:text-base"
            :class="{ 'theme-nav-active': $route.path.startsWith('/admin/customers') }"
          >
            <Icon name="heroicons:users" class="w-5 h-5 mr-2 sm:mr-3 shrink-0" />
            Clientes
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/profiles" 
            class="flex items-center px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors theme-nav-item text-sm sm:text-base"
            :class="{ 'theme-nav-active': $route.path.startsWith('/admin/profiles') }"
          >
            <Icon name="heroicons:user-circle" class="w-5 h-5 mr-2 sm:mr-3 shrink-0" />
            Usuarios
          </NuxtLink>

          <NuxtLink 
            to="/admin/offers" 
            class="flex items-center px-3 py-2.5 sm:px-4 sm:py-2 rounded-lg transition-colors theme-nav-item text-sm sm:text-base"
            :class="{ 'theme-nav-active': $route.path.startsWith('/admin/offers') }"
          >
            <Icon name="heroicons:tag" class="w-5 h-5 mr-2 sm:mr-3 shrink-0" />
            Ofertas
          </NuxtLink>
        </div>
      </nav>

      <!-- Footer fijo en la parte inferior con acciones de usuario -->
      <div class="p-3 sm:p-4 border-t transition-colors duration-300 theme-header-bar mt-auto">
        <div class="bg-gray-50 dark:bg-white/5 rounded-lg p-2.5 sm:p-3">
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center text-xs sm:text-sm font-semibold shadow-sm shrink-0">
              {{ userInitials }}
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-xs sm:text-sm font-semibold transition-colors theme-text-primary truncate">{{ userName }}</p>
              <p class="text-[10px] sm:text-xs transition-colors theme-text-secondary truncate">{{ userRole }}</p>
            </div>
            <div class="flex items-center gap-1 sm:gap-2 shrink-0">
              <button 
                @click="optimizedToggleTheme" 
                class="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                :title="isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
              >
                <Icon :name="isDark ? 'heroicons:sun' : 'heroicons:moon'" class="w-5 h-5" />
              </button>
              <button class="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 transition-colors" :title="'Notificaciones'">
                <Icon name="heroicons:bell" class="w-5 h-5" />
              </button>
              <button @click="handleLogout" class="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 transition-colors" :title="'Cerrar sesión'" :disabled="false">
                <Icon name="heroicons:arrow-right-on-rectangle" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="lg:ml-64 min-h-screen flex flex-col">
      <!-- Header sin color de fondo (solo borde y título) -->
      <header class="admin-page-header shadow-sm border-b transition-colors duration-300 sticky top-0 z-30">
        <div class="flex justify-center items-center h-14 sm:h-16 px-3 sm:px-4 lg:px-6">
          <h2 class="text-base sm:text-lg font-semibold transition-colors theme-text-primary truncate">
            {{ pageTitle }}
          </h2>
        </div>
      </header>

      <!-- Page Content (forzar re-render para evitar botones trabados) -->
      <main class="flex-1 p-3 sm:p-4 lg:p-6 min-h-0" :key="`${$route.fullPath}-${refreshKey}`">
        <slot />
      </main>
    </div>

    <!-- Barra inferior tipo iPhone: siempre fija al viewport (solo móvil/tablet) -->
    <nav
      class="lg:hidden fixed bottom-0 left-0 right-0 z-[100] theme-header border-t theme-border w-full max-w-[100vw]"
      style="padding-bottom: env(safe-area-inset-bottom, 0);"
    >
      <div class="flex items-stretch justify-around h-14">
        <NuxtLink
          to="/dashboard"
          class="flex flex-col items-center justify-center flex-1 py-1.5 min-w-0 text-[10px] font-medium transition-colors theme-nav-item"
          :class="{ 'theme-nav-active text-accent': $route.path === '/dashboard' || $route.path === '/admin' }"
        >
          <Icon name="heroicons:home" class="w-6 h-6 mb-0.5 shrink-0" />
          <span>Inicio</span>
        </NuxtLink>
        <NuxtLink
          to="/admin/products"
          class="flex flex-col items-center justify-center flex-1 py-1.5 min-w-0 text-[10px] font-medium transition-colors theme-nav-item"
          :class="{ 'theme-nav-active text-accent': $route.path.startsWith('/admin/products') }"
        >
          <Icon name="heroicons:cube" class="w-6 h-6 mb-0.5 shrink-0" />
          <span>Productos</span>
        </NuxtLink>
        <NuxtLink
          to="/admin/orders"
          class="flex flex-col items-center justify-center flex-1 py-1.5 min-w-0 text-[10px] font-medium transition-colors theme-nav-item"
          :class="{ 'theme-nav-active text-accent': $route.path.startsWith('/admin/orders') }"
        >
          <Icon name="heroicons:shopping-bag" class="w-6 h-6 mb-0.5 shrink-0" />
          <span>Pedidos</span>
        </NuxtLink>
        <button
          type="button"
          class="flex flex-col items-center justify-center flex-1 py-1.5 min-w-0 text-[10px] font-medium transition-colors theme-nav-item"
          :class="{ 'theme-nav-active text-accent': moreOpen }"
          @click="moreOpen = !moreOpen"
        >
          <Icon name="heroicons:squares-2x2" class="w-6 h-6 mb-0.5 shrink-0" />
          <span>Más</span>
        </button>
        <button
          type="button"
          class="flex flex-col items-center justify-center flex-1 py-1.5 min-w-0 text-[10px] font-medium text-red-600 dark:text-red-400 hover:opacity-80 transition-opacity"
          @click="handleLogout"
          title="Cerrar sesión"
        >
          <Icon name="heroicons:arrow-right-on-rectangle" class="w-6 h-6 mb-0.5 shrink-0" />
          <span>Salir</span>
        </button>
      </div>
    </nav>

    <!-- Sheet "Más" para el resto de secciones (móvil) -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="moreOpen"
        class="lg:hidden fixed inset-0 z-40 bg-black/50"
        aria-hidden="true"
        @click="moreOpen = false"
      />
    </Transition>
    <Transition
      enter-active-class="transition-transform duration-200 ease-out"
      enter-from-class="translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-y-0"
      leave-to-class="translate-y-full"
    >
      <div
        v-if="moreOpen"
        class="lg:hidden fixed bottom-0 left-0 right-0 z-50 theme-sidebar border-t theme-border rounded-t-2xl shadow-2xl max-h-[70vh] overflow-hidden flex flex-col"
        style="padding-bottom: env(safe-area-inset-bottom, 0);"
      >
        <div class="flex items-center justify-between p-4 border-b theme-border">
          <h3 class="font-semibold theme-text-primary">Más secciones</h3>
          <button type="button" @click="moreOpen = false" class="p-2 rounded-lg theme-nav-item">
            <Icon name="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>
        <div class="overflow-y-auto p-2">
          <NuxtLink to="/admin/categories" @click="moreOpen = false" class="flex items-center px-4 py-3 rounded-lg theme-nav-item" :class="{ 'theme-nav-active': $route.path.startsWith('/admin/categories') }">
            <Icon name="heroicons:tag" class="w-5 h-5 mr-3 shrink-0" /> Categorías
          </NuxtLink>
          <NuxtLink to="/admin/inventory" @click="moreOpen = false" class="flex items-center px-4 py-3 rounded-lg theme-nav-item" :class="{ 'theme-nav-active': $route.path.startsWith('/admin/inventory') }">
            <Icon name="heroicons:archive-box" class="w-5 h-5 mr-3 shrink-0" /> Inventario
          </NuxtLink>
          <NuxtLink to="/admin/providers" @click="moreOpen = false" class="flex items-center px-4 py-3 rounded-lg theme-nav-item" :class="{ 'theme-nav-active': $route.path.startsWith('/admin/providers') }">
            <Icon name="heroicons:truck" class="w-5 h-5 mr-3 shrink-0" /> Proveedores
          </NuxtLink>
          <NuxtLink to="/admin/customers" @click="moreOpen = false" class="flex items-center px-4 py-3 rounded-lg theme-nav-item" :class="{ 'theme-nav-active': $route.path.startsWith('/admin/customers') }">
            <Icon name="heroicons:users" class="w-5 h-5 mr-3 shrink-0" /> Clientes
          </NuxtLink>
          <NuxtLink to="/admin/profiles" @click="moreOpen = false" class="flex items-center px-4 py-3 rounded-lg theme-nav-item" :class="{ 'theme-nav-active': $route.path.startsWith('/admin/profiles') }">
            <Icon name="heroicons:user-circle" class="w-5 h-5 mr-3 shrink-0" /> Usuarios
          </NuxtLink>
          <NuxtLink to="/admin/offers" @click="moreOpen = false" class="flex items-center px-4 py-3 rounded-lg theme-nav-item" :class="{ 'theme-nav-active': $route.path.startsWith('/admin/offers') }">
            <Icon name="heroicons:sparkles" class="w-5 h-5 mr-3 shrink-0" /> Ofertas
          </NuxtLink>
        </div>
        <div class="border-t theme-border p-2 mt-2">
          <button
            type="button"
            @click="moreOpen = false; handleLogout()"
            class="flex items-center w-full px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
          >
            <Icon name="heroicons:arrow-right-on-rectangle" class="w-5 h-5 mr-3 shrink-0" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const route = useRoute()
const moreOpen = ref(false)

// Composable para manejar el tema
const { isDark, toggleTheme } = useTheme()
const { $themeOptimizer } = useNuxtApp()

// Usar toggle optimizado si está disponible
const optimizedToggleTheme = $themeOptimizer?.optimizedToggleTheme || toggleTheme
// Composable de autenticación
const { logout } = useAuth()

// Key para forzar re-renderizado cuando sea necesario (solo cuando realmente se necesite)
const refreshKey = ref(0)

// Detectar inactividad de manera más eficiente
let lastInteraction = Date.now()
let inactivityTimer = null
const INACTIVITY_THRESHOLD = 10 * 60 * 1000 // Aumentado a 10 minutos para reducir re-renders

const handleUserActivity = () => {
  lastInteraction = Date.now()
  // Solo refrescar si realmente ha pasado mucho tiempo
  if (inactivityTimer) {
    clearTimeout(inactivityTimer)
  }
  inactivityTimer = setTimeout(() => {
    const now = Date.now()
    if (now - lastInteraction > INACTIVITY_THRESHOLD) {
      refreshKey.value++
      lastInteraction = now
    }
  }, INACTIVITY_THRESHOLD)
}

// Eventos para detectar actividad (reducidos)
onMounted(() => {
  const events = ['click', 'keydown'] // Solo eventos importantes
  events.forEach(event => {
    document.addEventListener(event, handleUserActivity, { passive: true })
  })
  
  // Solo refrescar cuando la ventana recupera el foco si ha pasado mucho tiempo
  window.addEventListener('focus', () => {
    const now = Date.now()
    if (now - lastInteraction > INACTIVITY_THRESHOLD) {
      refreshKey.value++
      lastInteraction = now
    }
  })
})

// Cleanup
onUnmounted(() => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer)
  }
  const events = ['click', 'keydown']
  events.forEach(event => {
    document.removeEventListener(event, handleUserActivity)
  })
})

const pageTitle = computed(() => {
  const titles = {
    '/dashboard': 'Dashboard',
    '/admin': 'Dashboard',
    '/admin/products': 'Productos',
    '/admin/categories': 'Categorías',
    '/admin/inventory': 'Inventario',
    '/admin/providers': 'Proveedores',
    '/admin/orders': 'Pedidos',
    '/admin/customers': 'Clientes',
    '/admin/profiles': 'Usuarios',
    '/admin/offers': 'Ofertas'
  }
  return titles[route.path] || 'Administración'
})

const userInitials = ref('AD')
const userName = ref('Administrador')
const userRole = ref('Admin')

const handleLogout = async () => {
  try {
    console.log('🚪 Iniciando logout de admin...')
    
    // 1. Deshabilitar autenticación inmediatamente
    const { $disableAuth } = useNuxtApp()
    if ($disableAuth) {
      $disableAuth()
      console.log('🚫 Auth deshabilitado')
    }
    
    // 2. Marcar que estamos haciendo logout para evitar redirecciones automáticas
    const { $setLoggingOut } = useNuxtApp()
    if ($setLoggingOut) {
      $setLoggingOut(true)
    }
    
    // 2. Matar la sesión completamente
    const { $killSession } = useNuxtApp()
    if ($killSession) {
      $killSession()
      return
    }
    
    // 3. Fallback: método tradicional
    const supabase = useSupabaseClient()
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Error cerrando sesión de Supabase:', error)
    }
    
    // Limpiar estado local
    const { user } = useAuth()
    user.value = null
    
    // Limpiar localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
      // Limpiar datos del carrito
      const cartKeys = Object.keys(localStorage).filter(key => key.startsWith('cart:'))
      cartKeys.forEach(key => localStorage.removeItem(key))
    }
    
    // Redireccionar a login usando window.location para asegurar que funcione
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
    
  } catch (e) {
    console.error('Error en logout:', e)
    // Fallback: redirección directa
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
  }
}
</script>


