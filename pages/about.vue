<template>
  <div class="py-6 sm:py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Hero Section -->
      <div class="text-center mb-8 sm:mb-12">
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-2">Sobre Nosotros</h1>
        <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2">
          BylotoStore es tu destino preferido para productos de belleza y moda femenina. 
          Nos dedicamos a ofrecer productos de alta calidad con un servicio excepcional.
        </p>
      </div>

      <!-- Mission & Vision -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
        <div class="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <div class="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <Icon name="heroicons:heart" class="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" />
          </div>
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Nuestra Misión</h3>
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Empoderar a las mujeres a través de productos de belleza y moda de alta calidad, 
            ofreciendo una experiencia de compra única y personalizada.
          </p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <div class="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <Icon name="heroicons:eye" class="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
          </div>
          <h3 class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Nuestra Visión</h3>
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Ser la tienda líder en belleza y moda femenina, reconocida por la calidad de 
            nuestros productos y la excelencia en el servicio al cliente.
          </p>
        </div>
      </div>

      <!-- Values -->
      <div class="mb-8 sm:mb-12">
        <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6 sm:mb-8 px-2">Nuestros Valores</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div class="text-center p-4">
            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Icon name="heroicons:star" class="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" />
            </div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Calidad</h3>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">Solo ofrecemos productos de la más alta calidad</p>
          </div>
          
          <div class="text-center p-4">
            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Icon name="heroicons:shield-check" class="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Confianza</h3>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">Construimos relaciones duraderas con nuestros clientes</p>
          </div>
          
          <div class="text-center p-4">
            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Icon name="heroicons:sparkles" class="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" />
            </div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">Innovación</h3>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300">Siempre buscamos las últimas tendencias y productos</p>
          </div>
        </div>
      </div>

      <!-- Team -->
      <div class="mb-8 sm:mb-12">
        <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6 sm:mb-8 px-2">Nuestro Equipo</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div class="text-center p-4">
            <div class="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Icon name="heroicons:user" class="w-12 h-12 sm:w-16 sm:h-16 text-pink-500" />
            </div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">María García</h3>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2">CEO & Fundadora</p>
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Más de 10 años de experiencia en el sector de la belleza</p>
          </div>
          
          <div class="text-center p-4">
            <div class="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Icon name="heroicons:user" class="w-12 h-12 sm:w-16 sm:h-16 text-purple-500" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Ana Rodríguez</h3>
            <p class="text-gray-600 mb-2">Directora de Compras</p>
            <p class="text-sm text-gray-500">Especialista en selección de productos de calidad</p>
          </div>
          
          <div class="text-center">
            <div class="w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:user" class="w-16 h-16 text-pink-500" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Laura Martínez</h3>
            <p class="text-gray-600 mb-2">Directora de Atención al Cliente</p>
            <p class="text-sm text-gray-500">Comprometida con la satisfacción del cliente</p>
          </div>
        </div>
      </div>

      <!-- Contact -->
      <div class="bg-white p-8 rounded-lg shadow-sm">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-8">Contáctanos</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Información de Contacto</h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:envelope" class="w-5 h-5 text-pink-600" />
                <span class="text-gray-600">info@beautystore.com</span>
              </div>
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:phone" class="w-5 h-5 text-pink-600" />
                <span class="text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div class="flex items-center space-x-3">
                <Icon name="heroicons:map-pin" class="w-5 h-5 text-pink-600" />
                <span class="text-gray-600">123 Beauty Street, Fashion City</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Horarios de Atención</h3>
            <div class="space-y-2 text-gray-600">
              <p>Lunes - Viernes: 9:00 AM - 8:00 PM</p>
              <p>Sábados: 10:00 AM - 6:00 PM</p>
              <p>Domingos: 12:00 PM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>


