// ============================================================
// components/Dashboard.jsx
// Affiche les statistiques globales des tâches
// ============================================================

import React from 'react';

function Dashboard({ stats }) {
    return (
        <div className="dashboard">
            <div className="stat-card stat-total">
                <span className="stat-icon">📋</span>
                <div className="stat-info">
                    <h3>{stats.total}</h3>
                    <p>Total des tâches</p>
                </div>
            </div>

            <div className="stat-card stat-progress">
                <span className="stat-icon">⏳</span>
                <div className="stat-info">
                    <h3>{stats.enCours}</h3>
                    <p>En cours</p>
                </div>
            </div>

            <div className="stat-card stat-done">
                <span className="stat-icon">✅</span>
                <div className="stat-info">
                    <h3>{stats.terminees}</h3>
                    <p>Terminées</p>
                </div>
            </div>

            <div className="stat-card stat-percent">
                <span className="stat-icon">📊</span>
                <div className="stat-info">
                    <h3>
                        {stats.total > 0
                            ? Math.round((stats.terminees / stats.total) * 100)
                            : 0}
                        %
                    </h3>
                    <p>Taux de complétion</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
