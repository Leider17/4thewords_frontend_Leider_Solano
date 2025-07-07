<script setup lang="ts">
import { ref, onMounted } from "vue"; 
defineOptions({ inheritAttrs: false });

defineProps({
  modelValue: { type: String, default: "" },
  label: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const dateInput = ref<HTMLInputElement | null>(null);

const handleDateChange = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};

const openDatePicker = () => {
  if (dateInput.value && typeof dateInput.value.showPicker === "function") {
    dateInput.value.showPicker();
  }
};

onMounted(() => {
  if (dateInput.value) {
    dateInput.value.addEventListener("focus", openDatePicker);
  }
});
</script>

<template>
  
  <div class="relative w-full">
    <input
      type="date"
      :value="modelValue"
      v-bind="$attrs"
      @change="handleDateChange"
      @click="openDatePicker"
      :class="[
        'rounded-xl shadow-xl/20 border border-gray-300 bg-gray-100 p-0.5',
      ]"
      ref="dateInput"
    />
  </div>
</template>
