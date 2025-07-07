import { API_URL, handleResponse } from "./api";

const categoriesApiUrl = `${API_URL}/categories`;

export const categoryService = {
    async getCategories() {
        const response = await fetch(categoriesApiUrl);
        return handleResponse(response);
    },
};