import { z as useState, b as useNuxtApp } from './server.mjs';
import { computed, ref, readonly } from 'vue';

const useSupabaseClient = () => {
  return useNuxtApp().$supabase.client;
};
const useAuth = () => {
  const supabase = useSupabaseClient();
  const user = useState("user", () => null);
  const isAuthenticated = computed(() => !!user.value);
  const loading = ref(false);
  const login = async (email, password) => {
    loading.value = true;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error || !data.user) {
        throw new Error("Credenciales incorrectas");
      }
      try {
        await $fetch("/api/auth/upsert-profile", { method: "POST" });
      } catch (_e) {
        console.warn("upsert-profile fall\xF3 tras login");
      }
      const { data: profile, error: profileError } = await supabase.from("profiles").select("*").eq("id", data.user.id).single();
      if (profileError || !profile) {
        throw new Error("Perfil de usuario no encontrado");
      }
      if (!["admin", "user", "customer"].includes(profile.role)) {
        throw new Error("Rol no permitido");
      }
      const userData = {
        id: profile.id,
        email: profile.email,
        role: profile.role,
        name: profile.first_name ? `${profile.first_name} ${profile.last_name || ""}`.trim() : profile.name || null,
        avatar: profile.avatar_url,
        created_at: profile.created_at,
        updated_at: profile.updated_at
      };
      user.value = userData;
      if (false) ;
      return { success: true, user: userData };
    } catch (error) {
      console.error("Error en login:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error al iniciar sesi\xF3n"
      };
    } finally {
      loading.value = false;
    }
  };
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error cerrando sesi\xF3n de Supabase:", error);
      }
      user.value = null;
      if (false) ;
      return { success: true };
    } catch (error) {
      console.error("Error en logout:", error);
      user.value = null;
      return {
        success: true
        // Siempre retornar success para permitir redirección
      };
    }
  };
  const checkAuth = async () => {
    try {
      const sessionPromise = supabase.auth.getSession();
      const timeoutPromise = new Promise(
        (_, reject) => setTimeout(() => reject(new Error("Session check timeout")), 5e3)
        // Reducir de 10s a 5s
      );
      const { data: { session }, error } = await Promise.race([sessionPromise, timeoutPromise]);
      if (error || !session) {
        return false;
      }
      const profilePromise = supabase.from("profiles").select("*").eq("id", session.user.id).single();
      const profileTimeoutPromise = new Promise(
        (_, reject) => setTimeout(() => reject(new Error("Profile fetch timeout")), 5e3)
        // Reducir de 10s a 5s
      );
      const { data: profile, error: profileError } = await Promise.race([profilePromise, profileTimeoutPromise]);
      if (profileError || !profile) {
        return false;
      }
      if (!["admin", "user", "customer"].includes(profile.role)) return false;
      user.value = {
        id: profile.id,
        email: profile.email,
        role: profile.role,
        name: profile.first_name ? `${profile.first_name} ${profile.last_name || ""}`.trim() : profile.name || null,
        avatar: profile.avatar_url,
        created_at: profile.created_at,
        updated_at: profile.updated_at
      };
      if (false) ;
      return true;
    } catch (error) {
      return false;
    }
  };
  const register = async (userData) => {
    loading.value = true;
    try {
      const { data: existingUser } = await supabase.from("users").select("id_user").eq("email", userData.email).single();
      if (existingUser) {
        throw new Error("El email ya est\xE1 registrado");
      }
      const passwordHash = userData.password;
      const { data, error } = await supabase.from("users").insert({
        email: userData.email,
        password_hash: passwordHash,
        first_name: userData.first_name,
        last_name: userData.last_name,
        phone: userData.phone,
        role: "customer",
        is_active: true,
        email_verified: false
      }).select().single();
      if (error) {
        throw new Error("Error al crear usuario");
      }
      await supabase.from("customers").insert({
        user_id: data.id_user,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone
      });
      return { success: true, user: data };
    } catch (error) {
      console.error("Error en registro:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error al registrar usuario"
      };
    } finally {
      loading.value = false;
    }
  };
  const changePassword = async (userId, currentPassword, newPassword) => {
    try {
      const { data: user2 } = await supabase.from("users").select("password_hash").eq("id_user", userId).single();
      if (!user2 || user2.password_hash !== currentPassword) {
        throw new Error("Contrase\xF1a actual incorrecta");
      }
      const { error } = await supabase.from("users").update({ password_hash: newPassword }).eq("id_user", userId);
      if (error) {
        throw new Error("Error al cambiar contrase\xF1a");
      }
      return { success: true };
    } catch (error) {
      console.error("Error cambiando contrase\xF1a:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error al cambiar contrase\xF1a"
      };
    }
  };
  const updateProfile = async (userId, profileData) => {
    try {
      const { data, error } = await supabase.from("users").update(profileData).eq("id_user", userId).select().single();
      if (error) {
        throw new Error("Error al actualizar perfil");
      }
      if (user.value && user.value.id === userId) {
        user.value = {
          ...user.value,
          name: `${data.first_name} ${data.last_name}`,
          avatar: data.avatar_url,
          updated_at: data.updated_at
        };
        localStorage.setItem("user", JSON.stringify(user.value));
      }
      return { success: true, user: data };
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error al actualizar perfil"
      };
    }
  };
  return {
    // Estado
    user: readonly(user),
    isAuthenticated,
    loading: readonly(loading),
    // Funciones
    login,
    logout,
    checkAuth,
    register,
    changePassword,
    updateProfile
  };
};

export { useSupabaseClient as a, useAuth as u };
//# sourceMappingURL=useAuth-DSEa5iIv.mjs.map
