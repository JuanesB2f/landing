<template>
  <div>
    <!-- Header con botones de acción -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6">
      <div>
        <h1 class="text-xl sm:text-2xl font-bold theme-text-primary">Gestión de Clientes</h1>
        <p class="text-sm sm:text-base theme-text-secondary mt-0.5">Administra todos los clientes de tu tienda</p>
      </div>
      <div class="flex flex-wrap gap-2 sm:space-x-3">
        <button
          type="button"
          @click="openModal()"
          class="ios-admin-btn-primary flex-1 sm:flex-none min-w-0 justify-center"
        >
          <Icon name="heroicons:plus-circle" class="w-5 h-5" />
          <span>Nuevo Cliente</span>
        </button>
        <button
          type="button"
          @click="exportCustomers"
          class="ios-admin-btn-secondary flex-1 sm:flex-none min-w-0 justify-center"
        >
          <Icon name="heroicons:arrow-down-tray" class="w-5 h-5" />
          <span>Exportar</span>
        </button>
      </div>
    </div>

    <!-- Resumen de clientes -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="ios-admin-stat-card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:users" class="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium theme-text-muted">Total Clientes</p>
            <p class="text-2xl font-bold theme-text-primary">{{ customersSummary.total }}</p>
          </div>
        </div>
      </div>

      <div class="ios-admin-stat-card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium theme-text-muted">Activos</p>
            <p class="text-2xl font-bold theme-text-primary">{{ customersSummary.active }}</p>
          </div>
        </div>
      </div>

      <div class="ios-admin-stat-card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:clock" class="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium theme-text-muted">Nuevos (30 días)</p>
            <p class="text-2xl font-bold theme-text-primary">{{ customersSummary.newCustomers }}</p>
          </div>
        </div>
      </div>

      <div class="ios-admin-stat-card">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:shopping-bag" class="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium theme-text-muted">Con Pedidos</p>
            <p class="text-2xl font-bold theme-text-primary">{{ customersSummary.withOrders }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros y búsqueda -->
    <div class="ios-admin-toolbar mb-4 sm:mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Búsqueda -->
        <div>
          <label class="block text-sm font-medium theme-text-secondary mb-1">Buscar</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Nombre, email, teléfono..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        
        <!-- Filtro por estado -->
        <div>
          <label class="block text-sm font-medium theme-text-secondary mb-1">Estado</label>
          <select
            v-model="selectedStatus"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Todos los estados</option>
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>

        <!-- Filtro por ciudad -->
        <div>
          <label class="block text-sm font-medium theme-text-secondary mb-1">Ciudad</label>
          <select
            v-model="selectedCity"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Todas las ciudades</option>
            <option v-for="city in cities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
        </div>
        
        <!-- Botón de limpiar filtros -->
        <div class="flex items-end">
          <button
            type="button"
            @click="clearFilters"
            class="w-full ios-admin-btn-secondary"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>

    <!-- Tabla de clientes -->
    <div class="ios-admin-table-shell">
      <div class="admin-table-scroll">
        <table class="min-w-full admin-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Contacto</th>
              <th>Ubicación</th>
              <th>Estado</th>
              <th>Pedidos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(customer, idx) in paginatedCustomers"
              :key="`cust-${String(customer.id_customer ?? customer.id ?? idx)}-${startIndex + idx}`"
            >
              <td class="whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Icon name="heroicons:user" class="w-5 h-5 text-blue-600 dark:text-blue-300" />
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium theme-text-primary">{{ customer.first_name }} {{ customer.last_name }}</div>
                    <div class="text-sm theme-text-muted">{{ customer.email }}</div>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap">
                <div class="text-sm theme-text-primary">{{ customer.phone || 'N/A' }}</div>
                <div class="text-sm theme-text-muted">{{ customer.user?.role || 'Cliente' }}</div>
              </td>
              <td class="whitespace-nowrap">
                <div class="text-sm theme-text-primary">{{ customer.city || 'N/A' }}</div>
                <div class="text-sm theme-text-muted">{{ customer.state || 'N/A' }}</div>
              </td>
              <td class="whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    customer.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ customer.is_active ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="whitespace-nowrap text-sm theme-text-muted">
                {{ customer.order_count || 0 }} pedidos
              </td>
              <td class="whitespace-nowrap text-sm font-medium">
                <div class="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200"
                    title="Detalles e historial de compras"
                    @click="openDetails(customer)"
                  >
                    <Icon name="heroicons:document-text" class="w-4 h-4" />
                    Detalles
                  </button>
                  <button
                    @click="openModal(customer)"
                    class="text-green-600 hover:text-green-900"
                    title="Editar cliente"
                  >
                    <Icon name="heroicons:pencil" class="w-5 h-5" />
                  </button>
                  <button
                    @click="toggleStatus(customer)"
                    :class="[
                      'hover:text-gray-900',
                      customer.is_active ? 'text-orange-600' : 'text-green-600'
                    ]"
                    :title="customer.is_active ? 'Desactivar' : 'Activar'"
                  >
                    <Icon 
                      :name="customer.is_active ? 'heroicons:pause' : 'heroicons:play'" 
                      class="w-5 h-5" 
                    />
                  </button>
                  <button
                    @click="confirmDelete(customer)"
                    class="text-red-600 hover:text-red-900"
                    title="Eliminar cliente"
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
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Mostrando <span class="font-medium">{{ startIndex + 1 }}</span> a 
              <span class="font-medium">{{ endIndex }}</span> de 
              <span class="font-medium">{{ totalCustomers }}</span> resultados
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

    <!-- Modal para crear/editar cliente -->
    <CustomerModal
      v-if="showModal"
      :customer="selectedCustomer"
      @close="closeModal"
      @save="saveCustomer"
    />

    <!-- Modal de confirmación para eliminar -->
    <ConfirmModal
      v-if="showConfirmModal"
      title="Eliminar Cliente"
      message="¿Estás seguro de que quieres eliminar este cliente? Esta acción no se puede deshacer."
      @confirm="deleteCustomer"
      @cancel="showConfirmModal = false"
    />

    <CustomerDetailsModal
      v-if="showDetailsModal && detailsCustomer"
      :customer="detailsCustomer"
      @close="closeDetails"
    />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

