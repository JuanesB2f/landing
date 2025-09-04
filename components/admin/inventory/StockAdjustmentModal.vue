<template>
  <ClientOnly>
    <Teleport to="body">
    <div class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Overlay eliminado para que no oscurezca -->

        <!-- Modal -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-50">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
              <Icon 
                name="heroicons:adjustments-horizontal" 
                class="h-6 w-6 text-orange-600" 
              />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ props.product ? `Ajustar Stock de ${props.product.name}` : 'Ajuste de Stock' }}
              </h3>
              
              <!-- Información del producto -->
              <div v-if="props.product" class="mt-4 p-4 bg-gray-50 rounded-lg">
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="font-medium text-gray-700">Stock Actual:</span>
                    <span class="ml-2 text-gray-900">{{ props.product.stock_quantity }}</span>
                  </div>
                  <div>
                    <span class="font-medium text-gray-700">Stock Mínimo:</span>
                    <span class="ml-2 text-gray-900">{{ props.product.min_stock || 0 }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Formulario -->
              <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
                <!-- Producto (si no se seleccionó uno) -->
                <div v-if="!props.product">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Producto *
                  </label>
                  <select
                    v-model="form.product_id"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Seleccionar producto</option>
                    <option v-for="product in products" :key="product.id_product" :value="product.id_product">
                      {{ product.name }} ({{ product.sku }}) - Stock: {{ product.stock_quantity }}
                    </option>
                  </select>
                </div>

                <!-- Tipo de ajuste -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Ajuste *
                  </label>
                  <select
                    v-model="form.adjustment_type"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="set">Establecer Stock</option>
                    <option value="add">Agregar Stock</option>
                    <option value="subtract">Restar Stock</option>
                  </select>
                </div>

                <!-- Cantidad -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad *
                  </label>
                  <input
                    v-model="form.quantity"
                    type="number"
                    min="0"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="0"
                  />
                  <p class="mt-1 text-xs text-gray-500">
                    <span v-if="form.adjustment_type === 'set'">Establecerá el stock exacto a esta cantidad</span>
                    <span v-else-if="form.adjustment_type === 'add'">Agregará esta cantidad al stock actual</span>
                    <span v-else-if="form.adjustment_type === 'subtract'">Restará esta cantidad del stock actual</span>
                  </p>
                </div>

                <!-- Stock resultante -->
                <div v-if="props.product && form.adjustment_type && form.quantity" class="p-3 bg-blue-50 rounded-lg">
                  <p class="text-sm text-blue-800">
                    <span class="font-medium">Stock Resultante:</span>
                    <span class="ml-2">{{ calculateResultingStock() }}</span>
                  </p>
                </div>

                <!-- Motivo -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Motivo del Ajuste *
                  </label>
                  <select
                    v-model="form.reason"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Seleccionar motivo</option>
                    <option value="inventory_count">Conteo de Inventario</option>
                    <option value="damage">Producto Dañado</option>
                    <option value="expired">Producto Expirado</option>
                    <option value="theft">Robo/Pérdida</option>
                    <option value="system_error">Error del Sistema</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <!-- Descripción -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    v-model="form.description"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Detalles del ajuste realizado..."
                  ></textarea>
                </div>

                <!-- Fecha del ajuste -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Fecha del Ajuste
                  </label>
                  <input
                    v-model="form.adjustment_date"
                    type="datetime-local"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Footer del modal -->
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            @click="handleSubmit"
            :disabled="loading"
            class="w-full btn btn-primary sm:ml-3 sm:w-auto sm:text-sm"
          >
            <Icon v-if="loading" name="heroicons:arrow-path" class="w-4 h-4 mr-2 animate-spin" />
            Realizar Ajuste
          </button>
          <button
            type="button"
            @click="$emit('close')"
            class="mt-3 w-full btn btn-secondary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancelar
          </button>
        </div>
        </div>
      </div>
    </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

// Estado reactivo
const loading = ref(false)
const products = ref([])
const form = ref({
  product_id: '',
  adjustment_type: '',
  quantity: 0,
  reason: '',
  description: '',
  adjustment_date: ''
})

// Computed properties
const isEditing = computed(() => !!props.product)

// Métodos
const initializeForm = () => {
  if (props.product) {
    form.value.product_id = props.product.id_product
  }
  
  // Establecer fecha actual por defecto
  const now = new Date()
  const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  form.value.adjustment_date = localDateTime.toISOString().slice(0, 16)
}

const fetchProducts = async () => {
  try {
    const { data } = await $fetch('/api/products')
    if (data.success) {
      products.value = data.data
    }
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const calculateResultingStock = () => {
  if (!props.product || !form.value.adjustment_type || !form.value.quantity) return 'N/A'
  
  const currentStock = props.product.stock_quantity
  const quantity = parseInt(form.value.quantity)
  
  switch (form.value.adjustment_type) {
    case 'set':
      return quantity
    case 'add':
      return currentStock + quantity
    case 'subtract':
      return Math.max(0, currentStock - quantity)
    default:
      return 'N/A'
  }
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    const adjustmentData = {
      ...form.value,
      quantity: parseInt(form.value.quantity)
    }

    emit('save', adjustmentData)
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    loading.value = false
  }
}

const validateForm = () => {
  if (!form.value.product_id) {
    alert('Debe seleccionar un producto')
    return false
  }
  if (!form.value.adjustment_type) {
    alert('Debe seleccionar un tipo de ajuste')
    return false
  }
  if (!form.value.quantity || form.value.quantity < 0) {
    alert('La cantidad debe ser mayor o igual a 0')
    return false
  }
  if (!form.value.reason) {
    alert('Debe seleccionar un motivo')
    return false
  }
  
  // Validar que no se quede stock negativo
  if (props.product && form.value.adjustment_type === 'subtract') {
    const resultingStock = calculateResultingStock()
    if (resultingStock < 0) {
      alert('No se puede dejar stock negativo')
      return false
    }
  }
  
  return true
}

// Lifecycle
onMounted(async () => {
  if (!props.product) {
    await fetchProducts()
  }
  initializeForm()
})

// Watch para cambios en el producto
watch(() => props.product, () => {
  initializeForm()
}, { immediate: true })
</script>
