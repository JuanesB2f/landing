<template>
  <Teleport to="body">
  <div class="fixed inset-0 z-[9998] overflow-y-auto" role="dialog" aria-modal="true">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="fixed inset-0 bg-black/50" @click="$emit('close')"></div>

      <div class="relative z-[9999] w-full max-w-2xl bg-white rounded-lg text-left overflow-hidden shadow-xl">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
              <Icon 
                name="heroicons:plus-circle" 
                class="h-6 w-6 text-green-600" 
              />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ props.product ? `Movimiento para ${props.product.name}` : 'Nuevo Movimiento de Inventario' }}
              </h3>

              <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
                <div v-if="!props.product">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Producto *
                  </label>
                  <select
                    v-model="form.product_id"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Seleccionar producto</option>
                    <option v-for="product in products" :key="product.id_product" :value="product.id_product">
                      {{ product.name }} ({{ product.sku }}) - Stock: {{ product.stock_quantity }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Movimiento *
                  </label>
                  <select
                    v-model="form.movement_type"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="in">Entrada de Stock</option>
                    <option value="out">Salida de Stock</option>
                    <option value="return">Devolución</option>
                    <option value="damaged">Producto Dañado</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Cantidad *
                  </label>
                  <input
                    v-model="form.quantity"
                    type="number"
                    min="1"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Motivo *
                  </label>
                  <select
                    v-model="form.reason"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Seleccionar motivo</option>
                    <option value="purchase">Compra a Proveedor</option>
                    <option value="sale">Venta</option>
                    <option value="inventory_count">Conteo de Inventario</option>
                    <option value="damage">Producto Dañado</option>
                    <option value="expired">Producto Expirado</option>
                    <option value="transfer">Transferencia</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    v-model="form.description"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Detalles adicionales del movimiento..."
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Fecha del Movimiento
                  </label>
                  <input
                    v-model="form.movement_date"
                    type="datetime-local"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Referencia
                  </label>
                  <input
                    v-model="form.reference"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Número de factura, orden, etc."
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            @click="handleSubmit"
            :disabled="loading"
            class="w-full btn btn-primary sm:ml-3 sm:w-auto sm:text-sm"
          >
            <Icon v-if="loading" name="heroicons:arrow-path" class="w-4 h-4 mr-2 animate-spin" />
            Registrar Movimiento
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
  movement_type: '',
  quantity: 1,
  reason: '',
  description: '',
  movement_date: '',
  reference: ''
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
  form.value.movement_date = localDateTime.toISOString().slice(0, 16)
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

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    const movementData = {
      ...form.value,
      quantity: parseInt(form.value.quantity)
    }

    emit('save', movementData)
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
  if (!form.value.movement_type) {
    alert('Debe seleccionar un tipo de movimiento')
    return false
  }
  if (!form.value.quantity || form.value.quantity <= 0) {
    alert('La cantidad debe ser mayor a 0')
    return false
  }
  if (!form.value.reason) {
    alert('Debe seleccionar un motivo')
    return false
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