// Estado reactivo
const customers = ref([])
const loading = ref(false)
const searchQuery = ref('')
const selectedStatus = ref('')
const selectedCity = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showModal = ref(false)
const showConfirmModal = ref(false)
const selectedCustomer = ref(null)
const customerToDelete = ref(null)
const showDetailsModal = ref(false)
const detailsCustomer = ref(null)

/** GET /api/customers devuelve { data: { success, ... } }; PUT/DELETE en [id] devuelven { success, ... } plano. */
function customersApiPayload(res) {
  if (res != null && typeof res.success === 'boolean') {
    return res
  }
  return res?.data ?? res
}

// Computed properties
const filteredCustomers = computed(() => {
  let filtered = customers.value

  // Filtro por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(customer =>
      customer.first_name.toLowerCase().includes(query) ||
      customer.last_name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      (customer.phone && customer.phone.toLowerCase().includes(query))
    )
  }

  // Filtro por estado
  if (selectedStatus.value !== '') {
    filtered = filtered.filter(customer => customer.is_active.toString() === selectedStatus.value)
  }

  // Filtro por ciudad
  if (selectedCity.value) {
    filtered = filtered.filter(customer => customer.city === selectedCity.value)
  }

  return filtered
})

const paginatedCustomers = computed(() => {
  const f = filteredCustomers.value
  return f.slice(startIndex.value, endIndex.value)
})

const totalCustomers = computed(() => filteredCustomers.value.length)
const totalPages = computed(() => Math.ceil(totalCustomers.value / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, totalCustomers.value))

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

