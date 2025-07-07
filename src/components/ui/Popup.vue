<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "close"]); 

</script>

<template>
  <section
    v-if="modelValue"  
    class="fixed inset-0 z-[2] w-full h-full flex flex-col items-center justify-center bg-gray-950/95 p-4"
  >
    <div class="relative bg-white rounded-lg shadow-xl p-6 max-w-lg w-10/12">
      <slot></slot>
    </div>
  </section>
</template>