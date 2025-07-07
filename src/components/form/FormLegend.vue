<script setup lang="ts">
import { reactive, computed, watch, ref, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useProvinceStore } from "../../stores/provinceStore";
import { useCantonStore } from "../../stores/cantonStore";
import { useDistrictStore } from "../../stores/districtStore";
import { useCategoryStore } from "../../stores/categoryStore";
import LabelForm from "./LabelForm.vue";
import InputForm from "./InputForm.vue";
import SelectForm from "./SelectForm.vue";
import Button from "../ui/Button.vue";
import ErrorForm from "./MessageError.vue";
import { required, minLength, maxLength, numeric } from "@vuelidate/validators";

const provinceStore = useProvinceStore();
const cantonStore = useCantonStore();
const districtStore = useDistrictStore();
const categoryStore = useCategoryStore();

const props = defineProps({
  initialData: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(["submit", "cancel"]);

const imageInput = ref(null);
const selectedFile = ref<File | null>(null);
const imageHasError = ref(false);

const submitButton = computed(() => {
  return props.initialData ? "Update" : "Create";
});

const formData = reactive({
  name: props.initialData?.name || "",
  description: props.initialData?.description || "",
  category_id: props.initialData?.category_id || null,
  province_id: props.initialData?.province_id || null,
  canton_id: props.initialData?.canton_id || null,
  district_id: props.initialData?.district_id || null,
  image_url: props.initialData?.image_url || null,
  cloudinary_public_id: props.initialData?.cloudinary_public_id || null,
});

const rules = computed(() => ({
  name: {
    required,
    minLength: minLength(5),
    maxLength: maxLength(30),
  },
  description: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(255),
  },
  category_id: {
    required,
  },
  district_id: {
    required,
    numeric,
  },
}));

const v$ = useVuelidate(rules, formData);

watch(
  () => props.initialData,
  async (newVal) => {
    if (newVal) {
      Object.assign(formData, newVal);

      await provinceStore.fetchProvinces();

      if (newVal.province_id) {
        await cantonStore.fetchCantons(Number(newVal.province_id));
        if (newVal.canton_id) {
          await districtStore.fetchDistricts(
            Number(newVal.province_id),
            Number(newVal.canton_id)
          );
        } else {
          await districtStore.fetchDistricts(
            Number(newVal.province_id),
            undefined
          );
        }
      } else {
        await cantonStore.fetchCantons();
        await districtStore.fetchDistricts();
      }
    } else {
      formData.name = "";
      formData.description = "";
      formData.category_id = null;
      formData.province_id = null;
      formData.canton_id = null;
      formData.district_id = null;
      formData.image_url = null;
      formData.cloudinary_public_id = null;
      selectedFile.value = null;

      await provinceStore.fetchProvinces();
      await cantonStore.fetchCantons();
      await districtStore.fetchDistricts();
    }
    v$.value.$reset();
  },
  { immediate: true, deep: true }
);

onMounted(async () => {
  await provinceStore.fetchProvinces();
  await categoryStore.fetchCategories();
});

watch(
  () => formData.province_id,
  async (newProvinceId) => {
    if (newProvinceId) {
      await cantonStore.fetchCantons(Number(newProvinceId));
    } else {
      await cantonStore.fetchCantons();
    }
    if (
      !props.initialData ||
      formData.canton_id !== props.initialData.canton_id
    ) {
      formData.canton_id = null;
    }
    if (
      !props.initialData ||
      formData.district_id !== props.initialData.district_id
    ) {
      formData.district_id = null;
    }
    if (newProvinceId) {
      await districtStore.fetchDistricts(Number(newProvinceId), undefined);
    } else {
      await districtStore.fetchDistricts();
    }
  },
  { deep: true }
);

watch(
  () => [formData.province_id, formData.canton_id],
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
    if (
      !props.initialData ||
      formData.district_id !== props.initialData.district_id
    ) {
      formData.district_id = null;
    }
  },
  { deep: true }
);

const handleImageSelect = (event: Event) => {
  if (event.target) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      selectedFile.value = file;
      imageHasError.value = false;
      formData.image_url = null;
    } else {
      if (!formData.image_url && !selectedFile.value && !props.initialData) {
        imageHasError.value = true;
      }
    }
  }
};

const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate();

  if (!props.initialData && !selectedFile.value) {
    imageHasError.value = true;
  } else if (
    props.initialData &&
    !props.initialData.image_url &&
    !selectedFile.value
  ) {
    imageHasError.value = true;
  } else {
    imageHasError.value = false;
  }

  if (!isFormCorrect || imageHasError.value) {
    return;
  }

  let submitData = new FormData();
  submitData.append("name", formData.name);
  submitData.append("description", formData.description);
  submitData.append("category_id", formData.category_id);
  submitData.append("district_id", formData.district_id);
  submitData.append("legend_date", (new Date().getTime() / 1000).toFixed(0));

  if (selectedFile.value) {
    submitData.append("image_file", selectedFile.value);
  } else if (formData.image_url) {
    submitData.append("image_url", formData.image_url);
    if (formData.cloudinary_public_id) {
      submitData.append("cloudinary_public_id", formData.cloudinary_public_id);
    }
  }

  emit("submit", submitData);
};

