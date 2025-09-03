<template>
  <div class="min-h-screen transition-colors duration-300 theme-container">
    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 z-50 w-64 shadow-lg transition-colors duration-300 theme-sidebar">
      <div class="flex items-center justify-center h-16 theme-header">
        <h1 class="text-xl font-bold transition-colors theme-text-primary text-gray-900 dark:text-white">Admin Panel</h1>
      </div>
      
      <nav class="mt-8">
        <div class="px-4 space-y-2">
          <NuxtLink 
            to="/admin" 
            class="flex items-center px-4 py-2 rounded-lg transition-colors theme-nav-item"
            :class="{ 'theme-nav-active': $route.path === '/admin' }"
          >
            <Icon name="heroicons:home" class="w-5 h-5 mr-3" />
            Dashboard
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/products" 
            class="flex items-center px-4 py-2 rounded-lg transition-colors theme-nav-item"
            :class="{ 'theme-nav-active': $route.path.startsWith('/admin/products') }"
          >
            <Icon name="heroicons:cube" class="w-5 h-5 mr-3" />
            Productos
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/categories" 
            class="flex items-center px-4 py-2 rounded-lg transition-colors theme-nav-item"
            :class="{ 'theme-nav-active': $route.path.startsWith('/admin/categories') }"
          >
            <Icon name="heroicons:tag" class="w-5 h-5 mr-3" />
            Categorías
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/inventory" 
            class="flex items-center px-4 py-2 rounded-lg transition-colors theme-nav-item"
            :class="{ 'theme-nav-active': $route.path.startsWith('/admin/inventory') }"
          >
            <Icon name="heroicons:archive-box" class="w-5 h-5 mr-3" />
            Inventario
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/providers" 
            class="flex items-center px-4 py-2 rounded-lg transition-colors theme-nav-item"
            :class="{ 'theme-nav-active': $route.path.startsWith('/admin/providers') }"
          >
            <Icon name="heroicons:truck" class="w-5 h-5 mr-3" />
            Proveedores
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/orders" 
            class="flex items-center px-4 py-2 rounded-lg transition-colors theme-nav-item"
            :class="{ 'theme-nav-active': $route.path.startsWith('/admin/orders') }"
          >
            <Icon name="heroicons:shopping-bag" class="w-5 h-5 mr-3" />
            Pedidos
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/customers" 
            class="flex items-center px-4 py-2 rounded-lg transition-colors theme-nav-item"
            :class="{ 'theme-nav-active': $route.path.startsWith('/admin/customers') }"
          >
            <Icon name="heroicons:users" class="w-5 h-5 mr-3" />
            Clientes
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/profiles" 
            class="flex items-center px-4 py-2 rounded-lg transition-colors theme-nav-item"
            :class="{ 'theme-nav-active': $route.path.startsWith('/admin/profiles') }"
          >
            <Icon name="heroicons:user-circle" class="w-5 h-5 mr-3" />
            Usuarios
          </NuxtLink>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="ml-64">
      <!-- Header -->
      <header class="shadow-sm border-b transition-colors duration-300 theme-header-bar">
        <div class="flex justify-between items-center h-16 px-6">
          <div class="flex items-center space-x-4">
            <h2 class="text-lg font-semibold transition-colors theme-text-primary">
              {{ pageTitle }}
            </h2>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- Toggle de tema -->
            <button 
              @click="toggleTheme" 
              class="p-2 rounded-lg transition-all duration-300 group theme-button"
              :title="isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
            >
              <Icon 
                :name="isDark ? 'heroicons:sun' : 'heroicons:moon'" 
                class="w-6 h-6 group-hover:scale-110 transition-transform duration-200" 
              />
            </button>
            
            <!-- Notifications -->
            <button class="p-2 rounded-lg transition-colors theme-button">
              <Icon name="heroicons:bell" class="w-6 h-6" />
            </button>
            
            <!-- User Menu -->
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center theme-user-avatar">
                <span class="text-white text-sm font-semibold">
                  {{ userInitials }}
                </span>
              </div>
              <div>
                <p class="text-sm font-medium transition-colors theme-text-primary">{{ userName }}</p>
                <p class="text-xs transition-colors theme-text-secondary">{{ userRole }}</p>
              </div>
              <button @click="handleLogout" class="p-2 rounded-lg transition-colors theme-button">
                <Icon name="heroicons:arrow-right-on-rectangle" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

// Composable para manejar el tema
const { isDark, toggleTheme } = useTheme()
// Composable de autenticación
const { logout } = useAuth()

const pageTitle = computed(() => {
  const titles = {
    '/dashboard': 'Dashboard',
    '/admin': 'Dashboard',
    '/admin/products': 'Gestión de Productos',
    '/admin/categories': 'Gestión de Categorías',
    '/admin/inventory': 'Gestión de Inventario',
    '/admin/providers': 'Gestión de Proveedores',
    '/admin/orders': 'Gestión de Pedidos',
    '/admin/customers': 'Gestión de Clientes',
    '/admin/profiles': 'Gestión de Usuarios'
  }
  return titles[route.path] || 'Administración'
})

const userInitials = ref('AD')
const userName = ref('Administrador')
const userRole = ref('Admin')

const handleLogout = async () => {
  try {
    await logout()
  } catch (e) {
    console.error('Error al cerrar sesión:', e)
  }
}
</script>


