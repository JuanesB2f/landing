# 🛍️ BeautyStore - E-commerce Femenino

Un e-commerce moderno y atractivo diseñado específicamente para el público femenino, con un diseño llamativo y funcionalidades avanzadas.

## 🚀 Características

- **Diseño Moderno**: Interfaz atractiva con gradientes rosa y púrpura
- **Responsive**: Optimizado para todos los dispositivos
- **Autenticación**: Sistema de usuarios con roles y permisos
- **Carrito de Compras**: Gestión completa del carrito
- **Panel de Administración**: Gestión de productos, órdenes y usuarios
- **Analytics**: Métricas y reportes en tiempo real
- **Optimizado**: Performance y SEO optimizados

## 🛠️ Stack Tecnológico

### Framework y Versiones
- **Nuxt.js 3.17.6** (SSR habilitado)
- **Vue.js 3.5.13**
- **TypeScript** (configuración automática)
- **Tailwind CSS v4** (incluido en Nuxt UI)

### Librerías de UI
- **@nuxt/ui 3.1.1** (componentes predefinidos)
- **@iconify/vue 5.0.0** (iconos)
- **@iconify-json/heroicons** (iconos principales)
- **@iconify-json/healthicons** (iconos adicionales)
- **@iconify-json/lucide** (iconos adicionales)
- **@iconify-json/svg-spinners** (spinners)

### Base de Datos y Autenticación
- **@nuxtjs/supabase 1.5.0**
- **supabase 2.22.12**
- Autenticación PKCE habilitada
- Middleware de autenticación global

### Gestión de Estado y Datos
- **@pinia/nuxt 0.11.0**
- **pinia 3.0.2**
- **chart.js 4.5.0**
- **vue-chartjs 5.3.2**

### Gráficos y Visualización
- **@vue-flow/core 1.43.1**
- **@vue-flow/additional-components 1.3.3**

### Monitoreo
- **@vercel/speed-insights 1.2.0**

## 📁 Estructura del Proyecto

```
├── components/          # Componentes Vue organizados por módulo
│   ├── admin/          # Panel de administración
│   ├── ecommerce/      # Componentes de e-commerce
│   ├── navigation/     # Navegación y sidebar
│   └── common/         # Componentes comunes
├── layouts/            # Layouts de la aplicación
├── pages/              # Páginas (routing automático)
├── server/api/         # API endpoints (Nuxt server routes)
├── composables/        # Composables reutilizables
├── middleware/         # Middleware de autenticación
├── types/              # Definiciones de TypeScript
├── utils/              # Utilidades (dateUtils, etc.)
├── assets/css/         # Estilos CSS
└── public/             # Archivos estáticos
```

## 🔧 Configuración de Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Git

### Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd landing
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Editar `.env` con tus credenciales de Supabase:
```env
NUXT_SUPABASE_URL=tu_url_de_supabase
NUXT_SUPABASE_KEY=tu_clave_publica
NUXT_SUPABASE_SERVICE_KEY=tu_clave_privada
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🐳 Despliegue con Docker

### Construir imagen
```bash
docker build -t beautystore .
```

### Ejecutar contenedor
```bash
docker run -p 3000:3000 beautystore
```

### Docker Compose
```bash
docker-compose up -d
```

## 🔐 Sistema de Autenticación

### Roles de Usuario
- **Admin**: Acceso completo al sistema
- **Manager**: Gestión de productos y órdenes
- **Customer**: Cliente regular

### Permisos
- Gestión de productos
- Gestión de órdenes
- Gestión de usuarios
- Analytics y reportes
- Gestión de inventario

## 🎨 Sistema de Diseño

### Paleta de Colores
- **Rosa**: `#ec4899` (Pink-500)
- **Púrpura**: `#8b5cf6` (Purple-600)
- **Grises**: Escala personalizada (custom-50 a custom-600)

### Fuentes
- **Principal**: Raleway (Google Fonts)
- **Fallback**: Arial, Helvetica, sans-serif

### Animaciones
- `animate-blob`: Efecto de blob flotante
- `animate-float`: Efecto de flotación
- `animate-shimmer`: Efecto de brillo
- `gradient-shift`: Animación de gradiente

## 📊 Funcionalidades Principales

### E-commerce
- Catálogo de productos
- Carrito de compras
- Proceso de checkout
- Gestión de órdenes
- Sistema de reviews
- Wishlist

### Administración
- Dashboard con métricas
- Gestión de productos
- Gestión de categorías
- Gestión de inventario
- Gestión de usuarios
- Reportes y analytics

### Cliente
- Perfil de usuario
- Historial de órdenes
- Direcciones de envío
- Wishlist personal
- Reviews de productos

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción
npm run build

# Vista previa de producción
npm run preview

# Generación estática
npm run generate
```

## 📈 Analytics y Monitoreo

- **Vercel Speed Insights**: Monitoreo de performance
- **Supabase Analytics**: Métricas de base de datos
- **Custom Analytics**: Métricas personalizadas del e-commerce

## 🔧 Configuración Avanzada

### Tailwind CSS
El proyecto usa Tailwind CSS v4 con configuración personalizada en `tailwind.config.ts`

### Nuxt UI
Componentes predefinidos configurados en `app.config.ts`

### Supabase
Configuración completa en `nuxt.config.ts` con redirecciones automáticas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes alguna pregunta o necesitas ayuda:
- Abre un issue en GitHub
- Contacta al equipo de desarrollo
- Revisa la documentación de Supabase

---

**BeautyStore** - Tu e-commerce femenino moderno y atractivo ✨

