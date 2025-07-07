import { http } from "./apiClient";

const cantonsApiUrl = `/cantons`;

export const cantonService = {
  async getCantons(province_id?: number) {
    const params =new URLSearchParams();
    if (province_id) {
      params.append("province_id", String(province_id));
    }
    return http.get(`${cantonsApiUrl}?${params.toString()}`);
  },
};
