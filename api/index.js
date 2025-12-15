const serverless = require('serverless-http');
const app = require('../backend/app');

// Handler Vercel pour toutes les routes /api/*
module.exports = (req, res) => {
  const handler = serverless(app);
  return handler(req, res);
};
