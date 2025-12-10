# 🚀 Guide de Démarrage Complet

## ⚠️ Erreur : ECONNREFUSED

Cette erreur signifie que le **backend n'est pas démarré**. Vous devez démarrer les deux serveurs simultanément.

## 📋 Étapes pour démarrer l'application

### Terminal 1 - Backend

```bash
cd backend
npm run dev
```

Vous devriez voir :
```
🚀 Backend server starting on http://localhost:3000
✅ Database connection successful
✅ Found 3 tables in database
```

### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

Vous devriez voir :
```
➜  Local:   http://localhost:5173/
```

## ✅ Vérification

1. **Backend** : Ouvrez `http://localhost:3000/health` dans votre navigateur
   - Vous devriez voir : `{"status":"healthy","database":"connected",...}`

2. **Frontend** : Ouvrez `http://localhost:5173`
   - Le message d'erreur devrait disparaître
   - Les services devraient se charger

## 🔍 Dépannage

### Le backend ne démarre pas ?

1. **Vérifiez PostgreSQL** :
   ```bash
   cd backend
   npm run test-db
   ```

2. **Vérifiez le fichier .env** :
   - Assurez-vous qu'il existe dans `backend/.env`
   - Vérifiez que le mot de passe PostgreSQL est correct

3. **Vérifiez que le port 3000 n'est pas utilisé** :
   ```bash
   netstat -ano | findstr :3000
   ```

### Le frontend ne se connecte pas au backend ?

1. **Vérifiez que le backend est démarré** sur le port 3000
2. **Vérifiez les logs du backend** pour voir s'il y a des erreurs
3. **Rechargez la page** du frontend (F5)

## 📝 Résumé

**IMPORTANT** : Vous devez avoir **2 terminaux ouverts** :

- **Terminal 1** : Backend (`npm run dev` dans `backend/`)
- **Terminal 2** : Frontend (`npm run dev` dans `frontend/`)

Les deux doivent être démarrés en même temps !

