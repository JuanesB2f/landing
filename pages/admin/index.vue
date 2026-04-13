<template>
  <div class="admin-dashboard min-h-screen w-full max-w-full min-w-0 p-3 sm:p-4 lg:p-6 transition-colors duration-300 theme-container">
    <!-- Header del Dashboard -->
    <div class="mb-6 sm:mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 transition-colors theme-text-primary">Dashboard</h1>
          <p class="text-sm sm:text-base transition-colors theme-text-secondary">Bienvenido de vuelta, {{ userName || 'Admin' }}! Aquí tienes un resumen de tu negocio.</p>
        </div>
      </div>
    </div>

    <!-- Tarjetas de KPI principales -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
      <!-- Tarjeta de Usuarios -->
      <div class="ios-glass-card dashboard-card-hover p-4 sm:p-5">
        <div class="flex items-center justify-between mb-2 sm:mb-4">
          <div class="ios-kpi-icon w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
            <Icon name="heroicons:users" class="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent)]" />
          </div>
          <div class="text-right min-w-0">
            <p class="text-xl sm:text-2xl font-bold theme-text-primary truncate">{{ dashboardStats.totalUsers || 0 }}</p>
            <p class="text-green-600 dark:text-green-400 text-sm font-medium">+12% este mes</p>
          </div>
        </div>
        <p class="text-xs sm:text-sm font-medium theme-text-secondary">Total Usuarios</p>
        <div class="mt-2 sm:mt-4 flex items-center space-x-2">
          <div class="ios-chart-h-track flex-1 h-1.5 sm:h-2">
            <div class="ios-chart-h-fill h-1.5 sm:h-2" style="width: 75%"></div>
          </div>
          <span class="text-[10px] sm:text-xs theme-text-muted shrink-0">75%</span>
        </div>
      </div>

      <!-- Tarjeta de Productos -->
      <div class="ios-glass-card dashboard-card-hover p-4 sm:p-5">
        <div class="flex items-center justify-between mb-2 sm:mb-4">
          <div class="ios-kpi-icon w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
            <Icon name="heroicons:cube" class="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent)]" />
          </div>
          <div class="text-right min-w-0">
            <p class="text-xl sm:text-2xl font-bold theme-text-primary truncate">{{ dashboardStats.totalProducts || 0 }}</p>
            <p class="text-green-600 dark:text-green-400 text-sm font-medium">+8% este mes</p>
          </div>
        </div>
        <p class="text-xs sm:text-sm font-medium theme-text-secondary">Total Productos</p>
        <div class="mt-2 sm:mt-4 flex items-center space-x-2">
          <div class="ios-chart-h-track flex-1 h-1.5 sm:h-2">
            <div class="ios-chart-h-fill h-1.5 sm:h-2" style="width: 60%"></div>
          </div>
          <span class="text-[10px] sm:text-xs theme-text-muted shrink-0">60%</span>
        </div>
      </div>

      <!-- Tarjeta de Órdenes -->
      <div class="ios-glass-card dashboard-card-hover p-4 sm:p-5">
        <div class="flex items-center justify-between mb-2 sm:mb-4">
          <div class="ios-kpi-icon w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
            <Icon name="heroicons:shopping-cart" class="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent)]" />
          </div>
          <div class="text-right min-w-0">
            <p class="text-xl sm:text-2xl font-bold theme-text-primary truncate">{{ dashboardStats.totalOrders || 0 }}</p>
            <p class="text-green-600 dark:text-green-400 text-sm font-medium">+15% este mes</p>
          </div>
        </div>
        <p class="text-xs sm:text-sm font-medium theme-text-secondary">Total Órdenes</p>
        <div class="mt-2 sm:mt-4 flex items-center space-x-2">
          <div class="ios-chart-h-track flex-1 h-1.5 sm:h-2">
            <div class="ios-chart-h-fill h-1.5 sm:h-2" style="width: 85%"></div>
          </div>
          <span class="text-[10px] sm:text-xs theme-text-muted shrink-0">85%</span>
        </div>
      </div>

      <!-- Tarjeta de Ingresos -->
      <div class="ios-glass-card dashboard-card-hover p-4 sm:p-5">
        <div class="flex items-center justify-between mb-2 sm:mb-4">
          <div class="ios-kpi-icon w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
            <Icon name="heroicons:currency-dollar" class="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent)]" />
          </div>
          <div class="text-right min-w-0">
            <p class="text-lg sm:text-2xl font-bold theme-text-primary truncate">${{ formatCurrency(dashboardStats.totalRevenue || 0) }}</p>
            <p class="text-green-600 dark:text-green-400 text-sm font-medium">+20% este mes</p>
          </div>
        </div>
        <p class="text-xs sm:text-sm font-medium theme-text-secondary">Ingresos Totales</p>
        <div class="mt-2 sm:mt-4 flex items-center space-x-2">
          <div class="ios-chart-h-track flex-1 h-1.5 sm:h-2">
            <div class="ios-chart-h-fill h-1.5 sm:h-2" style="width: 90%"></div>
          </div>
          <span class="text-[10px] sm:text-xs theme-text-muted shrink-0">90%</span>
        </div>
      </div>
    </div>

    <!-- Tarjetas de gráficos y estadísticas -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <!-- Gráfico de Ventas -->
      <div class="ios-glass-card ios-chart-panel p-4 sm:p-5 min-w-0">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
          <div class="min-w-0">
            <h3 class="text-lg sm:text-xl font-bold theme-text-primary">Ventas</h3>
            <p class="text-xs sm:text-sm theme-text-secondary">Últimos 7 días</p>
          </div>
          <div class="text-left sm:text-right shrink-0">
            <p class="text-xl sm:text-2xl font-bold theme-text-primary tabular-nums">${{ formatCurrency(dashboardStats.weeklySales || 0) }}</p>
            <p class="text-green-600 dark:text-green-400 text-xs sm:text-sm font-medium">+12.5%</p>
          </div>
        </div>
        
        <!-- Gráfico de barras real -->
        <div class="space-y-3 min-w-0">
          <div
            v-for="d in weeklySeries"
            :key="d.date"
            class="flex items-center gap-1.5 sm:gap-2 min-w-0"
          >
            <span class="text-[10px] sm:text-xs w-12 sm:w-16 shrink-0 theme-text-muted truncate">{{ formatDay(d.date) }}</span>
            <div class="ios-chart-h-track flex-1 min-w-0 h-2.5 sm:h-3">
              <div class="ios-chart-h-fill h-2.5 sm:h-3" :style="{ width: barWidth(d.sales) }"></div>
            </div>
            <span class="text-[10px] sm:text-xs w-12 sm:w-16 shrink-0 text-right theme-text-muted tabular-nums">${{ formatCurrency(d.sales) }}</span>
          </div>
        </div>
      </div>

      <!-- Gráfico de Productos (real) -->
      <div class="ios-glass-card ios-chart-panel p-4 sm:p-5 min-w-0">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
          <div class="min-w-0">
            <h3 class="text-lg sm:text-xl font-bold theme-text-primary">Productos</h3>
            <p class="text-xs sm:text-sm theme-text-secondary">Nuevos últimos 7 días</p>
          </div>
          <div class="text-left sm:text-right shrink-0">
            <p class="text-xl sm:text-2xl font-bold theme-text-primary tabular-nums">{{ productsStats.newProducts }}</p>
          </div>
        </div>
        
        <!-- Gráfico circular simple (componente) -->
        <div class="flex items-center justify-center mb-4">
          <DonutRing :percent="percentNumber()" :size="136" :stroke="14">
            <span class="text-2xl font-bold theme-text-primary">{{ percentNumber() }}%</span>
          </DonutRing>
        </div>
        
        <p class="text-center text-sm theme-text-secondary">{{ productsStats.newProducts }} nuevos de {{ productsStats.totalProducts }}</p>
      </div>
    </div>

    <!-- Tarjetas de estadísticas adicionales -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Total de Órdenes -->
      <div class="ios-glass-card ios-chart-panel p-4 sm:p-5 min-w-0">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
          <h3 class="text-base sm:text-lg font-bold theme-text-primary">Total Órdenes</h3>
          <select class="text-sm rounded-lg px-3 py-1.5 theme-select w-full sm:w-auto min-w-0">
            <option>Esta Semana</option>
            <option>Este Mes</option>
            <option>Este Año</option>
          </select>
        </div>
        
        <!-- Gráfico de líneas simulado -->
        <div class="overflow-x-auto -mx-1 px-1 sm:mx-0 sm:px-0">
          <div class="flex items-end gap-1.5 sm:gap-2 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center py-2">
            <div class="ios-spark-col w-8 sm:w-14 h-6 sm:h-8"></div>
            <div class="ios-spark-col w-8 sm:w-14 h-10 sm:h-12"></div>
            <div class="ios-spark-col w-8 sm:w-14 h-5 sm:h-6"></div>
            <div class="ios-spark-col w-8 sm:w-14 h-8 sm:h-10"></div>
            <div class="ios-spark-col w-8 sm:w-14 h-6 sm:h-8"></div>
            <div class="ios-spark-col w-8 sm:w-14 h-11 sm:h-14"></div>
            <div class="ios-spark-col w-8 sm:w-14 h-7 sm:h-9"></div>
          </div>
        </div>
        
        <div class="mt-4 text-center">
          <p class="text-2xl font-bold theme-text-primary">{{ dashboardStats.weeklyOrders || 0 }}</p>
          <p class="text-sm theme-text-secondary">Órdenes esta semana</p>
        </div>
      </div>

      <!-- Eliminado: Última Oferta -->

      <!-- Clientes -->
      <div class="ios-glass-card ios-chart-panel p-4 sm:p-5 min-w-0">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h3 class="text-base sm:text-lg font-bold theme-text-primary">Clientes</h3>
          <span class="text-green-600 dark:text-green-400 text-sm font-medium">+26.5%</span>
        </div>
        
        <div class="text-center mb-4">
          <p class="text-3xl font-bold theme-text-primary">{{ dashboardStats.totalCustomers || 0 }}</p>
          <p class="text-sm theme-text-secondary">Total de clientes</p>
        </div>
        
        <!-- Gráfico de líneas simulado -->
        <div class="overflow-x-auto -mx-1 px-1 sm:mx-0 sm:px-0">
          <div class="flex items-end gap-1 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center py-2">
            <div class="ios-spark-col w-6 sm:w-8 h-3 sm:h-4"></div>
            <div class="ios-spark-col w-6 sm:w-8 h-5 sm:h-6"></div>
            <div class="ios-spark-col w-6 sm:w-8 h-2.5 sm:h-3"></div>
            <div class="ios-spark-col w-6 sm:w-8 h-5 sm:h-7"></div>
            <div class="ios-spark-col w-6 sm:w-8 h-4 sm:h-5"></div>
            <div class="ios-spark-col w-6 sm:w-8 h-6 sm:h-8"></div>
            <div class="ios-spark-col w-6 sm:w-8 h-5 sm:h-6"></div>
          </div>
        </div>
        
        <p class="text-center text-sm mt-4 theme-text-secondary">Abril 07 - Abril 14</p>
      </div>
    </div>

    <!-- (Se eliminó la sección de Actividad Reciente) -->

    <!-- Botón flotante de configuración -->
    <div class="fixed bottom-24 right-4 sm:right-6 lg:bottom-6 z-40">
      <button class="w-14 h-14 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center theme-accent-button">
        <Icon name="heroicons:cog-6-tooth" class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import DonutRing from '~/components/common/DonutRing.vue'
