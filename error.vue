<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <div class="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="heroicons:exclamation-triangle" class="w-12 h-12 text-white" />
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          <span class="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {{ error.statusCode }}
          </span>
        </h1>
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">
          {{ error.statusMessage }}
        </h2>
        <p class="text-gray-600 mb-8">
          {{ error.message || 'Algo salió mal. Por favor, intenta de nuevo.' }}
        </p>
      </div>
      
      <div class="space-y-4">
        <button 
          @click="handleError"
          class="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Intentar de Nuevo
        </button>
        
        <NuxtLink 
          to="/"
          class="block w-full border-2 border-pink-500 text-pink-600 px-6 py-3 rounded-full font-medium hover:bg-pink-500 hover:text-white transition-all duration-300"
        >
          Volver al Inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const error = useError()

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>


