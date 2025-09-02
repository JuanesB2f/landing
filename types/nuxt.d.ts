// Tipos globales para Nuxt
declare global {
  // Funciones de Nuxt
  function defineNuxtConfig(config: any): any
  function defineNuxtRouteMiddleware(middleware: any): any
  function navigateTo(route: string): any
  function useNuxtApp(): any
  function useState<T>(key: string, init?: () => T): Ref<T>
  function computed<T>(fn: () => T): ComputedRef<T>
  
  // Tipos de Vue
  interface Ref<T> {
    value: T
  }
  
  interface ComputedRef<T> {
    readonly value: T
  }
}

export {}


