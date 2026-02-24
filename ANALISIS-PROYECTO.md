# Análisis completo del proyecto BylotoStore (Landing / E-commerce)

Este documento resume **diseño**, **lógica**, **estructura de base de datos** y **despliegue en Vercel** del proyecto.

---

## 1. Diseño (UI / UX)

### 1.1 Stack de UI
- **Nuxt 3** (SSR) + **Vue 3** + **@nuxt/ui**
- **Tailwind CSS** con variables CSS propias
- **Pinia** para estado global (carrito)
- **Iconify** (heroicons, lucide, etc.) para iconos

### 1.2 Sistema de diseño
- **Tema claro/oscuro**: clases `theme-light` y `theme-dark` (o `.dark`), controlado por script en `head` y `localStorage`.
- **Variables CSS** en `assets/css/main.css` y `theme.css`:
  - Fondos: `--bg-primary`, `--bg-secondary`, `--bg-card`, `--bg-hover`
  - Texto: `--text-primary`, `--text-secondary`, `--text-muted`
  - Borde: `--border-color`
  - Marca: `--accent` (rosa en light, violeta en dark), `--accent-hover`
- **Tailwind** extiende con esas variables (`bg-primary`, `text-primary`, `accent`, etc.).
- **Animaciones**: `fade-in`, `slide-up`, `blob`, `float`, `shimmer`, `gradient-text-animate`, `hover-lift`, `glass`.
- **Responsive**: uso de breakpoints Tailwind y layouts adaptativos.

### 1.3 Estructura de páginas
| Zona | Rutas | Layout | Descripción |
|------|--------|--------|-------------|
| Público | `/`, `/about`, `/shop`, `/shop/cart`, `/shop/category/[id]` | default | Landing, tienda, carrito |
| Auth | `/login`, `/unauthorized` | default | Login y acceso denegado |
| Usuario | `/user`, `/user/orders`, `/orders/[id]` | default | Perfil y pedidos del usuario |
| Checkout | `/checkout/success`, `/checkout/pending` | default | Post-pago Mercado Pago |
| Admin | `/admin`, `/admin/categories`, `/admin/products`, `/admin/orders`, `/admin/customers`, `/admin/providers`, `/admin/profiles`, `/admin/inventory`, `/admin/offers` | admin | Panel con sidebar y tema unificado |

### 1.4 Componentes
- **Admin**: modales por entidad (Category, Product, Order, Customer, Provider, User, Stock, etc.) y drawers (ProductPickerDrawer).
- **Comunes**: ConfirmModal, DonutRing, VirtualList, Toast.
- **Checkout**: MercadoPagoModal.
- Componentes auto-importados desde `~/components` (sin prefijo).

### 1.5 Layouts
- **default.vue**: cabecera, navegación, contenido, pie.
- **admin.vue**: sidebar, barra superior y área de contenido con clases `theme-*` para modo oscuro/claro.

---

## 2. Lógica de negocio y flujos

### 2.1 Autenticación
- **Supabase Auth** (PKCE, persistencia de sesión).
- **Tabla `profiles`** en Supabase: extensión del usuario con `role` (`admin` | `user` | `customer`), `first_name`, `last_name`, `is_active`, etc.
- **useAuth** (composable): `login`, `logout`, `checkAuth`, `register`, `changePassword`, `updateProfile`. Tras login se llama a `/api/auth/upsert-profile` para asegurar perfil y rol.
- **Middleware**:
  - `admin.global.ts`: solo cliente; protege `/admin/*`, exige `role === 'admin'`, redirige a `/login` o `/unauthorized`.
  - Otros: `auth.ts`, `require-auth.global.ts`, `user-only.ts` para otras rutas protegidas.
- **Server**: `server/utils/auth.ts` con `requireAuth(event)` y `requireAdmin(event)`; en API se usa service role para evitar bloqueos por RLS al leer perfil.

### 2.2 Roles
- **admin**: acceso total al panel y APIs de administración.
- **user**: vendedor/empleado; pedidos, reservas, ofertas por usuario.
- **customer**: comprador; tienda, carrito, “mis pedidos”.

### 2.3 Carrito
- **Store Pinia** `stores/cart.ts`: items con `product_id`, nombre, sku, precio, imagen, cantidad; `subtotal`, `total`, `taxAmount`, `shippingAmount`; acciones add/remove/update/clear y setTax/setShipping.
- El carrito es en memoria/localStorage (no tablas en BD para el carrito).

