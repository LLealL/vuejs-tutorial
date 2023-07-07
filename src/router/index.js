import Vue from "vue";
import VueRouter from "vue-router";
import LoginComponent from "../components/LoginComponent.vue"
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Signin",
    component: LoginComponent,
  },

];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;