const express = require('express');
const pool = require('../config/db');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// @route   GET api/admin/orders
// @desc    Récupérer toutes les commandes
// @access  Admin
router.get('/orders', [auth, admin], async (req, res) => {
  try {
    const allOrders = await pool.query(
      `SELECT c.*, u.nom as client_nom, s.nom as service_nom, s.tarif_kg
       FROM commandes c
       JOIN utilisateurs u ON c.client_id = u.id
       LEFT JOIN services s ON c.service_id = s.id
       ORDER BY c.date_creation DESC`
    );
    res.json(allOrders.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erreur du serveur', error: err.message });
  }
});

// @route   PATCH api/admin/orders/:id
// @desc    Mettre à jour le statut d'une commande
// @access  Admin
router.patch('/orders/:id', [auth, admin], async (req, res) => {
  try {
    const { statut } = req.body;
    const { id } = req.params;
    
    const validStatuses = ['en_attente', 'en_preparation', 'prete', 'en_livraison', 'livree', 'annulee'];
    if (!validStatuses.includes(statut)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }

    const updatedOrder = await pool.query(
      'UPDATE commandes SET statut = $1 WHERE id = $2 RETURNING *',
      [statut, id]
    );

    if (updatedOrder.rows.length === 0) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.json(updatedOrder.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// D'autres routes admin (livreurs, tarifs) viendront ici

module.exports = router;
