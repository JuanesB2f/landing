<template>
  <Teleport to="body">
  <div class="fixed inset-0 z-[9998] overflow-y-auto" role="dialog" aria-modal="true">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="fixed inset-0 bg-black/50" @click="$emit('close')"></div>

      <div class="relative z-[9999] w-full max-w-2xl bg-white rounded-lg text-left overflow-hidden shadow-xl">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
              <Icon name="heroicons:building-storefront" class="h-6 w-6 text-green-600" />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ provider ? 'Editar Proveedor' : 'Nuevo Proveedor' }}
              </h3>

              <!-- Formulario -->
              <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
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
              </form>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            @click="handleSubmit"
            :disabled="loading"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon v-if="loading" name="heroicons:arrow-path" class="w-4 h-4 mr-2 animate-spin" />
            {{ provider ? 'Actualizar' : 'Crear' }}
          </button>
          <button
            type="button"
            @click="$emit('close')"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
