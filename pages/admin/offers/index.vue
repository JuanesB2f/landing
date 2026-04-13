<!-- @ts-nocheck -->
<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6">
      <div>
        <h1 class="text-xl sm:text-2xl font-bold theme-text-primary">Gestión de Ofertas</h1>
        <p class="text-sm sm:text-base theme-text-secondary mt-0.5">Descuentos visibles para todos los usuarios</p>
      </div>
      <button type="button" class="ios-admin-btn-primary w-full sm:w-auto shrink-0" @click="openCreate">
        <Icon name="heroicons:plus" class="w-5 h-5" />
        <span>Nueva Oferta</span>
      </button>
    </div>

    <div class="ios-admin-toolbar mb-4 sm:mb-6">
      <div class="flex flex-col sm:flex-row flex-wrap gap-3 sm:items-end">
        <div class="flex-1 min-w-[12rem]">
          <label class="block text-sm font-medium theme-text-secondary mb-1">Filtrar por SKU</label>
          <input
            v-model="filters.sku"
            type="text"
            placeholder="Ej. ABC-123"
            class="w-full"
          />
        </div>
        <button type="button" class="ios-admin-btn-primary w-full sm:w-auto" @click="fetchOffers">
          Aplicar
        </button>
        <button type="button" class="ios-admin-btn-secondary w-full sm:w-auto" @click="clearFilters">
          Limpiar
        </button>
      </div>
    </div>

    <div class="ios-admin-table-shell">
      <div class="admin-table-scroll">
        <table class="min-w-full admin-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Descuento</th>
              <th>Vigencia</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="o in filteredOffersForTemplate" :key="o.id_offer">
              <td>
                <div class="text-sm font-medium theme-text-primary">{{ o.product?.name }}</div>
                <div class="text-sm theme-text-muted">SKU: {{ o.product?.sku }}</div>
              </td>
              <td>
                <span class="text-accent-strong font-semibold">-{{ o.discount_percent }}%</span>
              </td>
              <td class="text-sm theme-text-primary">
                <div>{{ o.valid_from ? formatDate(o.valid_from) : '—' }} → {{ o.valid_to ? formatDate(o.valid_to) : '—' }}</div>
              </td>
              <td>
                <span
                  :class="o.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'"
                  class="px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ o.is_active ? 'Activa' : 'Inactiva' }}
                </span>
              </td>
              <td class="text-sm">
                <div class="flex gap-2">
                  <button
                    type="button"
                    class="inline-flex items-center justify-center w-9 h-9 rounded-[14px] border border-[var(--ios-hairline)] bg-white/35 backdrop-blur-sm hover:bg-white/55 theme-text-primary"
                    @click="edit(o)"
                  >
                    <Icon name="heroicons:pencil-square" class="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    class="inline-flex items-center justify-center w-9 h-9 rounded-[14px] border border-[var(--ios-hairline)] bg-white/35 backdrop-blur-sm hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600"
                    @click="remove(o)"
                  >
                    <Icon name="heroicons:trash" class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal con selector de producto y vista de precios -->
    <div
      v-if="showModal"
      class="fixed inset-0 ios-admin-overlay z-[100] flex items-center justify-center p-4"
      @click.self="close"
    >
      <div class="ios-admin-modal-panel w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-4" @click.stop>
        <h3 class="text-lg font-semibold">{{ editing ? 'Editar' : 'Nueva' }} oferta</h3>
        <div class="grid grid-cols-1 gap-3">
          <div>
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input v-model="form.product_id" type="text" placeholder="Product ID" class="flex-1 min-w-0" />
              <button type="button" class="ios-admin-btn-secondary shrink-0" @click="openPicker = true">
                Buscar producto
              </button>
            </div>
            <div
              v-if="selectedProduct"
              class="mt-2 p-3 rounded-2xl border border-[var(--ios-hairline)] bg-white/35 dark:bg-white/5 backdrop-blur-sm flex items-center gap-3"
            >
              <img v-if="selectedProduct.image_url" :src="selectedProduct.image_url" class="w-12 h-12 object-cover rounded-xl" />
              <div class="text-sm min-w-0">
                <div class="font-medium theme-text-primary truncate">{{ selectedProduct.name }}</div>
                <div class="theme-text-muted">SKU: {{ selectedProduct.sku }}</div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
            <div>
              <label class="block text-xs theme-text-secondary mb-1">Descuento %</label>
              <input
                v-model.number="form.discount_percent"
                type="number"
                min="0"
                max="100"
                placeholder="Descuento %"
                class="w-full"
              />
            </div>
            <div v-if="selectedProduct" class="text-sm">
              <div class="theme-text-muted line-through" v-if="selectedProduct.price">{{ formatCOP(selectedProduct.price) }}</div>
              <div class="text-accent-strong font-semibold">{{ formatCOP(discountedPrice(selectedProduct?.price, form.discount_percent)) }}</div>
            </div>
          </div>
          <label class="flex items-center gap-2 text-sm theme-text-primary">
            <input type="checkbox" v-model="form.is_active" class="rounded border-[var(--ios-hairline)]" />
            Activa
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs theme-text-secondary mb-1">Inicio</label>
              <input v-model="form.valid_from" type="datetime-local" class="w-full" />
            </div>
            <div>
              <label class="block text-xs theme-text-secondary mb-1">Fin</label>
              <input v-model="form.valid_to" type="datetime-local" class="w-full" />
            </div>
          </div>
          <textarea v-model="form.notes" placeholder="Notas" rows="3" class="w-full" />
        </div>
        <div class="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2 border-t border-[var(--ios-hairline)]">
          <button type="button" class="ios-admin-btn-secondary w-full sm:w-auto" @click="close">
            Cancelar
          </button>
          <button type="button" class="ios-admin-btn-primary w-full sm:w-auto" @click="save">
            Guardar
          </button>
        </div>
      </div>
    </div>
    <ProductPickerDrawer v-model="openPicker" @select="onPick" />
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
definePageMeta({ layout: 'admin' })

