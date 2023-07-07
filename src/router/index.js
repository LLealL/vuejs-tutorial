import Vue from "vue";
import VueRouter from "vue-router";
import LoginComponent from "../components/LoginComponent.vue";
import SignupComponent from "../components/LoginComponent.vue";
import ChatComponent from "../components/ChatComponent.vue";

Vue.use(VueRouter);
const routes = [
{
    path: "/",
    name: "Chat",
    component: ChatComponent,
},
  {
    path: "/signin",
    name: "Signin",
    component: LoginComponent,
  },
  {
    path: "/Signup",
    name: "Signup",
    component: SignupComponent,
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;