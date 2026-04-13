<template>
  <div class="ios-root min-h-screen w-full max-w-[100vw] min-w-0 overflow-x-hidden transition-colors duration-300 theme-container pb-20 md:pb-0">
    <!-- Header: sin color + animación de puntos/blobs rosados detrás -->
    <header class="header-diffused sticky top-0 z-50">
      <!-- Animación de blobs en rosa (detrás del contenido) -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div class="absolute -top-20 right-0 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-accent/25 via-accent-secondary/20 to-accent/25 rounded-full blur-3xl animate-blob"></div>
        <div class="absolute -bottom-16 left-0 w-56 h-56 sm:w-72 sm:h-72 bg-gradient-to-tr from-accent-secondary/25 via-accent/20 to-accent-secondary/25 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-60 sm:h-60 bg-gradient-to-r from-accent/15 to-accent-secondary/15 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      <div class="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-14 sm:h-16 lg:h-20 gap-2">
          <!-- Logo -->
          <div class="flex items-center min-w-0 flex-shrink-0">
            <NuxtLink to="/" class="flex items-center space-x-1.5 sm:space-x-2 group">
              <div
                class="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-accent to-accent-secondary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0 logo-icon-wrap"
              >
                <Icon name="heroicons:sparkles" class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white dark:text-white logo-icon" />
              </div>
              <span
                class="header-logo-text text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent truncate dark:bg-clip-text dark:text-transparent"
              >
                BylotoStore
              </span>
            </NuxtLink>
          </div>

          <!-- Navigation (solo desktop; en móvil va la barra inferior) -->
          <nav class="hidden md:flex space-x-6 lg:space-x-8">
            <button
              v-if="isShopUser"
              @click="navigateToOffers"
              class="relative theme-nav-item hover:text-accent transition-colors font-medium group"
            >
              Mis Ofertas
              <span
                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-secondary group-hover:w-full transition-all duration-300"
              ></span>
            </button>

            <NuxtLink
              v-if="isShopUser || isAdmin"
              to="/shop"
              class="relative theme-nav-item hover:text-accent transition-colors font-medium group"
            >
              Productos
              <span
                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-secondary group-hover:w-full transition-all duration-300"
              ></span>
            </NuxtLink>

            <NuxtLink
              v-if="isShopUser || isAdmin"
              to="/about"
              class="relative theme-nav-item hover:text-accent transition-colors font-medium group"
            >
              Nosotros
              <span
                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-secondary group-hover:w-full transition-all duration-300"
              ></span>
            </NuxtLink>
          </nav>

          <!-- Botón cambio de tema: visible en móvil (parte derecha) y desktop -->
          <div class="flex items-center gap-2">
            <button
              @click="optimizedToggleTheme"
              class="p-2.5 rounded-full theme-button hover:theme-button-hover transition-all duration-300 flex items-center justify-center"
              :aria-label="isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
            >
              <Icon
                :name="isDark ? 'heroicons:sun' : 'heroicons:moon'"
                class="w-5 h-5 theme-text-primary"
              />
            </button>

          <!-- User Menu (cart + login; en desktop va junto al tema, en móvil solo tema a la derecha) -->
          <div class="hidden md:flex items-center space-x-4 lg:space-x-6">

            <!-- Cart (solo usuarios) -->
            <button
              v-if="isShopUser"
              @click="navigateToCart"
              class="relative theme-text-primary hover:text-accent transition-colors group"
            >
              <div
                class="header-cart-icon-wrap p-2 rounded-full bg-gradient-to-r from-accent to-accent-secondary group-hover:from-accent-hover group-hover:to-accent-secondary transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Icon
                  name="heroicons:shopping-cart"
                  class="w-6 h-6 text-white"
                />
              </div>
              <span
                v-if="cartItemsCount > 0"
                class="header-cart-count absolute -top-1 -right-1 bg-gradient-to-r from-accent to-accent-secondary text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse"
              >
                {{ cartItemsCount }}
              </span>
            </button>

            <!-- Login Button (oculto si hay sesión) -->
            <NuxtLink
              v-if="!authUser"
              to="/login"
              class="px-4 py-2 sm:px-6 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base bg-accent-soft border-2 border-accent text-[#0E1627] hover:bg-accent hover:text-white dark:bg-gradient-to-r dark:from-accent dark:to-accent-secondary dark:border-0 dark:text-white dark:hover:from-accent-hover dark:hover:to-accent-secondary"
            >
              Iniciar Sesión
            </NuxtLink>

            <!-- Logout cuando hay sesión -->
            <button
              v-else
              @click="handleLogout"
              class="theme-button text-theme-text-primary px-4 py-2 sm:px-6 rounded-full font-medium hover:theme-button-hover transition-all duration-300 shadow-sm text-sm sm:text-base"
            >
              Cerrar sesión
            </button>
          </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Barra inferior: Teleport + contenedor fijo (viewport real al hacer scroll) -->
    <Teleport to="body" defer>
      <div class="ios-mobile-tab-dock md:hidden">
        <nav
          class="ios-tab-bar theme-header border-t theme-border w-full max-w-[100vw] rounded-t-3xl"
          style="padding-bottom: env(safe-area-inset-bottom, 0);"
          aria-label="Navegación principal"
        >
      <div class="flex items-stretch justify-around h-12 sm:h-14 gap-0.5 px-0.5 sm:px-0">
        <NuxtLink
          to="/"
          class="flex flex-col items-center justify-center flex-1 py-1 min-w-0 text-[9px] sm:text-[10px] leading-tight font-medium transition-colors theme-nav-item"
          :class="{ 'theme-nav-active text-accent': $route.path === '/' }"
        >
          <Icon name="heroicons:home" class="w-5 h-5 sm:w-6 sm:h-6 mb-0.5 shrink-0" />
          <span class="truncate max-w-full px-0.5">Inicio</span>
        </NuxtLink>
        <NuxtLink
          to="/shop"
          class="flex flex-col items-center justify-center flex-1 py-1 min-w-0 text-[9px] sm:text-[10px] leading-tight font-medium transition-colors theme-nav-item"
          :class="{ 'theme-nav-active text-accent': $route.path.startsWith('/shop') && $route.path !== '/shop/cart' }"
        >
          <Icon name="heroicons:shopping-bag" class="w-5 h-5 sm:w-6 sm:h-6 mb-0.5 shrink-0" />
          <span class="truncate max-w-full px-0.5">Tienda</span>
        </NuxtLink>
        <NuxtLink
          v-if="isShopUser"
          to="/shop/cart"
          class="flex flex-col items-center justify-center flex-1 py-1 min-w-0 text-[9px] sm:text-[10px] leading-tight font-medium transition-colors theme-nav-item relative"
          :class="{ 'theme-nav-active text-accent': $route.path === '/shop/cart' }"
        >
          <span class="relative inline-block">
            <Icon name="heroicons:shopping-cart" class="w-5 h-5 sm:w-6 sm:h-6 mb-0.5 shrink-0" />
            <span
              v-if="cartItemsCount > 0"
              class="absolute -top-2 -right-2 bg-accent text-white text-[10px] rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-0.5 font-bold"
            >
              {{ cartItemsCount > 99 ? '99+' : cartItemsCount }}
            </span>
          </span>
          <span class="truncate max-w-full px-0.5">Carrito</span>
        </NuxtLink>
        <NuxtLink
          v-if="isShopUser || isAdmin"
          to="/user"
          class="flex flex-col items-center justify-center flex-1 py-1 min-w-0 text-[9px] sm:text-[10px] leading-tight font-medium transition-colors theme-nav-item"
          :class="{ 'theme-nav-active text-accent': $route.path.startsWith('/user') }"
        >
          <Icon name="heroicons:user-circle" class="w-5 h-5 sm:w-6 sm:h-6 mb-0.5 shrink-0" />
          <span class="truncate max-w-full px-0.5">Cuenta</span>
        </NuxtLink>
        <NuxtLink
          v-else
          to="/login"
          class="flex flex-col items-center justify-center flex-1 py-1 min-w-0 text-[9px] sm:text-[10px] leading-tight font-medium transition-colors theme-nav-item"
          :class="{ 'theme-nav-active text-accent': $route.path === '/login' }"
        >
          <Icon name="heroicons:user" class="w-5 h-5 sm:w-6 sm:h-6 mb-0.5 shrink-0" />
          <span class="truncate max-w-full px-0.5">Cuenta</span>
        </NuxtLink>
        <button
          v-if="authUser"
          type="button"
          @click="handleLogout"
          class="flex flex-col items-center justify-center flex-1 py-1 min-w-0 text-[9px] sm:text-[10px] leading-tight font-medium transition-colors theme-nav-item text-red-600 dark:text-red-400"
        >
          <Icon name="heroicons:arrow-right-on-rectangle" class="w-5 h-5 sm:w-6 sm:h-6 mb-0.5 shrink-0" />
          <span class="truncate max-w-full px-0.5">Salir</span>
        </button>
      </div>
        </nav>
      </div>
    </Teleport>

    <!-- Main Content -->
    <main class="min-w-0 w-full max-w-full overflow-x-hidden" :key="`${$route.fullPath}-${refreshKey}`">
      <slot />
    </main>

    <!-- Footer -->
    <footer
      class="ios-footer-glass footer-theme text-[#0E1627] dark:text-white relative overflow-hidden"
    >
      <!-- Background decoration -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-accent/10 to-accent-secondary/10"
      ></div>
      <div
        class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent-secondary to-accent"
      ></div>

      <div class="relative max-w-7xl mx-auto py-10 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          <div class="space-y-4 sm:col-span-2 lg:col-span-1">
            <div class="flex items-center space-x-2">
              <div
                class="w-8 h-8 bg-gradient-to-r from-accent to-accent-secondary rounded-full flex items-center justify-center"
              >
                <Icon name="heroicons:sparkles" class="w-5 h-5 text-white" />
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-[#0E1627] dark:text-white">BylotoStore</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              Tu tienda de belleza y moda femenina con los mejores productos
              seleccionados especialmente para la mujer moderna y elegante.
            </p>
            <div class="flex space-x-4">
              <a
                href="#"
                class="w-10 h-10 bg-gradient-to-r from-accent to-accent-secondary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <Icon name="heroicons:globe-alt" class="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                class="w-10 h-10 bg-gradient-to-r from-accent to-accent-secondary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <Icon name="heroicons:heart" class="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                class="w-10 h-10 bg-gradient-to-r from-accent to-accent-secondary rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <Icon name="heroicons:star" class="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 class="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-accent dark:text-accent">Productos</h4>
            <ul class="space-y-3">
              <li>
                <NuxtLink
                  to="/shop/category/1"
                  class="text-gray-600 dark:text-gray-300 hover:text-accent transition-colors flex items-center space-x-2 group"
                >
                  <Icon
                    name="heroicons:sparkles"
                    class="w-4 h-4 group-hover:scale-110 transition-transform"
                  />
                  <span>Loción</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/shop/category/2"
                  class="text-gray-600 dark:text-gray-300 hover:text-accent transition-colors flex items-center space-x-2 group"
                >
                  <Icon
                    name="heroicons:tag"
                    class="w-4 h-4 group-hover:scale-110 transition-transform"
                  />
                  <span>Ropa</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/shop/category/3"
                  class="text-gray-600 dark:text-gray-300 hover:text-accent transition-colors flex items-center space-x-2 group"
                >
                  <Icon
                    name="heroicons:eye"
                    class="w-4 h-4 group-hover:scale-110 transition-transform"
                  />
                  <span>Maquillaje</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/shop/category/4"
                  class="text-gray-600 dark:text-gray-300 hover:text-accent transition-colors flex items-center space-x-2 group"
                >
                  <Icon
                    name="heroicons:shopping-bag"
                    class="w-4 h-4 group-hover:scale-110 transition-transform"
                  />
                  <span>Bolsos</span>
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-accent dark:text-accent">Soporte</h4>
            <ul class="space-y-3">
              <li>
                <a
                  href="#"
                  class="text-gray-600 dark:text-gray-300 hover:text-accent transition-colors flex items-center space-x-2 group"
                >
                  <Icon
                    name="heroicons:envelope"
                    class="w-4 h-4 group-hover:scale-110 transition-transform"
                  />
                  <span>Contacto</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-600 dark:text-gray-300 hover:text-accent transition-colors flex items-center space-x-2 group"
                >
                  <Icon
                    name="heroicons:truck"
                    class="w-4 h-4 group-hover:scale-110 transition-transform"
                  />
                  <span>Envíos</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-600 dark:text-gray-300 hover:text-accent transition-colors flex items-center space-x-2 group"
                >
                  <Icon
                    name="heroicons:arrow-path"
                    class="w-4 h-4 group-hover:scale-110 transition-transform"
                  />
                  <span>Devoluciones</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="text-gray-600 dark:text-gray-300 hover:text-accent transition-colors flex items-center space-x-2 group"
                >
                  <Icon
                    name="heroicons:question-mark-circle"
                    class="w-4 h-4 group-hover:scale-110 transition-transform"
                  />
                  <span>FAQ</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="sm:col-span-2 lg:col-span-1">
            <h4 class="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-accent dark:text-accent">Newsletter</h4>
            <p class="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
              Suscríbete para recibir ofertas exclusivas
            </p>
            <div class="flex flex-col sm:flex-row gap-2 sm:space-x-2 sm:gap-0">
              <input
                type="email"
                placeholder="Tu email"
                class="flex-1 min-w-0 px-3 py-2 sm:px-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-[#0E1627] dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
              />
              <button
                class="px-4 py-2 bg-gradient-to-r from-accent to-accent-secondary text-white rounded-lg hover:from-accent-hover hover:to-accent-secondary transition-all duration-300 flex items-center justify-center shrink-0"
              >
                <Icon name="heroicons:paper-airplane" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-300 dark:border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            &copy; 2026 BylotoStore. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const cartStore = useCartStore?.() ?? null
const cartItemsCount = computed(() => cartStore?.count ?? 0)

// Ocultar botón de login cuando hay sesión
const authUser = useSupabaseUser()
const { logout, user } = useAuth()
/** Rol legacy "user" o compradores "customer": misma UX de tienda (carrito, ofertas, /user). */
const isShopUser = computed(() => ['user', 'customer'].includes(user.value?.role))
const isAdmin = computed(() => user.value?.role === 'admin')

// Tema
const { theme, isDark, toggleTheme, initTheme } = useTheme()
const { $themeOptimizer } = useNuxtApp()

// Usar toggle optimizado si está disponible
const optimizedToggleTheme =
  $themeOptimizer?.optimizedToggleTheme || toggleTheme

// Inicializar tema al montar
onMounted(() => {
  initTheme()
})

// Key para forzar re-renderizado cuando sea necesario
const refreshKey = ref(0)

// Detectar inactividad y forzar refresh
let lastInteraction = Date.now()
const INACTIVITY_THRESHOLD = 5 * 60 * 1000 // 5 minutos
const activityEvents = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart']

const handleUserActivity = () => {
  lastInteraction = Date.now()
}

let inactivityIntervalId = null

const checkForInactivity = () => {
  const now = Date.now()
  if (now - lastInteraction > INACTIVITY_THRESHOLD) {
    // Forzar re-render incrementando la key
    refreshKey.value++
    lastInteraction = now
  }
}

const handleWindowFocus = () => {
  refreshKey.value++
}

const handleVisibilityChange = () => {
  if (document.visibilityState === 'visible') {
    refreshKey.value++
  }
}

const handleLogout = async () => {
  try {
    console.log('🚪 Iniciando logout de usuario...')

    // 1. Deshabilitar autenticación inmediatamente
    const { $disableAuth } = useNuxtApp()
    if ($disableAuth) {
      $disableAuth()
      console.log('🚫 Auth deshabilitado')
    }

    // 2. Matar la sesión completamente
    const { $killSession } = useNuxtApp()
    if ($killSession) {
      $killSession()
      return
    }

    // 3. Fallback: usar el plugin de logout forzado
    const { $forceLogout } = useNuxtApp()
    if ($forceLogout) {
      $forceLogout()
      return
    }

    // Fallback si el plugin no está disponible
    console.log(
      '⚠️ Plugin de logout forzado no disponible, usando método alternativo'
    )

    // 1. Marcar que estamos haciendo logout para evitar redirecciones automáticas
    const { $setLoggingOut } = useNuxtApp()
    if ($setLoggingOut) {
      $setLoggingOut(true)
      console.log('🚫 Flag de logout activado')
    }

    // 2. Limpiar estado local INMEDIATAMENTE
    const { user } = useAuth()
    user.value = null
    console.log('🧹 Estado de usuario limpiado')

    // 3. Limpiar localStorage INMEDIATAMENTE
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
      console.log('🧹 localStorage limpiado (carrito preservado)')
    }

    // 4. Cerrar sesión de Supabase
    const supabase = useSupabaseClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Error cerrando sesión de Supabase:', error)
    } else {
      console.log('✅ Sesión de Supabase cerrada')
    }

    // 5. Redireccionar inmediatamente usando window.location
    console.log('🔄 Redirigiendo a /login...')
    if (typeof window !== 'undefined') {
      // Forzar redirección con timeout como backup
      window.location.href = '/login'
      setTimeout(() => {
        if (window.location.pathname !== '/login') {
          console.log('🔄 Forzando redirección...')
          window.location.replace('/login')
        }
      }, 100)
    }
  } catch (e) {
    console.error('Error en logout:', e)
    // Fallback: redirección directa
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
  }
}