const cities = computed(() => {
  const citySet = new Set()
  customers.value.forEach(customer => {
    if (customer.city) citySet.add(customer.city)
  })
  return Array.from(citySet).sort()
})

const customersSummary = computed(() => {
  const total = customers.value.length
  const active = customers.value.filter(c => c.is_active).length
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const newCustomers = customers.value.filter(c => new Date(c.created_at) > thirtyDaysAgo).length
  const withOrders = customers.value.filter(c => (c.order_count || 0) > 0).length

  return { total, active, newCustomers, withOrders }
})

// Métodos
const fetchCustomers = async () => {
  loading.value = true
  try {
    const res = await $fetch('/api/customers')
    const payload = res?.data ?? res
    if (payload?.success && Array.isArray(payload.data)) {
      const seen = new Map()
      customers.value = payload.data.filter((c) => {
        const id = c?.id_customer ?? c?.id
        if (id == null) return false
        const k = String(id)
        if (seen.has(k)) return false
        seen.set(k, true)
        return true
      })
    } else {
      console.error('Error en la respuesta de la API:', payload?.error)
    }
  } catch (error) {
    console.error('Error fetching customers:', error)
  } finally {
    loading.value = false
  }
}

const openModal = (customer = null) => {
  selectedCustomer.value = customer
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedCustomer.value = null
}

const openDetails = (customer) => {
  detailsCustomer.value = customer
  showDetailsModal.value = true
}

const closeDetails = () => {
  showDetailsModal.value = false
  detailsCustomer.value = null
}

const saveCustomer = async (customerData) => {
  try {
    if (selectedCustomer.value) {
      // Actualizar cliente existente
      const res = await $fetch(`/api/customers/${selectedCustomer.value.id_customer}`, {
        method: 'PUT',
        body: customerData
      })
      const payload = customersApiPayload(res)
      if (payload?.success) {
        console.log('Cliente actualizado exitosamente')
        await fetchCustomers()
        closeModal()
      } else {
        console.error('Error actualizando cliente:', payload?.error)
      }
    } else {
      // Crear nuevo cliente
      const res = await $fetch('/api/customers', {
        method: 'POST',
        body: customerData
      })
      const payload = customersApiPayload(res)
      if (payload?.success) {
        console.log('Cliente creado exitosamente')
        await fetchCustomers()
        closeModal()
      } else {
        console.error('Error creando cliente:', payload?.error)
      }
    }
  } catch (error) {
    console.error('Error saving customer:', error)
  }
}

const toggleStatus = async (customer) => {
  try {
    const { data } = await $fetch(`/api/customers/${customer.id_customer}/toggle-status`, {
      method: 'PATCH'
    })
    if (data.success) {
      console.log('Estado del cliente actualizado exitosamente')
      await fetchCustomers()
    } else {
      console.error('Error actualizando estado:', data.error)
    }
  } catch (error) {
    console.error('Error toggling status:', error)
  }
}

const confirmDelete = (customer) => {
  customerToDelete.value = customer
  showConfirmModal.value = true
}

const deleteCustomer = async () => {
  if (!customerToDelete.value) return
  
  try {
    const res = await $fetch(`/api/customers/${customerToDelete.value.id_customer}`, {
      method: 'DELETE'
    })
    const payload = customersApiPayload(res)
    if (payload?.success) {
      console.log('Cliente eliminado exitosamente')
      await fetchCustomers()
      showConfirmModal.value = false
      customerToDelete.value = null
    } else {
      console.error('Error eliminando cliente:', payload?.error)
    }
  } catch (error) {
    console.error('Error deleting customer:', error)
  }
}

const exportCustomers = () => {
  // Implementar exportación de clientes
  console.log('Exportando clientes...')
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedStatus.value = ''
  selectedCity.value = ''
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
  await fetchCustomers()
})
</script>
