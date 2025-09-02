-- Script para verificar y configurar el usuario existente
-- Ejecutar en Supabase SQL Editor

-- 1. Verificar si existe el usuario en auth.users
SELECT 
  id,
  email,
  created_at,
  email_confirmed_at,
  last_sign_in_at
FROM auth.users 
WHERE email = 'juanesavilafonc.26@gmail.com';

-- 2. Verificar si existe el perfil en la tabla profiles
SELECT 
  id,
  name,
  email,
  role,
  created_at,
  updated_at
FROM public.profiles 
WHERE email = 'juanesavilafonc.26@gmail.com';

-- 3. Si no existe el perfil, crearlo (ejecutar solo si es necesario)
-- INSERT INTO public.profiles (id, name, email, role, created_at, updated_at)
-- SELECT 
--   au.id,
--   'Juan E. Savila',
--   au.email,
--   'admin',
--   au.created_at,
--   NOW()
-- FROM auth.users au
-- WHERE au.email = 'juanesavilafonc.26@gmail.com'
-- ON CONFLICT (id) DO NOTHING;

-- 4. Si el perfil existe pero no tiene rol admin, actualizarlo
UPDATE public.profiles 
SET role = 'admin', updated_at = NOW()
WHERE email = 'juanesavilafonc.26@gmail.com' 
AND (role IS NULL OR role != 'admin');

-- 5. Verificar el resultado final
SELECT 
  p.id,
  p.name,
  p.email,
  p.role,
  p.created_at,
  p.updated_at
FROM public.profiles p
WHERE p.email = 'juanesavilafonc.26@gmail.com';

-- 6. Mostrar todos los usuarios admin
SELECT 
  'Usuarios Admin' as tipo,
  COUNT(*) as total
FROM public.profiles 
WHERE role = 'admin'

UNION ALL

SELECT 
  'Total Usuarios' as tipo,
  COUNT(*) as total
FROM public.profiles;
