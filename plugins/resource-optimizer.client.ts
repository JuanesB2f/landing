/**
 * Marca imágenes below-the-fold como lazy sin MutationObserver permanente
 * ni precargas duplicadas de fuentes (Nuxt UI ya gestiona tipografía).
 */
export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const markImagesLazy = () => {
    document.querySelectorAll('img:not([loading])').forEach((node) => {
      const img = node as HTMLImageElement
      if (img.hasAttribute('data-priority') || img.closest('[data-above-fold]')) return
      img.loading = 'lazy'
      img.decoding = 'async'
    })
  }

  const run = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', markImagesLazy, { once: true })
    } else {
      markImagesLazy()
    }
  }

  run()

  const router = useRouter()
  router.afterEach(() => {
    nextTick(markImagesLazy)
  })
})
