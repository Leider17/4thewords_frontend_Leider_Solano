import { API_URL, handleResponse } from "./api";

const cantonsApiUrl = `${API_URL}/cantons`;

export const cantonService = {
  async getCantons(province_id?: number) {
    const params =new URLSearchParams();
    if (province_id) {
      params.append("province_id", String(province_id));
    }
    const response = await fetch(`${cantonsApiUrl}?${params.toString()}`);
    return handleResponse(response);
  },
};
