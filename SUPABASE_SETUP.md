# Configuración de Supabase

## 1. Crear archivo .env

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
SUPABASE_URL=tu_url_de_supabase_aqui
SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase_aqui
```

## 2. Obtener credenciales de Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto o usa uno existente
3. Ve a Settings > API
4. Copia la URL y la anon key

## 3. Configurar la base de datos

Ejecuta el siguiente SQL en el SQL Editor de Supabase:

```sql
-- Crear tabla de perfiles
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  role text DEFAULT 'customer'::text CHECK (role = ANY (ARRAY['admin'::text, 'manager'::text, 'customer'::text])),
  avatar_url text,
  phone text,
  address text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Función para crear perfil automáticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (new.id, new.raw_user_meta_data->>'name', new.email, 'admin');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil al registrarse
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

## 4. Crear usuario administrador

1. Ve a Authentication > Users en Supabase
2. Crea un nuevo usuario o usa uno existente
3. Actualiza el rol a 'admin' en la tabla profiles:

```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'tu_email@ejemplo.com';
```

## 5. Configurar autenticación

1. Ve a Authentication > Settings
2. Configura los providers que necesites (Email/Password)
3. Configura las URLs de redirección si es necesario

## 6. Probar el sistema

1. Ejecuta `npm run dev`
2. Ve a `http://localhost:3000`
3. Haz clic en "Iniciar Sesión"
4. Usa las credenciales del usuario administrador

## Estructura de la base de datos

El sistema está configurado para trabajar con las siguientes tablas:

- `profiles` - Perfiles de usuario con roles
- `categories` - Categorías de productos
- `products` - Productos
- `customers` - Clientes
- `orders` - Órdenes
- `order_items` - Items de órdenes
- `providers` - Proveedores
- `inventory_movements` - Movimientos de inventario

## Roles disponibles

- `admin` - Acceso completo al sistema
- `manager` - Acceso limitado (futuro)
- `customer` - Solo acceso a compras (futuro)








