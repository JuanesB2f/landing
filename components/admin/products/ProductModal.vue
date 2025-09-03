<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('close')"></div>

      <!-- Modal -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-pink-100 sm:mx-0 sm:h-10 sm:w-10">
              <Icon 
                :name="isEditing ? 'heroicons:pencil-square' : 'heroicons:plus'" 
                class="h-6 w-6 text-pink-600" 
              />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ isEditing ? 'Editar Producto' : 'Crear Nuevo Producto' }}
              </h3>
              
              <!-- Formulario -->
              <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Nombre del producto -->
                  <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Nombre del Producto *
                    </label>
                    <input
                      v-model="form.name"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Ej: Laptop Gaming Pro"
                    />
                  </div>

                  <!-- Descripción -->
                  <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Descripción *
                    </label>
                    <textarea
                      v-model="form.description"
                      rows="3"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Describe las características del producto..."
                    ></textarea>
                  </div>

                  <!-- Precio -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Precio *
                    </label>
                    <div class="relative">
                      <span class="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        v-model="form.price"
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <!-- Stock -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Cantidad en Stock *
                    </label>
                    <input
                      v-model="form.stock_quantity"
                      type="number"
                      min="0"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="0"
                    />
                  </div>

                  <!-- Categoría -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Categoría *
                    </label>
                    <select
                      v-model="form.category_id"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="">Seleccionar categoría</option>
                      <option v-for="category in categories" :key="category.id_category" :value="category.id_category">
                        {{ category.name }}
                      </option>
                    </select>
                  </div>

                  <!-- Marca -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Marca
                    </label>
                    <input
                      v-model="form.brand"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Ej: TechBrand"
                    />
                  </div>

                  <!-- SKU -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      SKU *
                    </label>
                    <input
                      v-model="form.sku"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Ej: LAP-001"
                    />
                  </div>

                  <!-- URL de imagen -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      URL de Imagen
                    </label>
                    <input
                      v-model="form.image_url"
                      type="url"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>

                  <!-- Estado activo -->
                  <div class="col-span-2">
                    <div class="flex items-center">
                      <input
                        v-model="form.is_active"
                        type="checkbox"
                        id="is_active"
                        class="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                      />
                      <label for="is_active" class="ml-2 block text-sm text-gray-900">
                        Producto activo (visible en la tienda)
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Vista previa de imagen -->
                <div v-if="form.image_url" class="col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Vista Previa de la Imagen
                  </label>
                  <div class="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                    <img
                      :src="form.image_url"
                      :alt="form.name"
                      class="w-full h-full object-cover"
                      @error="handleImageError"
                    />
                  </div>
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
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon v-if="loading" name="heroicons:arrow-path" class="w-4 h-4 mr-2 animate-spin" />
            {{ isEditing ? 'Actualizar' : 'Crear' }}
          </button>
          <button
            type="button"
            @click="$emit('close')"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancelar
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
    default: null
  },
  categories: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['close', 'save'])

// Estado reactivo
const loading = ref(false)
const form = ref({
  name: '',
  description: '',
  price: 0,
  stock_quantity: 0,
  category_id: '',
  brand: '',
  sku: '',
  image_url: '',
  is_active: true
})

// Computed properties
const isEditing = computed(() => !!props.product)

// Métodos
const initializeForm = () => {
  if (props.product) {
    form.value = {
      name: props.product.name,
      description: props.product.description,
      price: props.product.price,
      stock_quantity: props.product.stock_quantity,
      category_id: props.product.category_id,
      brand: props.product.brand,
      sku: props.product.sku,
      image_url: props.product.image_url || '',
      is_active: props.product.is_active
    }
  } else {
    form.value = {
      name: '',
      description: '',
      price: 0,
      stock_quantity: 0,
      category_id: '',
      brand: '',
      sku: '',
      image_url: '',
      is_active: true
    }
  }
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    const productData = {
      ...form.value,
      price: parseFloat(form.value.price),
      stock_quantity: parseInt(form.value.stock_quantity)
    }

    if (props.product) {
      productData.id_product = props.product.id_product
    }

    emit('save', productData)
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    loading.value = false
  }
}

const validateForm = () => {
  if (!form.value.name.trim()) {
    alert('El nombre del producto es obligatorio')
    return false
  }
  if (!form.value.description.trim()) {
    alert('La descripción del producto es obligatoria')
    return false
  }
  if (form.value.price <= 0) {
    alert('El precio debe ser mayor a 0')
    return false
  }
  if (form.value.stock_quantity < 0) {
    alert('El stock no puede ser negativo')
    return false
  }
  if (!form.value.category_id) {
    alert('Debe seleccionar una categoría')
    return false
  }
  if (!form.value.sku.trim()) {
    alert('El SKU es obligatorio')
    return false
  }
  return true
}

const handleImageError = () => {
  form.value.image_url = ''
  alert('La URL de la imagen no es válida o no se puede cargar')
}

// Lifecycle
onMounted(() => {
  initializeForm()
})

// Watch para cambios en el producto
watch(() => props.product, () => {
  initializeForm()
}, { immediate: true })
</script>
