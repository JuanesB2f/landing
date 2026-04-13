<template>
  <div class="ios-root min-h-screen w-full max-w-[100vw] min-w-0 overflow-x-hidden transition-colors duration-300 theme-container pb-20 lg:pb-0">
    <!-- Sidebar (solo desktop; en móvil se usa la barra inferior) -->
    <aside
      class="ios-glass-sidebar hidden lg:flex fixed inset-y-0 left-0 z-40 w-64 shadow-lg transition-all duration-300 theme-sidebar flex-col translate-x-0"
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

      <!-- Footer fijo: tarjeta vidrio iOS + chips de acción -->
      <div class="p-3 sm:p-4 border-t transition-colors duration-300 theme-header-bar mt-auto">
        <div class="ios-admin-user-glass">
          <div class="flex items-center gap-2.5">
            <div class="ios-admin-user-avatar" aria-hidden="true">
              {{ userInitials }}
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-xs sm:text-sm font-semibold tracking-tight theme-text-primary truncate leading-tight">
                {{ userName }}
              </p>
              <p class="text-[10px] sm:text-[11px] theme-text-secondary truncate leading-tight mt-0.5">
                {{ userRole }}
              </p>
            </div>
          </div>
          <div class="mt-2.5 pt-2.5 flex items-center justify-between gap-1 border-t border-[var(--ios-hairline)]">
            <button
              type="button"
              class="ios-admin-user-icon-btn gap-0.5 px-1.5 min-w-[2.65rem]"
              title="Tamaño de texto"
              :aria-label="'Tamaño de texto: nivel ' + (adminFontStep + 1) + ' de 3'"
              @click="cycleAdminFont"
            >
              <span class="text-[9px] font-bold leading-none opacity-45 theme-text-primary">A</span>
              <span
                class="text-[13px] font-bold leading-none"
                :class="adminFontStep >= 1 ? 'text-[var(--accent)]' : 'opacity-55 theme-text-primary'"
              >
                A
              </span>
            </button>
            <button
              type="button"
              class="ios-admin-user-icon-btn"
              :title="isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
              :aria-label="isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
              @click="optimizedToggleTheme"
            >
              <Icon :name="isDark ? 'heroicons:sun' : 'heroicons:moon'" class="shrink-0" />
            </button>
            <button
              type="button"
              class="ios-admin-user-icon-btn"
              title="Notificaciones"
              aria-label="Notificaciones"
            >
              <Icon name="heroicons:bell" class="shrink-0" />
            </button>
            <button
              type="button"
              class="ios-admin-user-icon-btn ios-admin-user-icon-btn--danger"
              title="Cerrar sesión"
              aria-label="Cerrar sesión"
              @click="handleLogout"
            >
              <Icon name="heroicons:arrow-right-on-rectangle" class="shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="lg:ml-64 min-h-screen flex flex-col min-w-0 max-w-full">
      <!-- Header sin color de fondo (solo borde y título) -->
      <header class="admin-page-header shadow-sm border-b transition-colors duration-300 sticky top-0 z-30">
        <div class="flex justify-center items-center h-14 sm:h-16 px-3 sm:px-4 lg:px-6">
          <h2 class="text-base sm:text-lg font-semibold transition-colors theme-text-primary truncate">
            {{ pageTitle }}
          </h2>
        </div>
      </header>

      <!-- Page Content (forzar re-render para evitar botones trabados) -->
      <main class="flex-1 p-3 sm:p-4 lg:p-6 min-h-0 min-w-0 w-full overflow-x-hidden" :key="`${$route.fullPath}-${refreshKey}`">
        <slot />
      </main>
    </div>

    <!-- Barra inferior: Teleport + contenedor fijo al viewport -->
    <Teleport to="body" defer>
      <div class="ios-mobile-tab-dock lg:hidden">
        <nav
          class="ios-tab-bar theme-header border-t theme-border w-full max-w-[100vw] rounded-t-3xl"
          style="padding-bottom: env(safe-area-inset-bottom, 0);"
          aria-label="Navegación admin"
        >
      <div class="flex items-stretch justify-around h-12 sm:h-14 gap-0.5 px-0.5 sm:px-0">
        <NuxtLink
          to="/dashboard"
          class="flex flex-col items-center justify-center flex-1 py-1 min-w-0 text-[9px] sm:text-[10px] leading-tight font-medium transition-colors theme-nav-item"
          :class="{ 'theme-nav-active text-accent': $route.path === '/dashboard' || $route.path === '/admin' }"
        >
          <Icon name="heroicons:home" class="w-5 h-5 sm:w-6 sm:h-6 mb-0.5 shrink-0" />
          <span class="truncate max-w-full px-0.5">Inicio</span>
        </NuxtLink>
        <NuxtLink
          to="/admin/products"
          class="flex flex-col items-center justify-center flex-1 py-1 min-w-0 text-[9px] sm:text-[10px] leading-tight font-medium transition-colors theme-nav-item"
          :class="{ 'theme-nav-active text-accent': $route.path.startsWith('/admin/products') }"
        >
          <Icon name="heroicons:cube" class="w-5 h-5 sm:w-6 sm:h-6 mb-0.5 shrink-0" />
          <span class="truncate max-w-full px-0.5">Productos</span>
        </NuxtLink>
        <NuxtLink
          to="/admin/orders"
          class="flex flex-col items-center justify-center flex-1 py-1 min-w-0 text-[9px] sm:text-[10px] leading-tight font-medium transition-colors theme-nav-item"
          :class="{ 'theme-nav-active text-accent': $route.path.startsWith('/admin/orders') }"
        >
          <Icon name="heroicons:shopping-bag" class="w-5 h-5 sm:w-6 sm:h-6 mb-0.5 shrink-0" />
          <span class="truncate max-w-full px-0.5">Pedidos</span>
        </NuxtLink>
        <button
          type="button"
          class="flex flex-col items-center justify-center flex-1 py-1 min-w-0 text-[9px] sm:text-[10px] leading-tight font-medium transition-colors theme-nav-item"
          :class="{ 'theme-nav-active text-accent': moreOpen }"
          @click="moreOpen = !moreOpen"
        >
          <Icon name="heroicons:squares-2x2" class="w-5 h-5 sm:w-6 sm:h-6 mb-0.5 shrink-0" />
          <span class="truncate max-w-full px-0.5">Más</span>
        </button>
        <button
          type="button"
          class="flex flex-col items-center justify-center flex-1 py-1 min-w-0 text-[9px] sm:text-[10px] leading-tight font-medium text-red-600 dark:text-red-400 hover:opacity-80 transition-opacity"
          @click="handleLogout"
          title="Cerrar sesión"
        >
          <Icon name="heroicons:arrow-right-on-rectangle" class="w-5 h-5 sm:w-6 sm:h-6 mb-0.5 shrink-0" />
          <span class="truncate max-w-full px-0.5">Salir</span>
        </button>
      </div>
        </nav>
      </div>
    </Teleport>

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
        class="lg:hidden ios-admin-overlay fixed inset-0 z-[100000]"
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
        class="ios-sheet-panel lg:hidden fixed bottom-0 left-0 right-0 z-[100001] theme-sidebar border-t theme-border rounded-t-3xl shadow-2xl max-h-[70vh] overflow-hidden flex flex-col"
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

