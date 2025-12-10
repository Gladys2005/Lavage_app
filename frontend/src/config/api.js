import axios from 'axios';

// Utiliser le proxy Vite en développement, ou l'URL directe en production
const getBaseURL = () => {
  // En développement, utiliser le proxy Vite (URL relative)
  if (import.meta.env.DEV) {
    return '/api';
  }
  // En production, utiliser l'URL complète
  return import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 secondes de timeout
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gérer les erreurs de connexion
    if (!error.response) {
      // Pas de réponse = problème de connexion
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error') || error.code === 'ERR_NETWORK') {
        console.error('❌ Impossible de se connecter au backend');
        console.error('   Vérifiez que le backend est démarré sur http://localhost:3000');
        console.error('   Commande: cd backend && npm run dev');
      } else if (error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
        console.error('❌ Timeout: Le serveur met trop de temps à répondre');
      }
    }
    
    if (error.response?.status === 401) {
      // Token invalide ou expiré
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;


