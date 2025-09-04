<template>
  <Teleport to="body">
  <div class="fixed inset-0 z-[9998] overflow-y-auto" role="dialog" aria-modal="true">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="fixed inset-0 bg-black/50" @click="$emit('close')"></div>

      <div class="relative z-[9999] w-full max-w-2xl bg-white rounded-lg text-left overflow-hidden shadow-xl">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-pink-100 sm:mx-0 sm:h-10 sm:w-10">
              <Icon :name="isEditing ? 'heroicons:pencil-square' : 'heroicons:plus'" class="h-6 w-6 text-pink-600" />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ isEditing ? 'Editar Producto' : 'Crear Nuevo Producto' }}
              </h3>

              <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                    <input v-model="form.name" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Nombre del producto" />
                  </div>

                  <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
                    <textarea v-model="form.description" rows="3" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Describe el producto..."></textarea>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Precio *</label>
                    <div class="relative">
                      <span class="absolute left-3 top-2 text-gray-500">$</span>
                      <input v-model.number="form.price" type="number" step="0.01" min="0" required class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="0.00" />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                    <input v-model.number="form.stock_quantity" type="number" min="0" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="0" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                    <select v-model="form.category_id" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
                      <option value="">Seleccionar categoría</option>
                      <option v-for="category in categories" :key="category.id_category" :value="category.id_category">
                        {{ category.name }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                    <input v-model="form.brand" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Marca" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                    <input v-model="form.sku" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="SKU" />
                  </div>

                  <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                    <input type="file" accept="image/*" @change="onFileChange" class="w-full" />
                  </div>

                  <div class="col-span-2">
                    <div class="flex items-center">
                      <input v-model="form.is_active" type="checkbox" id="is_active" class="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded" />
                      <label for="is_active" class="ml-2 block text-sm text-gray-900">Producto activo</label>
                    </div>
                  </div>
                </div>

                <div v-if="previewUrl" class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Vista previa</label>
                  <div class="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                    <img :src="previewUrl" :alt="form.name" class="w-full h-full object-cover" @error="onImageError" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="submit" @click="handleSubmit" :disabled="loading" class="w-full btn btn-primary sm:ml-3 sm:w-auto sm:text-sm">
            <Icon v-if="loading" name="heroicons:arrow-path" class="w-4 h-4 mr-2 animate-spin" />
            {{ isEditing ? 'Actualizar' : 'Crear' }}
          </button>
          <button type="button" @click="$emit('close')" class="mt-3 w-full btn btn-secondary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
  </Teleport>
</template>

<script setup lang="ts">
type CategoryOption = { id_category: string; name: string }

const props = withDefaults(defineProps<{
  product?: any | null
  categories: CategoryOption[]
}>(), {
  product: null,
  categories: () => [] as CategoryOption[]
})

const emit = defineEmits(['close', 'save'])

const loading = ref(false)
const form = ref({
  name: '',
  description: '',
  price: 0,
  stock_quantity: 0,
  category_id: '',
  brand: '',
  sku: '',
  is_active: true
})
const file = ref<File | null>(null)
const previewUrl = ref('')

const isEditing = computed(() => !!props.product)

const initForm = () => {
  if (props.product) {
    form.value = {
      name: props.product.name,
      description: props.product.description,
      price: props.product.price,
      stock_quantity: props.product.stock_quantity,
      category_id: props.product.category_id,
      brand: props.product.brand,
      sku: props.product.sku,
      is_active: props.product.is_active
    }
    previewUrl.value = props.product.image_url || ''
  } else {
    form.value = {
      name: '',
      description: '',
      price: 0,
      stock_quantity: 0,
      category_id: '',
      brand: '',
      sku: '',
      is_active: true
    }
    previewUrl.value = ''
    file.value = null
  }
}

const validate = () => {
  if (!form.value.name.trim()) return alert('El nombre es obligatorio'), false
  if (!form.value.description.trim()) return alert('La descripción es obligatoria'), false
  if (form.value.price <= 0) return alert('El precio debe ser mayor a 0'), false
  if (form.value.stock_quantity < 0) return alert('El stock no puede ser negativo'), false
  if (!form.value.category_id) return alert('Debe seleccionar una categoría'), false
  if (!form.value.sku.trim()) return alert('El SKU es obligatorio'), false
  return true
}

const handleSubmit = async () => {
  if (!validate()) return
  loading.value = true
  try {
    // Validar SKU único
    const params = new URLSearchParams({ sku: form.value.sku })
    if (props.product?.id_product) params.set('exclude_id', props.product.id_product)
    const resp = await $fetch<{ data: { success: boolean; data?: { exists: boolean }; error?: string } }>(`/api/products/check-sku?${params.toString()}`)
    if (resp.data.success && resp.data.data?.exists) {
      alert('El SKU ya está en uso. Elige otro.')
      return
    }

    // Construir FormData para enviar archivo + datos
    const fd = new FormData()
    Object.entries(form.value).forEach(([k, v]) => fd.append(k, String(v)))
    fd.set('price', String(parseFloat(String(form.value.price))))
    fd.set('stock_quantity', String(parseInt(String(form.value.stock_quantity))))
    if (file.value) fd.append('image', file.value)

    if (props.product?.id_product) fd.append('id_product', props.product.id_product)
    emit('save', fd)
  } finally {
    loading.value = false
  }
}

const onImageError = () => {
  previewUrl.value = ''
}

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const f = target.files && target.files[0]
  if (!f) return
  file.value = f
  previewUrl.value = URL.createObjectURL(f)
}

onMounted(() => initForm())
watch(() => props.product, initForm, { immediate: true })
</script>


