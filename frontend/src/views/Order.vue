<template>
  <div class="order-page">
    <h1>Passer une commande</h1>
    <form @submit.prevent="submitOrder" class="order-form">
      <label for="service">Type de service:</label>
      <select id="service" v-model="form.service_id" required>
        <option v-for="service in services" :key="service.id" :value="service.id">
          {{ service.nom }} - {{ service.tarif_kg }}€/kg
        </option>
      </select>

      <label for="quantity">Quantité (en kg):</label>
      <input type="number" id="quantity" v-model.number="form.quantity" min="1" required>

      <div class="checkbox-group">
      <input type="checkbox" id="delivery" v-model="form.delivery">
        <label for="delivery">Option livraison</label>
      </div>

      <label for="payment">Méthode de paiement:</label>
      <select id="payment" v-model="form.payment" required>
        <option value="cash">Espèces</option>
        <option value="card">Carte bancaire</option>
      </select>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Envoi en cours...' : 'Valider la commande' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../config/api';

const router = useRouter();
const services = ref([]);
const form = ref({
  service_id: null,
  quantity: 1,
  delivery: false,
  payment: 'cash',
});
const error = ref('');
const loading = ref(false);

onMounted(async () => {
  error.value = '';
  try {
    console.log('🔄 Chargement des services pour la commande...');
    const res = await api.get('/services');
    console.log('✅ Services chargés:', res.data);
    services.value = res.data || [];
    
    if (services.value.length > 0) {
      form.value.service_id = services.value[0].id;
    } else {
      error.value = 'Aucun service disponible. Veuillez contacter l\'administrateur.';
    }
  } catch (err) {
    console.error('❌ Erreur lors du chargement des services', err);
    console.error('   Réponse:', err.response?.data);
    console.error('   Status:', err.response?.status);
    
    if (err.code === 'ECONNREFUSED' || err.message.includes('Network Error')) {
      error.value = 'Impossible de se connecter au serveur. Vérifiez que le backend est démarré.';
    } else if (err.response?.status === 500) {
      error.value = err.response?.data?.message || 'Erreur serveur lors du chargement des services.';
    } else {
      error.value = 'Impossible de charger les services. Veuillez réessayer.';
    }
  }
});

const submitOrder = async () => {
  error.value = '';
  loading.value = true;
  
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      error.value = 'Veuillez vous connecter pour passer une commande.';
      setTimeout(() => router.push('/login'), 2000);
      return;
    }

    const orderData = {
      service_id: form.value.service_id,
      quantite_kg: form.value.quantity,
      avec_livraison: form.value.delivery,
      methode_paiement: form.value.payment,
    };

    const res = await api.post('/orders', orderData);
    alert(`Commande passée avec succès ! Votre code de commande est : ${res.data.code_commande}`);
    // Réinitialiser le formulaire
    form.value = {
      service_id: services.value[0]?.id || null,
      quantity: 1,
      delivery: false,
      payment: 'cash',
    };
    router.push(`/suivi?code=${res.data.code_commande}`);
  } catch (err) {
    console.error('Erreur lors de la commande', err);
    error.value = err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.order-page {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: var(--background, #f8f9ff);
}

.order-page h1 {
  text-align: center;
  margin-bottom: 30px;
  color: var(--primary, #667eea);
}

.order-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--surface, #ffffff);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.1);
}

label {
  font-weight: 500;
  color: var(--text-primary, #2d3748);
  margin-bottom: 5px;
}

input[type="number"],
input[type="text"],
select {
  padding: 12px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 6px;
  font-size: 16px;
  background-color: var(--surface, #ffffff);
  color: var(--text-primary, #2d3748);
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
select:focus {
  outline: none;
  border-color: var(--primary, #667eea);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  margin-top: 10px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.error {
  color: var(--error, #f56565);
  margin-top: 10px;
  padding: 12px;
  background: rgba(245, 101, 101, 0.1);
  border-radius: 6px;
  border-left: 4px solid var(--error, #f56565);
}
</style>
