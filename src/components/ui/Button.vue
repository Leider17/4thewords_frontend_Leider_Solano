<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const props = defineProps({
  customClass: {
    type: Array,
    default: [],
  },
  type: {
    type: String as () => "button" | "submit",
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    :type="props.type"
    :class="[
      'rounded-2xl px-4 py-1 hover:scale-105 cursor-pointer',
      ...props.customClass,
    ]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>