definePageMeta({
  layout: 'admin',
  // sin middleware; lo maneja admin.global + SSR
})

const { user } = useAuth()
const userName = computed(() => user.value?.name || null)

// Composable para manejar el tema
const { theme, isDark, toggleTheme, initTheme } = useTheme()

// Estadísticas del dashboard
const dashboardStats = ref({
  totalUsers: 0,
  totalProducts: 0,
  totalOrders: 0,
  totalRevenue: 0,
  totalCustomers: 0,
  weeklySales: 0,
  newProducts: 0,
  weeklyOrders: 0
})

// Ventas semanales
const weeklySeries = ref<{ date: string; sales: number }[]>([])
const weeklyTotal = computed(() => weeklySeries.value.reduce((s, d) => s + d.sales, 0))

// Stats de productos
const productsStats = ref<{ totalProducts: number; newProducts: number }>({ totalProducts: 0, newProducts: 0 })
const productsPercent = computed<number>(() => {
  const total = productsStats.value.totalProducts || 1
  const pct = Math.round((productsStats.value.newProducts / total) * 100)
  return isNaN(pct) ? 0 : pct
})
const percentNumber = () => productsPercent.value
// (sin computeds para estilos inline)

// Actividad reciente
const recentActivity = ref<any[]>([])

// Función para formatear moneda
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Cargar estadísticas del dashboard
type ApiResponse<T> = { success: true; data: T } | { success: false; error: string; message?: string }