type ProductLite = { id_product: string; name?: string; sku?: string; price?: number; image_url?: string }
interface Offer { 
  id_offer: string; 
  product_id: string; 
  discount_percent: number; 
  is_active: boolean; 
  valid_from?: string | null; 
  valid_to?: string | null; 
  notes?: string | null; 
  product?: ProductLite 
}

interface OfferForm { 
  id_offer: string | null; 
  product_id: string; 
  discount_percent: number; 
  is_active: boolean; 
  valid_from: string; 
  valid_to: string; 
  notes: string 
}

const offers = ref<Offer[]>([])
const filters = reactive({ sku: '' })
const showModal = ref(false)
const editing = ref(false)
const form = reactive<OfferForm>({ 
  id_offer: null, 
  product_id: '', 
  discount_percent: 0, 
  is_active: true, 
  valid_from: '', 
  valid_to: '', 
  notes: '' 
})
const openPicker = ref(false)
const selectedProduct = ref<ProductLite | null>(null)
const { formatCOP } = useCurrency()

const discountedPrice = (price: number | undefined, percent: number): number => {
  if (!price) return 0
  return Math.round(Number(price) * (1 - Number(percent || 0) / 100))
}

const fetchOffers = async (): Promise<void> => {
  try {
    const raw: any = await $fetch('/api/offers')
    const env: any = raw?.data ?? raw
    offers.value = (env?.success && Array.isArray(env.data)) ? (env.data as Offer[]) : ([] as Offer[])
  } catch (error) {
    console.error('Error fetching offers:', error)
    offers.value = []
  }
}

const offersList = computed<Offer[]>(() => offers.value)

const filteredOffersList = computed<Offer[]>(() => {
  const list = offersList.value as Offer[]
  return list.filter((o: Offer) => {
    const skuOk = !filters.sku || (o.product?.sku || '').toLowerCase().includes(filters.sku.toLowerCase())
    return skuOk
  })
})

// Template-safe version with explicit any[] to avoid never[] inference
const filteredOffersForTemplate = computed<any[]>(() => filteredOffersList.value as any[])

const openCreate = (): void => {
  editing.value = false
  Object.assign(form, { 
    id_offer: null, 
    product_id: '', 
    discount_percent: 0, 
    is_active: true, 
    valid_from: '', 
    valid_to: '', 
    notes: '' 
  })
  selectedProduct.value = null
  showModal.value = true
}

const edit = (o: any): void => {
  editing.value = true
  Object.assign(form, { 
    id_offer: o.id_offer,
    product_id: o.product_id,
    discount_percent: o.discount_percent,
    is_active: o.is_active,
    valid_from: o.valid_from || '',
    valid_to: o.valid_to || '',
    notes: o.notes || ''
  })
  selectedProduct.value = o.product || null
  showModal.value = true
}

const close = (): void => { 
  showModal.value = false 
  selectedProduct.value = null
}

const save = async (): Promise<void> => {
  const payload = { ...form }
  try {
    if (editing.value && form.id_offer) {
      const raw: any = await $fetch(`/api/offers/${form.id_offer}`, { method: 'PUT', body: payload })
      const env: any = raw?.data ?? raw
      if (env?.success) { 
        await fetchOffers()
        close() 
      }
    } else {
      const raw: any = await $fetch('/api/offers', { method: 'POST', body: payload })
      const env: any = raw?.data ?? raw
      if (env?.success) { 
        await fetchOffers()
        close() 
      }
    }
  } catch (error) {
    console.error('Error saving offer:', error)
  }
}

const onPick = (p: ProductLite): void => {
  selectedProduct.value = p
  form.product_id = p.id_product
}

const remove = async (o: any): Promise<void> => {
  try {
    const raw: any = await $fetch(`/api/offers/${o.id_offer}`, { method: 'DELETE' })
    const env: any = raw?.data ?? raw
    if (env?.success) await fetchOffers()
  } catch (error) {
    console.error('Error removing offer:', error)
  }
}

const clearFilters = (): void => { 
  filters.sku = '' 
}

const formatDate = (v: string | Date): string => new Date(v).toLocaleString()

onMounted(fetchOffers)
// TypeScript types are properly defined above
</script>



