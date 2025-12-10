<template>
  <div class="admin-page">
    <div class="admin-header">
      <h1>📊 Tableau de bord Admin</h1>
      <p class="subtitle">Vue d'ensemble de votre activité</p>
    </div>

    <!-- Statistiques -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon pending">
          <span>⏳</span>
        </div>
        <div class="stat-content">
          <h3>{{ stats.enAttente }}</h3>
          <p>En attente</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon progress">
          <span>🔄</span>
        </div>
        <div class="stat-content">
          <h3>{{ stats.enCours }}</h3>
          <p>En cours</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon ready">
          <span>✅</span>
        </div>
        <div class="stat-content">
          <h3>{{ stats.prete }}</h3>
          <p>Prêtes</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon delivered">
          <span>📦</span>
        </div>
        <div class="stat-content">
          <h3>{{ stats.livree }}</h3>
          <p>Livrées</p>
        </div>
      </div>
    </div>
    
    <section class="orders-section">
      <div class="section-header">
        <h2>📋 Commandes récentes</h2>
        <button @click="loadOrders" class="refresh-btn" :disabled="loading">
          {{ loading ? '⏳' : '🔄' }} Actualiser
        </button>
      </div>
      <div v-if="loading" class="loading">Chargement...</div>
      <div v-else-if="orders.length === 0" class="empty">Aucune commande</div>
      <div v-else class="table-container">
        <table class="orders-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Client</th>
            <th>Service</th>
            <th>Quantité (kg)</th>
            <th>Livraison</th>
            <th>Statut</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.code_commande }}</td>
            <td>{{ order.client_nom }}</td>
            <td>{{ order.service_nom || `Service #${order.service_id}` }}</td>
            <td>{{ order.quantite_kg }} kg</td>
            <td>
              <span class="delivery-badge" :class="{ 'with-delivery': order.avec_livraison }">
                {{ order.avec_livraison ? '🚚 Oui' : '❌ Non' }}
              </span>
            </td>
            <td>
              <select :value="order.statut" @change="updateOrderStatus(order.id, $event.target.value)" class="status-select">
                <option value="en_attente">⏳ En attente</option>
                <option value="en_preparation">🔄 En préparation</option>
                <option value="prete">✅ Prête</option>
                <option value="en_livraison">🚚 En livraison</option>
                <option value="livree">📦 Livrée</option>
                <option value="annulee">❌ Annulée</option>
              </select>
            </td>
            <td>{{ formatDate(order.date_creation) }}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </section>

    <section class="services-section">
      <h2>Tarifs des Services</h2>
      <div v-if="servicesLoading" class="loading">Chargement...</div>
      <div v-else class="services-list">
        <div v-for="service in services" :key="service.id" class="service-item">
          <h3>{{ service.nom }}</h3>
          <p>{{ service.description || 'Pas de description' }}</p>
          <p class="price">{{ service.tarif_kg }}€ / kg</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../config/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const orders = ref([]);
const services = ref([]);
const loading = ref(false);
const servicesLoading = ref(false);
const stats = ref({
  enAttente: 0,
  enCours: 0,
  prete: 0,
  livree: 0,
});

const calculateStats = () => {
  stats.value = {
    enAttente: orders.value.filter(o => o.statut === 'en_attente').length,
    enCours: orders.value.filter(o => ['en_preparation', 'en_livraison'].includes(o.statut)).length,
    prete: orders.value.filter(o => o.statut === 'prete').length,
    livree: orders.value.filter(o => o.statut === 'livree').length,
  };
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

onMounted(async () => {
  // Vérifier si l'utilisateur est connecté et admin
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
    return;
  }
  
  await loadOrders();
  await loadServices();
});

const loadOrders = async () => {
  loading.value = true;
  try {
    const res = await api.get('/admin/orders');
    orders.value = res.data;
    calculateStats();
  } catch (err) {
    console.error('Erreur lors du chargement des commandes', err);
    if (err.response?.status === 401 || err.response?.status === 403) {
      alert('Accès refusé. Vous devez être administrateur.');
      router.push('/login');
    }
  } finally {
    loading.value = false;
  }
};

const loadServices = async () => {
  servicesLoading.value = true;
  try {
    const res = await api.get('/services');
    services.value = res.data;
  } catch (err) {
    console.error('Erreur lors du chargement des services', err);
  } finally {
    servicesLoading.value = false;
  }
};

const updateOrderStatus = async (orderId, newStatus) => {
  try {
    await api.patch(`/admin/orders/${orderId}`, { statut: newStatus });
    // Mettre à jour localement pour une meilleure UX
    const order = orders.value.find(o => o.id === orderId);
    if (order) {
      order.statut = newStatus;
      calculateStats();
    }
    // Recharger pour être sûr d'avoir les dernières données
    await loadOrders();
  } catch (err) {
    console.error('Erreur lors de la mise à jour du statut', err);
    alert('Erreur lors de la mise à jour du statut: ' + (err.response?.data?.message || err.message));
  }
};
</script>

<style scoped>
.admin-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 20px;
  background-color: var(--background, #f8f9ff);
  min-height: calc(100vh - 80px);
}

.admin-header {
  margin-bottom: 30px;
}

.admin-header h1 {
  font-size: 2.5em;
  color: var(--primary, #667eea);
  margin-bottom: 10px;
}

.subtitle {
  color: var(--text-secondary, #718096);
  font-size: 1.1em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: var(--surface, #ffffff);
  border-radius: 12px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
}

.stat-icon.pending {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
}

.stat-icon.progress {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
}

.stat-icon.ready {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
}

.stat-icon.delivered {
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
}

.stat-content h3 {
  font-size: 2.5em;
  font-weight: bold;
  color: var(--text-primary, #2d3748);
  margin-bottom: 5px;
}

.stat-content p {
  color: var(--text-secondary, #718096);
  font-size: 0.9em;
}

section {
  margin-top: 30px;
  background: var(--surface, #ffffff);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  color: var(--primary, #667eea);
  font-size: 1.8em;
}

.refresh-btn {
  padding: 8px 16px;
  background: linear-gradient(135deg, var(--primary, #667eea) 0%, var(--secondary, #764ba2) 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: transform 0.2s;
}

.refresh-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.table-container {
  overflow-x: auto;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.orders-table th,
.orders-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border, #e2e8f0);
}

.orders-table th {
  background: linear-gradient(135deg, var(--primary, #667eea) 0%, var(--secondary, #764ba2) 100%);
  color: white;
}

.orders-table tr:hover {
  background-color: rgba(102, 126, 234, 0.05);
}

.status-select {
  padding: 8px 12px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 6px;
  background-color: var(--surface, #ffffff);
  color: var(--text-primary, #2d3748);
  transition: border-color 0.2s, box-shadow 0.2s;
  cursor: pointer;
  font-size: 14px;
}

.status-select:focus {
  outline: none;
  border-color: var(--primary, #667eea);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.delivery-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.delivery-badge.with-delivery {
  background: rgba(72, 187, 120, 0.1);
  color: var(--success, #48bb78);
}

.loading, .empty {
  text-align: center;
  padding: 40px;
  color: var(--text-secondary, #718096);
}

.services-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.service-item {
  padding: 20px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 12px;
  background-color: var(--surface, #ffffff);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.service-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.15);
}

.service-item h3 {
  color: var(--primary, #667eea);
  margin-bottom: 10px;
}

.service-item .price {
  font-size: 1.3em;
  font-weight: bold;
  color: var(--secondary, #764ba2);
  margin-top: 10px;
}
</style>
