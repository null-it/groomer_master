import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/auth/Login";
import Dashboard from "@/components/pages/Dashboard";
import NewOrder from "@/components/pages/NewOrder"
import DashboardView from "@/components/blocks/dashboard/DashboardView";
import Logout from "@/components/auth/Logout";

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: "/auth",
            component: Login,
            name: "login"
        },
        {
            path: "/logout",
            component: Logout,
            name: "logout"
        },
        {
            path: "/",
            redirect: {name: 'dashboard'}
        },
        {
            path: "/dashboard",
            component: Dashboard,
            children: [

                {
                    path: "",
                    component: DashboardView,
                    name: "dashboard",
                },

                {
                    path: "/order/new",
                    component: NewOrder,
                    name: 'order_new'
                },
            ]
        },

    ]
})

export default router
