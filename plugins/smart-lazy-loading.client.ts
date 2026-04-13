/**
 * Lazy loading para useLazyImage: sin precargar todas las <img> del documento (evita doble descarga).
 */

interface LazyImageOptions {
  src: string
  alt: string
  placeholder?: string
  priority?: boolean
  quality?: number
  sizes?: string
}

interface LazyImageElement extends HTMLImageElement {
  _lazyOptions?: LazyImageOptions
  _lazyObserver?: IntersectionObserver
  _lazyLoaded?: boolean
}

export default defineNuxtPlugin(() => {
  const imageCache = new Map<string, Promise<boolean>>()
  const loadedImages = new Set<string>()

  const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '80px 0px',
    threshold: 0.01
  }

  let lazyObserver: IntersectionObserver | null = null

  const optimizeImageSrc = (src: string, quality = 80): string => {
    if (src.includes('http')) {
      try {
        const url = new URL(src)
        if (url.hostname.includes('unsplash.com') || url.hostname.includes('picsum.photos')) {
          url.searchParams.set('w', '800')
          url.searchParams.set('q', String(quality))
          url.searchParams.set('auto', 'format')
        }
        return url.toString()
      } catch {
        return src
      }
    }
    return src
  }

  const createPlaceholder = (width = 400, height = 300): string => {
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/></svg>`
    return `data:image/svg+xml;base64,${btoa(svg)}`
  }

  const preloadImage = (src: string, quality = 80): Promise<boolean> => {
    if (loadedImages.has(src)) return Promise.resolve(true)
    if (imageCache.has(src)) return imageCache.get(src)!

    const promise = new Promise<boolean>((resolve) => {
      const img = new Image()
      const optimizedSrc = optimizeImageSrc(src, quality)
      img.onload = () => {
        loadedImages.add(src)
        resolve(true)
      }
      img.onerror = () => resolve(false)
      img.src = optimizedSrc
    })

    imageCache.set(src, promise)
    return promise
  }

  const runLoad = async (img: LazyImageElement) => {
    if (img._lazyLoaded || !img._lazyOptions) return
    const src = img._lazyOptions.src
    const ok = await preloadImage(src, img._lazyOptions.quality)
    if (ok) {
      img.src = src
      img.style.opacity = '1'
      img._lazyLoaded = true
      lazyObserver?.unobserve(img)
    }
  }

  const setupLazyImage = (img: LazyImageElement) => {
    if (img._lazyLoaded || !img._lazyOptions) return

    const { alt, placeholder, priority } = img._lazyOptions

    img.alt = alt || ''
    img.loading = priority ? 'eager' : 'lazy'
    img.decoding = 'async'

    if (placeholder) img.src = placeholder
    else img.src = createPlaceholder()

    img.style.transition = 'opacity 0.25s ease'
    img.style.opacity = '0.85'

    if (priority) {
      void runLoad(img)
      return
    }

    if (!lazyObserver) {
      lazyObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as LazyImageElement
          void runLoad(el)
        }
      }, observerOptions)
    }

    lazyObserver.observe(img)
    img._lazyObserver = lazyObserver
  }

  const bindHoverPreload = (root: ParentNode) => {
    root.querySelectorAll('[data-hover-preload]').forEach((el) => {
      if ((el as HTMLElement).dataset.hoverBound) return
      ;(el as HTMLElement).dataset.hoverBound = '1'
      const preloadSrc = el.getAttribute('data-hover-preload')
      if (preloadSrc) {
        el.addEventListener(
          'mouseenter',
          () => {
            preloadImage(preloadSrc, 70)
          },
          { once: true }
        )
      }
    })
  }

  const scanLazyNodes = (root: ParentNode = document.body) => {
    bindHoverPreload(root)
    root.querySelectorAll('img[data-priority="true"]').forEach((node) => {
      const src = node.getAttribute('src') || node.getAttribute('data-src')
      if (src) preloadImage(src, 90)
    })
  }

  const init = () => {
    scanLazyNodes()
    let scheduled: ReturnType<typeof setTimeout> | null = null
    const mo = new MutationObserver(() => {
      if (scheduled) clearTimeout(scheduled)
      scheduled = setTimeout(() => scanLazyNodes(), 80)
    })
    mo.observe(document.body, { childList: true, subtree: true })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true })
  } else {
    init()
  }

  const router = useRouter()
  router.afterEach(() => nextTick(() => scanLazyNodes()))

  return {
    provide: {
      lazyImage: {
        preload: preloadImage,
        optimize: optimizeImageSrc,
        createPlaceholder,
        setup: setupLazyImage
      }
    }
  }
})
