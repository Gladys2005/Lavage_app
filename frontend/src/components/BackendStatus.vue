<template>
  <div v-if="showWarning" class="backend-warning">
    <div class="warning-content">
      <h3>⚠️ Backend non disponible</h3>
      <p>Le serveur backend n'est pas accessible. Veuillez démarrer le backend pour utiliser l'application.</p>
      <div class="instructions">
        <p><strong>Pour démarrer le backend :</strong></p>
        <ol>
          <li>Ouvrez un terminal</li>
          <li>Naviguez vers le dossier backend : <code>cd backend</code></li>
          <li>Démarrez le serveur : <code>npm run dev</code></li>
        </ol>
        <p>Le backend doit être accessible sur <code>http://localhost:3000</code></p>
      </div>
      <button @click="checkBackend" class="retry-btn">Vérifier à nouveau</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../config/api';

const showWarning = ref(false);

const checkBackend = async () => {
  try {
    // Utiliser fetch avec le proxy Vite en développement
    const url = import.meta.env.DEV ? '/health' : 'http://localhost:3000/health';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.status === 'healthy') {
        showWarning.value = false;
        return;
      }
    }
    showWarning.value = true;
  } catch (err) {
    console.log('Backend check failed:', err);
    showWarning.value = true;
  }
};

onMounted(() => {
  // Vérifier le backend au démarrage
  checkBackend();
  
  // Vérifier périodiquement (toutes les 30 secondes)
  setInterval(checkBackend, 30000);
});
</script>

<style scoped>
.backend-warning {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  max-width: 600px;
  width: 90%;
  margin: 20px auto;
}

.warning-content {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #f59e0b;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.3);
}

.warning-content h3 {
  color: #92400e;
  margin-bottom: 15px;
  font-size: 1.3em;
}

.warning-content p {
  color: #78350f;
  margin-bottom: 15px;
  line-height: 1.6;
}

.instructions {
  background: rgba(255, 255, 255, 0.7);
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0;
}

.instructions ol {
  margin: 10px 0;
  padding-left: 25px;
}

.instructions li {
  color: #78350f;
  margin: 8px 0;
  line-height: 1.6;
}

.instructions code {
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #92400e;
  font-weight: bold;
}

.retry-btn {
  margin-top: 15px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
</style>