### 2.4 Pedidos
- Creación desde: **customer** (checkout Mercado Pago), **user** (venta asignada), **admin** (pedido manual).
- `order_source`: `'customer' | 'user' | 'admin'`; `assigned_user_id` para ventas de un usuario.
- Estados: pending, processing, shipped, delivered, cancelled; `payment_status`: pending, paid, failed.
- APIs: `orders/index`, `orders/[id]`, `orders/my`, `orders/create-from-customer`, `orders/create-from-user`, `orders/[id]/update-status`, `orders/[id]/update-payment`, `orders/[id]/cancel`, stats, summary, weekly, recent.

### 2.5 Pagos (Mercado Pago)
- **create-preference**: crea preferencia con ítems del carrito/perfil, crea orden en estado pendiente y order_items; si falla algo posterior, borra la orden.
- **webhook**: actualiza orden según notificación (pago aprobado/rechazado, etc.).

### 2.6 Ofertas y reservas
- **Ofertas globales** (`offers`): por producto, descuento %, vigencia; una oferta activa por producto.
- **Ofertas por usuario** (`user_offers`): mismo esquema asociado a `user_id`; usadas en ventas por vendedor.
- **Reservas** (`reservations`): apartados por usuario/producto/cantidad; estados pending, cancelled, converted; pueden convertirse en orden vía API (approve, create-order).

### 2.7 Inventario
- **products**: `stock_quantity`; ajustes vía RPC `adjust_product_stock(product_id, delta)`.
- **inventory_movements**: tipo (purchase, sale, adjustment, return, in, out, damaged), cantidad, stock_before/stock_after, reason, description, reference.
- APIs: inventory index, movements, adjustments.

### 2.8 API (server)
- Rutas bajo `server/api/`: auth, categories, customers, dashboard, inventory, mercadopago, offers, orders, profiles, products, providers, reservations, user-offers, activity.
- Autenticación en rutas admin con `requireAdmin(event)`; en otras con `requireAuth(event)` o validación por rol según recurso.
- Respuestas unificadas con helpers `respondSuccess` / `respondError` en `server/utils/auth.ts`.

---

## 3. Estructura de la base de datos (Supabase / Postgres)

No hay ORM (Prisma/Drizzle); el esquema se infiere de las migraciones SQL y del uso en el código.

### 3.1 Tablas principales (inferidas)

| Tabla | Uso principal |
|-------|----------------|
| **profiles** | Usuarios de Supabase Auth; campos: id, email, role, first_name, last_name, is_active, phone, address, city, state, postal_code, country, birth_date, gender, notes, avatar_url, created_at, updated_at. |
| **products** | id_product, name, description, price, stock_quantity, sku, category_id, is_active, image_url (o relación con storage), created_at, updated_at, etc. |
| **product-image** | Storage bucket para imágenes de productos (no tabla). |
| **categories** | id, name, description, image, slug, parent_id, is_active, created_at, updated_at. |
| **orders** | id_order, customer/user ref, status, payment_status, total_amount, order_source, assigned_user_id, created_at, updated_at. |
| **order_items** | id, order_id, product_id, quantity, unit_price, total. |
| **customers** | Clientes (posible vínculo con profiles o tabla separada); id_customer, first_name, last_name, email, phone, etc. |
| **providers** | Proveedores (admin). |
| **offers** | id_offer, product_id, discount_percent, is_active, valid_from, valid_to, notes, created_at, updated_at; UNIQUE(product_id). |
| **user_offers** | id_offer, user_id, product_id, discount_percent, is_active, valid_from, valid_to, notes, created_at, updated_at; UNIQUE(user_id, product_id). |
| **reservations** | id_reservation, user_id, product_id, quantity, status (pending/cancelled/converted), notes, expires_at, created_at, updated_at. |
| **inventory_movements** | movement_type (purchase, sale, adjustment, return, in, out, damaged), quantity, product_id, stock_before, stock_after, reason, description, reference, created_at. |

### 3.2 Migraciones SQL incluidas
- **server/sql/001_roles_offers_orders.sql**  
  - Extiende `profiles` (first_name, last_name, is_active, phone, address, etc.).  
  - Añade a `orders`: order_source, assigned_user_id.  
  - Crea `user_offers`, `offers`, `reservations` y triggers `set_updated_at`.  
  - Define RPC `adjust_product_stock(p_id_product, p_delta)`.

