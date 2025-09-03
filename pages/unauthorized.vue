<template>
  <div class="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
      <!-- Icono de acceso denegado -->
      <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
        <Icon name="heroicons:shield-exclamation" class="h-8 w-8 text-red-600" />
      </div>
      
      <!-- Título y mensaje -->
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Acceso Denegado</h1>
      <p class="text-gray-600 mb-6">
        No tienes permisos para acceder a esta página. Solo los administradores pueden acceder al panel de administración.
      </p>
      
      <!-- Botones de acción -->
      <div class="space-y-3">
        <button
          @click="goToHome"
          class="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Ir al Inicio
        </button>
        
        <button
          @click="goToLogin"
          class="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Iniciar Sesión
        </button>
      </div>
      
      <!-- Información adicional -->
      <div class="mt-6 p-4 bg-gray-50 rounded-lg">
        <p class="text-sm text-gray-500">
          Si crees que esto es un error, contacta al administrador del sistema.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const goToHome = () => {
  navigateTo('/')
}

const goToLogin = () => {
  navigateTo('/login')
}
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-1000 {
  animation-delay: 1s;
}
</style>


