# Desplegar en Vercel (mismo comportamiento que en local)

Sigue estos pasos para que la app en Vercel funcione **igual** que en tu máquina.

---

## Checklist rápido

- [ ] **Supabase**: Añadir la URL de Vercel en "Redirect URLs" (ver paso 2).
- [ ] **Vercel**: Añadir las 3 variables de Supabase (ver paso 3).
- [ ] **Vercel**: Después de tocar variables → Redeploy.

Si el login falla en producción pero en local va bien, casi siempre es por **falta de la URL en Supabase** o **variables sin configurar en Vercel**.

---

## 1. Conectar el repositorio

- Entra en [vercel.com](https://vercel.com) e importa tu repo de GitHub/GitLab/Bitbucket.
- Framework Preset: **Nuxt.js** (Vercel lo detecta solo).
- Build Command: `bun run build` o `npm run build` (el que uses).
- No cambies el Output Directory (Nuxt usa `.output` por defecto).

## 2. Supabase: URL de producción (obligatorio para login)

En [Supabase Dashboard](https://supabase.com/dashboard) → tu proyecto → **Authentication** → **URL Configuration**:

1. **Site URL**: pon tu URL de Vercel (ej. `https://tu-proyecto.vercel.app`).
2. **Redirect URLs**: en la lista, añade (o deja que esté):
   - `https://tu-proyecto.vercel.app/**`
   - `https://tu-proyecto.vercel.app/login`
   - `https://tu-proyecto.vercel.app/callback`

Sin esto, el login (sobre todo con Google) puede fallar o redirigir mal en producción.

## 3. Variables de entorno en Vercel (obligatorio)

En el proyecto de Vercel: **Settings → Environment Variables**.

Añade **estas tres variables** con **exactamente estos nombres** (los mismos que en tu `.env` local):

| Nombre | Valor | Dónde copiarlo |
|--------|--------|----------------|
| `NUXT_SUPABASE_URL` | `https://tu-proyecto.supabase.co` | Tu `.env` local, línea 1 |
| `NUXT_SUPABASE_KEY` | `eyJhbGci...` (anon key) | Tu `.env` local, línea 2 |
| `NUXT_SUPABASE_SERVICE_KEY` | `eyJhbGci...` (service_role) | Tu `.env` local, línea 3 |
| `NUXT_PUBLIC_SITE_URL` | `https://tu-proyecto.vercel.app` | **Recomendado** para login con Google: así la redirección tras OAuth va al deploy y no a localhost. |

- En **Environment** marca al menos **Production**. Si usas previews, marca también **Preview**.
- Guarda (Save).

## 4. Desplegar

- Si acabas de añadir o cambiar variables: **Deployments → ⋮ del último deploy → Redeploy**.
- Si es la primera vez: el primer deploy se lanza al conectar el repo (después de guardar las variables, haz Redeploy para que las use).

## 5. Comprobar que todo va bien

1. Abre tu URL de Vercel (ej. `https://tu-proyecto.vercel.app`).
2. Prueba el endpoint de diagnóstico:  
   `https://tu-proyecto.vercel.app/api/health`  
   Debe devolver algo como:
   ```json
   { "ok": true, "env": { "hasSupabaseUrl": true, "hasSupabaseKey": true, "hasServiceKey": true } }
   ```
   Si algún `has*` es `false`, esa variable no está llegando: revisa nombre y entorno en Vercel.
3. Inicia sesión en la app y navega (dashboard, usuario, etc.). Debe comportarse como en local.

## Resumen

- **Supabase**: Site URL y Redirect URLs con la URL de Vercel (si no, el login en producción falla).
- **Vercel**: `NUXT_SUPABASE_URL`, `NUXT_SUPABASE_KEY`, `NUXT_SUPABASE_SERVICE_KEY` (mismos nombres que en tu `.env`).
- Sin estas variables, después del login la función puede devolver 500 y la página “se cae”.
- Después de tocar variables o Supabase, **Redeploy** en Vercel.
