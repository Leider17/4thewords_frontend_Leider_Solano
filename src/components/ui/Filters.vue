<script setup lang="ts">
import { reactive, onMounted, watch } from "vue";
import LabelForm from "../form/LabelForm.vue";
import InputForm from "../form/InputForm.vue";
import SelectForm from "../form/SelectForm.vue";
import DateInput from "./DateInput.vue";
import Button from "./Button.vue";
import { useCategoryStore } from "../../stores/categoryStore";
import { useProvinceStore } from "../../stores/provinceStore";
import { useCantonStore } from "../../stores/cantonStore";
import { useDistrictStore } from "../../stores/districtStore";

const emit = defineEmits(["filter"]);

const filters = reactive({
  name: "",
  category_id: "",
  legend_date_initial: "",
  legend_date_final: "",
  province_id: "",
  canton_id: "",
  district_id: "",
});

const categoryStore = useCategoryStore();
const provinceStore = useProvinceStore();
const cantonStore = useCantonStore();
const districtStore = useDistrictStore();

onMounted(async () => {
  categoryStore.fetchCategories();
  provinceStore.fetchProvinces();
  cantonStore.fetchCantons();
  districtStore.fetchDistricts();
});

watch(
  () => filters,
  (newFilters) => {
    emit("filter", newFilters);
  },
  { deep: true }
);

watch(
  () => filters.province_id,
  async (newProvinceId) => {
    if (newProvinceId) {
      await cantonStore.fetchCantons(Number(newProvinceId));
    } else {
      await cantonStore.fetchCantons();
    }
    filters.canton_id = "";
    filters.district_id = "";
    await districtStore.fetchDistricts();
  }
);

watch(
  () => [filters.province_id, filters.canton_id],
  async ([newProvinceId, newCantonId]) => {
    if (newProvinceId && newCantonId) {
      await districtStore.fetchDistricts(
        Number(newProvinceId),
        Number(newCantonId)
      );
    } else if (newCantonId) {
      await districtStore.fetchDistricts(undefined, Number(newCantonId));
    } else if (newProvinceId) {
      await districtStore.fetchDistricts(Number(newProvinceId), undefined);
    } else {
      await districtStore.fetchDistricts();
    }
    filters.district_id = "";
  }
);

function cleanFilters() {
  for (const key in filters) {
    filters[key as keyof typeof filters] = "";
  }
}
</script>

<template>
  <form
    class="grid grid-cols-1 md:grid-cols-2 xl:flex xl:flex-row xl:items-end gap-4 m- p-6 rounded-2xl"
  >
    <div>
      <LabelForm>Name</LabelForm>
      <InputForm v-model="filters.name" placeholder="Name" />
    </div>

    <div>
      <LabelForm>Category</LabelForm>
      <SelectForm
        v-model="filters.category_id"
        :options="
          categoryStore.categories.map((c) => ({ label: c.name, value: c.id }))
        "
        :placeholder="'Select a category'"
      />
    </div>

    <div>
      <LabelForm>Province</LabelForm>
      <SelectForm
        v-model="filters.province_id"
        :options="
          provinceStore.provinces.map((p) => ({ label: p.name, value: p.id }))
        "
        :placeholder="'Select a province'"
      />
    </div>

    <div>
      <LabelForm>Canton</LabelForm>
      <SelectForm
        v-model="filters.canton_id"
        :options="
          cantonStore.cantons.map((c) => ({ label: c.name, value: c.id }))
        "
        :placeholder="'Select a canton'"
      />
    </div>

    <div>
      <LabelForm>District</LabelForm>
      <SelectForm
        v-model="filters.district_id"
        :options="
          districtStore.districts.map((d) => ({ label: d.name, value: d.id }))
        "
        :placeholder="'Select a district'"
      />
    </div>

    <div>
      <LabelForm>From</LabelForm>
      <DateInput v-model="filters.legend_date_initial" />
    </div>
    <div>
      <LabelForm>To</LabelForm>
      <DateInput v-model="filters.legend_date_final" />
    </div>

    <Button
      type="button"
      class="bg-blue-secondary w-40 h-10 text-white"
      @click="cleanFilters"
      >Clean Filters</Button
    >
  </form>
</template>
