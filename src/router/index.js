import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityViewVue from "@/views/CityView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
      meta: {
        title: "home",
      },
    },
    {
      path: "/weather/:state/:city",
      name: "cityView",
      component: CityViewVue,
      meta: {
        title: "Weather",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${
    to.params.state ? `${to.params.city}, ${to.params.state}` : to.meta.title
  } | The Local Weather`;
  next();
});

export default router;
