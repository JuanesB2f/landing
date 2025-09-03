

export const useTheme = () => {
  const theme = ref<'light' | 'dark'>('light')
  const isDark = computed(() => theme.value === 'dark')

  // Inicializar tema desde localStorage o preferencia del sistema
  const initTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem('theme')
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      if (savedTheme) {
        theme.value = savedTheme as 'light' | 'dark'
      } else if (systemPrefersDark) {
        theme.value = 'dark'
      }
      
      applyTheme()
    }
  }

  // Aplicar tema al documento
  const applyTheme = () => {
    if (process.client) {
      // Remover clases anteriores
      document.documentElement.classList.remove('theme-light', 'theme-dark')
      
      // Agregar clase del tema actual
      document.documentElement.classList.add(`theme-${theme.value}`)
      
      // También mantener compatibilidad con dark mode de Tailwind
      document.documentElement.classList.toggle('dark', isDark.value)
      
      localStorage.setItem('theme', theme.value)
    }
  }

  // Cambiar tema
  const toggleTheme = () => {
    theme.value = isDark.value ? 'light' : 'dark'
    applyTheme()
  }

  // Establecer tema específico
  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
    applyTheme()
  }

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
    initTheme
  }
}

