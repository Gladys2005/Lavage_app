const express = require('express');
const pool = require('../config/db');

const router = express.Router();

// @route   GET api/services
// @desc    Récupérer la liste de tous les services
// @access  Public
router.get('/', async (req, res) => {
  try {
    console.log('📡 Requête GET /api/services reçue');
    const services = await pool.query('SELECT * FROM services ORDER BY id');
    console.log(`✅ ${services.rows.length} service(s) trouvé(s)`);
    
    if (services.rows.length === 0) {
      console.warn('⚠️  Aucun service trouvé dans la base de données');
      return res.json([]);
    }
    
    res.json(services.rows);
  } catch (err) {
    console.error('❌ Erreur lors de la récupération des services:', err);
    console.error('   Message:', err.message);
    console.error('   Code:', err.code);
    res.status(500).json({ 
      message: 'Erreur du serveur lors de la récupération des services',
      error: err.message,
      code: err.code
    });
  }
});

module.exports = router;
