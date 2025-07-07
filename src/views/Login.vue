

<script setup lang="ts">
import { useAuthStore } from '../stores/authStore';
import AuthForm from '../components/form/FormAuth.vue';

const authStore = useAuthStore();

interface Credentials {
  email: string;
  password: string;
}

const handleLoginSubmit = async (credentials: Credentials) => {
  await authStore.login(credentials);
};
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <AuthForm
      mode="login"
      :error-message="authStore.error ?? undefined"
      :is-loading="authStore.loading"
      @submit="handleLoginSubmit"
    />
    <p class="mt-4 text-center">
      Don't you have an account?
        <router-link to="/register" class="text-primary font-bold hover:underline">Register</router-link>
      </p>
  </div>
</template>