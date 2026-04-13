<template>
  <div class="min-h-screen w-full max-w-full min-w-0 overflow-x-hidden theme-container">
    <!-- VISTA CUSTOMER (Lookbook) -->
    <div v-if="isCustomer" class="pb-24 relative w-full max-w-full min-w-0">
      <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-80">
        <div
          class="absolute -top-32 right-0 w-80 h-80 rounded-full blur-3xl"
          style="background: radial-gradient(circle, rgba(189, 142, 137, 0.28) 0%, transparent 70%)"
        />
        <div
          class="absolute bottom-0 -left-20 w-72 h-72 rounded-full blur-3xl"
          style="background: radial-gradient(circle, rgba(176, 160, 214, 0.22) 0%, transparent 70%)"
        />
      </div>

      <div
        class="relative mx-3 sm:mx-4 mt-2 h-[34vh] min-h-[240px] sm:h-[38vh] sm:min-h-[280px] overflow-hidden rounded-[28px] border border-[var(--ios-hairline)] shadow-[0_12px_48px_rgba(0,0,0,0.12)]"
      >
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
          class="absolute inset-0 w-full h-full object-cover"
          alt="Colección"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10 z-10" />
        <div
          class="absolute inset-0 z-20 flex flex-col items-center justify-end text-center px-4 pb-8 sm:pb-10 text-white"
        >
          <p
            class="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.2em] opacity-90 mb-2"
          >
            BylotoStore
          </p>
          <h1
            class="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2 sm:mb-3 animate-fade-in-up px-2"
          >
            Colección exclusiva
          </h1>
          <p
            class="text-sm sm:text-base max-w-xl opacity-95 leading-relaxed animate-fade-in-up animation-delay-200 px-2"
          >
            Tendencias seleccionadas para ti. Disponibles en nuestra boutique.
          </p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto w-full min-w-0 px-3 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-30">
        <div v-if="loading" class="flex justify-center py-20">
          <Icon name="svg-spinners:180-ring-with-bg" class="w-12 h-12 text-[var(--accent)]" />
        </div>

        <div v-else-if="offers.length === 0" class="ios-shop-glass-empty max-w-md mx-auto">
          <Icon name="heroicons:sparkles" class="w-14 h-14 mx-auto text-[var(--accent)] opacity-70 mb-4" />
          <h3 class="text-lg font-semibold theme-text-primary">Próximamente</h3>
          <p class="theme-text-secondary text-sm mt-2">Estamos preparando nuevas ofertas exclusivas para ti.</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 animate-fade-in-up animation-delay-200">
          <div
            v-for="offer in offers"
            :key="offer.id_offer"
            class="ios-shop-offer-hero-card group"
          >
            <div class="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent z-10 pointer-events-none"
              />
              <img
                v-if="offer.product?.image_url"
                :src="offer.product.image_url"
                :alt="offer.product?.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-black/5">
                <Icon name="heroicons:photo" class="w-16 h-16 theme-text-muted opacity-40" />
              </div>

              <div class="absolute top-3 right-3 z-20">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-[var(--accent)] bg-white/92 dark:bg-black/50 backdrop-blur-md border border-[var(--ios-hairline)] shadow-sm"
                >
                  −{{ offer.discount_percent }}% OFF
                </span>
              </div>

              <div
                class="absolute bottom-0 left-0 w-full p-4 sm:p-5 z-20 text-white"
              >
                <h3 class="text-lg sm:text-xl font-bold mb-1 line-clamp-2 leading-snug">
                  {{ offer.product?.name }}
                </h3>
                <p class="text-xs sm:text-sm opacity-90 mb-3 line-clamp-2">
                  {{ offer.product?.description || 'Producto exclusivo' }}
                </p>

                <div class="flex items-center justify-between gap-3 border-t border-white/25 pt-3">
                  <div class="flex flex-col min-w-0">
                    <span class="text-xs opacity-75 line-through">{{
                      formatCOP(offer.product?.price)
                    }}</span>
                    <span class="text-lg sm:text-xl font-bold text-white tabular-nums">
                      {{
                        formatCOP(
                          discountedPrice(offer.product?.price, offer.discount_percent)
                        )
                      }}
                    </span>
                  </div>
                  <div
                    class="flex items-center shrink-0 text-[0.7rem] font-semibold uppercase tracking-wide bg-white/18 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/20"
                  >
                    <Icon name="heroicons:map-pin" class="w-3.5 h-3.5 mr-1 opacity-90" />
                    Boutique
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- VISTA USER (ofertas + carrito) -->
    <div v-else class="max-w-6xl mx-auto w-full min-w-0 px-3 py-5 sm:p-6 pb-24 md:pb-8">
      <div class="ios-shop-user-toolbar mb-6">
        <div class="min-w-0">
          <h1 class="text-xl sm:text-2xl font-bold tracking-tight theme-text-primary">Mis ofertas</h1>
          <NuxtLink
            to="/user/orders"
            class="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-[var(--accent)] hover:opacity-90 transition-opacity"
          >
            <Icon name="heroicons:clipboard-document-list" class="w-4 h-4 shrink-0" />
            Ver mis pedidos
          </NuxtLink>
        </div>
        <NuxtLink
          to="/shop/cart"
          class="ios-shop-btn-primary w-full sm:w-auto justify-center shrink-0"
        >
          <Icon name="heroicons:shopping-cart" class="w-5 h-5 shrink-0" />
          Carrito ({{ cart.count }})
        </NuxtLink>
      </div>

      <div v-if="loading" class="flex justify-center py-16">
        <Icon name="svg-spinners:180-ring-with-bg" class="w-11 h-11 text-[var(--accent)]" />
      </div>

      <div v-else>
        <div v-if="offers.length === 0" class="ios-shop-glass-empty max-w-lg mx-auto">
          <Icon name="heroicons:shopping-bag" class="w-12 h-12 mx-auto theme-text-muted opacity-50 mb-3" />
          <p class="theme-text-secondary text-sm">No hay ofertas disponibles por el momento.</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <div
            v-for="offer in offers"
            :key="offer.id_offer"
            class="ios-shop-product-card flex flex-col overflow-hidden"
          >
            <div class="relative h-44 sm:h-48 overflow-hidden shrink-0 bg-black/5">
              <img
                v-if="offer.product?.image_url"
                :src="offer.product.image_url"
                :alt="offer.product?.name"
                class="h-full w-full object-cover"
              />
              <div v-else class="h-full w-full flex items-center justify-center bg-[rgba(189,142,137,0.1)]">
                <Icon name="heroicons:sparkles" class="w-14 h-14 text-[var(--accent)] opacity-45" />
              </div>
              <div
                class="absolute top-2.5 right-2.5 text-[0.65rem] font-bold px-2.5 py-1 rounded-lg text-white bg-[var(--accent)] shadow-md"
              >
                −{{ offer.discount_percent }}%
              </div>
            </div>
            <div class="p-4 flex flex-col flex-1">
              <h3 class="text-base sm:text-lg font-semibold theme-text-primary line-clamp-1 mb-0.5">
                {{ offer.product?.name }}
              </h3>
              <p class="text-xs theme-text-muted mb-3">SKU: {{ offer.product?.sku }}</p>

              <div class="flex items-center justify-between gap-2 mb-4">
                <div class="flex flex-col min-w-0">
                  <span
                    v-if="offer.product?.price"
                    class="text-xs theme-text-muted line-through"
                  >
                    {{ formatCOP(offer.product.price) }}
                  </span>
                  <span class="text-lg font-bold text-[var(--accent)] truncate tabular-nums">
                    {{
                      formatCOP(
                        discountedPrice(offer.product?.price, offer.discount_percent)
                      )
                    }}
                  </span>
                </div>
              </div>

              <div
                class="pt-3 mt-auto flex flex-wrap items-center gap-2 border-t border-[var(--ios-hairline)]"
              >
                <input
                  v-model.number="quantities[offer.id_offer]"
                  type="number"
                  min="1"
                  :max="offer.product?.stock_quantity || 1"
                  class="w-16 px-2 py-2 text-center text-sm rounded-xl border border-[var(--ios-hairline)] bg-white/60 dark:bg-white/5 theme-text-primary focus:ring-2 focus:ring-[var(--accent)]/30 focus:outline-none"
                />
                <button
                  type="button"
                  class="ios-shop-btn-primary flex-1 min-w-0"
                  @click="addToCart(offer)"
                >
                  <Icon name="heroicons:plus" class="w-4 h-4 shrink-0" />
                  Agregar
                </button>
              </div>

              <div
                v-if="offer.product?.stock_quantity <= 0"
                class="text-xs text-red-600 dark:text-red-400 font-medium flex items-center mt-2"
              >
                <Icon name="heroicons:exclamation-circle" class="w-3.5 h-3.5 mr-1" />
                Agotado
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'user-only',
  key: route => `user-${route.fullPath}`,
})