const loadDashboardStats = async () => {
  try {
    const resp: any = await $fetch('/api/dashboard')
    if (resp?.data?.success) {
      const payload = resp.data.data || {}
      dashboardStats.value.totalUsers = payload.totalUsers || 0
      dashboardStats.value.totalProducts = payload.totalProducts || 0
      dashboardStats.value.totalOrders = payload.totalOrders || 0
      dashboardStats.value.totalRevenue = payload.totalRevenue || 0
      dashboardStats.value.weeklySales = payload.weeklySales || 0
      dashboardStats.value.newProducts = payload.newProducts || 0
      dashboardStats.value.weeklyOrders = payload.weeklyOrders || 0
      dashboardStats.value.totalCustomers = payload.totalCustomers || 0
    }
  } catch (error) {
    console.error('Error cargando estadísticas del dashboard:', error)
  }
}

const loadWeeklySales = async () => {
  try {
    const resp: any = await $fetch('/api/orders/weekly')
    if (resp?.data?.success) {
      const payload = resp.data.data || {}
      weeklySeries.value = payload.series || []
    }
  } catch (e) {
    console.error('Error cargando ventas semanales:', e)
  }
}

const loadProductsStats = async () => {
  try {
    const resp: any = await $fetch('/api/products/stats')
    if (resp?.data?.success) {
      const payload = resp.data.data || {}
      productsStats.value = payload
    }
  } catch (e) {
    console.error('Error cargando stats de productos:', e)
  }
}

const loadRecentActivity = async () => {
  try {
    const resp: any = await $fetch('/api/activity/recent')
    if (resp?.data?.success) {
      const payload = resp.data.data || []
      recentActivity.value = payload
    }
  } catch (e) {
    console.error('Error cargando actividad reciente:', e)
  }
}

const reloadActivity = async () => {
  await loadRecentActivity()
}

const formatDay = (dateStr: string) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-ES', { weekday: 'short' })
}

const barWidth = (value: number) => {
  const max = Math.max(...weeklySeries.value.map(d => d.sales), 1)
  const pct = Math.round((value / max) * 100)
  return `${pct}%`
}

// Cargar datos al montar el componente
onMounted(() => {
  initTheme() // Inicializar tema
  loadDashboardStats()
  loadWeeklySales()
  loadProductsStats()
  loadRecentActivity()
})
</script>
