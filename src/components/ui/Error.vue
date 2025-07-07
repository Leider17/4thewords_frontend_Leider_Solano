<script setup lang="ts">
    const props=defineProps({
        error: {
            type: String,
            required: true,
        },
    })
</script>

<template>
    <div  class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
      <p class="font-bold text-xl">¡Error!</p>
      <span class="block sm:inline ml-2">{{ props.error }}</span>
    </div>
</template>