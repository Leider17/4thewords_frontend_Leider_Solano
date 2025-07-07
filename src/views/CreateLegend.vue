<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { useLegendStore } from "../stores/legendStore";
import { useRouter } from "vue-router";
import HeaderComponent from "../components/layout/HeaderComponent.vue";
import FormLegend from "../components/form/FormLegend.vue";
import Popup from "../components/ui/Popup.vue";
import Button from "../components/ui/Button.vue";

const router = useRouter();
const legendStore = useLegendStore();

const popupVisible = ref(false);

onBeforeUnmount(() => {
  legendStore.legendCurrent = null;
});

const handleCreateSubmit = async (submitData: FormData) => {
  const response = await legendStore.createLegend(submitData);

  if (response) {
    popupVisible.value = true;
  } else {
    alert(" Error creating legend: " + legendStore.error);
  }
};

const closePopup = () => {
  popupVisible.value = false;
  router.push("/");
};
</script>

<template>
  <HeaderComponent />
  <section class="min-h-full flex items-center justify-center">
    <Loading v-if="legendStore.loading" class="flex justify-center" />
    <Error
      v-if="legendStore.error"
      :error="legendStore.error ?? 'An error know occurred'"
    />
    <FormLegend @cancel="() => router.push('/')" @submit="handleCreateSubmit" />
  </section>

  <Popup v-model="popupVisible">
    <div class="text-center p-4">
      <p class="text-gray-700 text-lg mb-6">Legend created successfully.</p>
      <Button @click="closePopup" class="bg-primary text-white w-20">
        Ok
      </Button>
    </div>
  </Popup>
</template>
