import { defineStore } from "pinia";
import { ref } from "vue";
import { districtService } from "../services/districtService";


export const useDistrictStore = defineStore("district", () => {
    const districts = ref<Array<{ id: number; name: string }>>([]);
    const districtCurrent = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const fetchDistricts = async (province_id?: number, canton_id?: number) => {
        loading.value = true;
        error.value = null;
        try {
            districts.value = await districtService.getDistricts(province_id, canton_id);
        } catch (e: any) {
            error.value = e.message || "Failed to fetch districts";
        } finally {
            loading.value = false;
        }
    };

    return { districts, districtCurrent, loading, error, fetchDistricts };
})