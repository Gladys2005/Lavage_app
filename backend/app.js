require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const app = express();

// CORS: autoriser l'origine définie en variable d'environnement ou par défaut localhost en dev
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Autoriser les requêtes sans origin (ex: curl, outils internes)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

// Parser JSON
app.use(express.json());

// Route racine
app.get('/', (req, res) => {
  res.json({ message: 'API Backend (serverless-ready)', version: '1.0.0', status: 'running' });
});

// Healthcheck DB
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.json({ status: 'healthy', database: 'connected', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(503).json({ status: 'unhealthy', database: 'disconnected', error: err.message });
  }
});

// IMPORTANT: on monte les routes sans le préfixe "/api" car Vercel les réécrira déjà vers /api/*
app.use('/auth', require('./routes/auth'));
app.use('/orders', require('./routes/orders'));
app.use('/services', require('./routes/services'));
app.use('/admin', require('./routes/admin'));

module.exports = app;
