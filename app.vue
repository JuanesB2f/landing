<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
// Configuración global de la aplicación
useHead({
  title: 'BeautyStore - Tu E-commerce Femenino',
  meta: [
    { name: 'description', content: 'Tu tienda de belleza y moda femenina con los mejores productos seleccionados especialmente para la mujer moderna y elegante.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})
</script>

<style>
/* Estilos globales adicionales si son necesarios */
</style>

