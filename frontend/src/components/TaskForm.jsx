// ============================================================
// components/TaskForm.jsx
// Formulaire d'ajout / modification d'une tâche (modal)
// ============================================================

import React, { useState, useEffect } from 'react';

function TaskForm({ taskToEdit, onSubmit, onClose }) {
    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        statut: 'En cours'
    });

    const [errors, setErrors] = useState({});

    // Pré-remplir le formulaire si on est en mode "modification"
    useEffect(() => {
        if (taskToEdit) {
            setFormData({
                titre: taskToEdit.titre || '',
                description: taskToEdit.description || '',
                statut: taskToEdit.statut || 'En cours'
            });
        }
    }, [taskToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validation simple côté client
    const validate = () => {
        const newErrors = {};
        if (!formData.titre.trim()) {
            newErrors.titre = 'Le titre est obligatoire';
        } else if (formData.titre.length > 100) {
            newErrors.titre = 'Le titre ne doit pas dépasser 100 caractères';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        onSubmit(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>{taskToEdit ? 'Modifier la tâche' : 'Ajouter une tâche'}</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="titre">Titre *</label>
                        <input
                            type="text"
                            id="titre"
                            name="titre"
                            value={formData.titre}
                            onChange={handleChange}
                            maxLength={100}
                            placeholder="Ex: Préparer la présentation"
                        />
                        {errors.titre && <span className="error-text">{errors.titre}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Détails de la tâche..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="statut">Statut</label>
                        <select
                            id="statut"
                            name="statut"
                            value={formData.statut}
                            onChange={handleChange}
                        >
                            <option value="En cours">En cours</option>
                            <option value="Terminée">Terminée</option>
                        </select>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Annuler
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {taskToEdit ? 'Enregistrer' : 'Ajouter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;
