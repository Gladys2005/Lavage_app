const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const router = express.Router();

// Route d'inscription
router.post('/register', async (req, res) => {
  const { nom, email, mot_de_passe, telephone, adresse } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const userExists = await pool.query('SELECT * FROM utilisateurs WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mot_de_passe, salt);

    // Insérer le nouvel utilisateur
    const newUser = await pool.query(
      'INSERT INTO utilisateurs (nom, email, mot_de_passe, telephone, adresse, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, role',
      [nom, email, hashedPassword, telephone, adresse, 'client']
    );

    res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser.rows[0] });

  } catch (err) {
    console.error('Erreur lors de l\'inscription:', err);
    res.status(500).json({ 
      message: 'Erreur du serveur',
      error: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await pool.query('SELECT * FROM utilisateurs WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Identifiants invalides.' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(mot_de_passe, user.rows[0].mot_de_passe);
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants invalides.' });
    }

    // Créer et retourner le token JWT
    const payload = {
      user: {
        id: user.rows[0].id,
        role: user.rows[0].role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'votre_secret_jwt', // Utiliser variable d'environnement
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error('Erreur lors de la connexion:', err);
    res.status(500).json({ 
      message: 'Erreur du serveur',
      error: err.message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

module.exports = router;
