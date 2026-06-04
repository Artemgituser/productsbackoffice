module.exports = (allowedRoles) => {
  return (req, res, next) => {
    // On suppose que authMiddleware a déjà injecté req.user via le token JWT
    if (!req.user) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Accès refusé : permissions insuffisantes" });
    }
    next();
  };
};
