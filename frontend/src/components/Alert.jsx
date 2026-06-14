// ============================================================
// components/Alert.jsx
// Petit composant pour afficher des notifications (succès / erreur)
// ============================================================

import React from 'react';

function Alert({ type, message, onClose }) {
    if (!message) return null;

    return (
        <div className={`alert alert-${type}`}>
            <span>{message}</span>
            <button className="alert-close" onClick={onClose}>×</button>
        </div>
    );
}

export default Alert;
