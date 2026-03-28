<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
    <div class="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col p-3 sm:p-4">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold theme-text-primary">Historial de movimientos</h3>
        <button type="button" @click="$emit('close')" class="theme-text-secondary hover:theme-text-primary p-1 rounded-lg">
          <Icon name="heroicons:x-mark" class="w-5 h-5" />
        </button>
      </div>
      <div class="max-h-[60vh] overflow-y-auto overflow-x-hidden">
        <div class="admin-table-scroll">
          <table class="min-w-full admin-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Cantidad</th>
                <th>Stock</th>
                <th>Motivo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in movements" :key="m.id_movement">
                <td class="text-sm">{{ formatDate(m.movement_date || m.created_at) }}</td>
                <td class="text-sm">{{ m.movement_type }}</td>
                <td class="text-sm">{{ m.quantity }}</td>
                <td class="text-sm">{{ m.stock_before }} → {{ m.stock_after }}</td>
                <td class="text-sm break-words max-w-[140px]">{{ m.reason }}</td>
              </tr>
              <tr v-if="!loading && movements.length === 0">
                <td colspan="5" class="py-6 text-center text-sm theme-text-muted">Sin movimientos</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="loading" class="py-6 text-center text-sm text-gray-500">Cargando...</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ product?: any }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const loading = ref(false)
const movements = ref<any[]>([])

const formatDate = (d?: string) => {
  if (!d) return 'N/A'
  return new Date(d).toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}

onMounted(async () => {
  if (!props.product?.id_product) return
  loading.value = true
  try {
    const resp: any = await $fetch('/api/inventory/movements', { method: 'GET', query: { product_id: props.product.id_product } })
    if (resp?.data?.success) {
      movements.value = resp.data.data || []
    }
  } catch (e) {
    console.error('Error cargando movimientos:', e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
</style>


