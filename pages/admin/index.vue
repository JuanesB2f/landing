<template>
  <div class="space-y-8">
    <section>
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p class="text-gray-600">Gestiona tu negocio desde un solo lugar</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-2xl border p-6 hover:bg-gray-50 transition-colors duration-300 group">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Usuarios</p>
              <p class="text-3xl font-bold text-gray-900">0</p>
              <p class="text-green-600 text-sm mt-1">+12% este mes</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border p-6 hover:bg-gray-50 transition-colors duration-300 group">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Productos</p>
              <p class="text-3xl font-bold text-gray-900">0</p>
              <p class="text-green-600 text-sm mt-1">+8% este mes</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border p-6 hover:bg-gray-50 transition-colors duration-300 group">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Órdenes</p>
              <p class="text-3xl font-bold text-gray-900">0</p>
              <p class="text-yellow-600 text-sm mt-1">+5% este mes</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duración-300">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl border p-6 hover:bg-gray-50 transition-colors duration-300 group">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Ingresos</p>
              <p class="text-3xl font-bold text-gray-900">$0</p>
              <p class="text-green-600 text-sm mt-1">+15% este mes</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl border p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Actividad Reciente</h3>
        <div class="space-y-4">
          <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <div>
              <p class="text-gray-900 text-sm font-medium">Nuevo producto agregado</p>
              <p class="text-gray-500 text-xs">Hace 2 horas</p>
            </div>
          </div>

          <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div>
              <p class="text-gray-900 text-sm font-medium">Nuevo usuario registrado</p>
              <p class="text-gray-500 text-xs">Hace 4 horas</p>
            </div>
          </div>

          <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div>
              <p class="text-gray-900 text-sm font-medium">Nueva orden recibida</p>
              <p class="text-gray-500 text-xs">Hace 6 horas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

const { user } = useAuth()
const userProfile = computed(() => user.value)
</script>
