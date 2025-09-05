<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Gestión de Ofertas por Usuario</h1>
        <p class="text-gray-600">Asigna descuentos personalizados a usuarios (rol user)</p>
      </div>
      <button @click="openCreate" class="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
        <Icon name="heroicons:plus" class="w-5 h-5" />
        <span>Nueva Oferta</span>
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="p-4 border-b flex gap-4">
        <input v-model="filters.email" type="text" placeholder="Filtrar por email" class="px-3 py-2 border rounded w-64" />
        <input v-model="filters.sku" type="text" placeholder="Filtrar por SKU" class="px-3 py-2 border rounded w-64" />
        <button @click="fetchOffers" class="px-4 py-2 border rounded">Aplicar</button>
        <button @click="clearFilters" class="px-4 py-2 border rounded">Limpiar</button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descuento</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vigencia</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="o in filteredOffers" :key="o.id_offer">
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ o.user?.email }}</div>
                <div class="text-sm text-gray-500">{{ o.user?.first_name }} {{ o.user?.last_name }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ o.product?.name }}</div>
                <div class="text-sm text-gray-500">SKU: {{ o.product?.sku }}</div>
              </td>
              <td class="px-6 py-4">
                <span class="text-pink-600 font-semibold">-{{ o.discount_percent }}%</span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-700">
                <div>{{ o.valid_from ? formatDate(o.valid_from) : '—' }} → {{ o.valid_to ? formatDate(o.valid_to) : '—' }}</div>
              </td>
              <td class="px-6 py-4">
                <span :class="o.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" class="px-2 py-1 rounded text-xs">
                  {{ o.is_active ? 'Activa' : 'Inactiva' }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm">
                <div class="flex gap-2">
                  <button @click="edit(o)" class="text-indigo-600 hover:text-indigo-900">
                    <Icon name="heroicons:pencil-square" class="w-5 h-5" />
                  </button>
                  <button @click="remove(o)" class="text-red-600 hover:text-red-900">
                    <Icon name="heroicons:trash" class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal sencillo -->
    <div v-if="showModal" class="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg w-full max-w-lg p-6 space-y-4">
        <h3 class="text-lg font-semibold">{{ editing ? 'Editar' : 'Nueva' }} oferta</h3>
        <div class="grid grid-cols-1 gap-3">
          <input v-model="form.user_id" type="text" placeholder="User ID" class="px-3 py-2 border rounded" />
          <input v-model="form.product_id" type="text" placeholder="Product ID" class="px-3 py-2 border rounded" />
          <input v-model.number="form.discount_percent" type="number" min="0" max="100" placeholder="Descuento %" class="px-3 py-2 border rounded" />
          <label class="flex items-center gap-2 text-sm"><input type="checkbox" v-model="form.is_active" /> Activa</label>
          <input v-model="form.valid_from" type="datetime-local" class="px-3 py-2 border rounded" />
          <input v-model="form.valid_to" type="datetime-local" class="px-3 py-2 border rounded" />
          <textarea v-model="form.notes" placeholder="Notas" class="px-3 py-2 border rounded"></textarea>
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button @click="close" class="px-4 py-2 border rounded">Cancelar</button>
          <button @click="save" class="px-4 py-2 bg-pink-600 text-white rounded">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
const offers = ref([])
const filters = reactive({ email: '', sku: '' })
const showModal = ref(false)
const editing = ref(false)
const form = reactive({ id_offer: null, user_id: '', product_id: '', discount_percent: 0, is_active: true, valid_from: '', valid_to: '', notes: '' })

const fetchOffers = async () => {
  const { data } = await $fetch('/api/user-offers')
  if (data?.success) offers.value = data.data
}

const filteredOffers = computed(() => {
  return (offers.value || []).filter((o) => {
    const emailOk = !filters.email || (o.user?.email || '').toLowerCase().includes(filters.email.toLowerCase())
    const skuOk = !filters.sku || (o.product?.sku || '').toLowerCase().includes(filters.sku.toLowerCase())
    return emailOk && skuOk
  })
})

const openCreate = () => {
  editing.value = false
  Object.assign(form, { id_offer: null, user_id: '', product_id: '', discount_percent: 0, is_active: true, valid_from: '', valid_to: '', notes: '' })
  showModal.value = true
}
const edit = (o) => {
  editing.value = true
  Object.assign(form, { ...o })
  showModal.value = true
}
const close = () => { showModal.value = false }
const save = async () => {
  const payload = { ...form }
  if (editing.value && form.id_offer) {
    const { data } = await $fetch(`/api/user-offers/${form.id_offer}`, { method: 'PUT', body: payload })
    if (data?.success) { await fetchOffers(); close() }
  } else {
    const { data } = await $fetch('/api/user-offers', { method: 'POST', body: payload })
    if (data?.success) { await fetchOffers(); close() }
  }
}
const remove = async (o) => {
  const { data } = await $fetch(`/api/user-offers/${o.id_offer}`, { method: 'DELETE' })
  if (data?.success) await fetchOffers()
}
const clearFilters = () => { filters.email = ''; filters.sku = '' }
const formatDate = (v) => new Date(v).toLocaleString()

onMounted(fetchOffers)
</script>


