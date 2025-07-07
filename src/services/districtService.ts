import { http } from "./apiClient";

const districtsApiUrl = `/districts`;

export const districtService = {
    async getDistricts(province_id?: number, canton_id?: number) {
        const params = new URLSearchParams();
        if (province_id) {
            params.append("province_id", String(province_id));
        }
        if (canton_id) {
            params.append("canton_id", String(canton_id));
        }
        return http.get(`${districtsApiUrl}?${params.toString()}`);
    },
};