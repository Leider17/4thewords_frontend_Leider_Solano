import { http } from "./apiClient";

const provincesApiUrl = `/provinces`;

export const provinceService = {
  async getProvinces() {
    return http.get(`${provincesApiUrl}`);
  },
};
