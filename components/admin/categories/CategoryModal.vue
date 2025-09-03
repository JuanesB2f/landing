<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('close')"></div>

      <!-- Modal -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <Icon 
                :name="isEditing ? 'heroicons:pencil-square' : 'heroicons:plus'" 
                class="h-6 w-6 text-blue-600" 
              />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ isEditing ? 'Editar Categoría' : 'Crear Nueva Categoría' }}
              </h3>
              
              <!-- Formulario -->
              <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
                <!-- Nombre de la categoría -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de la Categoría *
                  </label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Electrónicos"
                  />
                </div>

                <!-- Descripción -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    v-model="form.description"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe la categoría..."
                  ></textarea>
                </div>

                <!-- Estado activo -->
                <div>
                  <div class="flex items-center">
                    <input
                      v-model="form.is_active"
                      type="checkbox"
                      id="is_active"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label for="is_active" class="ml-2 block text-sm text-gray-900">
                      Categoría activa (visible en la tienda)
                    </label>
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
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon v-if="loading" name="heroicons:arrow-path" class="w-4 h-4 mr-2 animate-spin" />
            {{ isEditing ? 'Actualizar' : 'Crear' }}
          </button>
          <button
            type="button"
            @click="$emit('close')"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
  category: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

// Estado reactivo
const loading = ref(false)
const form = ref({
  name: '',
  description: '',
  is_active: true
})

// Computed properties
const isEditing = computed(() => !!props.category)

// Métodos
const initializeForm = () => {
  if (props.category) {
    form.value = {
      name: props.category.name,
      description: props.category.description || '',
      is_active: props.category.is_active
    }
  } else {
    form.value = {
      name: '',
      description: '',
      is_active: true
    }
  }
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    const categoryData = {
      ...form.value
    }

    if (props.category) {
      categoryData.id_category = props.category.id_category
    }

    emit('save', categoryData)
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    loading.value = false
  }
}

const validateForm = () => {
  if (!form.value.name.trim()) {
    alert('El nombre de la categoría es obligatorio')
    return false
  }
  return true
}

// Lifecycle
onMounted(() => {
  initializeForm()
})

// Watch para cambios en la categoría
watch(() => props.category, () => {
  initializeForm()
}, { immediate: true })
</script>
