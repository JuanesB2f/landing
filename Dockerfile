# Dockerfile para BeautyStore E-commerce
# Basado en la configuración de "La Leyenda de San Rafael"

# Etapa de construcción
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY nuxt.config.ts ./
COPY tailwind.config.ts ./
COPY tsconfig.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM node:18-alpine AS production

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias de producción
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copiar archivos construidos
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/public ./public

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nuxt -u 1001

# Cambiar propiedad de archivos
RUN chown -R nuxt:nodejs /app
USER nuxt

# Exponer puerto
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Comando de inicio
CMD ["node", ".output/server/index.mjs"]


