<template>
  <div class="min-h-screen theme-login-bg relative overflow-hidden" :class="{ 'dark-theme': isDark }">
    <!-- Animated Background: blobs con paleta mauve/rosa (tema claro y oscuro) -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="login-blob login-blob-1 absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div class="login-blob login-blob-2 absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="login-blob login-blob-3 absolute top-40 left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <!-- Back to home button -->
        <div class="mb-6 flex justify-start">
          <NuxtLink 
            to="/" 
            class="back-to-home-btn group inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            <span class="font-medium text-sm">Volver al Inicio</span>
          </NuxtLink>
        </div>
        <!-- Login Card -->
        <div class="theme-login-card backdrop-blur-xl rounded-2xl shadow-2xl theme-login-border p-8">
          <!-- Elección: misma página; solo cambia el formulario de abajo -->
          <p class="text-xs text-center theme-login-text-secondary mb-3 leading-relaxed">
            Sigues en esta pantalla. Elige si entras con una cuenta que ya tienes o si te registras por primera vez:
          </p>
          <div class="relative z-20 grid grid-cols-2 gap-2 rounded-xl p-1.5 mb-2 bg-black/10 dark:bg-white/10 border border-white/10">
            <button
              type="button"
              class="flex flex-col items-stretch text-left py-3 px-3 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-pink-400/50 cursor-pointer"
              :class="authTab === 'login' ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-md ring-1 ring-pink-200/50 dark:ring-pink-500/30' : 'theme-login-text-secondary hover:bg-white/10'"
              :aria-pressed="authTab === 'login'"
              aria-label="Entrar: correo o Google"
              @click="setAuthTab('login')"
            >
              <span class="font-semibold leading-tight">Iniciar sesión</span>
              <span class="text-[11px] mt-1 opacity-85 leading-snug">Para quien ya tiene usuario y contraseña (o Google)</span>
            </button>
            <button
              type="button"
              class="flex flex-col items-stretch text-left py-3 px-3 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-pink-400/50 cursor-pointer"
              :class="authTab === 'register' ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-md ring-1 ring-pink-200/50 dark:ring-pink-500/30' : 'theme-login-text-secondary hover:bg-white/10'"
              :aria-pressed="authTab === 'register'"
              aria-label="Registrarse: nuevo usuario con correo"
              @click="setAuthTab('register')"
            >
              <span class="font-semibold leading-tight">Crear cuenta</span>
              <span class="text-[11px] mt-1 opacity-85 leading-snug">Nuevo registro con correo (luego datos de perfil)</span>
            </button>
          </div>

          <!-- Header -->
          <div class="text-center mb-6">
            <div class="login-card-icon inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent to-accent-secondary rounded-full mb-4 shadow-lg">
              <svg class="w-8 h-8 text-white login-card-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h1 class="text-2xl sm:text-3xl font-bold theme-login-text mb-2">
              {{ authTab === 'login' ? 'Iniciar sesión' : 'Crear cuenta' }}
            </h1>
            <p class="theme-login-text-secondary text-sm">
              {{ authTab === 'login' ? 'Accede con correo o Google' : 'Regístrate con correo; luego completarás tu perfil.' }}
            </p>
          </div>

          <!-- Formulario login -->
          <form v-if="authTab === 'login'" class="space-y-6" @submit.prevent="handleLogin">
            <!-- Email Field -->
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium theme-login-label">
                Correo Electrónico
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                  </svg>
                </div>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  class="w-full pl-10 pr-4 py-3 theme-login-input border theme-login-border rounded-xl theme-login-text placeholder-theme-login-placeholder focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="admin@ejemplo.com"
                  :disabled="loading"
                />
              </div>
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <label for="password" class="block text-sm font-medium theme-login-label">
                Contraseña
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  required
                  class="w-full pl-10 pr-4 py-3 theme-login-input border theme-login-border rounded-xl theme-login-text placeholder-theme-login-placeholder focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="••••••••"
                  :disabled="loading"
                />
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="bg-red-500/20 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-red-300 text-sm">{{ error }}</p>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="login-submit-btn group relative w-full bg-gradient-to-r from-accent to-accent-secondary text-white py-3 px-4 rounded-xl font-semibold hover:from-accent-hover hover:to-accent-secondary focus:outline-none focus:ring-4 focus:ring-accent/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns=" http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </span>
              <span v-else class="flex items-center justify-center">
                <svg class="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                </svg>
                Iniciar Sesión
              </span>
            </button>

            <!-- Divider -->
            <div class="flex items-center gap-4 my-4">
              <div class="h-px flex-1 bg-white/20"></div>
              <span class="text-xs text-white/60">o</span>
              <div class="h-px flex-1 bg-white/20"></div>
            </div>

            <!-- Google Sign-In -->
            <button type="button" @click="loginWithGoogle" :disabled="loading" class="w-full bg-white text-gray-900 py-3 px-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-3 border border-gray-200 shadow-sm hover:shadow-md">
              <img alt="Google" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="w-5 h-5" />
              <span class="text-gray-900 font-medium">Continuar con Google</span>
            </button>
          </form>

          <!-- Formulario registro (correo + contraseña) -->
          <form v-else class="space-y-4" @submit.prevent="handleRegister">
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1">
                <label class="block text-sm font-medium theme-login-label">Nombre</label>
                <input
                  v-model="regFirstName"
                  type="text"
                  required
                  autocomplete="given-name"
                  class="w-full px-3 py-3 theme-login-input border theme-login-border rounded-xl theme-login-text"
                  placeholder="Nombre"
                  :disabled="loading"
                />
              </div>
              <div class="space-y-1">
                <label class="block text-sm font-medium theme-login-label">Apellido</label>
                <input
                  v-model="regLastName"
                  type="text"
                  required
                  autocomplete="family-name"
                  class="w-full px-3 py-3 theme-login-input border theme-login-border rounded-xl theme-login-text"
                  placeholder="Apellido"
                  :disabled="loading"
                />
              </div>
            </div>
            <div class="space-y-2">
              <label for="reg-email" class="block text-sm font-medium theme-login-label">Correo electrónico</label>
              <input
                id="reg-email"
                v-model="regEmail"
                type="email"
                required
                autocomplete="email"
                class="w-full px-3 py-3 theme-login-input border theme-login-border rounded-xl theme-login-text"
                placeholder="tu@correo.com"
                :disabled="loading"
              />
            </div>
            <div class="space-y-2">
              <label for="reg-pass" class="block text-sm font-medium theme-login-label">Contraseña</label>
              <input
                id="reg-pass"
                v-model="regPassword"
                type="password"
                required
                minlength="6"
                autocomplete="new-password"
                class="w-full px-3 py-3 theme-login-input border theme-login-border rounded-xl theme-login-text"
                placeholder="Mínimo 6 caracteres"
                :disabled="loading"
              />
            </div>
            <div class="space-y-2">
              <label for="reg-pass2" class="block text-sm font-medium theme-login-label">Confirmar contraseña</label>
              <input
                id="reg-pass2"
                v-model="regPassword2"
                type="password"
                required
                minlength="6"
                autocomplete="new-password"
                class="w-full px-3 py-3 theme-login-input border theme-login-border rounded-xl theme-login-text"
                placeholder="Repite la contraseña"
                :disabled="loading"
              />
            </div>

            <div v-if="error" class="bg-red-500/20 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm">
              <p class="text-red-300 text-sm">{{ error }}</p>
            </div>
            <div v-if="registerInfo" class="bg-emerald-500/15 border border-emerald-500/30 rounded-xl p-4 text-sm text-emerald-100">
              {{ registerInfo }}
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="login-submit-btn group relative w-full bg-gradient-to-r from-accent to-accent-secondary text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <span v-if="loading" class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Creando cuenta…
              </span>
              <span v-else>Crear mi cuenta</span>
            </button>

            <div class="flex items-center gap-4 my-2">
              <div class="h-px flex-1 bg-white/20"></div>
              <span class="text-xs text-white/60">o</span>
              <div class="h-px flex-1 bg-white/20"></div>
            </div>

            <button type="button" @click="loginWithGoogle" :disabled="loading" class="w-full bg-white text-gray-900 py-3 px-4 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-3 border border-gray-200 shadow-sm">
              <img alt="Google" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="w-5 h-5" />
              <span class="text-gray-900 font-medium">Registrarse con Google</span>
            </button>
          </form>

          <!-- Footer -->
          <div class="mt-8 text-center space-y-4">
            <p v-if="authTab === 'login'" class="text-sm theme-login-text-secondary">
              ¿Primera vez aquí?
              <button type="button" class="font-semibold text-pink-600 hover:text-pink-700 underline-offset-2 hover:underline" @click="setAuthTab('register')">
                Toca «Crear cuenta» arriba
              </button>
            </p>
            <p v-else class="text-sm theme-login-text-secondary">
              ¿Ya te registraste?
              <button type="button" class="font-semibold text-pink-600 hover:text-pink-700 underline-offset-2 hover:underline" @click="setAuthTab('login')">
                Toca «Iniciar sesión» arriba
              </button>
            </p>
            <div class="flex items-center justify-center space-x-2 text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <p class="text-sm">Conexión segura</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Elements -->
    <div class="absolute top-20 left-10 w-2 h-2 login-dot login-dot-1 rounded-full animate-ping"></div>
    <div class="absolute top-40 right-20 w-3 h-3 login-dot login-dot-2 rounded-full animate-ping animation-delay-1000"></div>
    <div class="absolute bottom-20 left-20 w-2 h-2 login-dot login-dot-3 rounded-full animate-ping animation-delay-2000"></div>
    
    <!-- Theme Toggle Button - Bottom Right -->
    <div class="fixed bottom-6 right-6 z-50">
      <button 
        @click="toggleTheme" 
        class="back-to-home-btn group inline-flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-xl"
        :title="isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
      >
        <svg v-if="isDark" class="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg v-else class="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { needsProfileCompletion } from '~/utils/profileCompletion'

