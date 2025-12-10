import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Order from '../views/Order.vue';
import Track from '../views/Track.vue';
import Admin from '../views/Admin.vue';
import Login from '../views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/commander',
    name: 'Order',
    component: Order,
  },
  {
    path: '/suivi',
    name: 'Track',
    component: Track,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
