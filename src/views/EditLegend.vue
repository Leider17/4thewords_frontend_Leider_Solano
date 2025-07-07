<script setup lang="ts">
import FormLegend from "../components/form/FormLegend.vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useLegendStore } from "../stores/legendStore";
import Popup from "../components/ui/Popup.vue";
import Button from "../components/ui/Button.vue";
import Loading from "../components/ui/Loading.vue";
import HeaderComponent from "../components/layout/HeaderComponent.vue";

const route = useRoute();
const router = useRouter();
const legendStore = useLegendStore();
const initialData = ref<Record<string, any> | undefined>(undefined);
const popupVisible = ref(false);

onMounted(async () => {
  await legendStore.fetchLegend(Number(route.params.id));

  if (legendStore.legendCurrent) {
    initialData.value = legendStore.legendCurrent || undefined;
  } else {
    router.push("/");
  }
});

const handleEditSubmit = async (submitData: FormData) => {
  const response = await legendStore.updateLegend(
    Number(route.params.id),
    submitData
  );

  if (response) {
    popupVisible.value = true;
  } else {
    alert(" Error updating legend: " + legendStore.error);
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

    <FormLegend
      @submit="handleEditSubmit"
      :initialData="initialData"
      @cancel="() => router.push('/')"
    />
  </section>

  <Popup v-model="popupVisible">
    <div class="text-center p-4">
      <p class="text-gray-700 text-lg mb-6">Legend updated successfully.</p>
      <Button @click="closePopup" class="bg-primary text-white w-20 ">
        Ok
      </Button>
    </div>
  </Popup>
</template>
