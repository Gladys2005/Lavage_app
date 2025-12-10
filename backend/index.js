require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const app = express();

// Middleware CORS pour permettre les requêtes depuis le frontend
app.use(cors({
  origin: 'http://localhost:5173', // Port par défaut de Vite
  credentials: true
}));

// Middleware pour parser le JSON
app.use(express.json());
const port = process.env.PORT || 3000;

// Route de test
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Backend Node.js + Express',
    version: '1.0.0',
    status: 'running'
  });
});

// Route de santé pour vérifier que l'API fonctionne
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.json({ 
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(503).json({ 
      status: 'unhealthy',
      database: 'disconnected',
      error: err.message
    });
  }
});

// Routes d'authentification
app.use('/api/auth', require('./routes/auth'));

// Routes des commandes
app.use('/api/orders', require('./routes/orders'));

// Routes des services
app.use('/api/services', require('./routes/services'));

// Routes admin
app.use('/api/admin', require('./routes/admin'));

app.listen(port, async () => {
  console.log(`\n🚀 Backend server starting on http://localhost:${port}`);
  
  // Tester la connexion à la base de données
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful');
    console.log(`   Database time: ${result.rows[0].now}`);
    
    // Vérifier que les tables existent
    const tablesCheck = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log(`✅ Found ${tablesCheck.rows.length} tables in database`);
    
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    console.error('   Please check your .env file and ensure PostgreSQL is running');
    console.error('   Expected config:');
    console.error('   - DB_HOST:', process.env.DB_HOST || 'localhost');
    console.error('   - DB_NAME:', process.env.DB_NAME || 'lavage_app');
    console.error('   - DB_USER:', process.env.DB_USER || 'postgres');
  }
  
  console.log(`\n📡 API endpoints available:`);
  console.log(`   GET  /health - Health check`);
  console.log(`   POST /api/auth/register - Register user`);
  console.log(`   POST /api/auth/login - Login user`);
  console.log(`   GET  /api/services - List services`);
  console.log(`   POST /api/orders - Create order (auth required)`);
  console.log(`   GET  /api/orders/:code - Track order`);
  console.log(`\n`);
});
