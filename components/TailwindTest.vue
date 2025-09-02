<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Prueba de Tailwind CSS</h2>
    <div class="space-y-4">
      <div class="flex space-x-4">
        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Botón Azul
        </button>
        <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
          Botón Verde
        </button>
        <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
          Botón Rojo
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-gray-100 p-4 rounded">
          <h3 class="font-semibold text-gray-700">Columna 1</h3>
          <p class="text-sm text-gray-600">Contenido de ejemplo</p>
        </div>
        <div class="bg-gray-100 p-4 rounded">
          <h3 class="font-semibold text-gray-700">Columna 2</h3>
          <p class="text-sm text-gray-600">Contenido de ejemplo</p>
        </div>
        <div class="bg-gray-100 p-4 rounded">
          <h3 class="font-semibold text-gray-700">Columna 3</h3>
          <p class="text-sm text-gray-600">Contenido de ejemplo</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Componente de prueba para Tailwind CSS
</script>

