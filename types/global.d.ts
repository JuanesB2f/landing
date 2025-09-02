/// <reference types="@nuxt/types" />
/// <reference types="@nuxt/typescript-build" />

// Declaraciones globales para Nuxt 3
declare global {
  // Funciones de Nuxt
  function defineNuxtConfig(config: any): any
  function defineNuxtRouteMiddleware(middleware: any): any
  function navigateTo(route: string): any
  function useNuxtApp(): any
  function useState<T>(key: string, init?: () => T): Ref<T>
  function computed<T>(fn: () => T): ComputedRef<T>
  
  // Variables globales
  var process: {
    env: {
      NUXT_SUPABASE_URL?: string
      NUXT_SUPABASE_KEY?: string
      NUXT_SUPABASE_SERVICE_KEY?: string
      [key: string]: string | undefined
    }
  }
  
  // Tipos de Vue
  interface Ref<T> {
    value: T
  }
  
  interface ComputedRef<T> {
    readonly value: T
  }
}

// Declaraciones de módulos
declare module 'vue-chartjs'
declare module '@iconify/vue'

// Tipos de Nuxt App
declare module '#app' {
  interface NuxtApp {
    $supabase: any
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $supabase: any
  }
}

export {}


