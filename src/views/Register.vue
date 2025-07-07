<script setup lang="ts">
import { useAuthStore } from '../stores/authStore';
import AuthForm from '../components/form/FormAuth.vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

interface UserData {
  email: string;
  password: string;
}

const handleRegisterSubmit = async (userData: UserData) => {
  const success = await authStore.register(userData);
  if (success) {
    router.push('/login');
  }
};


</script>

<style scoped>
</style>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <AuthForm class="mb-4"
      mode="register"
      :error-message="authStore.error ?? undefined"
      :is-loading="authStore.loading"
      @submit="handleRegisterSubmit"
    />
    <p class="mt-4 text-center">
      Do you already have an account?
        <router-link to="/login" class="text-primary font-bold hover:underline">Login</router-link>
      </p>
  </div>
</template>