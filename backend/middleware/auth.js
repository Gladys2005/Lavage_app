const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Récupérer le token de l'en-tête
  const token = req.header('x-auth-token');

  // Vérifier si le token n'existe pas
  if (!token) {
    return res.status(401).json({ message: 'Aucun token, autorisation refusée' });
  }

  // Vérifier le token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'votre_secret_jwt');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Le token n\'est pas valide' });
  }
};
