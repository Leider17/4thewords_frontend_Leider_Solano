<script setup lang="ts">
import { onMounted} from "vue";
import { useLegendStore } from "../stores/legendStore";
import HeaderComponent from "../components/layout/HeaderComponent.vue";
import Filters from "../components/ui/Filters.vue";
import CardLegend from "../components/ui/CardLegend.vue";
import Loading from "../components/ui/Loading.vue";
import Error from "../components/ui/Error.vue";

const legendStore = useLegendStore();

onMounted(() => {
  legendStore.fetchLegends();
});



async function handleFilters(filters: any) {
  const params = new URLSearchParams()
  for (const key in filters) {
    if (filters[key]) {
      params.append(key, filters[key])
    }
  }
  const filtersObject = Object.fromEntries(params.entries());
  try {
     await legendStore.fetchLegendsFilters(filtersObject);
  }
  catch (error) {
    console.error(error);
  }
  
}
</script>

<template >
  <HeaderComponent />
  <div class="bg-gray-200 p-4 min-h-screen">
  <Filters @filter="handleFilters"/>
  <Loading  v-if="legendStore.loading" class="flex justify-center"/>
  <Error v-if="legendStore.error" :error="legendStore.error ?? 'An error know occurred'" />
  <section class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 " v-if="!legendStore.loading && !legendStore.error">
    <CardLegend
      v-for="legend in legendStore.legends"
      :key="legend.id"
      :id="legend.id"
      :name="legend.name"
      :category_name="legend.category_name"
      :description="legend.description"
      :imageUrl="legend.image_url"
      :legend_date="legend.legend_date"
      :district_name="legend.district_name"
      :canton_name="legend.canton_name"
      :province_name="legend.province_name"
    />
    <p v-if="legendStore.legends.length === 0"> No legends found</p>
  </section>
</div>


</template>
