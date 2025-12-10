<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-brand">
        <router-link to="/">🧺 Pressing Pro</router-link>
      </div>
      <div class="nav-links">
        <router-link to="/">Accueil</router-link>
        <router-link to="/commander">Commander</router-link>
        <router-link to="/suivi">Suivi</router-link>
        <router-link v-if="isAuthenticated" to="/admin">Admin</router-link>
        <router-link v-if="!isAuthenticated" to="/login">Connexion</router-link>
        <button v-else @click="logout" class="logout-btn">Déconnexion</button>
      </div>
    </nav>
    <BackendStatus />
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import BackendStatus from './components/BackendStatus.vue';

const router = useRouter();
const route = useRoute();
const isAuthenticated = ref(false);

const checkAuth = () => {
  isAuthenticated.value = !!localStorage.getItem('token');
};

onMounted(() => {
  checkAuth();
});

// Vérifier l'authentification à chaque changement de route
watch(() => route.path, () => {
  checkAuth();
});

const logout = () => {
  localStorage.removeItem('token');
  isAuthenticated.value = false;
  router.push('/');
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-primary, #2d3748);
  background-color: var(--background, #f8f9ff);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-brand a {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-exact-active {
  opacity: 0.8;
  text-decoration: underline;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

main {
  flex: 1;
  background-color: var(--background, #f8f9ff);
  min-height: calc(100vh - 80px);
}
</style>
