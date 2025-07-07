<script setup lang="ts">
import Button from "../ui/Button.vue";
import { useAuthStore } from "../../stores/authStore";
</script>

<template>
  <header
    class="bg-primary text-white flex flex-col text-center md:flex-row md:align-center justify-between shadow-2xl pb-4"
  >
    <router-link to="/" class="flex flex-row gap-1 items-center">
      <img src="../../assets/escudo.svg" alt="" class="w-25 h-25" />
      <h1 class="text-3xl font-serif">Costa Rica legends</h1>
    </router-link>
    <nav class="flex flex-col justify-center">
      <ul>
        <li>
          <Button class="text-xl mr-3 border"
            ><router-link to="/createLegend">Create Legend</router-link></Button
          >
          <Button @click="useAuthStore().logout" class="text-xl mr-3 bg-blue-secondary">Logout</Button>
        </li>
      </ul>
    </nav>
  </header>
</template>
