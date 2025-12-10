# 🔐 Comment devenir Administrateur

## Méthode 1 : Script automatique (Recommandé)

### Étape 1 : Exécuter le script

```bash
cd backend
npm run create-admin
```

Le script vous demandera :
- Nom complet
- Email
- Mot de passe
- Téléphone (optionnel)
- Adresse (optionnel)

### Étape 2 : Se connecter

1. Allez sur `http://localhost:5173/login`
2. Utilisez l'email et le mot de passe que vous venez de créer
3. Vous serez automatiquement connecté en tant qu'administrateur

## Méthode 2 : Via PostgreSQL (Manuel)

### Étape 1 : Créer un compte normal

1. Allez sur `http://localhost:5173/login`
2. Créez un compte normal (inscription)

### Étape 2 : Transformer en administrateur

Ouvrez PostgreSQL et exécutez :

```sql
-- Remplacer 'votre_email@example.com' par votre email
UPDATE utilisateurs SET role = 'admin' WHERE email = 'votre_email@example.com';
```

### Étape 3 : Vérifier

```sql
SELECT id, nom, email, role FROM utilisateurs WHERE email = 'votre_email@example.com';
```

Vous devriez voir `role = 'admin'`

## Méthode 3 : Création directe en SQL

```sql
-- Remplacez les valeurs entre guillemets
INSERT INTO utilisateurs (nom, email, mot_de_passe, role) 
VALUES (
  'Admin Principal',
  'admin@example.com',
  '$2a$10$VotreHashDeMotDePasseIci',  -- Utilisez bcrypt pour hasher
  'admin'
);
```

⚠️ **Note** : Pour la méthode 3, vous devez hasher le mot de passe avec bcrypt. Il est plus simple d'utiliser la méthode 1 ou 2.

## Vérification

Après avoir créé votre compte admin :

1. Déconnectez-vous si vous êtes connecté
2. Connectez-vous avec votre compte admin
3. Cliquez sur "Admin" dans la navigation
4. Vous devriez voir le tableau de bord administrateur

## Commandes utiles

```bash
# Créer un compte admin
cd backend
npm run create-admin

# Voir tous les admins
psql -U postgres -d lavage_app -c "SELECT id, nom, email, role FROM utilisateurs WHERE role = 'admin';"
```

## Dépannage

### "Accès refusé" sur la page Admin

- Vérifiez que votre compte a bien le rôle `admin` dans la base de données
- Déconnectez-vous et reconnectez-vous pour rafraîchir le token

### Le script ne fonctionne pas

- Assurez-vous que PostgreSQL est démarré
- Vérifiez que la base de données `lavage_app` existe
- Vérifiez votre fichier `.env`