definePageMeta({
  layout: false
})

type AuthTab = 'login' | 'register'

const loading = ref(false)
const error = ref('')
const registerInfo = ref('')

const authTab = ref<AuthTab>('login')

const email = ref('')
const password = ref('')

const regFirstName = ref('')
const regLastName = ref('')
const regEmail = ref('')
const regPassword = ref('')
const regPassword2 = ref('')

const { login, checkAuth } = useAuth()
const supabase = useSupabaseClient()
const router = useRouter()
const route = useRoute()

function setAuthTab(next: AuthTab) {
  authTab.value = next
  error.value = ''
  registerInfo.value = ''
  const q = { ...route.query }
  if (next === 'register') {
    q.tab = 'register'
  } else {
    delete q.tab
    delete q.registro
    delete q.register
  }
  void router.replace({ path: '/login', query: q })
}

// Tema
const { theme, isDark, toggleTheme, initTheme } = useTheme()

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
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

onMounted(() => {
  initTheme()
  const q = route.query
  if (q.tab === 'register' || q.registro === '1' || q.register === '1') {
    authTab.value = 'register'
  }
})

const handleRegister = async () => {
  error.value = ''
  registerInfo.value = ''
  if (regPassword.value !== regPassword2.value) {
    error.value = 'Las contraseñas no coinciden'
    return
  }
  loading.value = true
  try {
    const email = regEmail.value.trim().toLowerCase()
    const res = await withTimeout(
      $fetch<{ data?: { success?: boolean; error?: string } }>('/api/auth/register-public', {
        method: 'POST',
        body: {
          email,
          password: regPassword.value,
          first_name: regFirstName.value.trim(),
          last_name: regLastName.value.trim()
        }
      }),
      15000,
      'Crear cuenta'
    )
    const payload = res?.data ?? (res as unknown as { success?: boolean; error?: string })
    if (!payload?.success) {
      error.value = payload?.error || 'No se pudo crear la cuenta'
      return
    }

    const { error: signErr } = await withTimeout(
      supabase.auth.signInWithPassword({
        email,
        password: regPassword.value
      }),
      15000,
      'Iniciar sesión'
    )
    if (signErr) {
      error.value =
        signErr.message ||
        'Cuenta creada. Inicia sesión manualmente con tu correo y contraseña.'
      return
    }

    await withTimeout(checkAuth(), 10000, 'Verificar sesión')
    await withTimeout(router.replace('/completar-perfil'), 10000, 'Redirigir')
  } catch (e) {
    console.error('[login] handleRegister', e)
    error.value = e instanceof Error ? e.message : 'Error al registrar. Intenta de nuevo.'
  } finally {
    loading.value = false
  }
}

