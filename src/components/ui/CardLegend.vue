<script setup lang="ts">
import { useLegendStore } from "../../stores/legendStore";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Button from "./Button.vue";
import Popup from "./Popup.vue";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category_name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  legend_date: {
    type: String,
    required: true,
  },
  district_name: {
    type: String,
    required: true,
  },
  canton_name: {
    type: String,
    required: true,
  },
  province_name: {
    type: String,
    required: true,
  },
});

const popupVisible = ref(false);

const timeAgo = computed(() => {
  return formatDistanceToNow(new Date(props.legend_date), {
    addSuffix: true,
    locale: enUS,
  });
});

const legendStore = useLegendStore();
const router = useRouter();

const confirmDelete = () => {
  popupVisible.value = true;
};

const handleDeleteConfirmed = async () => {
  const sucess = await legendStore.deleteLegend(props.id);

  if (sucess) {
    router.push("/");
  } else {
    alert("Error deleting legend: " + legendStore.error);
  }
  popupVisible.value = false;
};

const cancelDelete = () => {
  popupVisible.value = false;
};
</script>

<template>
  <div
    class="flex flex-col justify-center items-center border border-gray-300 bg-white text-black p-5 rounded-2xl m-5 shadow-xl/20 md:flex-row md:justify-stretch"
  >
    <img
      :src="imageUrl"
      alt="legend"
      class="w-50 h-50 object-cover border rounded-2xl"
    />
    <div class="ml-5 w-full">
      <h3 class="text-2xl font-bold font-serif">{{ name }}</h3>
      <p class="mt-2 mb-2">{{ description }}</p>
      <p><span class="font-bold">Province:</span> {{ province_name }}</p>
      <p><span class="font-bold">Canton:</span> {{ canton_name }}</p>
      <p><span class="font-bold">District:</span> {{ district_name }}</p>
      <div class="flex flex-col xl:flex-row xl:gap-2 mb-2">
        <p><span class="font-bold">Created: </span>{{ timeAgo }}</p>
        <p><span class="font-bold">Category:</span> {{ category_name }}</p>
      </div>

      <div class="flex gap-2 justify-end">
        <Button class="bg-primary text-white"
          ><router-link :to="`/edit/${id}`">Update</router-link></Button
        >
        <Button @click="confirmDelete" class="bg-red-secondary text-white"
          >Delete</Button
        >
      </div>
    </div>
  </div>

  <Popup v-model="popupVisible">
    <div class="text-center p-6">
      <p class="text-gray-700 text-lg mb-6">
        Are you sure want to delete this legend?
      </p>
      <div class="flex justify-center gap-4">
        <Button @click="cancelDelete" class="bg-blue-secondary text-white">
          Cancel
        </Button>
        <Button @click="handleDeleteConfirmed" class="bg-red-secondary text-white">
          Delete
        </Button>
      </div>
    </div>
  </Popup>
</template>
