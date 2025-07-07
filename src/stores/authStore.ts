import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { authService } from "../services/authService";
import router from "../routes/router";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<{ email: string; id?: number } | null>(null);
  const accessToken = ref<string | null>(null);
  const tokenType = ref<string | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!accessToken.value && !!user.value);

  const initializeAuth = async () => {
    const storedAccessToken = localStorage.getItem("access_token");
    const storedTokenType = localStorage.getItem("token_type");

    if (storedAccessToken && storedTokenType) {
      accessToken.value = storedAccessToken;
      tokenType.value = storedTokenType;
      user.value = { email: "usuario_autenticado_placeholder@app.com" }; 
      return true;
    }
    return false;
  };

  const register = async (userData: { email: string; password: string }) => {
    loading.value = true;
    error.value = null;
    try {
      await authService.register(userData);
      return true;
    } catch (e: any) {
      error.value = e.message || "Failed to register.";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await authService.login(credentials);
      accessToken.value = response.access_token;
      tokenType.value = response.token_type;

      user.value = { email: credentials.email };

      localStorage.setItem("access_token", accessToken.value ?? "");
      localStorage.setItem("token_type", tokenType.value ?? "");

      router.push("/");
      return true;
    } catch (e: any) {
      error.value = e.message || "Credenciales inválidas.";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    authService.logout();
    accessToken.value = null;
    tokenType.value = null;
    user.value = null;
    router.push("/login");
  };

  return {
    user,
    accessToken,
    tokenType,
    loading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    initializeAuth,
  };
});