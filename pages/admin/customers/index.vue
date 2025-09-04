<template>
  <div>
    <!-- Header con botones de acción -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Gestión de Clientes</h1>
        <p class="text-gray-600">Administra todos los clientes de tu tienda</p>
      </div>
      <div class="flex space-x-3">
        <button
          @click="openModal()"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Icon name="heroicons:plus-circle" class="w-5 h-5" />
          <span>Nuevo Cliente</span>
        </button>
        <button
          @click="exportCustomers"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Icon name="heroicons:arrow-down-tray" class="w-5 h-5" />
          <span>Exportar</span>
        </button>
      </div>
    </div>

    <!-- Resumen de clientes -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:users" class="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Clientes</p>
            <p class="text-2xl font-bold text-gray-900">{{ customersSummary.total }}</p>
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
            <p class="text-sm font-medium text-gray-500">Activos</p>
            <p class="text-2xl font-bold text-gray-900">{{ customersSummary.active }}</p>
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
            <p class="text-sm font-medium text-gray-500">Nuevos (30 días)</p>
                         <p class="text-2xl font-bold text-gray-900">{{ customersSummary.newCustomers }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon name="heroicons:shopping-bag" class="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Con Pedidos</p>
            <p class="text-2xl font-bold text-gray-900">{{ customersSummary.withOrders }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros y búsqueda -->
    <div class="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Búsqueda -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Nombre, email, teléfono..."
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
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>

        <!-- Filtro por ciudad -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
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
            @click="clearFilters"
            class="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>

    <!-- Tabla de clientes -->
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contacto
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ubicación
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pedidos
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="customer in filteredCustomers.slice(startIndex, endIndex)" :key="customer.id_customer" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Icon name="heroicons:user" class="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ customer.first_name }} {{ customer.last_name }}</div>
                    <div class="text-sm text-gray-500">{{ customer.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ customer.phone || 'N/A' }}</div>
                <div class="text-sm text-gray-500">{{ customer.user?.role || 'Cliente' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ customer.city || 'N/A' }}</div>
                <div class="text-sm text-gray-500">{{ customer.state || 'N/A' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    customer.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ customer.is_active ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ customer.order_count || 0 }} pedidos
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="viewCustomer(customer)"
                    class="text-blue-600 hover:text-blue-900"
                    title="Ver cliente"
                  >
                    <Icon name="heroicons:eye" class="w-5 h-5" />
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
    const { data } = await $fetch('/api/customers')
    if (data.success) {
      customers.value = data.data
    } else {
      console.error('Error en la respuesta de la API:', data.error)
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

const viewCustomer = (customer) => {
  // Implementar vista detallada del cliente
  console.log('Ver cliente:', customer)
}

const saveCustomer = async (customerData) => {
  try {
    if (selectedCustomer.value) {
      // Actualizar cliente existente
      const { data } = await $fetch(`/api/customers/${selectedCustomer.value.id_customer}`, {
        method: 'PUT',
        body: customerData
      })
      if (data.success) {
        console.log('Cliente actualizado exitosamente')
        await fetchCustomers()
        closeModal()
      } else {
        console.error('Error actualizando cliente:', data.error)
      }
    } else {
      // Crear nuevo cliente
      const { data } = await $fetch('/api/customers', {
        method: 'POST',
        body: customerData
      })
      if (data.success) {
        console.log('Cliente creado exitosamente')
        await fetchCustomers()
        closeModal()
      } else {
        console.error('Error creando cliente:', data.error)
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
    const { data } = await $fetch(`/api/customers/${customerToDelete.value.id_customer}`, {
      method: 'DELETE'
    })
    if (data.success) {
      console.log('Cliente eliminado exitosamente')
      await fetchCustomers()
      showConfirmModal.value = false
      customerToDelete.value = null
    } else {
      console.error('Error eliminando cliente:', data.error)
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
