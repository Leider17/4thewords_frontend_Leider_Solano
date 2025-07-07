import { defineStore } from "pinia";
import { ref } from "vue";
import { legendService } from "../services/legendService";

export const useLegendStore = defineStore("legend", () => {
  const legends = ref<
    Array<{
      id: number;
      name: string;
      description: string;
      category_name: string;
      image_url: string;
      legend_date: string;
      district_name: string;
      canton_name: string;
      province_name: string;
    }>
  >([]);
  const legendCurrent = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchLegends = async () => {
    loading.value = true;
    error.value = null;
    try {
      legends.value = await legendService.getLegends();
    } catch (e: any) {
      error.value = e.message || "Failed to fetch legends";
    } finally {
      loading.value = false;
    }
  };

  const fetchLegendsFilters = async (filters: {
    name?: string;
    category_id?: number;
    legend_date_initial?: string;
    legend_date_final?: string;
    province_id?: number;
    canton_id?: number;
    district_id?: number;
  }) => {
    loading.value = true;
    error.value = null;
    try {
      legends.value = await legendService.getLegendsFilters(filters);
    } catch (e: any) {
      error.value = e.message || "Failed to fetch legends by filters";
    } finally {
      loading.value = false;
    }
  };

  const fetchLegend = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      legendCurrent.value = await legendService.getLegendsById(id);
    } catch (e: any) {
      error.value = e.message || "Failed to fetch legend";
    } finally {
      loading.value = false;
    }
  };

  const createLegend = async (legendData: FormData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await legendService.createlegend(legendData);
      legends.value.push(response);
      return response;
    } catch (e: any) {
      error.value = e.message || "Failed to create legend";
    } finally {
      loading.value = false;
    }
  };

  const updateLegend = async (id: number, legendData: FormData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await legendService.updatelegend(id, legendData);
      return response;
    } catch (e: any) {
      error.value = e.message || "Failed to update legend";
    } finally {
      loading.value = false;
    }
  };

  const deleteLegend = async (id: number) => {
    loading.value = true;
    error.value = null;
    try {
      await legendService.deletelegend(id);
      legends.value = legends.value.filter((legend) => legend.id !== id);
      return true;
    } catch (e: any) {
      error.value = e.message || "Failed to delete legend";
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    legends,
    legendCurrent,
    loading,
    error,
    fetchLegends,
    fetchLegendsFilters,
    fetchLegend,
    createLegend,
    updateLegend,
    deleteLegend,
  };
});
