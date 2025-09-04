import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const targets = [
  '.nuxt/tsconfig.json',
  '.nuxt/tsconfig.server.json'
]

try {
  let changed = 0
  for (const relPath of targets) {
    const tsconfigPath = resolve(process.cwd(), relPath)
    if (!existsSync(tsconfigPath)) {
      console.log(`[fix-nuxt-tsconfig] ${relPath} no existe aún, saltando`)
      continue
    }

    const raw = readFileSync(tsconfigPath, 'utf-8')
    const json = JSON.parse(raw)
    json.compilerOptions = json.compilerOptions || {}

    if (json.compilerOptions.module !== 'esnext' && json.compilerOptions.module !== 'ESNext') {
      json.compilerOptions.module = 'esnext'
      writeFileSync(tsconfigPath, JSON.stringify(json, null, 2))
      console.log(`[fix-nuxt-tsconfig] ${relPath}: fijado compilerOptions.module = "esnext"`)
      changed++
    } else {
      console.log(`[fix-nuxt-tsconfig] ${relPath}: ya estaba en "esnext"`)
    }
  }

  if (changed === 0) {
    // no-op
  }
} catch (err) {
  console.error('[fix-nuxt-tsconfig] Error:', err)
  process.exit(0)
}


