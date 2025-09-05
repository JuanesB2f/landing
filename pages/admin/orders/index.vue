<template>
  <div>
    <!-- Header con botones de acción -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Gestión de Pedidos</h1>
        <p class="text-gray-600">Administra todos los pedidos de tu tienda</p>
      </div>
      <div class="flex space-x-3">
        <button
          @click="openOrderModal()"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Icon name="heroicons:plus-circle" class="w-5 h-5" />
          <span>Nuevo Pedido</span>
        </button>
        <button
          @click="exportOrders"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Icon name="heroicons:arrow-down-tray" class="w-5 h-5" />
          <span>Exportar</span>
        </button>
      </div>
    </div>

    <!-- Resumen de pedidos -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:shopping-bag" class="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Pedidos</p>
            <p class="text-2xl font-bold text-gray-900">{{ ordersSummary.total }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:clock" class="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Pendientes</p>
            <p class="text-2xl font-bold text-gray-900">{{ ordersSummary.pending }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Entregados</p>
            <p class="text-2xl font-bold text-gray-900">{{ ordersSummary.delivered }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:x-circle" class="w-5 h-5 text-red-600" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Cancelados</p>
            <p class="text-2xl font-bold text-gray-900">{{ ordersSummary.cancelled }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros y búsqueda -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
        <!-- Búsqueda -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="ID, cliente, tracking..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <!-- Filtro por estado -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select
            v-model="selectedStatus"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="confirmed">Confirmado</option>
            <option value="shipped">Enviado</option>
            <option value="delivered">Entregado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>

        <!-- Filtro por método de pago -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Pago</label>
          <select
            v-model="selectedPaymentStatus"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Todos los pagos</option>
            <option value="paid">Pagado</option>
            <option value="pending">Pendiente</option>
            <option value="failed">Fallido</option>
            <option value="refunded">Reembolsado</option>
          </select>
        </div>

        <!-- Filtro por fecha -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
          <input
            v-model="selectedDate"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <!-- Filtro por origen -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Origen</label>
          <select
            v-model="selectedSource"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Todos</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="customer">Cliente</option>
          </select>
        </div>
        
        <!-- Botón de limpiar filtros -->
        <div class="flex items-end">
          <button
            @click="clearFilters"
            class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>

    <!-- Tabla de pedidos -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pedido
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pago
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in filteredOrders" :key="order.id_order" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Icon name="heroicons:shopping-bag" class="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">#{{ order.id_order.slice(0, 8) }}</div>
                    <div class="text-sm text-gray-500">{{ order.tracking_number || 'Sin tracking' }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ order.customer?.first_name }} {{ order.customer?.last_name }}</div>
                <div class="text-sm text-gray-500">{{ order.customer?.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ formatCOP(order.total_amount) }}</div>
                <div class="text-sm text-gray-500">{{ order.order_items?.length || 0 }} productos</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getStatusClass(order.status)
                  ]"
                >
                  {{ getStatusText(order.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getPaymentStatusClass(order.payment_status)
                  ]"
                >
                  {{ getPaymentStatusText(order.payment_status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(order.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="viewOrder(order)"
                    class="text-blue-600 hover:text-blue-900"
                    title="Ver pedido"
                  >
                    <Icon name="heroicons:eye" class="w-5 h-5" />
                  </button>
                  <button
                    @click="openOrderModal(order)"
                    class="text-green-600 hover:text-green-900"
                    title="Editar pedido"
                  >
                    <Icon name="heroicons:pencil" class="w-5 h-5" />
                  </button>
                  <button
                    @click="updateStatus(order)"
                    class="text-orange-600 hover:text-orange-900"
                    title="Cambiar estado"
                  >
                    <Icon name="heroicons:arrow-path" class="w-5 h-5" />
                  </button>
                  <button
                    @click="confirmDelete(order)"
                    class="text-red-600 hover:text-red-900"
                    title="Cancelar pedido"
                  >
                    <Icon name="heroicons:trash" class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Paginación -->
      <div v-if="totalPages > 1" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
              <span class="font-medium">{{ totalOrders }}</span> resultados
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
                    ? 'z-10 bg-green-50 border-green-500 text-green-600'
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

    <!-- Modal para crear/editar pedido -->
    <OrderModal
      v-if="showModal"
      :order="selectedOrder"
      @close="closeModal"
      @save="saveOrder"
    />

    <!-- Modal para cambiar estado -->
    <StatusUpdateModal
      v-if="showStatusModal"
      :order="selectedOrder"
      @close="closeStatusModal"
      @update="updateOrderStatus"
    />

    <!-- Modal de confirmación para eliminar -->
    <ConfirmModal
      v-if="showConfirmModal"
      title="Cancelar Pedido"
      message="¿Estás seguro de que quieres cancelar este pedido? Esta acción no se puede deshacer."
      @confirm="deleteOrder"
      @cancel="showConfirmModal = false"
    />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

// Estado reactivo
const orders = ref([])
const loading = ref(false)
const searchQuery = ref('')
const selectedStatus = ref('')
const selectedPaymentStatus = ref('')
const selectedDate = ref('')
const selectedSource = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showModal = ref(false)
const showStatusModal = ref(false)
const showConfirmModal = ref(false)
const selectedOrder = ref(null)
const orderToDelete = ref(null)

// Computed properties
const filteredOrders = computed(() => {
  let filtered = orders.value

  // Filtro por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(order =>
      order.id_order.toLowerCase().includes(query) ||
      (order.tracking_number && order.tracking_number.toLowerCase().includes(query)) ||
      (order.customer?.first_name && order.customer.first_name.toLowerCase().includes(query)) ||
      (order.customer?.last_name && order.customer.last_name.toLowerCase().includes(query))
    )
  }

  // Filtro por estado
  if (selectedStatus.value) {
    filtered = filtered.filter(order => order.status === selectedStatus.value)
  }

  // Filtro por estado de pago
  if (selectedPaymentStatus.value) {
    filtered = filtered.filter(order => order.payment_status === selectedPaymentStatus.value)
  }

  // Filtro por fecha
  if (selectedDate.value) {
    const selectedDateObj = new Date(selectedDate.value)
    filtered = filtered.filter(order => {
      const orderDate = new Date(order.created_at)
      return orderDate.toDateString() === selectedDateObj.toDateString()
    })
  }

  // Filtro por origen
  if (selectedSource.value) {
    filtered = filtered.filter(order => order.order_source === selectedSource.value)
  }

  return filtered
})

const totalOrders = computed(() => filteredOrders.value.length)
const totalPages = computed(() => Math.ceil(totalOrders.value / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalOrders.value))

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

const ordersSummary = computed(() => {
  const total = orders.value.length
  const pending = orders.value.filter(o => o.status === 'pending').length
  const delivered = orders.value.filter(o => o.status === 'delivered').length
  const cancelled = orders.value.filter(o => o.status === 'cancelled').length

  return { total, pending, delivered, cancelled }
})

// Métodos
const fetchOrders = async () => {
  loading.value = true
  try {
    const { data } = await $fetch('/api/orders')
    if (data.success) {
      orders.value = data.data
    } else {
      console.error('Error en la respuesta de la API:', data.error)
    }
  } catch (error) {
    console.error('Error fetching orders:', error)
  } finally {
    loading.value = false
  }
}

const openOrderModal = (order = null) => {
  selectedOrder.value = order
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedOrder.value = null
}

const viewOrder = (order) => {
  // Implementar vista detallada del pedido
  console.log('Ver pedido:', order)
}

const updateStatus = (order) => {
  selectedOrder.value = order
  showStatusModal.value = true
}

const closeStatusModal = () => {
  showStatusModal.value = false
  selectedOrder.value = null
}

const saveOrder = async (orderData) => {
  try {
    if (selectedOrder.value) {
      // Actualizar pedido existente
      const { data } = await $fetch(`/api/orders/${selectedOrder.value.id_order}`, {
        method: 'PUT',
        body: orderData
      })
      if (data.success) {
        console.log('Pedido actualizado exitosamente')
        await fetchOrders()
        closeModal()
      } else {
        console.error('Error actualizando pedido:', data.error)
      }
    } else {
      // Crear nuevo pedido
      const { data } = await $fetch('/api/orders', {
        method: 'POST',
        body: orderData
      })
      if (data.success) {
        console.log('Pedido creado exitosamente')
        await fetchOrders()
        closeModal()
      } else {
        console.error('Error creando pedido:', data.error)
      }
    }
  } catch (error) {
    console.error('Error saving order:', error)
  }
}

const updateOrderStatus = async (statusData) => {
  try {
    const { data } = await $fetch(`/api/orders/${selectedOrder.value.id_order}/update-status`, {
      method: 'PATCH',
      body: statusData
    })
    if (data.success) {
      console.log('Estado del pedido actualizado exitosamente')
      await fetchOrders()
      closeStatusModal()
    } else {
      console.error('Error actualizando estado:', data.error)
    }
  } catch (error) {
    console.error('Error updating status:', error)
  }
}

const confirmDelete = (order) => {
  orderToDelete.value = order
  showConfirmModal.value = true
}

const deleteOrder = async () => {
  if (!orderToDelete.value) return
  
  try {
    const { data } = await $fetch(`/api/orders/${orderToDelete.value.id_order}`, {
      method: 'DELETE'
    })
    if (data.success) {
      console.log('Pedido cancelado exitosamente')
      await fetchOrders()
      showConfirmModal.value = false
      orderToDelete.value = null
    } else {
      console.error('Error cancelando pedido:', data.error)
    }
  } catch (error) {
    console.error('Error deleting order:', error)
  }
}

const exportOrders = () => {
  // Implementar exportación de pedidos
  console.log('Exportando pedidos...')
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedStatus.value = ''
  selectedPaymentStatus.value = ''
  selectedDate.value = ''
  currentPage.value = 1
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

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  const texts = {
    pending: 'Pendiente',
    confirmed: 'Confirmado',
    shipped: 'Enviado',
    delivered: 'Entregado',
    cancelled: 'Cancelado'
  }
  return texts[status] || 'Desconocido'
}

const getPaymentStatusClass = (status) => {
  const classes = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getPaymentStatusText = (status) => {
  const texts = {
    paid: 'Pagado',
    pending: 'Pendiente',
    failed: 'Fallido',
    refunded: 'Reembolsado'
  }
  return texts[status] || 'Desconocido'
}

const { formatCOP } = useCurrency()

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Verificación de autenticación
const checkAuthentication = async () => {
  const supabase = useSupabaseClient()
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error || !session) {
      console.log('No hay sesión activa, redirigiendo al login')
      await navigateTo('/login')
      return
    }
    
    // Obtener perfil del usuario para verificar rol
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()
    
    if (profileError || !profile) {
      console.log('Perfil no encontrado, redirigiendo al login')
      await navigateTo('/login')
      return
    }
    
    // Verificar que el usuario tenga rol de admin
    if (profile.role !== 'admin') {
      console.log('Usuario no es admin, redirigiendo a unauthorized')
      await navigateTo('/unauthorized')
      return
    }
    
    console.log('Usuario autenticado como admin, acceso permitido')
    
  } catch (error) {
    console.error('Error verificando autenticación:', error)
    await navigateTo('/login')
    return
  }
}

// Lifecycle
onMounted(async () => {
  await checkAuthentication()
  await fetchOrders()
})
</script>
