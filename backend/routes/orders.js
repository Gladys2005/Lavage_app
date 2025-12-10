const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid'); // Pour générer un code de commande unique

const router = express.Router();

// @route   POST api/orders
// @desc    Créer une nouvelle commande
// @access  Privé
router.post('/', auth, async (req, res) => {
  const { service_id, quantite_kg, avec_livraison, methode_paiement } = req.body;
  const client_id = req.user.id;
  
  // Génère un code unique de 8 caractères
  let code_commande;
  let isUnique = false;
  while (!isUnique) {
    code_commande = uuidv4().replace(/-/g, '').substring(0, 8).toUpperCase();
    const existing = await pool.query('SELECT id FROM commandes WHERE code_commande = $1', [code_commande]);
    if (existing.rows.length === 0) {
      isUnique = true;
    }
  }

  try {
    const newOrder = await pool.query(
      'INSERT INTO commandes (client_id, service_id, quantite_kg, avec_livraison, methode_paiement, code_commande) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [client_id, service_id, quantite_kg, avec_livraison || false, methode_paiement, code_commande]
    );

    res.status(201).json(newOrder.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erreur du serveur', error: err.message });
  }
});

// @route   GET api/orders
// @desc    Récupérer les commandes de l'utilisateur connecté
// @access  Privé
router.get('/', auth, async (req, res) => {
  try {
    const orders = await pool.query('SELECT * FROM commandes WHERE client_id = $1 ORDER BY date_creation DESC', [req.user.id]);
    res.json(orders.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// @route   GET api/orders/:code
// @desc    Suivre une commande par son code
// @access  Public
router.get('/:code', async (req, res) => {
    try {
        const order = await pool.query(
          'SELECT code_commande, statut, date_creation, quantite_kg, avec_livraison FROM commandes WHERE code_commande = $1', 
          [req.params.code.toUpperCase()]
        );
        if (order.rows.length === 0) {
            return res.status(404).json({ message: 'Commande non trouvée.' });
        }
        res.json(order.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Erreur du serveur', error: err.message });
    }
});

module.exports = router;
