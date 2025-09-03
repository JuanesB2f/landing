export default defineNuxtPlugin(() => {
  // Solo ejecutar en el cliente
  if (process.client) {
    // Función para aplicar el tema
    const applyTheme = (isDark: boolean) => {
      // Remover clases anteriores
      document.documentElement.classList.remove('theme-light', 'theme-dark')
      
      // Agregar clase del tema actual
      document.documentElement.classList.add(isDark ? 'theme-dark' : 'theme-light')
      
      // También mantener compatibilidad con dark mode de Tailwind
      document.documentElement.classList.toggle('dark', isDark)
    }

    // Función para obtener el tema guardado o preferencia del sistema
    const getInitialTheme = () => {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        return savedTheme === 'dark'
      }
      
      // Si no hay tema guardado, usar preferencia del sistema
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    // Aplicar tema inicial
    const isDark = getInitialTheme()
    applyTheme(isDark)

    // Escuchar cambios en la preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      // Solo cambiar si no hay tema guardado
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches)
      }
    })
  }
})
