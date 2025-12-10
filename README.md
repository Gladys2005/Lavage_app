# 🧺 Application de Gestion de Pressing

Application complète de gestion de commandes de pressing avec frontend Vue.js 3 et backend Node.js/Express.

## 📋 Fonctionnalités

- ✅ Page d'accueil avec présentation des services
- ✅ Formulaire de commande (nom, téléphone, adresse, service, quantité, livraison, paiement)
- ✅ Suivi de commande par code
- ✅ Tableau de bord admin (gestion des commandes, tarifs)
- ✅ Authentification JWT (inscription/connexion)
- ✅ API REST sécurisée

## 🚀 Installation

### Prérequis

- Node.js (v18 ou supérieur)
- PostgreSQL (v12 ou supérieur)
- npm ou yarn

### 1. Configuration de la base de données

Créez une base de données PostgreSQL :

```sql
CREATE DATABASE lavage_app;
```

Exécutez le script SQL pour créer les tables :

```bash
psql -U postgres -d lavage_app -f backend/sql/schema.sql
```

### 2. Configuration du backend

```bash
cd backend
npm install
```

Créez un fichier `.env` dans le dossier `backend/` :

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=lavage_app
DB_PASSWORD=votre_mot_de_passe
DB_PORT=5432

JWT_SECRET=votre_secret_jwt_super_securise
PORT=3000
```

Démarrez le serveur backend :

```bash
npm run dev
```

Le serveur sera accessible sur `http://localhost:3000`

### 3. Configuration du frontend

```bash
cd frontend
npm install
```

Démarrez le serveur de développement :

```bash
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173`

## 📁 Structure du projet

```
LAVAGE/
├── backend/           # API Node.js/Express
│   ├── config/        # Configuration DB
│   ├── middleware/    # Middlewares (auth, admin)
│   ├── routes/        # Routes API
│   ├── sql/           # Schéma SQL
│   └── index.js       # Point d'entrée
├── frontend/          # Application Vue.js 3
│   ├── src/
│   │   ├── views/     # Pages (Home, Order, Track, Admin, Login)
│   │   ├── router/    # Configuration Vue Router
│   │   ├── config/    # Configuration API
│   │   └── App.vue    # Composant principal
│   └── vite.config.ts
└── README.md
```

## 🔐 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Commandes
- `POST /api/orders` - Créer une commande (authentifié)
- `GET /api/orders` - Liste des commandes de l'utilisateur (authentifié)
- `GET /api/orders/:code` - Suivre une commande par code (public)

### Services
- `GET /api/services` - Liste des services (public)

### Admin
- `GET /api/admin/orders` - Toutes les commandes (admin)
- `PATCH /api/admin/orders/:id` - Mettre à jour le statut (admin)

## 👤 Utilisation

1. **Inscription/Connexion** : Accédez à `/login` pour créer un compte ou vous connecter
2. **Passer une commande** : Allez sur `/commander` après connexion
3. **Suivre une commande** : Utilisez `/suivi` avec votre code de commande
4. **Admin** : Accédez à `/admin` avec un compte administrateur

## 🛠️ Technologies utilisées

- **Frontend** : Vue.js 3, Vue Router, Axios, Vite
- **Backend** : Node.js, Express, PostgreSQL, JWT, bcryptjs
- **Base de données** : PostgreSQL

## 📝 Notes

- Assurez-vous que PostgreSQL est en cours d'exécution avant de démarrer le backend
- Le secret JWT doit être changé en production
- Pour créer un compte admin, modifiez directement la base de données :
  ```sql
  UPDATE utilisateurs SET role = 'admin' WHERE email = 'votre_email@example.com';
  ```

## 🔒 Sécurité

- Les mots de passe sont hashés avec bcrypt
- Authentification JWT pour les routes protégées
- Middleware d'administration pour les routes admin
- Validation des données côté serveur

## 📞 Support

Pour toute question ou problème, consultez la documentation ou ouvrez une issue.