- **server/sql/002_inventory_movements_enhancements.sql**  
  - Añade a `inventory_movements`: stock_before, stock_after, reason, description, reference.  
  - Amplía el CHECK de `movement_type` para incluir 'in', 'out', 'damaged'.

### 3.3 Storage
- Bucket **product-image** para imágenes de productos (y posiblemente categorías); URLs públicas vía `getPublicUrl`.

### 3.4 Notas
- Las tablas base (`profiles`, `products`, `orders`, etc.) pueden existir ya en Supabase; las migraciones usan `ADD COLUMN IF NOT EXISTS` y `CREATE TABLE IF NOT EXISTS`.
- RLS debe estar configurado en Supabase según roles (admin lee/escribe todo; user/customer con políticas propias).
- No hay carpeta de migraciones automáticas; los SQL se ejecutan a mano en el proyecto de Supabase.

---

## 4. Despliegue en Vercel

### 4.1 Configuración en el proyecto
- **nuxt.config.ts**:
  - En producción (`NODE_ENV === 'production'`): `nitro.preset: 'vercel'`.
  - `compressPublicAssets: true` en producción.
  - **routeRules** (solo producción):
    - `/api/**`: cache 60 s.
    - `/_nuxt/**`: cache largo (1 año).
    - Prerender: `/`, `/shop`, `/about`.
- No hay **vercel.json** en la raíz; Vercel usa el preset Nitro y la salida generada.

### 4.2 Build y salida
- Comando de build: `nuxi build` (en `package.json`: `"build": "nuxi build"`).
- La salida para Vercel queda en **.vercel/output/** (generada al hacer build):
  - **config.json**: rutas y headers (cache para `/_nuxt/`, `/_fonts/`, fallback a `__nitro`).
  - **nitro.json**: preset `vercel`, deploy con `npx vercel deploy --prebuilt`.
  - **functions/**: función serverless Nitro (p. ej. `__nitro.func`) con dependencias (incl. Supabase).

### 4.3 Variables de entorno en Vercel
Configurar en el dashboard de Vercel (o en CLI) las mismas que en `.env` local:

| Variable | Uso |
|----------|-----|
| **NUXT_SUPABASE_URL** | URL del proyecto Supabase. |
| **NUXT_SUPABASE_KEY** | Clave anónima (public) para el cliente. |
| **NUXT_SUPABASE_SERVICE_KEY** | Service role key para el servidor (APIs, RLS bypass). |

Otras que puedas usar (Mercado Pago, etc.) deben añadirse también en Vercel.

### 4.4 Pasos típicos para desplegar
1. Conectar el repo de GitHub/GitLab/Bitbucket a Vercel.
2. Build command: `npm run build` (o `bun run build` si usas Bun).
3. Output directory: dejar el que detecte Vercel para Nuxt (no es necesario rellenar si usa el preset).
4. Añadir las variables de entorno anteriores (y las de Mercado Pago si aplica).
5. Desplegar; en despliegues posteriores se usará el mismo build y las variables ya configuradas.

### 4.5 Dependencia Vercel
- **@vercel/speed-insights** en `package.json` para métricas de rendimiento en producción.

### 4.6 Recomendaciones
- No subir `.env` al repositorio; usar solo variables en Vercel.
- Si usas webhooks de Mercado Pago, configurar la URL pública de producción en el panel de Mercado Pago (p. ej. `https://tu-dominio.vercel.app/api/mercadopago/webhook`).
- Revisar que las URLs de redirect de Supabase (Auth) incluyan el dominio de producción de Vercel.

---

## 5. Resumen de rutas clave

| Área | Archivos clave |
|------|----------------|
| Config | `nuxt.config.ts`, `tailwind.config.ts`, `tsconfig.json` |
| Entrada | `app.vue`, `error.vue` |
| Estilos | `assets/css/main.css`, `assets/css/theme.css` |
| Auth | `composables/useAuth.ts`, `middleware/admin.global.ts`, `server/utils/auth.ts`, `server/api/auth/upsert-profile.ts` |
| Carrito | `stores/cart.ts` |
| API | `server/api/**` |
| BD | Supabase; esquemas en `server/sql/*.sql` |
| Vercel | `nuxt.config.ts` (nitro preset + routeRules), `.vercel/output/` tras build |

---

*Documento generado a partir del análisis del proyecto. Para cambios en el esquema de BD, ejecutar los SQL en el SQL Editor de Supabase y ajustar RLS según los roles.*
