-- Crea automáticamente una fila en public.profiles cuando se registra un usuario en auth.users.
-- Ejecuta este script en el SQL Editor de Supabase (Dashboard → SQL → New query).
-- Sin esto, el perfil solo existía si /api/auth/upsert-profile llegaba a ejecutarse (cookies/sesión).

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_name text;
BEGIN
  v_name := COALESCE(
    NULLIF(TRIM(NEW.raw_user_meta_data->>'full_name'), ''),
    SPLIT_PART(NEW.email, '@', 1)
  );

  INSERT INTO public.profiles (id, email, role, name, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    'customer',
    v_name,
    TRUE
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();

COMMENT ON FUNCTION public.handle_new_user() IS 'Supabase: crea fila en profiles al registrarse (signUp / OAuth).';
