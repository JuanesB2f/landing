<template>
  <div class="min-h-screen theme-container py-10 px-4">
    <div class="max-w-lg mx-auto theme-card-bg rounded-2xl shadow-lg border theme-border p-8">
      <div class="text-center mb-8">
        <div class="inline-flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30 mb-4">
          <Icon name="heroicons:user-circle" class="w-8 h-8 text-pink-600" />
        </div>
        <h1 class="text-2xl font-bold theme-text-primary">Completa tu perfil</h1>
        <p class="mt-2 text-sm theme-text-secondary">
          Necesitamos algunos datos para identificarte además de tu cuenta. Son obligatorios para continuar.
        </p>
      </div>

      <form class="space-y-5" @submit.prevent="submit">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium theme-text-primary mb-1">Nombre</label>
            <input
              v-model="form.first_name"
              type="text"
              required
              class="w-full rounded-lg border theme-border px-3 py-2 theme-text-primary bg-white dark:bg-gray-900"
              placeholder="Nombre"
            />
          </div>
          <div>
            <label class="block text-sm font-medium theme-text-primary mb-1">Apellido</label>
            <input
              v-model="form.last_name"
              type="text"
              required
              class="w-full rounded-lg border theme-border px-3 py-2 theme-text-primary bg-white dark:bg-gray-900"
              placeholder="Apellido"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium theme-text-primary mb-1">Fecha de nacimiento</label>
          <input
            v-model="form.birth_date"
            type="date"
            required
            :max="maxBirthDate"
            class="w-full rounded-lg border theme-border px-3 py-2 theme-text-primary bg-white dark:bg-gray-900"
            @change="onBirthChange"
          />
        </div>

        <div v-if="age !== null" class="rounded-lg bg-gray-50 dark:bg-gray-800/50 px-4 py-3 text-sm theme-text-secondary">
          <span class="font-medium theme-text-primary">Edad:</span>
          {{ age }} años
        </div>

        <div>
          <label class="block text-sm font-medium theme-text-primary mb-1">Teléfono <span class="text-gray-400 font-normal">(recomendado)</span></label>
          <input
            v-model="form.phone"
            type="tel"
            class="w-full rounded-lg border theme-border px-3 py-2 theme-text-primary bg-white dark:bg-gray-900"
            placeholder="+52 …"
          />
        </div>

        <div>
          <label class="block text-sm font-medium theme-text-primary mb-1">Identificación adicional</label>
          <input
            v-model="form.identification"
            type="text"
            class="w-full rounded-lg border theme-border px-3 py-2 theme-text-primary bg-white dark:bg-gray-900"
            placeholder="Documento o referencia (opcional)"
          />
          <p class="mt-1 text-xs theme-text-muted">Opcional. Ayuda a validar tu cuenta fuera del correo de Google.</p>
        </div>

        <div>
          <label class="block text-sm font-medium theme-text-primary mb-1">Género <span class="text-gray-400 font-normal">(opcional)</span></label>
          <select
            v-model="form.gender"
            class="w-full rounded-lg border theme-border px-3 py-2 theme-text-primary bg-white dark:bg-gray-900"
          >
            <option value="">Prefiero no decir</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
          </select>
        </div>

        <div v-if="error" class="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="saving"
          class="w-full py-3 rounded-xl font-semibold text-white bg-pink-600 hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ saving ? 'Guardando…' : 'Guardar y continuar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computeAgeFromBirthDate, needsProfileCompletion } from '~/utils/profileCompletion'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()
const { $toast } = useNuxtApp()

const saving = ref(false)
const error = ref('')

const maxBirthDate = computed(() => {
  const d = new Date()
  d.setFullYear(d.getFullYear() - 13)
  return d.toISOString().slice(0, 10)
})

const form = reactive({
  first_name: '',
  last_name: '',
  birth_date: '',
  phone: '',
  identification: '',
  gender: ''
})

const age = computed(() => {
  if (!form.birth_date) return null
  return computeAgeFromBirthDate(form.birth_date)
})

function onBirthChange() {
  error.value = ''
}

async function loadExisting() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    await navigateTo('/login')
    return
  }
  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name, birth_date, phone, gender')
    .eq('id', session.user.id)
    .maybeSingle()
  if (profile) {
    if (profile.first_name) form.first_name = profile.first_name
    if (profile.last_name) form.last_name = profile.last_name
    if (profile.birth_date) form.birth_date = String(profile.birth_date).slice(0, 10)
    if (profile.phone) form.phone = profile.phone
    if (profile.gender) form.gender = profile.gender
  }
}

async function submit() {
  saving.value = true
  error.value = ''
  try {
    const res = await $fetch('/api/auth/complete-profile', {
      method: 'POST',
      body: {
        first_name: form.first_name,
        last_name: form.last_name,
        birth_date: form.birth_date,
        phone: form.phone || null,
        identification: form.identification || null,
        gender: form.gender || null
      }
    })
    const payload = res?.data ?? res
    if (!payload?.success) {
      error.value = payload?.error || 'No se pudo guardar'
      return
    }
    $toast?.success('Perfil guardado')
    await supabase.auth.refreshSession()
    const { checkAuth } = useAuth()
    await checkAuth()
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : ''
    if (redirect && redirect.startsWith('/')) {
      await router.replace(redirect)
    } else {
      await router.replace('/user')
    }
  } catch (e) {
    console.error(e)
    error.value = 'Error al guardar. Intenta de nuevo.'
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await loadExisting()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    await navigateTo('/login')
    return
  }
  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name, birth_date, role')
    .eq('id', session.user.id)
    .maybeSingle()
  if (!needsProfileCompletion(profile)) {
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/user'
    await router.replace(redirect.startsWith('/') ? redirect : '/user')
  }
})
</script>
