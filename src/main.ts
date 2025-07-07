// src/main.ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/router'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore'

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

const authStore = useAuthStore(); 
authStore.initializeAuth(); 
                            


createApp(App).use(router).use(pinia).mount('#app');