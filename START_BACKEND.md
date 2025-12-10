# 🚀 Guide de Démarrage du Backend

## Problème : "Impossible de se connecter au serveur"

Si vous voyez ce message, cela signifie que le frontend ne peut pas communiquer avec le backend.

## ✅ Solution : Démarrer le Backend

### Étape 1 : Ouvrir un terminal

Ouvrez un nouveau terminal (ne fermez pas celui du frontend).

### Étape 2 : Naviguer vers le dossier backend

```bash
cd backend
```

### Étape 3 : Vérifier les dépendances

Si c'est la première fois :
```bash
npm install
```

### Étape 4 : Vérifier la configuration

Assurez-vous d'avoir un fichier `.env` dans `backend/` avec :

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=lavage_app
DB_PASSWORD=votre_mot_de_passe
DB_PORT=5432

JWT_SECRET=votre_secret_jwt_super_securise
PORT=3000
```

### Étape 5 : Démarrer le backend

```bash
npm run dev
```

Vous devriez voir :
```
🚀 Backend server starting on http://localhost:3000
✅ Database connection successful
✅ Found X tables in database

📡 API endpoints available:
   GET  /health - Health check
   POST /api/auth/register - Register user
   POST /api/auth/login - Login user
   GET  /api/services - List services
   ...
```

### Étape 6 : Vérifier que le backend fonctionne

Ouvrez dans votre navigateur :
```
http://localhost:3000/health
```

Vous devriez voir :
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "..."
}
```

## 🔍 Vérifications

### Le backend ne démarre pas ?

1. **Vérifiez que PostgreSQL est démarré**
   - Windows : Vérifiez dans les services Windows
   - Linux/Mac : `sudo systemctl status postgresql` ou `brew services list`

2. **Vérifiez la connexion à la base de données**
   ```bash
   cd backend
   npm run test-db
   ```

3. **Vérifiez que le port 3000 n'est pas utilisé**
   - Windows : `netstat -ano | findstr :3000`
   - Linux/Mac : `lsof -i :3000`

### Le backend démarre mais la base de données échoue ?

1. Vérifiez votre fichier `.env`
2. Vérifiez que la base `lavage_app` existe :
   ```sql
   CREATE DATABASE lavage_app;
   ```
3. Exécutez le schéma SQL :
   ```bash
   psql -U postgres -d lavage_app -f backend/sql/schema.sql
   ```

## 📝 Commandes Utiles

```bash
# Tester la connexion DB
npm run test-db

# Initialiser les services
npm run init-services

# Démarrer en mode développement
npm run dev

# Démarrer en mode production
npm start
```

## 🎯 Résumé Rapide

**Deux terminaux nécessaires :**

**Terminal 1 - Backend :**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend :**
```bash
cd frontend
npm run dev
```

Les deux doivent être démarrés simultanément pour que l'application fonctionne !


