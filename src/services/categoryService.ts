import { http } from "./apiClient";

const categoriesApiUrl = `/categories`;

export const categoryService = {
    async getCategories() {
        return http.get(`${categoriesApiUrl}`);
    },
};