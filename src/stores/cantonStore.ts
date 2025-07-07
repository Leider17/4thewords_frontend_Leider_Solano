import { defineStore } from "pinia";
import { ref } from "vue";
import { cantonService } from "../services/cantonService";

export const useCantonStore = defineStore("canton", () => {
    const cantons = ref<Array<{ id: number; name: string }>>([]);
    const cantonCurrent = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const fetchCantons = async (province_id?: number) => {
        loading.value = true;
        error.value = null;
        try {
            cantons.value = await cantonService.getCantons(province_id);
        } catch (e: any) {
            error.value = e.message || "Failed to fetch cantons";
        } finally {
            loading.value = false;
        }
    };

    return { cantons, cantonCurrent, loading, error, fetchCantons };
});