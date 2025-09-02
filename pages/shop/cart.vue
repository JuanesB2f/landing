<template>
  <div class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Carrito de Compras</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm">
            <div class="p-6 border-b">
              <h2 class="text-lg font-semibold text-gray-900">Productos (3)</h2>
            </div>
            
            <!-- Cart Item 1 -->
            <div class="p-6 border-b">
              <div class="flex items-center space-x-4">
                <div class="w-20 h-20 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg flex items-center justify-center">
                  <Icon name="heroicons:sparkles" class="w-8 h-8 text-pink-500" />
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900">Loción Hidratante</h3>
                  <p class="text-gray-600 text-sm">Hidratación profunda para tu piel</p>
                  <div class="flex items-center space-x-4 mt-2">
                    <div class="flex items-center border border-gray-300 rounded-lg">
                      <button class="px-3 py-1 hover:bg-gray-100">-</button>
                      <span class="px-3 py-1">1</span>
                      <button class="px-3 py-1 hover:bg-gray-100">+</button>
                    </div>
                    <span class="text-lg font-bold text-pink-600">$29.99</span>
                  </div>
                </div>
                <button class="text-red-500 hover:text-red-700">
                  <Icon name="heroicons:trash" class="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <!-- Cart Item 2 -->
            <div class="p-6 border-b">
              <div class="flex items-center space-x-4">
                <div class="w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center">
                  <Icon name="heroicons:tag" class="w-8 h-8 text-purple-500" />
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900">Vestido Elegante</h3>
                  <p class="text-gray-600 text-sm">Diseño moderno y sofisticado</p>
                  <div class="flex items-center space-x-4 mt-2">
                    <div class="flex items-center border border-gray-300 rounded-lg">
                      <button class="px-3 py-1 hover:bg-gray-100">-</button>
                      <span class="px-3 py-1">1</span>
                      <button class="px-3 py-1 hover:bg-gray-100">+</button>
                    </div>
                    <span class="text-lg font-bold text-pink-600">$89.99</span>
                  </div>
                </div>
                <button class="text-red-500 hover:text-red-700">
                  <Icon name="heroicons:trash" class="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <!-- Cart Item 3 -->
            <div class="p-6">
              <div class="flex items-center space-x-4">
                <div class="w-20 h-20 bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg flex items-center justify-center">
                  <Icon name="heroicons:eye" class="w-8 h-8 text-pink-500" />
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900">Paleta de Sombras</h3>
                  <p class="text-gray-600 text-sm">Colores vibrantes y duraderos</p>
                  <div class="flex items-center space-x-4 mt-2">
                    <div class="flex items-center border border-gray-300 rounded-lg">
                      <button class="px-3 py-1 hover:bg-gray-100">-</button>
                      <span class="px-3 py-1">2</span>
                      <button class="px-3 py-1 hover:bg-gray-100">+</button>
                    </div>
                    <span class="text-lg font-bold text-pink-600">$91.98</span>
                  </div>
                </div>
                <button class="text-red-500 hover:text-red-700">
                  <Icon name="heroicons:trash" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Resumen del Pedido</h2>
            
            <div class="space-y-3 mb-6">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-semibold">$211.96</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Envío</span>
                <span class="font-semibold text-green-600">Gratis</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Impuestos</span>
                <span class="font-semibold">$21.20</span>
              </div>
              <div class="border-t pt-3">
                <div class="flex justify-between">
                  <span class="text-lg font-bold text-gray-900">Total</span>
                  <span class="text-lg font-bold text-pink-600">$233.16</span>
                </div>
              </div>
            </div>
            
            <button class="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
              Proceder al Pago
            </button>
            
            <div class="mt-4 text-center">
              <NuxtLink to="/shop" class="text-pink-600 hover:text-pink-700 text-sm">
                Continuar Comprando
              </NuxtLink>
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


