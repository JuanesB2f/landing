<template>
  <div class="min-h-screen theme-login-bg">

    <!-- ── Hero ── -->
    <section class="relative py-14 sm:py-20 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div class="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-accent-soft dark:bg-accent/20 rounded-full mb-5 animate-fade-in-up">
          <Icon name="heroicons:sparkles" class="w-4 h-4 text-accent" />
          <span class="text-sm font-semibold text-accent">Catálogo 2026</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight animate-fade-in-up animation-delay-200 text-[#0E1627] dark:text-gray-100">
          Nuestra <span class="text-[#6b3d38] dark:text-[#F4E1E0]">Colección</span>
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto mb-8 animate-fade-in-up animation-delay-400">
          Elige una categoría y descubre los productos hechos para ti
        </p>

        <!-- Buscador de categorías -->
        <div class="max-w-md mx-auto relative animate-fade-in-up animation-delay-600">
          <Icon
            name="heroicons:magnifying-glass"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
          />
          <input
            v-model="search"
            type="text"
            placeholder="Buscar categoría..."
            class="w-full pl-12 pr-11 py-3.5 rounded-2xl bg-white dark:bg-bg-card border border-gray-200 dark:border-border-color shadow-lg focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 text-sm transition-all"
          />
          <button
            v-if="search"
            @click="search = ''"
            class="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-gray-400 hover:text-accent hover:bg-accent-soft dark:hover:bg-accent/10 transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <Icon name="heroicons:x-mark" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>

    <!-- ── Categorías ── -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-24 gap-4">
        <Icon name="svg-spinners:180-ring-with-bg" class="w-12 h-12 text-accent" />
        <p class="text-gray-400 text-sm">Cargando categorías...</p>
      </div>

      <!-- Sin categorías -->
      <div v-else-if="categories.length === 0" class="text-center py-24">
        <div class="w-24 h-24 bg-accent-soft dark:bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <Icon name="heroicons:tag" class="w-12 h-12 text-accent opacity-50" />
        </div>
        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Aún no hay categorías</h3>
        <p class="text-gray-400 mt-2">Vuelve pronto para ver nuestra colección</p>
      </div>

      <!-- Sin resultados de búsqueda -->
      <div v-else-if="filteredCategories.length === 0" class="text-center py-24">
        <div class="w-24 h-24 bg-accent-soft dark:bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <Icon name="heroicons:magnifying-glass" class="w-12 h-12 text-accent opacity-50" />
        </div>
        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Sin resultados</h3>
        <p class="text-gray-400 mb-5">No hay categorías que coincidan con "<span class="text-accent font-medium">{{ search }}</span>"</p>
        <button
          @click="search = ''"
          class="px-5 py-2.5 bg-gradient-to-r from-accent to-accent-secondary text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Ver todas las categorías
        </button>
      </div>

      <!-- Grid de categorías -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6 animate-fade-in-up animation-delay-600">
        <NuxtLink
          v-for="cat in filteredCategories"
          :key="cat.id_category"
          :to="`/shop/category/${cat.id_category}`"
          class="group flex flex-col items-center gap-3 focus:outline-none"
        >
          <!-- Imagen de la categoría -->
          <div class="w-full aspect-square rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-border-color bg-accent-soft dark:bg-accent/10 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-accent/30">
            <img
              v-if="cat.image_url"
              :src="cat.image_url"
              :alt="cat.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div v-else class="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
              <Icon name="heroicons:tag" class="w-10 h-10 text-accent opacity-60" />
            </div>
          </div>

          <!-- Nombre + contador -->
          <div class="text-center w-full">
            <p class="font-semibold text-sm text-gray-800 dark:text-gray-100 group-hover:text-accent transition-colors duration-200 truncate px-1">
              {{ cat.name }}
            </p>
            <p v-if="cat.product_count" class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {{ cat.product_count }} producto{{ cat.product_count !== 1 ? 's' : '' }}
            </p>
          </div>
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
})

const categories = ref([])
const loading = ref(true)
const search = ref('')

const filteredCategories = computed(() => {
  if (!search.value.trim()) return categories.value
  const q = search.value.trim().toLowerCase()
  return categories.value.filter(cat =>
    cat.name.toLowerCase().includes(q) ||
    (cat.description && cat.description.toLowerCase().includes(q))
  )
})

const fetchCategories = async () => {
  loading.value = true
  try {
    const { data } = await $fetch('/api/categories')
    if (data?.success) {
      categories.value = data.data
    }
  } catch (e) {
    console.error('Error cargando categorías:', e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translate3d(0, 30px, 0); }
  to   { opacity: 1; transform: translate3d(0, 0, 0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.7s ease-out both;
  will-change: transform, opacity;
}
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-600 { animation-delay: 0.6s; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up, .animate-blob {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