const handleCancel = () => {
  emit("cancel");
};
</script>

<template>
  <div
    class="w-full max-w-11/12 md:max-w-8/12 lg:max-w-svh flex flex-col justify-center items-center border border-gray-300 bg-white text-black p-8 rounded-2xl shadow-xl/20 m-9"
  >
  <h2 class="text-2xl lg:text-4xl text-primary font-bold font-serif mb-3">{{ submitButton }} Legend</h2>
    <form @submit.prevent="handleSubmit" class="w-11/12 lg:w-8/12">
      <div class="mb-8">
        <LabelForm for="name">Name</LabelForm>
        <InputForm id="name" v-model="v$.name.$model" />
        <div v-if="v$.name.$error && v$.name.$dirty">
          <ErrorForm v-if="v$.name.required.$invalid"
            >The name is required.</ErrorForm
          >
          <ErrorForm v-if="v$.name.minLength.$invalid"
            >The name must have at least 5 characters.</ErrorForm
          >
          <ErrorForm v-if="v$.name.maxLength.$invalid"
            >The name cannot exceed 30 characters.</ErrorForm
          >
        </div>
      </div>

      <div class="mb-8">
        <LabelForm for="description">Description</LabelForm>
        <textarea
          id="description"
          name="description"
          v-model="v$.description.$model"
          class="rounded-xl shadow-xl/10 border border-gray-400 bg-gray-100 px-2 py-0.5 w-full lg:w-10/12 h-30"
        ></textarea>
        <div v-if="v$.description.$error && v$.description.$dirty">
          <ErrorForm v-if="v$.description.required.$invalid"
            >The description is required.</ErrorForm
          >
          <ErrorForm v-if="v$.description.minLength.$invalid"
            >The description must have at least 3 characters.</ErrorForm
          >
          <ErrorForm v-if="v$.description.maxLength.$invalid"
            >The description cannot exceed 255 characters.</ErrorForm
          >
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="mb-4">
          <LabelForm for="category">Category</LabelForm>
          <SelectForm
            id="category"
            v-model="v$.category_id.$model"
            :options="
              categoryStore.categories.map((c) => ({
                label: c.name,
                value: c.id,
              }))
            "
          />
          <div v-if="v$.category_id.$error && v$.category_id.$dirty">
            <ErrorForm v-if="v$.category_id.required.$invalid"
              >The category is required.</ErrorForm
            >
          </div>
        </div>

        <div class="mb-4">
          <LabelForm for="province">Province</LabelForm>
          <SelectForm
            id="province"
            v-model="formData.province_id"
            :options="
              provinceStore.provinces.map((p) => ({
                label: p.name,
                value: p.id,
              }))
            "
          />
        </div>

        <div class="mb-4">
          <LabelForm for="canton">Canton</LabelForm>
          <SelectForm
            id="canton"
            v-model="formData.canton_id"
            :options="
              cantonStore.cantons.map((c) => ({ label: c.name, value: c.id }))
            "
          />
        </div>

        <div class="mb-4">
          <LabelForm for="district">District</LabelForm>
          <SelectForm
            id="district"
            v-model="v$.district_id.$model"
            :options="
              districtStore.districts.map((d) => ({
                label: d.name,
                value: d.id,
              }))
            "
          />
          <div v-if="v$.district_id.$error && v$.district_id.$dirty">
            <ErrorForm v-if="v$.district_id.required.$invalid"
              >The district is required.</ErrorForm
            >
          </div>
        </div>
      </div>

      <div class="mb-4">
        <LabelForm for="image">Legend Image</LabelForm>
        <input
          type="file"
          id="image"
          ref="imageInput"
          accept="image/*"
          @change="handleImageSelect"
          class="file:bg-gradient-to-b file:from-gray-300 file:to-gray-400 file:px-6 file:py-1 file:border-none file:rounded-full file:shadow-xl w-full"
        />
        <div v-if="props.initialData?.image_url && !selectedFile" class="mt-5">
          <LabelForm>Current Image:</LabelForm>
          <img
            :src="props.initialData.image_url"
            alt="Current Image"
            class="w-50 h-50 object-cover rounded-2xl"
          />
        </div>
        <div v-if="imageHasError">
          <ErrorForm>Image is required</ErrorForm>
        </div>
      </div>

      <div class="flex gap-2 justify-end">
        <Button type="submit" class="bg-primary text-white">{{
          submitButton
        }}</Button>
        <Button
          type="button"
          class="bg-blue-secondary text-white"
          @click="handleCancel"
          >Cancel</Button
        >
      </div>
    </form>
  </div>
</template>
