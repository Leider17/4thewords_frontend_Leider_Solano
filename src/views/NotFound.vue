<script setup lang="ts">
    import Button from '../components/ui/Button.vue'
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-9xl text-primary font-bold" >404</h1>
        <h2 class="text-6xl text-primary font-bold">Page not found</h2>
        <Button class="hover:scale-105 text-xl mt-3 border bg-primary text-white"
        ><router-link to="/">Back to Home</router-link></Button>
    </div>
</template>