const handleLogin = async () => {
  if (!email.value || !password.value) {
    return
  }

  loading.value = true
  error.value = ''

  try {
    console.log('Intentando autenticar con:', email.value)
    
    const result = await login(email.value, password.value)

    if (result.success) {
      const user = result.user
      if (!user) {
        error.value = 'No se pudo obtener el perfil'
        return
      }
      // Optimización: reducir timeout y usar navegación más eficiente
      setTimeout(async () => {
        try {
          if (router.currentRoute.value.path === '/login') {
            if (user.role === 'admin') {
              await router.replace('/dashboard')
              return
            }
            const { data: prof } = await supabase
              .from('profiles')
              .select('first_name, last_name, birth_date, role')
              .eq('id', user.id)
              .maybeSingle()
            if (needsProfileCompletion(prof)) {
              await router.replace('/completar-perfil')
              return
            }
            if (user.role === 'user' || user.role === 'customer') await router.replace('/user')
            else await router.replace('/')
          }
        } catch (_e) {}
      }, 800) // Reducir de 1500ms a 800ms
    } else {
      error.value = result.error || 'Credenciales incorrectas'
    }
    
  } catch (err) {
    console.error('Error de login:', err)
    error.value = 'Error al iniciar sesión. Verifica tu conexión.'
  } finally {
    loading.value = false
  }
}