const ADMIN_FONT_STORAGE_KEY = 'admin-font-step'
const adminFontStep = ref(0)

const applyAdminFontStep = (step) => {
  if (typeof document === 'undefined') return
  const sizes = ['100%', '106.25%', '112.5%']
  const i = ((Number(step) || 0) % 3 + 3) % 3
  document.documentElement.style.fontSize = sizes[i]
  try {
    localStorage.setItem(ADMIN_FONT_STORAGE_KEY, String(i))
  } catch {
    /* ignore */
  }
}

const cycleAdminFont = () => {
  adminFontStep.value = (adminFontStep.value + 1) % 3
  applyAdminFontStep(adminFontStep.value)
}

// Composable para manejar el tema (initTheme sincroniza con localStorage para que el primer clic funcione)
const { isDark, toggleTheme, initTheme } = useTheme()
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
  initTheme()
  try {
    const stored = Number(localStorage.getItem(ADMIN_FONT_STORAGE_KEY) || 0)
    adminFontStep.value = Number.isFinite(stored) ? ((stored % 3) + 3) % 3 : 0
    applyAdminFontStep(adminFontStep.value)
  } catch {
    applyAdminFontStep(0)
  }
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
  if (typeof document !== 'undefined') {
    document.documentElement.style.fontSize = ''
  }
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


