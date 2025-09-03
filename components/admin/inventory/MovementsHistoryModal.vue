<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('close')"></div>

      <!-- Modal -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <Icon 
                name="heroicons:eye" 
                class="h-6 w-6 text-blue-600" 
              />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Historial de Movimientos - {{ props.product?.name }}
              </h3>
              
              <!-- Información del producto -->
              <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                <div class="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span class="font-medium text-gray-700">SKU:</span>
                    <span class="ml-2 text-gray-900">{{ props.product?.sku }}</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-700">Stock Actual:</span>
                    <span class="ml-2 text-gray-900">{{ props.product?.stock_quantity }}</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-700">Stock Mínimo:</span>
                    <span class="ml-2 text-gray-900">{{ props.product?.min_stock || 0 }}</span>
                  </div>
                </div>
              </div>

              <!-- Filtros -->
              <div class="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <select
                    v-model="filters.movement_type"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos los tipos</option>
                    <option value="in">Entrada</option>
                    <option value="out">Salida</option>
                    <option value="adjustment">Ajuste</option>
                    <option value="return">Devolución</option>
                    <option value="damaged">Dañado</option>
                  </select>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Motivo</label>
                  <select
                    v-model="filters.reason"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos los motivos</option>
                    <option value="purchase">Compra</option>
                    <option value="sale">Venta</option>
                    <option value="inventory_count">Conteo</option>
                    <option value="damage">Daño</option>
                    <option value="expired">Expirado</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Desde</label>
                  <input
                    v-model="filters.date_from"
                    type="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
                  <input
                    v-model="filters.date_to"
                    type="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <!-- Tabla de movimientos -->
              <div class="mt-6 overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cantidad
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock Anterior
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock Posterior
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Motivo
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Referencia
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="movement in filteredMovements" :key="movement.id_movement" class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ formatDateTime(movement.movement_date) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span
                          :class="[
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                            getMovementTypeClass(movement.movement_type)
                          ]"
                        >
                          {{ getMovementTypeText(movement.movement_type) }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span :class="movement.movement_type === 'in' ? 'text-green-600' : 'text-red-600'">
                          {{ movement.movement_type === 'in' ? '+' : '' }}{{ movement.quantity }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ movement.stock_before }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ movement.stock_after }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ getReasonText(movement.reason) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ movement.reference || 'N/A' }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Paginación -->
              <div v-if="totalPages > 1" class="mt-4 flex items-center justify-between">
                <div class="flex-1 flex justify-between sm:hidden">
                  <button
                    @click="previousPage"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Anterior
                  </button>
                  <button
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                    class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Siguiente
                  </button>
                </div>
                <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p class="text-sm text-gray-700">
                      Mostrando <span class="font-medium">{{ startIndex + 1 }}</span> a 
                      <span class="font-medium">{{ endIndex }}</span> de 
                      <span class="font-medium">{{ totalMovements }}</span> movimientos
                    </p>
                  </div>
                  <div>
                    <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        @click="previousPage"
                        :disabled="currentPage === 1"
                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Icon name="heroicons:chevron-left" class="w-5 h-5" />
                      </button>
                      <button
                        v-for="page in visiblePages"
                        :key="page"
                        @click="goToPage(page)"
                        :class="[
                          'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                          page === currentPage
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        ]"
                      >
                        {{ page }}
                      </button>
                      <button
                        @click="nextPage"
                        :disabled="currentPage === totalPages"
                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Icon name="heroicons:chevron-right" class="w-5 h-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer del modal -->
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            @click="$emit('close')"
            class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

// Estado reactivo
const movements = ref([])
const loading = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(20)
const filters = ref({
  movement_type: '',
  reason: '',
  date_from: '',
  date_to: ''
})

// Computed properties
const filteredMovements = computed(() => {
  let filtered = movements.value

  // Filtro por tipo
  if (filters.value.movement_type) {
    filtered = filtered.filter(m => m.movement_type === filters.value.movement_type)
  }

  // Filtro por motivo
  if (filters.value.reason) {
    filtered = filtered.filter(m => m.reason === filters.value.reason)
  }

  // Filtro por fecha desde
  if (filters.value.date_from) {
    filtered = filtered.filter(m => {
      const movementDate = new Date(m.movement_date)
      const fromDate = new Date(filters.value.date_from)
      return movementDate >= fromDate
    })
  }

  // Filtro por fecha hasta
  if (filters.value.date_to) {
    filtered = filtered.filter(m => {
      const movementDate = new Date(m.movement_date)
      const toDate = new Date(filters.value.date_to)
      toDate.setHours(23, 59, 59) // Incluir todo el día
      return movementDate <= toDate
    })
  }

  return filtered
})

const totalMovements = computed(() => filteredMovements.value.length)
const totalPages = computed(() => Math.ceil(totalMovements.value / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalMovements.value))

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Métodos
const fetchMovements = async () => {
  if (!props.product) return
  
  loading.value = true
  try {
    const { data } = await $fetch(`/api/inventory/movements?product_id=${props.product.id_product}`)
    if (data.success) {
      movements.value = data.data
    } else {
      console.error('Error en la respuesta de la API:', data.error)
    }
  } catch (error) {
    console.error('Error fetching movements:', error)
  } finally {
    loading.value = false
  }
}

const getMovementTypeText = (type) => {
  const types = {
    'in': 'Entrada',
    'out': 'Salida',
    'adjustment': 'Ajuste',
    'return': 'Devolución',
    'damaged': 'Dañado'
  }
  return types[type] || type
}

const getMovementTypeClass = (type) => {
  const classes = {
    'in': 'bg-green-100 text-green-800',
    'out': 'bg-red-100 text-red-800',
    'adjustment': 'bg-orange-100 text-orange-800',
    'return': 'bg-blue-100 text-blue-800',
    'damaged': 'bg-red-100 text-red-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

const getReasonText = (reason) => {
  const reasons = {
    'purchase': 'Compra',
    'sale': 'Venta',
    'inventory_count': 'Conteo',
    'damage': 'Daño',
    'expired': 'Expirado',
    'transfer': 'Transferencia',
    'theft': 'Robo/Pérdida',
    'system_error': 'Error Sistema',
    'other': 'Otro'
  }
  return reasons[reason] || reason
}

const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const goToPage = (page) => {
  currentPage.value = page
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Lifecycle
onMounted(async () => {
  await fetchMovements()
})

// Watch para cambios en el producto
watch(() => props.product, () => {
  if (props.product) {
    fetchMovements()
  }
}, { immediate: true })
</script>
