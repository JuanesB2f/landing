<template>
  <div class="min-h-screen flex items-center justify-center theme-container">
    <Icon name="heroicons:arrow-path" class="w-10 h-10 animate-spin text-pink-500" />
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const router = useRouter()

onMounted(() => {
  router.replace({ path: '/login', query: { tab: 'register' } })
})
</script>
