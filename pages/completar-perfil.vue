<template>
  <div class="ios-profile-complete-wrap theme-container">
    <div class="ios-profile-orb ios-profile-orb--a" aria-hidden="true" />
    <div class="ios-profile-orb ios-profile-orb--b" aria-hidden="true" />

    <div class="ios-profile-glass-card">
      <div class="px-6 pt-9 pb-6 text-center border-b border-[var(--ios-hairline)]">
        <div class="ios-profile-hero-icon mb-5">
          <Icon name="heroicons:user-circle" class="w-8 h-8 text-[var(--accent)]" />
        </div>
        <h1 class="text-[1.65rem] sm:text-[1.75rem] font-bold tracking-tight theme-text-primary leading-tight">
          Completa tu perfil
        </h1>
        <p class="mt-2.5 text-[0.9375rem] leading-relaxed theme-text-secondary max-w-[22rem] mx-auto">
          Unos datos básicos para identificarte además de tu cuenta. Son obligatorios para seguir.
        </p>
      </div>

      <form class="px-5 sm:px-6 pb-8 pt-5" @submit.prevent="submit">
        <p class="ios-profile-group-title">Datos obligatorios</p>
        <div class="ios-profile-inset-group">
          <div class="ios-profile-field">
            <label class="ios-profile-field-label" for="cp-first">Nombre</label>
            <input
              id="cp-first"
              v-model="form.first_name"
              type="text"
              required
              autocomplete="given-name"
              class="ios-profile-field-input"
              placeholder="Tu nombre"
            />
          </div>
          <div class="ios-profile-field">
            <label class="ios-profile-field-label" for="cp-last">Apellido</label>
            <input
              id="cp-last"
              v-model="form.last_name"
              type="text"
              required
              autocomplete="family-name"
              class="ios-profile-field-input"
              placeholder="Tu apellido"
            />
          </div>
          <div class="ios-profile-field">
            <label class="ios-profile-field-label" for="cp-birth">Fecha de nacimiento</label>
            <input
              id="cp-birth"
              v-model="form.birth_date"
              type="date"
              required
              :max="maxBirthDate"
              class="ios-profile-field-input"
              @change="onBirthChange"
            />
            <div v-if="age !== null" class="ios-profile-age-pill">
              <Icon name="heroicons:calendar-days" class="w-4 h-4 opacity-80" />
              <span>{{ age }} años</span>
            </div>
          </div>
        </div>

        <p class="ios-profile-group-title">Opcional</p>
        <div class="ios-profile-inset-group">
          <div class="ios-profile-field">
            <label class="ios-profile-field-label" for="cp-phone">
              Teléfono
              <span class="ios-profile-optional">· recomendado</span>
            </label>
            <input
              id="cp-phone"
              v-model="form.phone"
              type="tel"
              autocomplete="tel"
              class="ios-profile-field-input"
              placeholder="+57 …"
            />
          </div>
          <div class="ios-profile-field">
            <label class="ios-profile-field-label" for="cp-id">Identificación adicional</label>
            <input
              id="cp-id"
              v-model="form.identification"
              type="text"
              class="ios-profile-field-input"
              placeholder="Documento o referencia"
            />
            <p class="mt-2 text-[0.75rem] leading-snug theme-text-muted">
              Opcional. Puede ayudar a validar tu cuenta fuera del correo de Google.
            </p>
          </div>
          <div class="ios-profile-field">
            <label class="ios-profile-field-label" for="cp-gender">
              Género
              <span class="ios-profile-optional">· opcional</span>
            </label>
            <select id="cp-gender" v-model="form.gender" class="ios-profile-field-select">
              <option value="">Prefiero no decir</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </select>
          </div>
        </div>

        <div v-if="error" class="ios-profile-error">
          {{ error }}
        </div>

        <button type="submit" class="ios-profile-submit" :disabled="saving">
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
const { checkAuth } = useAuth()

const saving = ref(false)
const error = ref('')

function withTimeout(promise, ms, label) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${label} tardó demasiado`)), ms)
    promise
      .then((value) => {
        clearTimeout(timer)
        resolve(value)
      })
      .catch((err) => {
        clearTimeout(timer)
        reject(err)
      })
  })
}

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
    const res = await withTimeout(
      $fetch('/api/auth/complete-profile', {
      method: 'POST',
      body: {
        first_name: form.first_name,
        last_name: form.last_name,
        birth_date: form.birth_date,
        phone: form.phone || null,
        identification: form.identification || null,
        gender: form.gender || null
      }
      }),
      15000,
      'Guardar perfil'
    )
    const payload = res?.data ?? res
    if (!payload?.success) {
      error.value = payload?.error || 'No se pudo guardar'
      return
    }

    // El perfil ya está en BD (API con service role). Sincronizar estado local y navegar sin recargar todo el documento (mucho más rápido).
    try {
      await withTimeout(checkAuth(), 6000, 'Actualizar cuenta')
    } catch (e) {
      console.warn('[completar-perfil] checkAuth', e)
    }

    $toast?.success('Perfil guardado')

    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : ''
    const targetPath = redirect && redirect.startsWith('/') ? redirect : '/user'

    await navigateTo(targetPath, { replace: true })
  } catch (e) {
    console.error('[completar-perfil] submit', e)
    error.value = e instanceof Error ? e.message : 'Error al guardar. Intenta de nuevo.'
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
