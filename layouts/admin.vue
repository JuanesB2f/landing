<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
      <div class="flex items-center justify-center h-16 bg-pink-600">
        <h1 class="text-xl font-bold text-white">Admin Panel</h1>
      </div>
      
      <nav class="mt-8">
        <div class="px-4 space-y-2">
          <NuxtLink 
            to="/admin" 
            class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors"
            :class="{ 'bg-pink-50 text-pink-600': $route.path === '/admin' }"
          >
            <Icon name="heroicons:home" class="w-5 h-5 mr-3" />
            Dashboard
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/products" 
            class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors"
            :class="{ 'bg-pink-50 text-pink-600': $route.path.startsWith('/admin/products') }"
          >
            <Icon name="heroicons:cube" class="w-5 h-5 mr-3" />
            Productos
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/categories" 
            class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors"
            :class="{ 'bg-pink-50 text-pink-600': $route.path.startsWith('/admin/categories') }"
          >
            <Icon name="heroicons:tag" class="w-5 h-5 mr-3" />
            Categorías
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/inventory" 
            class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors"
            :class="{ 'bg-pink-50 text-pink-600': $route.path.startsWith('/admin/inventory') }"
          >
            <Icon name="heroicons:archive-box" class="w-5 h-5 mr-3" />
            Inventario
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/providers" 
            class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors"
            :class="{ 'bg-pink-50 text-pink-600': $route.path.startsWith('/admin/providers') }"
          >
            <Icon name="heroicons:truck" class="w-5 h-5 mr-3" />
            Proveedores
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/orders" 
            class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors"
            :class="{ 'bg-pink-50 text-pink-600': $route.path.startsWith('/admin/orders') }"
          >
            <Icon name="heroicons:shopping-bag" class="w-5 h-5 mr-3" />
            Pedidos
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/customers" 
            class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors"
            :class="{ 'bg-pink-50 text-pink-600': $route.path.startsWith('/admin/customers') }"
          >
            <Icon name="heroicons:users" class="w-5 h-5 mr-3" />
            Clientes
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/profiles" 
            class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors"
            :class="{ 'bg-pink-50 text-pink-600': $route.path.startsWith('/admin/profiles') }"
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
      <header class="bg-white shadow-sm border-b">
        <div class="flex justify-between items-center h-16 px-6">
          <div class="flex items-center space-x-4">
            <h2 class="text-lg font-semibold text-gray-900">
              {{ pageTitle }}
            </h2>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button class="text-gray-500 hover:text-gray-700">
              <Icon name="heroicons:bell" class="w-6 h-6" />
            </button>
            
            <!-- User Menu -->
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-semibold">
                  {{ userInitials }}
                </span>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ userName }}</p>
                <p class="text-xs text-gray-500">{{ userRole }}</p>
              </div>
              <button @click="logout" class="text-gray-500 hover:text-gray-700">
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

const logout = () => {
  // Implementar logout
  console.log('Logout')
}
</script>


