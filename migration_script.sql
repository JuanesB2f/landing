-- Script de migración para usuarios existentes
-- Ejecutar solo si tienes datos en la tabla profiles

-- 1. Crear tabla users si no existe
CREATE TABLE IF NOT EXISTS public.users (
  id_user uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  role text DEFAULT 'customer'::text CHECK (role = ANY (ARRAY['admin'::text, 'manager'::text, 'customer'::text])),
  avatar_url text,
  phone text,
  address text,
  city text,
  state text,
  postal_code text,
  country text DEFAULT 'México'::text,
  is_active boolean DEFAULT true,
  email_verified boolean DEFAULT false,
  last_login timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id_user)
);

-- 2. Migrar datos de profiles a users (si existe la tabla profiles)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'profiles') THEN
    -- Insertar usuarios desde profiles
    INSERT INTO users (id_user, email, password_hash, first_name, last_name, role, avatar_url, created_at, updated_at)
    SELECT 
      id,
      email,
      'migrated_user_' || id, -- Contraseña temporal
      COALESCE(name, 'Usuario'),
      'Migrado',
      COALESCE(role, 'customer'),
      avatar_url,
      created_at,
      updated_at
    FROM profiles
    ON CONFLICT (email) DO NOTHING;
    
    RAISE NOTICE 'Migración completada: % usuarios migrados', (SELECT COUNT(*) FROM users WHERE password_hash LIKE 'migrated_user_%');
  ELSE
    RAISE NOTICE 'Tabla profiles no encontrada, saltando migración';
  END IF;
END $$;

-- 3. Actualizar referencias en customers (si es necesario)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'customers') THEN
    -- Actualizar customer_id para usar la nueva tabla users
    UPDATE customers 
    SET user_id = u.id_user
    FROM users u
    WHERE customers.email = u.email
    AND customers.user_id IS NULL;
    
    RAISE NOTICE 'Referencias de customers actualizadas';
  END IF;
END $$;

-- 4. Crear índices si no existen
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);

-- 5. Insertar usuario administrador por defecto si no existe
INSERT INTO users (email, password_hash, first_name, last_name, role, is_active, email_verified) 
VALUES (
  'admin@ejemplo.com', 
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- admin123
  'Administrador',
  'Sistema',
  'admin',
  true,
  true
)
ON CONFLICT (email) DO NOTHING;

-- 6. Mostrar resumen
SELECT 
  'Migración completada' as status,
  COUNT(*) as total_users,
  COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_users,
  COUNT(CASE WHEN role = 'manager' THEN 1 END) as manager_users,
  COUNT(CASE WHEN role = 'customer' THEN 1 END) as customer_users
FROM users;


