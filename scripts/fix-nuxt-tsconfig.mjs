import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const tsconfigPath = resolve(process.cwd(), '.nuxt/tsconfig.json')

try {
  if (!existsSync(tsconfigPath)) {
    console.log('[fix-nuxt-tsconfig] .nuxt/tsconfig.json no existe aún, saltando')
    process.exit(0)
  }

  const raw = readFileSync(tsconfigPath, 'utf-8')
  const json = JSON.parse(raw)

  json.compilerOptions = json.compilerOptions || {}
  const current = json.compilerOptions.module

  if (current !== 'esnext') {
    json.compilerOptions.module = 'esnext'
    writeFileSync(tsconfigPath, JSON.stringify(json, null, 2))
    console.log('[fix-nuxt-tsconfig] Establecido compilerOptions.module = "esnext"')
  } else {
    console.log('[fix-nuxt-tsconfig] Ya estaba en "esnext"')
  }
} catch (err) {
  console.error('[fix-nuxt-tsconfig] Error:', err)
  process.exit(0)
}


