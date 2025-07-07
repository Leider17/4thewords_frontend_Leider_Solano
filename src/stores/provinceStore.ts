import { defineStore } from "pinia";
import { ref } from "vue";
import { provinceService } from "../services/provinceService";

export const useProvinceStore = defineStore("province", () => {
  const provinces = ref<Array<{ id: number; name: string }>>([]);
  const provinceCurrent = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchProvinces = async () => {
    loading.value = true;
    error.value = null;
    try {
      provinces.value = await provinceService.getProvinces();
    } catch (e: any) {
      error.value = e.message || "Failed to fetch provinces";
    } finally {
      loading.value = false;
    }
  };

  return { provinces, provinceCurrent, loading, error, fetchProvinces };
});
