<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ provider ? 'Editar Proveedor' : 'Nuevo Proveedor' }}
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600"
          >
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Nombre -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nombre del proveedor"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              v-model="form.email"
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="email@proveedor.com"
            />
          </div>

          <!-- Teléfono -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              v-model="form.phone"
              type="tel"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="+52 123 456 7890"
            />
          </div>

          <!-- Persona de contacto -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Persona de Contacto
            </label>
            <input
              v-model="form.contact_person"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nombre del contacto"
            />
          </div>

          <!-- Dirección -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <textarea
              v-model="form.address"
              rows="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Dirección completa"
            ></textarea>
          </div>

          <!-- Ciudad -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Ciudad
            </label>
            <input
              v-model="form.city"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ciudad"
            />
          </div>

          <!-- Estado activo -->
          <div class="flex items-center">
            <input
              v-model="form.is_active"
              type="checkbox"
              id="is_active"
              class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label for="is_active" class="ml-2 block text-sm text-gray-900">
              Proveedor activo
            </label>
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
              <span v-else>{{ provider ? 'Actualizar' : 'Crear' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  provider: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const loading = ref(false)

// Formulario reactivo
const form = ref({
  name: '',
  email: '',
  phone: '',
  contact_person: '',
  address: '',
  city: '',
  is_active: true
})

// Inicializar formulario cuando cambie el provider
watch(() => props.provider, (newProvider) => {
  if (newProvider) {
    form.value = {
      name: newProvider.name || '',
      email: newProvider.email || '',
      phone: newProvider.phone || '',
      contact_person: newProvider.contact_person || '',
      address: newProvider.address || '',
      city: newProvider.city || '',
      is_active: newProvider.is_active !== undefined ? newProvider.is_active : true
    }
  } else {
    form.value = {
      name: '',
      email: '',
      phone: '',
      contact_person: '',
      address: '',
      city: '',
      is_active: true
    }
  }
}, { immediate: true })

// Manejar envío del formulario
const handleSubmit = async () => {
  if (!form.value.name.trim()) {
    alert('El nombre es obligatorio')
    return
  }

  loading.value = true
  
  try {
    // Emitir evento con los datos del formulario
    emit('save', { ...form.value })
  } catch (error) {
    console.error('Error en el formulario:', error)
  } finally {
    loading.value = false
  }
}
</script>
