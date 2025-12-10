-- Table pour les utilisateurs (clients, admins, livreurs)
CREATE TABLE utilisateurs (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    telephone VARCHAR(20),
    adresse TEXT,
    role VARCHAR(50) NOT NULL CHECK (role IN ('client', 'livreur', 'admin'))
);

-- Table pour les services et tarifs
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    tarif_kg NUMERIC(10, 2) NOT NULL
);

-- Table pour les commandes
CREATE TABLE commandes (
    id SERIAL PRIMARY KEY,
    code_commande VARCHAR(10) UNIQUE NOT NULL,
    client_id INTEGER REFERENCES utilisateurs(id),
    service_id INTEGER REFERENCES services(id),
    quantite_kg NUMERIC(10, 2) NOT NULL,
    avec_livraison BOOLEAN DEFAULT false,
    methode_paiement VARCHAR(50),
    statut VARCHAR(50) DEFAULT 'en_attente' CHECK (statut IN ('en_attente', 'en_preparation', 'prete', 'en_livraison', 'livree', 'annulee')),
    livreur_id INTEGER REFERENCES utilisateurs(id) NULL,
    date_creation TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insérer quelques services par défaut
INSERT INTO services (nom, description, tarif_kg) VALUES
('Nettoyage à sec', 'Nettoyage professionnel à sec pour tous types de vêtements.', 5.50),
('Repassage', 'Service de repassage au poids.', 3.00),
('Complet', 'Nettoyage à sec et repassage.', 8.00);
