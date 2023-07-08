import { createRouter, createWebHistory } from "vue-router";

import ChatComponent from "../components/ChatComponent";
import LoginComponent from "../components/LoginComponent";
import SignupComponent from "../components/SignupComponent";

const routes = [

    {
        path: "/",
        name: "Login",
        component: LoginComponent,
    },
    {
        path: "/chat",
        name: "chat",
        component: ChatComponent,
    },
    {
        path: "/signup",
        name: "Signup",
        component: SignupComponent,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;