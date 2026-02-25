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
const user = useSupabaseUser()
const error = ref('')

// Esperar a que Supabase procese el callback (hash/query) y haya sesión, luego redirigir
const resolveRedirect = async () => {
  if (!import.meta.client) return

  const maxWait = 8000
  const start = Date.now()
  while (Date.now() - start < maxWait) {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      try {
        await $fetch('/api/auth/upsert-profile', { method: 'POST' })
      } catch (_e) {}
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle()
        const role = (profile as { role?: string } | null)?.role
        if (role === 'admin') {
          await router.replace('/dashboard')
          return
        }
        if (role === 'user' || role === 'customer') {
          await router.replace('/user')
          return
        }
      } catch (_e) {}
      await router.replace('/')
      return
    }
    await new Promise(r => setTimeout(r, 150))
  }

  error.value = 'No se pudo completar el inicio de sesión.'
  setTimeout(() => router.replace('/login'), 2000)
}

onMounted(() => {
  resolveRedirect()
})
</script>
