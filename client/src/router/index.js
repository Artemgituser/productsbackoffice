<<<<<<< HEAD
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ProduitsView from "../views/ProduitsView.vue";
import CategoriesView from "../views/CategoriesView.vue";
=======
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import ProduitsView from '../views/ProduitsView.vue';
import CategoriesView from '../views/CategoriesView.vue';
>>>>>>> 53d7e9f (first commit)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
<<<<<<< HEAD
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/produits",
      name: "produits",
      component: ProduitsView,
    },
    {
      path: "/categories",
      name: "categories",
      component: CategoriesView,
    },
    {
      path: "/users",
      name: "users",
      component: () => import("../views/UsersView.vue"),
      meta: { requiresAuth: true },
    },
=======
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/produits',
      name: 'produits',
      component: ProduitsView,
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView,
    },
>>>>>>> 53d7e9f (first commit)
  ],
});

router.beforeEach((to, from, next) => {
<<<<<<< HEAD
  const token = localStorage.getItem("token");
  if (to.name !== "login" && !token) {
    next({ name: "login" });
=======
  const token = localStorage.getItem('token');
  if (to.name !== 'login' && !token) {
    next({ name: 'login' });
>>>>>>> 53d7e9f (first commit)
  } else {
    next();
  }
});

export default router;
