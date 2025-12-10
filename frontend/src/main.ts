import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';

const app = createApp(App);

app.use(router);

// Navigation guard pour vérifier l'authentification
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const isAuthRoute = to.path === '/login';
  
  // Si l'utilisateur essaie d'accéder à /admin sans être connecté
  if (to.path === '/admin' && !token) {
    next('/login');
    return;
  }
  
  // Si l'utilisateur est connecté et essaie d'accéder à /login, rediriger vers l'accueil
  if (isAuthRoute && token) {
    next('/');
    return;
  }
  
  next();
});

app.mount('#app');

