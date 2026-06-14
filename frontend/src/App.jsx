// ============================================================
// App.jsx
// Composant principal de l'application TaskManager
// ============================================================

import React, { useState, useEffect } from 'react';
import TaskTable from './components/TaskTable';
import TaskForm from './components/TaskForm';
import ConfirmDialog from './components/ConfirmDialog';
import Dashboard from './components/Dashboard';
import Alert from './components/Alert';
import TaskService from './services/taskService';
import './styles/App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({ total: 0, enCours: 0, terminees: 0 });
    const [loading, setLoading] = useState(true);

    // États pour les modales
    const [showForm, setShowForm] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);

    // État pour les filtres
    const [filterStatus, setFilterStatus] = useState('Toutes');

    // État pour les notifications
    const [alert, setAlert] = useState({ type: '', message: '' });

    // ------------------------------------------------------------
    // Chargement initial des données
    // ------------------------------------------------------------
    useEffect(() => {
        fetchTasks();
        fetchStats();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await TaskService.getAllTasks();
            setTasks(response.data.data);
        } catch (error) {
            showAlert('error', 'Erreur lors du chargement des tâches. Vérifiez que le serveur backend est démarré.');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await TaskService.getStats();
            setStats(response.data.data);
        } catch (error) {
            console.error('Erreur lors du chargement des statistiques', error);
        }
    };

    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => setAlert({ type: '', message: '' }), 4000);
    };

    // ------------------------------------------------------------
    // Gestion de l'ajout / modification
    // ------------------------------------------------------------
    const handleOpenAddForm = () => {
        setTaskToEdit(null);
        setShowForm(true);
    };

    const handleOpenEditForm = (task) => {
        setTaskToEdit(task);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setTaskToEdit(null);
    };

    const handleSubmitForm = async (formData) => {
        try {
            if (taskToEdit) {
                // Modification
                await TaskService.updateTask(taskToEdit.id, formData);
                showAlert('success', 'Tâche modifiée avec succès ✅');
            } else {
                // Ajout
                await TaskService.addTask(formData);
                showAlert('success', 'Tâche ajoutée avec succès ✅');
            }
            handleCloseForm();
            fetchTasks();
            fetchStats();
        } catch (error) {
            const message = error.response?.data?.message || 'Une erreur est survenue';
            showAlert('error', message);
        }
    };

    // ------------------------------------------------------------
    // Gestion de la suppression
    // ------------------------------------------------------------
    const handleAskDelete = (task) => {
        setTaskToDelete(task);
    };

    const handleCancelDelete = () => {
        setTaskToDelete(null);
    };

    const handleConfirmDelete = async () => {
        try {
            await TaskService.deleteTask(taskToDelete.id);
            showAlert('success', 'Tâche supprimée avec succès 🗑️');
            setTaskToDelete(null);
            fetchTasks();
            fetchStats();
        } catch (error) {
            showAlert('error', 'Erreur lors de la suppression de la tâche');
        }
    };

    // ------------------------------------------------------------
    // Filtrage des tâches par statut
    // ------------------------------------------------------------
    const filteredTasks = tasks.filter((task) => {
        if (filterStatus === 'Toutes') return true;
        return task.statut === filterStatus;
    });

    return (
        <div className="app">
            {/* En-tête */}
            <header className="app-header">
                <div className="header-content">
                    <h1>📋 TaskManager</h1>
                    <p>Application de gestion des tâches</p>
                </div>
            </header>

            <main className="app-main">

                {/* Notification */}
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert({ type: '', message: '' })}
                />

                {/* Tableau de bord */}
                <section>
                    <h2 className="section-title">Tableau de bord</h2>
                    <Dashboard stats={stats} />
                </section>

                {/* Barre d'actions */}
                <section className="toolbar">
                    <div className="filters">
                        <label htmlFor="filter">Filtrer par statut :</label>
                        <select
                            id="filter"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="Toutes">Toutes</option>
                            <option value="En cours">En cours</option>
                            <option value="Terminée">Terminée</option>
                        </select>
                    </div>

                    <button className="btn btn-primary" onClick={handleOpenAddForm}>
                        ➕ Ajouter une tâche
                    </button>
                </section>

                {/* Liste des tâches */}
                <section>
                    <h2 className="section-title">Liste des tâches</h2>
                    {loading ? (
                        <p className="loading-text">Chargement des tâches...</p>
                    ) : (
                        <TaskTable
                            tasks={filteredTasks}
                            onEdit={handleOpenEditForm}
                            onDelete={handleAskDelete}
                        />
                    )}
                </section>
            </main>

            {/* Formulaire d'ajout / modification */}
            {showForm && (
                <TaskForm
                    taskToEdit={taskToEdit}
                    onSubmit={handleSubmitForm}
                    onClose={handleCloseForm}
                />
            )}

            {/* Confirmation de suppression */}
            {taskToDelete && (
                <ConfirmDialog
                    message={`Voulez-vous vraiment supprimer la tâche "${taskToDelete.titre}" ?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}

            <footer className="app-footer">
                <p>© 2025 TaskManager - Projet OFPPT Développement Digital Full Stack</p>
            </footer>
        </div>
    );
}

export default App;
