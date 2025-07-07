import { defineStore } from "pinia";
import { ref } from "vue";
import { categoryService } from "../services/categoryService";

export const useCategoryStore = defineStore("category", () => {
    const categories = ref<Array<{ id: number; name: string }>>([]);
    const categoryCurrent = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const fetchCategories = async () => {
        loading.value = true;
        error.value = null;
        try {
            categories.value = await categoryService.getCategories();
        } catch (e: any) {
            error.value = e.message || "Failed to fetch categories";
        } finally {
            loading.value = false;
        }
    };

    return { categories, categoryCurrent, loading, error, fetchCategories };
});