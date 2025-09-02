# Configuración del Sistema de Autenticación

## 🚀 Nueva Tabla `users` Independiente

El sistema ahora usa una tabla `users` propia en lugar de depender de Supabase Auth, lo que proporciona mayor control y flexibilidad.

## 📋 Pasos de Configuración

### 1. Ejecutar el Esquema de Base de Datos

Ejecuta el archivo `database_schema.sql` en tu base de datos de Supabase:

1. Ve a tu proyecto de Supabase
2. Abre el SQL Editor
3. Copia y pega el contenido de `database_schema.sql`
4. Ejecuta el script

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Configuración de Supabase
NUXT_SUPABASE_URL=tu_url_de_supabase_aqui
NUXT_SUPABASE_KEY=tu_clave_anonima_de_supabase_aqui
NUXT_SUPABASE_SERVICE_KEY=tu_clave_de_servicio_de_supabase_aqui

# Configuración de la aplicación
NUXT_PUBLIC_APP_NAME=BeautyStore
NUXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Credenciales por Defecto

El sistema incluye un usuario administrador por defecto:

- **Email**: `admin@ejemplo.com`
- **Contraseña**: `admin123`
- **Rol**: `admin`

### 4. Estructura de la Nueva Tabla `users`

```sql
CREATE TABLE public.users (
  id_user uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  role text DEFAULT 'customer',
  avatar_url text,
  phone text,
  address text,
  city text,
  state text,
  postal_code text,
  country text DEFAULT 'México',
  is_active boolean DEFAULT true,
  email_verified boolean DEFAULT false,
  last_login timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
```

## 🔧 Funcionalidades del Nuevo Sistema

### Autenticación
- ✅ Login con email y contraseña
- ✅ Registro de nuevos usuarios
- ✅ Verificación de sesión
- ✅ Logout seguro
- ✅ Persistencia de sesión

### Gestión de Usuarios
- ✅ Roles: admin, manager, customer
- ✅ Actualización de perfil
- ✅ Cambio de contraseña
- ✅ Activación/desactivación de usuarios

### Seguridad
- ✅ Validación de credenciales
- ✅ Verificación de usuarios activos
- ✅ Control de acceso por roles
- ✅ Middleware de autenticación

## 🎯 Ventajas del Nuevo Sistema

1. **Independencia**: No depende de Supabase Auth
2. **Control Total**: Gestión completa de usuarios
3. **Flexibilidad**: Fácil personalización
4. **Escalabilidad**: Preparado para crecimiento
5. **Mantenimiento**: Código más simple y directo

## 🚨 Notas Importantes

### Seguridad en Producción
- **IMPORTANTE**: En producción, implementa hash de contraseñas con bcrypt
- Configura HTTPS
- Implementa rate limiting
- Usa variables de entorno seguras

### Hash de Contraseñas
El sistema actual no incluye hash de contraseñas por simplicidad. Para producción:

```typescript
// Instalar bcrypt
npm install bcryptjs

// En el composable useAuth.ts, reemplazar:
const passwordHash = await bcrypt.hash(userData.password, 10)
const isValid = await bcrypt.compare(password, user.password_hash)
```

## 🔄 Migración desde el Sistema Anterior

Si ya tienes datos en la tabla `profiles`:

1. Exporta los datos existentes
2. Ejecuta el nuevo esquema
3. Migra los datos a la nueva tabla `users`
4. Actualiza las referencias en `customers`

## 📞 Soporte

Para problemas o preguntas:
1. Revisa los logs de la consola
2. Verifica la configuración de Supabase
3. Confirma que las variables de entorno están correctas
4. Verifica que el esquema se ejecutó correctamente

## 🎉 ¡Listo!

Una vez completados estos pasos, tu sistema de autenticación estará funcionando con la nueva tabla `users` independiente.


