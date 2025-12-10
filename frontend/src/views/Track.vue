<template>
  <div>
    <h1>Suivi de commande</h1>
    <form @submit.prevent="trackOrder">
      <label for="orderCode">Code de la commande:</label>
      <input type="text" id="orderCode" v-model="orderCode" required>
      <button type="submit">Suivre</button>
    </form>

    <div v-if="orderData" class="order-info">
      <h2>État de votre commande</h2>
      <p><strong>Code commande :</strong> {{ orderCode }}</p>
      <p><strong>Statut :</strong> 
        <span :style="{ 
          color: orderData.statut === 'livree' ? 'green' : 
                 orderData.statut === 'annulee' ? 'red' : 'orange' 
        }">
          {{ orderData.statut }}
        </span>
      </p>
      <p><strong>Date de création :</strong> {{ new Date(orderData.date_creation).toLocaleString('fr-FR') }}</p>
    </div>
    <p v-if="trackError" class="error">{{ trackError }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../config/api';

const route = useRoute();
const orderCode = ref(route.query.code || '');
const orderData = ref(null);
const trackError = ref('');

onMounted(() => {
  if (orderCode.value) {
    trackOrder();
  }
});

const trackOrder = async () => {
  trackError.value = '';
  orderData.value = null;
  if (!orderCode.value) return;

  try {
    const res = await api.get(`/orders/${orderCode.value}`);
    orderData.value = res.data;
  } catch (err) {
    trackError.value = err.response?.data?.message || 'Commande non trouvée ou une erreur est survenue.';
    console.error('Erreur de suivi', err);
  }
};
</script>

<style scoped>
form {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

input {
  padding: 12px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 6px;
  font-size: 16px;
  background-color: var(--surface, #ffffff);
  color: var(--text-primary, #2d3748);
  flex: 1;
  min-width: 200px;
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

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.error {
  color: var(--error, #f56565);
  margin-top: 10px;
  padding: 12px;
  background: rgba(245, 101, 101, 0.1);
  border-radius: 6px;
  border-left: 4px solid var(--error, #f56565);
}

.order-info {
  margin-top: 20px;
  padding: 30px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 12px;
  background-color: var(--surface, #ffffff);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.1);
}

.order-info h2 {
  color: var(--primary, #667eea);
  margin-bottom: 20px;
}

.order-info p {
  margin: 10px 0;
  color: var(--text-primary, #2d3748);
}
</style>
