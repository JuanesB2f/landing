/**
 * Diagnóstico en Vercel: GET /api/health
 * Si responde 200, la función arranca. "env" indica si las variables están definidas (sin mostrar valores).
 */
export default defineEventHandler(() => {
  try {
    const config = useRuntimeConfig()
    return {
      ok: true,
      env: {
        hasSupabaseUrl: Boolean(config.public?.supabaseUrl),
        hasSupabaseKey: Boolean(config.public?.supabaseKey),
        hasServiceKey: Boolean(config.supabaseServiceKey),
      },
    }
  } catch (e) {
    return { ok: false, error: String((e as Error).message) }
  }
})
