/** Multiplicador de velocidad del scroll con la rueda (1 = normal; mayor = más rápido) */
const SCROLL_SPEED = 5

/**
 * Asegura que la rueda del ratón siempre permita desplazar la página hacia arriba/abajo.
 * - Si hay un contenedor con scroll propio (modal, lista) y puede scrollar, no interferimos.
 * - Si ese contenedor está al límite (arriba/abajo) o no hay contenedor con scroll,
 *   desplazamos la ventana para que la página baje/suba desde cualquier parte.
 */
export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const getScrollableParent = (el: Element | null): Element | null => {
    while (el && el !== document.body) {
      const style = getComputedStyle(el)
      const overflowY = style.overflowY
      const canScroll =
        (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') &&
        el.scrollHeight > el.clientHeight
      if (canScroll) return el
      el = el.parentElement
    }
    return null
  }

  const scrollWindow = (deltaY: number) => {
    window.scrollBy(0, deltaY * SCROLL_SPEED)
  }

  const handleWheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) return

    const scrollable = getScrollableParent(e.target as Element)
    if (scrollable) {
      const { scrollTop, scrollHeight, clientHeight } = scrollable
      const atTop = scrollTop <= 0
      const atBottom = scrollTop >= scrollHeight - clientHeight - 1
      const goingUp = e.deltaY < 0
      const goingDown = e.deltaY > 0
      if ((atTop && goingUp) || (atBottom && goingDown)) {
        scrollWindow(e.deltaY)
        e.preventDefault()
      }
      return
    }

    // Sin contenedor con scroll: desplazar la ventana más rápido
    scrollWindow(e.deltaY)
    e.preventDefault()
  }

  document.addEventListener('wheel', handleWheel, { passive: false })

  onUnmounted(() => {
    document.removeEventListener('wheel', handleWheel)
  })
})
