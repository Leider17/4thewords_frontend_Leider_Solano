import { API_URL, handleResponse } from "./api";

const provincesApiUrl = `${API_URL}/provinces`;

export const provinceService = {
  async getProvinces() {
    const response = await fetch(provincesApiUrl);
    return handleResponse(response);
  },
};
