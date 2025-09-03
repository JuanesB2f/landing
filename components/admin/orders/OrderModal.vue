<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ order ? 'Editar Pedido' : 'Nuevo Pedido' }}
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600"
          >
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Información del cliente -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Cliente *
              </label>
              <select
                v-model="form.customer_id"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Seleccionar cliente</option>
                <option v-for="customer in customers" :key="customer.id_customer" :value="customer.id_customer">
                  {{ customer.first_name }} {{ customer.last_name }} - {{ customer.email }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Estado del Pedido
              </label>
              <select
                v-model="form.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="pending">Pendiente</option>
                <option value="confirmed">Confirmado</option>
                <option value="shipped">Enviado</option>
                <option value="delivered">Entregado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>

          <!-- Información de envío -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Dirección de Envío
              </label>
              <textarea
                v-model="form.shipping_address"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Dirección completa de envío"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Dirección de Facturación
              </label>
              <textarea
                v-model="form.billing_address"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Dirección de facturación"
              ></textarea>
            </div>
          </div>

          <!-- Información de pago -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Método de Pago
              </label>
              <select
                v-model="form.payment_method"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Seleccionar método</option>
                <option value="credit_card">Tarjeta de Crédito</option>
                <option value="debit_card">Tarjeta de Débito</option>
                <option value="paypal">PayPal</option>
                <option value="cash">Efectivo</option>
                <option value="bank_transfer">Transferencia Bancaria</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Estado del Pago
              </label>
              <select
                v-model="form.payment_status"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="pending">Pendiente</option>
                <option value="paid">Pagado</option>
                <option value="failed">Fallido</option>
                <option value="refunded">Reembolsado</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Número de Seguimiento
              </label>
              <input
                v-model="form.tracking_number"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Número de tracking"
              />
            </div>
          </div>

          <!-- Productos del pedido -->
          <div>
            <div class="flex justify-between items-center mb-4">
              <h4 class="text-lg font-medium text-gray-900">Productos del Pedido</h4>
              <button
                type="button"
                @click="addProduct"
                class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
              >
                <Icon name="heroicons:plus" class="w-4 h-4 inline mr-1" />
                Agregar Producto
              </button>
            </div>

            <div class="space-y-4">
              <div
                v-for="(item, index) in form.order_items"
                :key="index"
                class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg"
              >
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Producto</label>
                  <select
                    v-model="item.product_id"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Seleccionar producto</option>
                    <option v-for="product in products" :key="product.id_product" :value="product.id_product">
                      {{ product.name }} - {{ formatCOP(product.price) }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                  <input
                    v-model.number="item.quantity"
                    type="number"
                    min="1"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    @input="calculateItemTotal(index)"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Precio Unitario</label>
                  <input
                    v-model.number="item.unit_price"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    @input="calculateItemTotal(index)"
                  />
                </div>

                <div class="flex items-end space-x-2">
                  <div class="flex-1">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Total</label>
                    <input
                      v-model.number="item.total_price"
                      type="number"
                      step="0.01"
                      readonly
                      class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                  <button
                    type="button"
                    @click="removeProduct(index)"
                    class="text-red-600 hover:text-red-800 p-2"
                    title="Eliminar producto"
                  >
                    <Icon name="heroicons:trash" class="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Totales -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Subtotal:</span>
                  <span class="text-sm font-medium">${{ formatPrice(subtotal) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Impuestos:</span>
                  <span class="text-sm font-medium">${{ formatPrice(form.tax_amount || 0) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Envío:</span>
                  <span class="text-sm font-medium">${{ formatPrice(form.shipping_amount || 0) }}</span>
                </div>
                <div class="border-t pt-2">
                  <div class="flex justify-between">
                    <span class="text-lg font-bold text-gray-900">Total:</span>
                    <span class="text-lg font-bold text-gray-900">${{ formatPrice(total) }}</span>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Impuestos</label>
                  <input
                    v-model.number="form.tax_amount"
                    type="number"
                    step="0.01"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    @input="calculateTotal"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Envío</label>
                  <input
                    v-model.number="form.shipping_amount"
                    type="number"
                    step="0.01"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    @input="calculateTotal"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Total del Pedido</label>
                  <input
                    v-model.number="form.total_amount"
                    type="number"
                    step="0.01"
                    readonly
                    class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-bold text-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Notas -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Notas</label>
            <textarea
              v-model="form.notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Notas adicionales del pedido"
            ></textarea>
          </div>

          <!-- Botones -->
          <div class="flex space-x-3 pt-4">
            <button
              type="button"
              @click="$emit('close')"
              class="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="loading">Guardando...</span>
              <span v-else>{{ order ? 'Actualizar' : 'Crear' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  order: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const loading = ref(false)
const customers = ref([])
const products = ref([])

// Formulario reactivo
const form = ref({
  customer_id: '',
  status: 'pending',
  shipping_address: '',
  billing_address: '',
  payment_method: '',
  payment_status: 'pending',
  tracking_number: '',
  tax_amount: 0,
  shipping_amount: 0,
  total_amount: 0,
  notes: '',
  order_items: [
    {
      product_id: '',
      quantity: 1,
      unit_price: 0,
      total_price: 0
    }
  ]
})

// Computed properties
const subtotal = computed(() => {
  return form.value.order_items.reduce((sum, item) => sum + (item.total_price || 0), 0)
})

const total = computed(() => {
  return subtotal.value + (form.value.tax_amount || 0) + (form.value.shipping_amount || 0)
})

// Métodos
const fetchCustomers = async () => {
  try {
    const { data } = await $fetch('/api/customers')
    if (data.success) {
      customers.value = data.data
    }
  } catch (error) {
    console.error('Error fetching customers:', error)
  }
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

const addProduct = () => {
  form.value.order_items.push({
    product_id: '',
    quantity: 1,
    unit_price: 0,
    total_price: 0
  })
}

const removeProduct = (index) => {
  if (form.value.order_items.length > 1) {
    form.value.order_items.splice(index, 1)
    calculateTotal()
  }
}

const calculateItemTotal = (index) => {
  const item = form.value.order_items[index]
  if (item.quantity && item.unit_price) {
    item.total_price = item.quantity * item.unit_price
    calculateTotal()
  }
}

const calculateTotal = () => {
  form.value.total_amount = total.value
}

const { formatCOP } = useCurrency()
const formatPrice = (price) => formatCOP(price)

// Inicializar formulario cuando cambie el order
watch(() => props.order, (newOrder) => {
  if (newOrder) {
    form.value = {
      customer_id: newOrder.customer_id || '',
      status: newOrder.status || 'pending',
      shipping_address: newOrder.shipping_address || '',
      billing_address: newOrder.billing_address || '',
      payment_method: newOrder.payment_method || '',
      payment_status: newOrder.payment_status || 'pending',
      tracking_number: newOrder.tracking_number || '',
      tax_amount: newOrder.tax_amount || 0,
      shipping_amount: newOrder.shipping_amount || 0,
      total_amount: newOrder.total_amount || 0,
      notes: newOrder.notes || '',
      order_items: newOrder.order_items?.length ? [...newOrder.order_items] : [
        {
          product_id: '',
          quantity: 1,
          unit_price: 0,
          total_price: 0
        }
      ]
    }
  } else {
    form.value = {
      customer_id: '',
      status: 'pending',
      shipping_address: '',
      billing_address: '',
      payment_method: '',
      payment_status: 'pending',
      tracking_number: '',
      tax_amount: 0,
      shipping_amount: 0,
      total_amount: 0,
      notes: '',
      order_items: [
        {
          product_id: '',
          quantity: 1,
          unit_price: 0,
          total_price: 0
        }
      ]
    }
  }
}, { immediate: true })

// Manejar envío del formulario
const handleSubmit = async () => {
  if (!form.value.customer_id) {
    alert('Debe seleccionar un cliente')
    return
  }

  if (form.value.order_items.length === 0) {
    alert('Debe agregar al menos un producto')
    return
  }

  // Validar que todos los productos tengan datos válidos
  for (const item of form.value.order_items) {
    if (!item.product_id || !item.quantity || !item.unit_price) {
      alert('Todos los productos deben tener datos completos')
      return
    }
  }

  loading.value = true
  
  try {
    // Calcular total final
    form.value.total_amount = total.value
    
    // Emitir evento con los datos del formulario
    emit('save', { ...form.value })
  } catch (error) {
    console.error('Error en el formulario:', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(async () => {
  await Promise.all([
    fetchCustomers(),
    fetchProducts()
  ])
})
</script>
