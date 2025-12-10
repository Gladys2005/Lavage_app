# 🔧 Guide de Dépannage

## Problème : "Impossible de charger les services"

### 1. Vérifier que le backend est démarré

```bash
cd backend
npm run dev
```

Vous devriez voir :
```
🚀 Backend server starting on http://localhost:3000
✅ Database connection successful
✅ Found X tables in database
```

### 2. Tester la connexion à la base de données

```bash
cd backend
npm run test-db
```

Si ça échoue :
- Vérifiez que PostgreSQL est démarré
- Vérifiez votre fichier `.env` dans `backend/`
- Vérifiez que la base `lavage_app` existe

### 3. Vérifier que les services existent dans la base de données

```bash
cd backend
npm run init-services
```

Ou manuellement dans PostgreSQL :
```sql
SELECT * FROM services;
```

Si la table est vide, exécutez :
```bash
cd backend
npm run init-services
```

### 4. Vérifier que le schéma SQL a été exécuté

```bash
psql -U postgres -d lavage_app -f backend/sql/schema.sql
```

### 5. Vérifier les logs du backend

Quand vous chargez la page, vous devriez voir dans la console du backend :
```
📡 Requête GET /api/services reçue
✅ X service(s) trouvé(s)
```

### 6. Vérifier la console du navigateur

Ouvrez la console (F12) et regardez les erreurs :
- Si vous voyez `ECONNREFUSED` : le backend n'est pas démarré
- Si vous voyez `CORS error` : problème de configuration CORS
- Si vous voyez `500` : erreur côté serveur (vérifiez les logs backend)

### 7. Tester l'API directement

Ouvrez dans votre navigateur :
```
http://localhost:3000/api/services
```

Vous devriez voir un JSON avec les services.

### 8. Vérifier le fichier .env

Assurez-vous que `backend/.env` contient :
```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=lavage_app
DB_PASSWORD=votre_mot_de_passe
DB_PORT=5432
```

## Solutions courantes

### Erreur : "relation 'services' does not exist"
**Solution** : Exécutez le schéma SQL
```bash
psql -U postgres -d lavage_app -f backend/sql/schema.sql
```

### Erreur : "password authentication failed"
**Solution** : Vérifiez le mot de passe PostgreSQL dans `.env`

### Erreur : "ECONNREFUSED"
**Solution** : 
1. Vérifiez que le backend est démarré (`npm run dev`)
2. Vérifiez que le port 3000 n'est pas utilisé par un autre programme

### Erreur : "CORS policy"
**Solution** : Vérifiez que le frontend utilise le port 5173 (Vite par défaut)

## Commandes utiles

```bash
# Tester la connexion DB
cd backend && npm run test-db

# Initialiser les services
cd backend && npm run init-services

# Démarrer le backend
cd backend && npm run dev

# Démarrer le frontend
cd frontend && npm run dev
```

