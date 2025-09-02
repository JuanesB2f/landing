/**
 * Utilidades para manejo de fechas
 * Incluye formateo en español, manejo de zonas horarias y validación
 */

// Tipos para fechas
export interface DateFormatOptions {
  locale?: string
  timeZone?: string
  format?: 'short' | 'long' | 'full' | 'time' | 'datetime'
}

// Configuración por defecto
const DEFAULT_LOCALE = 'es-ES'
const DEFAULT_TIMEZONE = 'America/Mexico_City'

/**
 * Formatea una fecha en español
 */
export function formatDate(
  date: Date | string | number,
  options: DateFormatOptions = {}
): string {
  const dateObj = new Date(date)
  const { locale = DEFAULT_LOCALE, timeZone = DEFAULT_TIMEZONE, format = 'short' } = options

  const formatOptions: Intl.DateTimeFormatOptions = {
    timeZone,
    ...getFormatOptions(format)
  }

  return dateObj.toLocaleDateString(locale, formatOptions)
}

/**
 * Obtiene las opciones de formato según el tipo
 */
function getFormatOptions(format: string): Intl.DateTimeFormatOptions {
  switch (format) {
    case 'short':
      return {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }
    case 'long':
      return {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    case 'full':
      return {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    case 'time':
      return {
        hour: '2-digit',
        minute: '2-digit'
      }
    case 'datetime':
      return {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }
    default:
      return {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }
  }
}

/**
 * Convierte una fecha a formato ISO
 */
export function toISO(date: Date | string | number): string {
  const dateObj = new Date(date)
  return dateObj.toISOString()
}

/**
 * Valida si una fecha es válida
 */
export function isValidDate(date: any): boolean {
  const dateObj = new Date(date)
  return dateObj instanceof Date && !isNaN(dateObj.getTime())
}

/**
 * Obtiene la diferencia en días entre dos fechas
 */
export function getDaysDifference(date1: Date | string | number, date2: Date | string | number): number {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diffTime = Math.abs(d2.getTime() - d1.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Obtiene la fecha actual en la zona horaria especificada
 */
export function getCurrentDate(timeZone: string = DEFAULT_TIMEZONE): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone }))
}

/**
 * Formatea una fecha para mostrar "hace X tiempo"
 */
export function timeAgo(date: Date | string | number): string {
  const dateObj = new Date(date)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'hace un momento'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`
  }

  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    return `hace ${diffInWeeks} ${diffInWeeks === 1 ? 'semana' : 'semanas'}`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `hace ${diffInMonths} ${diffInMonths === 1 ? 'mes' : 'meses'}`
  }

  const diffInYears = Math.floor(diffInDays / 365)
  return `hace ${diffInYears} ${diffInYears === 1 ? 'año' : 'años'}`
}

/**
 * Obtiene el nombre del mes en español
 */
export function getMonthName(month: number): string {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  return months[month] || ''
}

/**
 * Obtiene el nombre del día de la semana en español
 */
export function getWeekdayName(weekday: number): string {
  const weekdays = [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ]
  return weekdays[weekday] || ''
}


