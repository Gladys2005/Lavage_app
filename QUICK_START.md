# 🚀 Guide de Démarrage Rapide

## Installation Express

### 1. Base de données PostgreSQL

```bash
# Créer la base de données
createdb lavage_app

# Ou avec psql
psql -U postgres
CREATE DATABASE lavage_app;
\q

# Exécuter le schéma SQL
psql -U postgres -d lavage_app -f backend/sql/schema.sql
```

### 2. Backend

```bash
cd backend
npm install

# Créer le fichier .env (copiez depuis ENV_EXAMPLE.txt)
# Modifiez les valeurs selon votre configuration PostgreSQL

# Démarrer le serveur
npm run dev
```

Le backend sera accessible sur `http://localhost:3000`

### 3. Frontend

```bash
cd frontend
npm install

# Démarrer le serveur de développement
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173`

## 🔑 Créer un compte Admin

Pour créer un compte administrateur, connectez-vous d'abord avec un compte normal, puis dans PostgreSQL :

```sql
UPDATE utilisateurs SET role = 'admin' WHERE email = 'votre_email@example.com';
```

## ✅ Vérification

1. Ouvrez `http://localhost:5173`
2. Créez un compte sur `/login`
3. Connectez-vous
4. Passez une commande sur `/commander`
5. Suivez votre commande sur `/suivi`

## 🐛 Dépannage

### Erreur de connexion à la base de données
- Vérifiez que PostgreSQL est en cours d'exécution
- Vérifiez les identifiants dans `backend/.env`
- Vérifiez que la base de données `lavage_app` existe

### Erreur CORS
- Vérifiez que le backend est démarré sur le port 3000
- Vérifiez que le frontend utilise le port 5173

### Token invalide
- Déconnectez-vous et reconnectez-vous
- Vérifiez que le JWT_SECRET est le même dans le backend


