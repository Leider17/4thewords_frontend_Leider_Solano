import { API_URL, handleResponse } from "./api";


const legendsApiUrl = `${API_URL}/legends`;

export const legendService = {
  async getLegends() {
    const accessToken = localStorage.getItem('access_token'); 
    const tokenType = localStorage.getItem('token_type') || 'Bearer'; 

    const headers: HeadersInit = {};
    if (accessToken) {
      headers['Authorization'] = `${tokenType} ${accessToken}`;
    } 
    const response = await fetch(legendsApiUrl, {
      method: "GET",
      headers: headers,
    });
    return handleResponse(response);
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

    const response = await fetch(
      `${legendsApiUrl}/filters?${params.toString()}`
    );
    return handleResponse(response);
  },
  async getLegendsById(id: number) {
    const response = await fetch(`${legendsApiUrl}/${id}`);
    return handleResponse(response);
  },

  async createlegend(legendData: FormData) {
    const response = await fetch(legendsApiUrl, {
      method: "POST",
      body: legendData,
    });
    return handleResponse(response);
  },

  async updatelegend(id: number, legendData: FormData) {
    const response = await fetch(`${legendsApiUrl}/${id}`, {
      method: "PATCH",
      body: legendData,
    });
    return handleResponse(response);
  },

  async deletelegend(id: number) {
    const response = await fetch(`${legendsApiUrl}/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },
};
