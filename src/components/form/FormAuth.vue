<script setup lang="ts">
import { reactive, computed, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email as emailValidator } from "@vuelidate/validators";

import LabelForm from "../form/LabelForm.vue";
import InputForm from "../form/InputForm.vue";
import Button from "../ui/Button.vue";
import ErrorForm from "../form/MessageError.vue";

const props = defineProps({
  mode: {
    type: String as () => 'login' | 'register',
    required: true,
  },
  errorMessage: {
    type: String,
    default: null,
  },
  isLoading: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(["submit", "cancel"]);

const formData = reactive({
  email: "",
  password: "",
});

const rules = computed(() => ({
  email: {
    required,
    emailValidator,
  },
  password: {
    required,
    minLength: minLength(6),
  },
}));

const v$ = useVuelidate(rules, formData);

const formTitle = computed(() => {
  return props.mode === "login" ? "Login" : "Register";
});

const submitButtonText = computed(() => {
  return props.mode === "login" ? "Login" : "Register";
});

const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }
  emit("submit", { email: formData.email, password: formData.password });
};


watch(() => props.mode, () => {
  formData.email = '';
  formData.password = '';
  v$.value.$reset();
});

</script>

<template>
  <div
    class="w-full max-w-11/12 md:max-w-8/12 lg:max-w-md flex flex-col justify-center items-center border border-gray-300 bg-white text-black p-8 rounded-2xl shadow-xl/20 m-9"
  >
    <h2 class="text-2xl lg:text-3xl text-primary font-bold font-serif mb-6">{{ formTitle }}</h2>
    <form @submit.prevent="handleSubmit" class="w-11/12 lg:w-full">
      <div class="mb-5">
        <LabelForm for="email">Email:</LabelForm>
        <InputForm id="email" type="email" v-model="v$.email.$model" />
        <div v-if="v$.email.$error && v$.email.$dirty">
          <ErrorForm v-if="v$.email.required.$invalid">email is required.</ErrorForm>
          <ErrorForm v-if="v$.email.emailValidator.$invalid">email is invalid.</ErrorForm>
        </div>
      </div>

      <div class="mb-8">
        <LabelForm for="password">password:</LabelForm>
        <InputForm id="password" type="password" v-model="v$.password.$model" />
        <div v-if="v$.password.$error && v$.password.$dirty">
          <ErrorForm v-if="v$.password.required.$invalid">password is required.</ErrorForm>
          <ErrorForm v-if="v$.password.minLength.$invalid">password must have at least 6 characters.</ErrorForm>
        </div>
      </div>

      <div v-if="errorMessage" class="mb-4">
        <ErrorForm>{{ errorMessage }}</ErrorForm>
      </div>
    


      <div class="flex gap-2 justify-center">
        <Button type="submit" class="bg-primary text-white" :disabled="isLoading">
          {{ isLoading ? 'Loading...' : submitButtonText }}
        </Button>
        
      </div>
    </form>
  </div>
</template>

