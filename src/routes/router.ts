import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import EditLegend from "../views/EditLegend.vue";
import CreateLegend from "../views/CreateLegend.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

import { useAuthStore } from "../stores/authStore";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { requiresAuth: false }
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { requiresAuth: false }
    },
    {
        path: "/edit/:id",
        name: "EditLegend",
        component: EditLegend,
        meta: { requiresAuth: true }
    },
    {
        path: "/createLegend",
        name: "CreateLegend",
        component: CreateLegend,
        meta: { requiresAuth: true }
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound,
        meta: { requiresAuth: false }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'Login' });
    } else if ((to.name === 'Login' || to.name === 'Register') && authStore.isAuthenticated) {
        next({ name: 'Home' });
    } else {
        next();
    }
});

export default router;