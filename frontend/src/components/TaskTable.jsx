// ============================================================
// components/TaskTable.jsx
// Tableau d'affichage des tâches avec actions (modifier / supprimer)
// ============================================================

import React from 'react';

function TaskTable({ tasks, onEdit, onDelete }) {

    // Formate la date au format JJ/MM/AAAA
    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR');
    };

    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <span className="empty-icon">📭</span>
                <p>Aucune tâche pour le moment. Cliquez sur "Ajouter une tâche" pour commencer.</p>
            </div>
        );
    }

    return (
        <div className="table-wrapper">
            <table className="task-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titre</th>
                        <th>Description</th>
                        <th>Statut</th>
                        <th>Date de création</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td className="cell-title">{task.titre}</td>
                            <td className="cell-description">{task.description || '-'}</td>
                            <td>
                                <span
                                    className={`badge ${
                                        task.statut === 'Terminée' ? 'badge-done' : 'badge-progress'
                                    }`}
                                >
                                    {task.statut}
                                </span>
                            </td>
                            <td>{formatDate(task.date_creation)}</td>
                            <td className="cell-actions">
                                <button
                                    className="btn btn-icon btn-edit"
                                    onClick={() => onEdit(task)}
                                    title="Modifier"
                                >
                                    ✏️
                                </button>
                                <button
                                    className="btn btn-icon btn-delete"
                                    onClick={() => onDelete(task)}
                                    title="Supprimer"
                                >
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskTable;
