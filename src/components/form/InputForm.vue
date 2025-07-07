<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  customClass: {
    type: Array,
    default: [],
  },
  type: {
    type: String,
    default: "text",
  },
});
defineEmits(["update:modelValue"]);

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    :class="[
      'rounded-xl shadow-xl/10 border border-gray-400 bg-gray-100  px-2 py-0.5 w-full',
      ...props.customClass,
    ]"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
    v-bind="$attrs"
  />
</template>
