
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route non trouvée : ${req.method} ${req.originalUrl}`
    });
};


const errorHandler = (err, req, res, next) => {
    console.error('Erreur interceptée par errorHandler :', err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Erreur interne du serveur'
    });
};

module.exports = { notFound, errorHandler };