// Composable para navegación de usuario
const { navigateToOffers: navToOffers, navigateToCart: navToCart } =
  useUserNavigation()

// Funciones de navegación mejoradas para usuarios
const navigateToOffers = async () => {
  // Forzar refresh antes de navegar
  refreshKey.value++
  await nextTick()

  await navToOffers()
}

const navigateToCart = async () => {
  // Forzar refresh antes de navegar
  refreshKey.value++
  await nextTick()

  await navToCart()
}

// Inicializar datos básicos
onMounted(() => {
  // Eventos para detectar actividad
  activityEvents.forEach(event => {
    document.addEventListener(event, handleUserActivity, { passive: true })
  })

  // Verificar inactividad cada minuto
  inactivityIntervalId = setInterval(checkForInactivity, 60000)

  // Forzar refresh cuando la ventana recupera el foco
  window.addEventListener('focus', handleWindowFocus)

  // Forzar refresh cuando la página se vuelve visible
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onBeforeUnmount(() => {
  // Limpiar eventos de actividad
  activityEvents.forEach(event => {
    document.removeEventListener(event, handleUserActivity)
  })

  // Limpiar intervalo de inactividad
  if (inactivityIntervalId) {
    clearInterval(inactivityIntervalId)
    inactivityIntervalId = null
  }

  // Limpiar listeners globales
  window.removeEventListener('focus', handleWindowFocus)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>
