<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="ios-admin-overlay fixed inset-0 z-40" aria-hidden="true"></div>
    <div
      class="relative z-50 ios-admin-modal-panel max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
      role="dialog"
      aria-modal="true"
      @click.stop
    >
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Detalles del cliente</h2>
          <p v-if="customer" class="text-sm text-gray-500">ID: {{ String(customer.id_customer || '').slice(0, 8) }}…</p>
        </div>
        <button
          type="button"
          class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Cerrar"
          @click="$emit('close')"
        >
          <Icon name="heroicons:x-mark" class="w-6 h-6" />
        </button>
      </div>

      <div class="overflow-y-auto px-6 py-4 flex-1 space-y-6">
        <div v-if="customer" class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span class="text-gray-500">Nombre</span>
            <p class="font-medium text-gray-900 dark:text-white">{{ customer.first_name }} {{ customer.last_name }}</p>
          </div>
          <div>
            <span class="text-gray-500">Email</span>
            <p class="font-medium text-gray-900 dark:text-white break-all">{{ customer.email || '—' }}</p>
          </div>
          <div>
            <span class="text-gray-500">Teléfono</span>
            <p class="font-medium">{{ customer.phone || 'N/A' }}</p>
          </div>
          <div>
            <span class="text-gray-500">Estado</span>
            <p>
              <span
                :class="customer.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                class="inline-flex px-2 py-0.5 rounded-full text-xs font-medium"
              >
                {{ customer.is_active ? 'Activo' : 'Inactivo' }}
              </span>
            </p>
          </div>
          <div class="sm:col-span-2">
            <span class="text-gray-500">Ubicación</span>
            <p class="font-medium">
              {{ [customer.address, customer.city, customer.state, customer.country].filter(Boolean).join(', ') || 'N/A' }}
            </p>
          </div>
        </div>

        <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            type="button"
            class="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800/50 text-left font-medium text-gray-900 dark:text-white"
            @click="historyOpen = !historyOpen"
          >
            <span class="flex items-center gap-2">
              <Icon name="heroicons:shopping-bag" class="w-5 h-5 text-purple-600" />
              Historial de compras
            </span>
            <Icon :name="historyOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'" class="w-5 h-5 text-gray-500" />
          </button>

          <div v-show="historyOpen" class="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div v-if="loadingOrders" class="text-sm text-gray-500 py-4 text-center">Cargando pedidos…</div>
            <div v-else-if="ordersError" class="text-sm text-red-600 py-2">{{ ordersError }}</div>
            <div v-else-if="!orders.length" class="text-sm text-gray-500 py-4 text-center">Sin pedidos registrados.</div>
            <p v-if="orders.length" class="text-xs text-gray-500 mb-2">
              Puedes gestionar estos pedidos desde
              <NuxtLink to="/admin/orders" class="text-green-600 hover:underline font-medium" @click="$emit('close')">Pedidos</NuxtLink>.
            </p>
            <div v-if="orders.length" class="space-y-3 max-h-64 overflow-y-auto">
              <div
                v-for="o in orders"
                :key="o.id_order"
                class="rounded-lg border border-gray-100 dark:border-gray-700 p-3 text-sm"
              >
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span class="font-semibold text-gray-900 dark:text-white">#{{ String(o.id_order || '').slice(0, 8) }}</span>
                    <span class="text-gray-500 ml-2">{{ formatDate(o.created_at) }}</span>
                  </div>
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-gray-800">{{ statusLabel(o.status) }}</span>
                    <span class="px-2 py-0.5 rounded text-xs bg-emerald-50 text-emerald-800">{{ payLabel(o.payment_status) }}</span>
                    <span class="font-semibold text-purple-700">{{ formatCOP(Number(o.total_amount || 0)) }}</span>
                  </div>
                </div>
                <ul v-if="o.order_items?.length" class="mt-2 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li v-for="it in o.order_items" :key="it.id_order_item">
                    {{ it.product?.name || 'Producto' }} × {{ it.quantity }} — {{ formatCOP(Number(it.total_price ?? it.quantity * it.unit_price)) }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-end">
        <button
          type="button"
          class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium"
          @click="$emit('close')"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  customer: { type: Object, default: null }
})
defineEmits(['close'])

const { formatCOP } = useCurrency()

const historyOpen = ref(true)
const loadingOrders = ref(false)
const ordersError = ref('')
const orders = ref([])

const formatDate = (d) => {
  if (!d) return '—'
  return new Date(d).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })
}

const statusLabel = (s) =>
  ({ pending: 'Pendiente', confirmed: 'Confirmado', shipped: 'Enviado', delivered: 'Entregado', cancelled: 'Cancelado' }[s] || s || '—')

const payLabel = (p) =>
  ({ pending: 'Pago pendiente', paid: 'Pagado', failed: 'Fallido', refunded: 'Reembolsado' }[p] || p || '—')

const loadOrders = async () => {
  if (!props.customer?.id_customer) return
  loadingOrders.value = true
  ordersError.value = ''
  orders.value = []
  try {
    const { data } = await $fetch(`/api/customers/${props.customer.id_customer}/orders`)
    if (data?.success && data?.data?.orders) {
      orders.value = data.data.orders
    } else {
      ordersError.value = data?.error || 'No se pudieron cargar los pedidos'
    }
  } catch (e) {
    ordersError.value = 'Error al cargar el historial'
    console.error(e)
  } finally {
    loadingOrders.value = false
  }
}

watch(
  () => props.customer,
  (c) => {
    if (c?.id_customer) {
      historyOpen.value = true
      loadOrders()
    }
  },
  { immediate: true }
)
</script>
