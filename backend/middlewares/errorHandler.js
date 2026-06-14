// ============================================================
// middlewares/errorHandler.js
// Gestion centralisée des erreurs et des routes non trouvées
// ============================================================

// Middleware pour les routes non trouvées (404)
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route non trouvée : ${req.method} ${req.originalUrl}`
    });
};

// Middleware global de gestion des erreurs
const errorHandler = (err, req, res, next) => {
    console.error('Erreur interceptée par errorHandler :', err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Erreur interne du serveur'
    });
};

module.exports = { notFound, errorHandler };
