import { http } from "./apiClient";


const legendsApiUrl = `/legends`;

export const legendService = {
  async getLegends() {
    return http.get(`${legendsApiUrl}`);
  },

  async getLegendsFilters(filters: {
    name?: string;
    category_id?: number;
    legend_date_initial?: string;
    legend_date_final?: string;
    province_id?: number;
    canton_id?: number;
    district_id?: number;
  }) {
    const params = new URLSearchParams();
    for (const filter in filters) {
      const value = filters[filter as keyof typeof filters];
      if (value) {
        params.append(filter, String(value));
      }
    }

    return http.get(`${legendsApiUrl}?${params.toString()}`);
  },
  async getLegendsById(id: number) {
    return http.get(`${legendsApiUrl}/${id}`);
  },

  async createlegend(legendData: FormData) {
    return http.post(`${legendsApiUrl}`, legendData);
  },

  async updatelegend(id: number, legendData: FormData) {
    return http.patch(`${legendsApiUrl}/${id}`, legendData);
  },

  async deletelegend(id: number) {
    return http.delete(`${legendsApiUrl}/${id}`);
  }
};
