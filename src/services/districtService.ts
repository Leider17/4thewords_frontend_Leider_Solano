import { API_URL, handleResponse } from "./api";

const districtsApiUrl = `${API_URL}/districts`;

export const districtService = {
    async getDistricts(province_id?: number, canton_id?: number) {
        const params = new URLSearchParams();
        if (province_id) {
            params.append("province_id", String(province_id));
        }
        if (canton_id) {
            params.append("canton_id", String(canton_id));
        }
        const response = await fetch(`${districtsApiUrl}?${params.toString()}`);
        return handleResponse(response);
    },
};