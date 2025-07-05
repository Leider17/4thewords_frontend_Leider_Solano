import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import EditLegend from "../views/EditLegend.vue";
import CreateLegend from "../views/CreateLegend.vue";
import LegendDetails from "../views/LegendDetails.vue";

const routes=[
    {
        path:"/",
        name:"Home",
        component:Home
    },
    {
        path:"/edit/:id",
        name:"EditLegend",
        component:EditLegend
    },
    {
        path:"/create",
        name:"CreateLegend",
        component:CreateLegend
    },
    {
        path:"/legend/:id",
        name:"LegendDetails",
        component:LegendDetails
    }
]

const router= createRouter({
    history:createWebHistory(),
    routes
})

export default router;