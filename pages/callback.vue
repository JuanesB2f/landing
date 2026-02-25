<template>
  <div class="min-h-screen flex items-center justify-center theme-container p-4">
    <div class="text-center">
      <Icon name="heroicons:arrow-path" class="w-12 h-12 mx-auto mb-4 animate-spin theme-text-primary" />
      <p class="theme-text-primary font-medium">Completando inicio de sesión...</p>
      <p v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  auth: false
})

const router = useRouter()
const supabase = useSupabaseClient()
const error = ref('')

// Esperar a que Supabase procese el callback (hash/query) y haya sesión, luego redirigir
const resolveRedirect = () => {
  if (!import.meta.client) return

  const maxWait = 8000
  const start = Date.now()

  const checkSession = async () => {
    const res = await supabase.auth.getSession()
    const session = res.data ? res.data.session : null
    if (session && session.user) {
      try {
        await $fetch('/api/auth/upsert-profile', { method: 'POST' })
      } catch (_e) {}
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle()
        const role = profile ? profile.role : null
        if (role === 'admin') {
          await router.replace('/dashboard')
          return true
        }
        if (role === 'user' || role === 'customer') {
          await router.replace('/user')
          return true
        }
      } catch (_e) {}
      await router.replace('/')
      return true
    }
    return false
  }

  const poll = async () => {
    if (Date.now() - start > maxWait) {
      error.value = 'No se pudo completar el inicio de sesión.'
      setTimeout(() => router.replace('/login'), 2000)
      return
    }
    const done = await checkSession()
    if (done) return
    setTimeout(poll, 150)
  }

  poll()
}

onMounted(() => {
  resolveRedirect()
})
</script>
