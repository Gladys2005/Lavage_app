<template>
  <div class="home-page">
    <section class="hero">
      <h1>Service de Pressing Professionnel</h1>
      <p>Nous prenons soin de vos vêtements avec des services de qualité professionnelle.</p>
      <router-link to="/commander">
        <button class="cta-button">Commander maintenant</button>
      </router-link>
    </section>

    <section class="services-preview">
      <h2>Nos Services</h2>
      <div v-if="error" class="error-message">
        <p>{{ error }}</p>
        <button @click="location.reload()" class="retry-btn">Réessayer</button>
      </div>
      <div v-else-if="services.length === 0" class="loading-services">
        <p>Chargement des services...</p>
      </div>
      <div v-else class="services-grid">
        <div class="service-card" v-for="service in services" :key="service.id">
          <h3>{{ service.nom }}</h3>
          <p>{{ service.description || 'Service de qualité' }}</p>
          <p class="price">{{ service.tarif_kg }}€ / kg</p>
        </div>
      </div>
    </section>

    <section class="how-it-works">
      <h2>Comment ça marche ?</h2>
      <div class="steps">
        <div class="step">
          <span class="step-number">1</span>
          <h3>Commandez</h3>
          <p>Remplissez le formulaire avec vos informations</p>
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <h3>Nous traitons</h3>
          <p>Vos vêtements sont nettoyés avec soin</p>
        </div>
        <div class="step">
          <span class="step-number">3</span>
          <h3>Livraison</h3>
          <p>Récupérez vos vêtements propres</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../config/api';

const services = ref([]);
const error = ref('');

onMounted(async () => {
  error.value = '';
  try {
    console.log('🔄 Chargement des services...');
    const res = await api.get('/services');
    console.log('✅ Services chargés:', res.data);
    services.value = res.data || [];
    
    if (services.value.length === 0) {
      error.value = 'Aucun service disponible pour le moment.';
    }
  } catch (err) {
    console.error('❌ Erreur lors du chargement des services', err);
    console.error('   Réponse:', err.response?.data);
    console.error('   Status:', err.response?.status);
    console.error('   Message:', err.message);
    
    if (err.code === 'ECONNREFUSED' || err.message.includes('Network Error') || err.code === 'ERR_NETWORK') {
      error.value = 'Le backend n\'est pas accessible. Assurez-vous qu\'il est démarré (cd backend && npm run dev)';
    } else if (err.code === 'ETIMEDOUT') {
      error.value = 'Le serveur met trop de temps à répondre. Vérifiez votre connexion.';
    } else if (err.response?.status === 500) {
      error.value = err.response?.data?.message || 'Erreur serveur lors du chargement des services.';
    } else {
      error.value = 'Impossible de charger les services. Veuillez réessayer.';
    }
  }
});
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.hero {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.hero p {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.cta-button {
  padding: 15px 40px;
  font-size: 18px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  transition: transform 0.2s;
}

.cta-button:hover {
  transform: scale(1.05);
}

.services-preview {
  margin: 40px 0;
}

.services-preview h2 {
  text-align: center;
  margin-bottom: 30px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.service-card {
  padding: 25px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 12px;
  text-align: center;
  background-color: var(--surface, #ffffff);
  transition: transform 0.2s, box-shadow 0.2s;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.service-card h3 {
  color: #667eea;
  margin-bottom: 10px;
}

.price {
  font-size: 1.5em;
  font-weight: bold;
  color: #764ba2;
  margin-top: 10px;
}

.how-it-works {
  margin: 40px 0;
  text-align: center;
}

.how-it-works h2 {
  margin-bottom: 40px;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.step {
  position: relative;
}

.step-number {
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  background: #667eea;
  color: white;
  border-radius: 50%;
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 15px;
}

.step h3 {
  margin: 15px 0 10px;
}

.error-message {
  text-align: center;
  padding: 30px;
  background: rgba(245, 101, 101, 0.1);
  border: 2px solid var(--error, #f56565);
  border-radius: 12px;
  margin: 20px 0;
}

.error-message p {
  color: var(--error, #f56565);
  font-size: 1.1em;
  margin-bottom: 15px;
}

.retry-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, var(--primary, #667eea) 0%, var(--secondary, #764ba2) 100%);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: transform 0.2s;
}

.retry-btn:hover {
  transform: translateY(-2px);
}

.loading-services {
  text-align: center;
  padding: 40px;
  color: var(--text-secondary, #718096);
}
</style>