const loading = ref(true)
const offers = ref([])
const { formatCOP } = useCurrency()
import { useCartStore } from '~/stores/cart'
const cart = useCartStore()
const quantities = reactive({})
const myReservations = ref([])
const { consumeAddIntent } = useAddIntent()
const router = useRouter()
const { user } = useAuth()
const isCustomer = computed(() => user.value?.role === 'customer')

const discountedPrice = (price, percent) => {
  if (!price) return 0
  return Math.round(Number(price) * (1 - Number(percent || 0) / 100))
}

const fetchOffers = async () => {
  loading.value = true
  try {
    const { data } = await $fetch('/api/offers/active')
    if (data?.success) {
      offers.value = data.data
    }
  } catch (e) {
    console.error('Error cargando ofertas:', e)
  } finally {
    loading.value = false
  }
}

const loadMyReservations = async () => {
  try {
    const { data } = await $fetch('/api/reservations/my')
    if (data?.success)
      myReservations.value = Array.isArray(data.data) ? data.data : []
  } catch (e) {
    console.error('Error cargando reservas', e)
  }
}

const reservationStatus = productId => {
  const list = myReservations.value
    .filter(r => r.product_id === productId)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  return list[0]?.status || null
}

const badgeClass = status => {
  const map = {
    pending: 'bg-yellow-100 text-yellow-800',
    converted: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return map[status] || 'bg-gray-100 text-gray-800'
}

const badgeText = status =>
  ({ pending: 'Pendiente', converted: 'Aprobado', cancelled: 'Cancelado' }[
    status
  ] || 'Estado')

const addToCart = async offer => {
  const p = offer?.product
  if (!p) return
  const qty = Math.max(1, Number(quantities[offer.id_offer] || 1))
  if (p.stock_quantity !== undefined && qty > Number(p.stock_quantity)) {
    alert('No hay más disponibles')
    return
  }
  const ok = true
  const priceNow = discountedPrice(p.price, offer.discount_percent)
  cart.addItem(
    {
      product_id: p.id_product,
      name: p.name,
      sku: p.sku,
      price: priceNow,
      image_url: p.image_url || null,
    },
    qty
  )
  try {
    await $fetch('/api/reservations', {
      method: 'POST',
      body: { product_id: p.id_product, quantity: qty },
    })
    const { $toast } = useNuxtApp()
    $toast?.success('Agregado al carrito', `${qty} x ${p.name}`)
  } catch (e) {
    console.error('No se pudo crear reserva', e)
  }
}

const reloadData = async () => {
  console.log('🔄 Recargando datos de usuario tras reactivación...')
  await Promise.all([fetchOffers(), loadMyReservations()])
}

let lastDataLoad = Date.now()
const DATA_RELOAD_THRESHOLD = 5 * 60 * 1000

const checkDataReload = () => {
  const now = Date.now()
  if (now - lastDataLoad > DATA_RELOAD_THRESHOLD) {
    reloadData()
    lastDataLoad = now
  }
}

onMounted(async () => {
  await Promise.all([fetchOffers(), loadMyReservations()])
  lastDataLoad = Date.now()

  const intent = consumeAddIntent()
  if (intent?.productId) {
    const offer = offers.value.find(
      o => o.product?.id_product === intent.productId
    )
    if (offer && intent.quantity && intent.quantity > 0) {
      quantities[offer.id_offer] = intent.quantity
      await addToCart(offer)
      try {
        await router.push('/shop/cart')
      } catch (_e) {}
    }
  }

  window.addEventListener('focus', checkDataReload, { passive: true })
  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.visibilityState === 'visible') {
        checkDataReload()
      }
    },
    { passive: true }
  )

  setInterval(checkDataReload, 60000)
})
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 28px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.75s ease-out both;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
