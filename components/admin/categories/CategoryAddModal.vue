<template>
  <Teleport to="body">
  <div class="fixed inset-0 z-[9998] overflow-y-auto" role="dialog" aria-modal="true">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="fixed inset-0 bg-black/50" @click="$emit('close')"></div>

      <div class="relative z-[9999] w-full max-w-xl bg-white rounded-lg text-left overflow-hidden shadow-xl">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <Icon :name="isEditing ? 'heroicons:pencil-square' : 'heroicons:plus'" class="h-6 w-6 text-blue-600" />
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ isEditing ? 'Editar Categoría' : 'Crear Nueva Categoría' }}
              </h3>

              <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
                <div class="grid grid-cols-1 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                    <input v-model="form.name" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nombre de la categoría" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea v-model="form.description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Descripción (opcional)"></textarea>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Imagen (opcional)</label>
                    <input type="file" accept="image/*" @change="onFileChange" class="w-full" />
                  </div>

                  <div class="flex items-center">
                    <input v-model="form.is_active" type="checkbox" id="is_active" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label for="is_active" class="ml-2 block text-sm text-gray-900">Categoría activa</label>
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
          <button type="submit" @click="handleSubmit" :disabled="loading" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
            <Icon v-if="loading" name="heroicons:arrow-path" class="w-4 h-4 mr-2 animate-spin" />
            {{ isEditing ? 'Actualizar' : 'Crear' }}
          </button>
          <button type="button" @click="$emit('close')" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps({
  category: { type: Object, default: null }
})

const emit = defineEmits(['close', 'save'])

const loading = ref(false)
const form = ref({
  name: '',
  description: '',
  is_active: true
})
const file = ref<File | null>(null)
const previewUrl = ref('')

const isEditing = computed(() => !!props.category)

const initForm = () => {
  if (props.category) {
    form.value = {
      name: props.category.name,
      description: props.category.description || '',
      is_active: props.category.is_active
    }
    previewUrl.value = props.category.image_url || ''
  } else {
    form.value = { name: '', description: '', is_active: true }
    previewUrl.value = ''
    file.value = null
  }
}

const validate = () => {
  if (!form.value.name.trim()) return alert('El nombre es obligatorio'), false
  return true
}

const handleSubmit = async () => {
  if (!validate()) return
  loading.value = true
  try {
    const fd = new FormData()
    Object.entries(form.value).forEach(([k, v]) => fd.append(k, String(v)))
    if (file.value) fd.append('image', file.value)
    if (props.category?.id_category) fd.append('id_category', props.category.id_category)
    emit('save', fd)
  } finally {
    loading.value = false
  }
}

const onImageError = () => { previewUrl.value = '' }
const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const f = target.files && target.files[0]
  if (!f) return
  file.value = f
  previewUrl.value = URL.createObjectURL(f)
}

onMounted(() => initForm())
watch(() => props.category, initForm, { immediate: true })
</script>


