<template>
  <div class="login-page">
    <!-- Formulaire de connexion -->
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Connexion</h2>
      <input type="email" placeholder="Email" v-model="loginForm.email" required>
      <input type="password" placeholder="Mot de passe" v-model="loginForm.password" required>
      <button type="submit" :disabled="loginLoading">
        {{ loginLoading ? 'Connexion...' : 'Se connecter' }}
      </button>
      <p v-if="loginError" class="error">{{ loginError }}</p>
    </form>

    <!-- Formulaire d'inscription -->
    <form @submit.prevent="handleRegister" class="register-form">
      <h2>Inscription</h2>
      <input type="text" placeholder="Nom" v-model="registerForm.nom" required>
      <input type="email" placeholder="Email" v-model="registerForm.email" required>
      <input type="password" placeholder="Mot de passe" v-model="registerForm.password" required>
      <input type="tel" placeholder="Téléphone" v-model="registerForm.telephone">
      <input type="text" placeholder="Adresse" v-model="registerForm.adresse">
      <button type="submit" :disabled="registerLoading">
        {{ registerLoading ? 'Inscription...' : 'S\'inscrire' }}
      </button>
      <p v-if="registerError" class="error">{{ registerError }}</p>
      <p v-if="registerSuccess" class="success">Inscription réussie ! Vous pouvez maintenant vous connecter.</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../config/api';

const router = useRouter();

// --- Connexion ---
const loginForm = ref({ email: '', password: '' });
const loginError = ref('');
const loginLoading = ref(false);

const handleLogin = async () => {
  loginError.value = '';
  loginLoading.value = true;
  try {
    const res = await api.post('/auth/login', {
      email: loginForm.value.email,
      mot_de_passe: loginForm.value.password
    });
    localStorage.setItem('token', res.data.token);
    // Forcer le rechargement pour mettre à jour la navigation
    window.location.href = '/commander';
  } catch (err) {
    loginError.value = err.response?.data?.message || 'Erreur de connexion. Vérifiez vos identifiants.';
    console.error(err);
  } finally {
    loginLoading.value = false;
  }
};

// --- Inscription ---
const registerForm = ref({
  nom: '',
  email: '',
  password: '',
  telephone: '',
  adresse: '',
});
const registerError = ref('');
const registerSuccess = ref(false);
const registerLoading = ref(false);

const handleRegister = async () => {
  registerError.value = '';
  registerSuccess.value = false;
  registerLoading.value = true;
  try {
    await api.post('/auth/register', {
        ...registerForm.value,
        mot_de_passe: registerForm.value.password
    });
    registerSuccess.value = true;
    // Réinitialiser le formulaire
    registerForm.value = {
      nom: '',
      email: '',
      password: '',
      telephone: '',
      adresse: '',
    };
  } catch (err) {
    registerError.value = err.response?.data?.message || 'Erreur lors de l\'inscription. Cet email est peut-être déjà utilisé.';
    console.error(err);
  } finally {
    registerLoading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 40px 20px;
  background-color: var(--background, #f8f9ff);
  min-height: calc(100vh - 80px);
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 12px;
  margin: 20px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.1);
}

form h2 {
  color: var(--primary, #667eea);
  margin-bottom: 20px;
  text-align: center;
}

input {
  margin-bottom: 15px;
  padding: 12px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 6px;
  font-size: 16px;
  background-color: var(--surface, #ffffff);
  color: var(--text-primary, #2d3748);
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus {
  outline: none;
  border-color: var(--primary, #667eea);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

button {
  padding: 12px 24px;
  cursor: pointer;
  background: linear-gradient(135deg, var(--primary, #667eea) 0%, var(--secondary, #764ba2) 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.error {
  color: var(--error, #f56565);
  padding: 10px;
  background: rgba(245, 101, 101, 0.1);
  border-radius: 6px;
  border-left: 4px solid var(--error, #f56565);
  margin-top: 10px;
}

.success {
  color: var(--success, #48bb78);
  padding: 10px;
  background: rgba(72, 187, 120, 0.1);
  border-radius: 6px;
  border-left: 4px solid var(--success, #48bb78);
  margin-top: 10px;
}
</style>