const loginWithGoogle = async () => {
  try {
    loading.value = true
    error.value = ''
    // Siempre usar la URL actual del navegador para que Supabase redirija al mismo sitio (evita localhost en producción)
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    const redirectTo = baseUrl ? `${baseUrl.replace(/\/$/, '')}/callback` : '/callback'
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })
  } catch (e) {
    console.error('Google sign-in error', e)
    error.value = 'No se pudo iniciar sesión con Google'
  } finally {
    setTimeout(() => { loading.value = false }, 300)
  }
}
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

/* Estilos específicos para el botón "Volver al Inicio" */
.back-to-home-btn {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.back-to-home-btn:hover {
  background: rgba(255, 255, 255, 0.2) !important;
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Estilos para tema claro - botón "Volver al Inicio" */
.theme-light .back-to-home-btn {
  background: rgba(0, 0, 0, 0.1) !important;
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
  color: #1f2937 !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.theme-light .back-to-home-btn:hover {
  background: rgba(0, 0, 0, 0.2) !important;
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.theme-light .back-to-home-btn svg {
  color: #1f2937 !important;
}

.theme-light .back-to-home-btn span {
  color: #1f2937 !important;
}

/* Tema claro: icono del candado en negro para que se vea sobre el círculo */
.theme-light .login-card-icon-svg,
.theme-light .login-card-icon svg {
  color: #000 !important;
  stroke: #000 !important;
}

/* Tema claro: botón Iniciar sesión negro para que se vea */
.theme-light .login-submit-btn {
  background: #000 !important;
  color: #fff !important;
}
.theme-light .login-submit-btn:hover:not(:disabled) {
  background: #1a1a1a !important;
  color: #fff !important;
}
.theme-light .login-submit-btn svg,
.theme-light .login-submit-btn span {
  color: #fff !important;
}

/* Tema oscuro en login: misma sensación que el claro, solo que oscuro (sin morado) */
.dark-theme {
  background: linear-gradient(to bottom right, #1e293b, #334155, #1e293b) !important;
}

.dark-theme .theme-login-card {
  background: rgba(15, 23, 42, 0.8) !important;
  border: 1px solid rgba(148, 163, 184, 0.2) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.dark-theme .theme-login-text {
  color: #f1f5f9 !important;
}

.dark-theme .theme-login-text-secondary {
  color: #cbd5e1 !important;
}

.dark-theme .theme-login-label {
  color: #e2e8f0 !important;
}

.dark-theme .theme-login-input {
  background: rgba(30, 41, 59, 0.6) !important;
  border: 1px solid rgba(148, 163, 184, 0.3) !important;
  color: #f1f5f9 !important;
}

.dark-theme .theme-login-input::placeholder {
  color: #94a3b8 !important;
}

.dark-theme .theme-login-input:focus {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
}

/* Ajustes para elementos específicos en tema oscuro */
.dark-theme input[type="email"],
.dark-theme input[type="password"] {
  background: rgba(30, 41, 59, 0.6) !important;
  border: 1px solid rgba(148, 163, 184, 0.3) !important;
  color: #f1f5f9 !important;
}

.dark-theme input[type="email"]::placeholder,
.dark-theme input[type="password"]::placeholder {
  color: #94a3b8 !important;
}

.dark-theme label {
  color: #e2e8f0 !important;
}

.dark-theme .bg-red-500\/20 {
  background: rgba(239, 68, 68, 0.2) !important;
  border: 1px solid rgba(239, 68, 68, 0.3) !important;
}

.dark-theme .text-red-300 {
  color: #fca5a5 !important;
}

/* Estilos específicos para botón de Google */
.dark-theme .bg-white {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: #f1f5f9 !important;
}

.dark-theme .bg-white:hover {
  background: rgba(255, 255, 255, 0.2) !important;
}

.dark-theme .text-gray-900 {
  color: #f1f5f9 !important;
}

.dark-theme .border-gray-200 {
  border-color: rgba(255, 255, 255, 0.2) !important;
}

/* Asegurar que el texto de Google sea visible en ambos temas */
button[type="button"] .text-gray-900 {
  color: #111827 !important;
}

.dark-theme button[type="button"] .text-gray-900 {
  color: #f1f5f9 !important;
}
</style>


