<template>
  <div class="min-h-screen theme-container pb-24 md:pb-16">
    <!-- Hero -->
    <section class="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-90">
        <div
          class="absolute -top-32 -right-32 w-72 h-72 rounded-full blur-3xl"
          style="background: radial-gradient(circle, rgba(189, 142, 137, 0.35) 0%, transparent 70%)"
        />
        <div
          class="absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-3xl"
          style="background: radial-gradient(circle, rgba(176, 160, 214, 0.28) 0%, transparent 70%)"
        />
      </div>

      <div class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="ios-shop-hero-panel mb-5 animate-fade-in-up">
          <Icon name="heroicons:sparkles" class="w-4 h-4 text-[var(--accent)] shrink-0" />
          <span>Catálogo</span>
        </div>
        <h1
          class="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 leading-tight tracking-tight animate-fade-in-up animation-delay-200 theme-text-primary"
        >
          Nuestra <span class="text-[var(--accent)]">colección</span>
        </h1>
        <p
          class="text-base sm:text-lg theme-text-secondary max-w-lg mx-auto mb-8 animate-fade-in-up animation-delay-400"
        >
          Elige una categoría y descubre productos pensados para ti.
        </p>

        <div class="ios-shop-search animate-fade-in-up animation-delay-600">
          <Icon
            name="heroicons:magnifying-glass"
            class="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 theme-text-muted pointer-events-none z-10"
          />
          <input
            v-model="search"
            type="text"
            placeholder="Buscar categoría…"
            class="ios-shop-search-input"
          />
          <button
            v-if="search"
            type="button"
            class="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
            aria-label="Limpiar búsqueda"
            @click="search = ''"
          >
            <Icon name="heroicons:x-mark" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>

    <!-- Categorías -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="loading" class="flex flex-col items-center justify-center py-24 gap-4">
        <Icon name="svg-spinners:180-ring-with-bg" class="w-12 h-12 text-[var(--accent)]" />
        <p class="text-sm theme-text-secondary">Cargando categorías…</p>
      </div>

      <div v-else-if="categories.length === 0" class="ios-shop-glass-empty max-w-md mx-auto">
        <div
          class="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-[rgba(189,142,137,0.15)] border border-[var(--ios-hairline)]"
        >
          <Icon name="heroicons:tag" class="w-8 h-8 text-[var(--accent)] opacity-80" />
        </div>
        <h3 class="text-lg font-semibold theme-text-primary">Aún no hay categorías</h3>
        <p class="theme-text-secondary text-sm mt-2">Vuelve pronto para ver la colección.</p>
      </div>

      <div v-else-if="filteredCategories.length === 0" class="ios-shop-glass-empty max-w-md mx-auto">
        <div
          class="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-[rgba(189,142,137,0.12)] border border-[var(--ios-hairline)]"
        >
          <Icon name="heroicons:magnifying-glass" class="w-8 h-8 text-[var(--accent)] opacity-80" />
        </div>
        <h3 class="text-lg font-semibold theme-text-primary mb-2">Sin resultados</h3>
        <p class="theme-text-secondary text-sm mb-5">
          No hay categorías que coincidan con «<span class="text-[var(--accent)] font-medium">{{ search }}</span>».
        </p>
        <button type="button" class="ios-shop-btn-primary px-6" @click="search = ''">
          Ver todas las categorías
        </button>
      </div>

      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 animate-fade-in-up animation-delay-600">
        <NuxtLink
          v-for="cat in filteredCategories"
          :key="cat.id_category"
          :to="`/shop/category/${cat.id_category}`"
          class="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 rounded-[22px]"
        >
          <div class="ios-shop-cat-card h-full flex flex-col">
            <div class="ios-shop-cat-thumb">
              <img
                v-if="cat.image_url"
                :src="cat.image_url"
                :alt="cat.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div v-else class="w-full h-full flex flex-col items-center justify-center gap-2 p-4 min-h-[8rem]">
                <Icon name="heroicons:tag" class="w-10 h-10 text-[var(--accent)] opacity-55" />
              </div>
            </div>
            <div class="text-center px-2 py-3 flex-1 flex flex-col justify-center">
              <p
                class="font-semibold text-sm theme-text-primary group-hover:text-[var(--accent)] transition-colors truncate px-0.5"
              >
                {{ cat.name }}
              </p>
              <p v-if="cat.product_count" class="text-xs theme-text-muted mt-0.5">
                {{ cat.product_count }} producto{{ cat.product_count !== 1 ? 's' : '' }}
              </p>
            </div>
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
  return categories.value.filter(
    cat =>
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
  from {
    opacity: 0;
    transform: translate3d(0, 24px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.65s ease-out both;
  will-change: transform, opacity;
}
.animation-delay-200 {
  animation-delay: 0.15s;
}
.animation-delay-400 {
  animation-delay: 0.28s;
}
.animation-delay-600 {
  animation-delay: 0.42s;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
