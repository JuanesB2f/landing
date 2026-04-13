<template>
  <div class="min-h-screen theme-container py-8 sm:py-10 pb-24 md:pb-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="loading" class="flex justify-center py-24">
        <Icon name="svg-spinners:180-ring-with-bg" class="w-14 h-14 text-[var(--accent)]" />
      </div>

      <div v-else>
        <div class="ios-shop-category-header text-center">
          <div class="flex justify-center mb-5">
            <div class="ios-shop-cat-avatar">
              <img
                v-if="category?.image_url"
                :src="category.image_url"
                :alt="category?.name"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-[rgba(189,142,137,0.12)]"
              >
                <Icon name="heroicons:tag" class="w-10 h-10 text-[var(--accent)] opacity-70" />
              </div>
            </div>
          </div>
          <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight theme-text-primary mb-2">
            {{ category?.name || 'Categoría' }}
          </h1>
          <p class="text-sm sm:text-base theme-text-secondary max-w-2xl mx-auto leading-relaxed">
            {{ category?.description || 'Explora nuestros productos' }}
          </p>

          <div class="flex justify-center mt-6 -mx-1">
            <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide max-w-full px-1 py-1">
              <NuxtLink to="/shop" class="ios-shop-pill group">
                <div
                  class="ios-shop-pill-img flex items-center justify-center bg-[rgba(189,142,137,0.1)] group-hover:bg-[rgba(189,142,137,0.18)]"
                >
                  <Icon name="heroicons:squares-2x2" class="w-6 h-6 text-[var(--accent)]" />
                </div>
                <span class="text-[10px] font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] max-w-[4.5rem] truncate text-center leading-tight">
                  Todas
                </span>
              </NuxtLink>

              <NuxtLink
                v-for="cat in allCategories"
                :key="cat.id_category"
                :to="`/shop/category/${cat.id_category}`"
                class="ios-shop-pill group"
                :class="{ 'ios-shop-pill--active': cat.id_category === categoryId }"
              >
                <div class="ios-shop-pill-img">
                  <img
                    v-if="cat.image_url"
                    :src="cat.image_url"
                    :alt="cat.name"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center bg-[rgba(189,142,137,0.1)]">
                    <Icon name="heroicons:tag" class="w-5 h-5 text-[var(--accent)] opacity-70" />
                  </div>
                </div>
                <span
                  class="text-[10px] font-semibold max-w-[4.5rem] truncate text-center leading-tight transition-colors"
                  :class="cat.id_category === categoryId ? 'text-[var(--accent)]' : 'theme-text-secondary'"
                >
                  {{ cat.name }}
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <div
          v-if="products.length === 0"
          class="ios-shop-glass-empty max-w-lg mx-auto mt-8"
        >
          <Icon name="heroicons:shopping-bag" class="w-14 h-14 mx-auto theme-text-muted mb-4 opacity-50" />
          <h3 class="text-lg font-semibold theme-text-primary">No hay productos en esta categoría</h3>
          <p class="theme-text-secondary text-sm mt-2 mb-6">Vuelve pronto para ver nuevas colecciones.</p>
          <NuxtLink to="/shop" class="ios-shop-btn-primary inline-flex">
            Ver catálogo
          </NuxtLink>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          <div
            v-for="product in products"
            :key="product.id_product"
            class="ios-shop-product-card group flex flex-col"
          >
            <div class="relative h-56 sm:h-60 bg-black/5 dark:bg-white/5 overflow-hidden shrink-0">
              <img
                v-if="product.image_url"
                :src="product.image_url"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-[rgba(189,142,137,0.08)]"
              >
                <Icon name="heroicons:photo" class="w-14 h-14 text-[var(--accent)] opacity-35" />
              </div>
              <div v-if="product.stock_quantity <= 0" class="ios-shop-badge-stock">AGOTADO</div>
            </div>

            <div class="p-4 sm:p-5 flex flex-col flex-1">
              <h3
                class="font-bold text-lg theme-text-primary mb-1.5 group-hover:text-[var(--accent)] transition-colors line-clamp-2 leading-snug"
                :title="product.name"
              >
                {{ product.name }}
              </h3>
              <p class="text-sm theme-text-secondary line-clamp-2 mb-4 flex-1 min-h-[2.5rem]">
                {{ product.description }}
              </p>

              <div class="flex flex-wrap items-center justify-between gap-3 mt-auto pt-2 border-t border-[var(--ios-hairline)]">
                <span class="text-xl font-bold text-[var(--accent)] tabular-nums">
                  {{ formatCOP(product.price) }}
                </span>
                <button
                  type="button"
                  class="ios-shop-btn-primary shrink-0"
                  :disabled="product.stock_quantity <= 0"
                  @click="addToCart(product)"
                >
                  <Icon name="heroicons:shopping-cart" class="w-4 h-4" />
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="products.length > 0" class="mt-10 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            class="ios-shop-btn-secondary disabled:opacity-40 disabled:cursor-not-allowed px-6"
            :disabled="page <= 1"
            @click="prevPage"
          >
            Anterior
          </button>
          <button
            type="button"
            class="ios-shop-btn-secondary disabled:opacity-40 disabled:cursor-not-allowed px-6"
            :disabled="products.length < pageSize"
            @click="nextPage"
          >
            Siguiente
          </button>
        </div>

        <div class="text-center mt-12">
          <NuxtLink
            to="/shop"
            class="ios-shop-btn-secondary inline-flex px-8 py-3 rounded-[16px] font-semibold shadow-sm"
          >
            <Icon name="heroicons:arrow-left" class="w-5 h-5 mr-2" />
            Volver al catálogo
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
})

import { useCartStore } from '~/stores/cart'

const route = useRoute()
const categoryId = route.params.id
const { formatCOP } = useCurrency()
const cart = useCartStore()
const { $toast } = useNuxtApp()

const category = ref(null)
const allCategories = ref([])
const products = ref([])
const loading = ref(true)
const page = ref(1)
const pageSize = 12

const fetchData = async () => {
  loading.value = true
  try {
    const { data: catsData } = await $fetch('/api/categories')
    if (catsData?.success) {
      allCategories.value = catsData.data
    }

    const { data: catData } = await $fetch(`/api/categories/${categoryId}`)
    if (catData?.success) {
      category.value = catData.data

      useHead({
        title: `${catData.data.name} - BylotoStore`,
        meta: [{ name: 'description', content: catData.data.description }],
      })
    }

    const { data: prodData } = await $fetch('/api/products', {
      params: {
        category_id: categoryId,
        page: page.value,
        page_size: pageSize,
        sort: 'newest',
      },
    })

    if (prodData?.success) {
      products.value = prodData.data
    }
  } catch (e) {
    console.error('Error cargando datos:', e)
    $toast?.error('Error', 'No se pudo cargar la categoría')
  } finally {
    loading.value = false
  }
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    fetchData()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const nextPage = () => {
  page.value++
  fetchData()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const addToCart = async product => {
  const { user } = useAuth()
  if (!user.value) {
    const { setAddIntent } = useAddIntent()
    setAddIntent({
      productId: product.id_product,
      quantity: 1,
      product: {
        id_product: product.id_product,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        sku: product.sku,
      },
    })
    return navigateTo('/login')
  }

  cart.addItem({
    product_id: product.id_product,
    name: product.name,
    sku: product.sku,
    price: product.price,
    image_url: product.image_url,
  })
  $toast?.success('Agregado al carrito', `${product.name} agregado correctamente`)
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
