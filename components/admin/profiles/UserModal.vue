<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-10 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ user ? 'Editar Usuario' : 'Nuevo Usuario' }}
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
          <!-- Información personal -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Nombre <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.first_name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nombre"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Apellido <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.last_name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Apellido"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                :disabled="!!user"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                placeholder="email@ejemplo.com"
              />
              <p v-if="user" class="text-xs text-gray-500 mt-1">
                El email no se puede cambiar una vez creado el usuario
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                v-model="form.phone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="+52 55 1234 5678"
              />
            </div>
          </div>

          <!-- Contraseña (solo para nuevos usuarios) -->
          <div v-if="!user" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Contraseña <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.password"
                type="password"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Contraseña"
                minlength="6"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Contraseña <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.confirmPassword"
                type="password"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Confirmar contraseña"
                minlength="6"
              />
            </div>
          </div>

          <!-- Dirección -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Calle y Número
              </label>
              <input
                v-model="form.address"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Av. Insurgentes 123"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Ciudad
              </label>
              <input
                v-model="form.city"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ciudad de México"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Estado/Provincia
              </label>
              <input
                v-model="form.state"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="CDMX"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Código Postal
              </label>
              <input
                v-model="form.postal_code"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="12345"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              País
            </label>
            <input
              v-model="form.country"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="México"
            />
          </div>

          <!-- Información adicional -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Nacimiento
              </label>
              <input
                v-model="form.birth_date"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Género
              </label>
              <select
                v-model="form.gender"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Seleccionar</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="O">Otro</option>
              </select>
            </div>
          </div>

          <!-- Rol y permisos -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Rol <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.role"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Seleccionar rol</option>
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
                <option value="customer">Cliente</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                v-model="form.is_active"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option :value="true">Activo</option>
                <option :value="false">Inactivo</option>
              </select>
            </div>
          </div>

          <!-- Notas -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Notas
            </label>
            <textarea
              v-model="form.notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Información adicional sobre el usuario..."
            ></textarea>
          </div>

          <!-- Botones -->
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="loading">Guardando...</span>
              <span v-else>{{ user ? 'Actualizar' : 'Crear' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

// Estado del formulario
const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postal_code: '',
  country: '',
  birth_date: '',
  gender: '',
  role: '',
  is_active: true,
  notes: ''
})

const loading = ref(false)

// Inicializar formulario cuando se abre el modal
watch(() => props.user, (newUser) => {
  if (newUser) {
    // Editar usuario existente
    form.value = {
      first_name: newUser.first_name || '',
      last_name: newUser.last_name || '',
      email: newUser.email || '',
      password: '',
      confirmPassword: '',
      phone: newUser.phone || '',
      address: newUser.address || '',
      city: newUser.city || '',
      state: newUser.state || '',
      postal_code: newUser.postal_code || '',
      country: newUser.country || '',
      birth_date: newUser.birth_date ? newUser.birth_date.split('T')[0] : '',
      gender: newUser.gender || '',
      role: newUser.role || '',
      is_active: newUser.is_active !== undefined ? newUser.is_active : true,
      notes: newUser.notes || ''
    }
  } else {
    // Nuevo usuario
    form.value = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
      birth_date: '',
      gender: '',
      role: '',
      is_active: true,
      notes: ''
    }
  }
}, { immediate: true })

// Manejar envío del formulario
const handleSubmit = async () => {
  if (loading.value) return

  loading.value = true
  
  try {
    // Validar campos requeridos
    if (!form.value.first_name || !form.value.last_name || !form.value.email || !form.value.role) {
      alert('Por favor completa todos los campos requeridos')
      return
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.value.email)) {
      alert('Por favor ingresa un email válido')
      return
    }

    // Validar contraseña para nuevos usuarios
    if (!props.user) {
      if (!form.value.password || form.value.password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres')
        return
      }
      if (form.value.password !== form.value.confirmPassword) {
        alert('Las contraseñas no coinciden')
        return
      }
    }

    // Preparar datos para enviar
    const userData = {
      ...form.value,
      // Convertir fecha si existe
      birth_date: form.value.birth_date || null,
      // Solo incluir contraseña si es nuevo usuario
      ...(props.user ? {} : { password: form.value.password })
    }

    // Remover campos no necesarios
    delete userData.confirmPassword

    // Emitir evento para guardar
    emit('save', userData)
    
  } catch (error) {
    console.error('Error en el formulario:', error)
    alert('Error al procesar el formulario')
  } finally {
    loading.value = false
  }
}
</script>
