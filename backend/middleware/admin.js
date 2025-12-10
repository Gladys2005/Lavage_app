module.exports = function(req, res, next) {
  // Ce middleware suppose que le middleware 'auth' a déjà été exécuté
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé. Seuls les administrateurs sont autorisés.' });
  }
  next();
};
