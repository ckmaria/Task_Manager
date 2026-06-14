

const TaskModel = require('../models/taskModel');


const STATUTS_VALIDES = ['En cours', 'Terminée'];

const TaskController = {

  
    getAllTasks: async (req, res) => {
        try {
            const tasks = await TaskModel.getAllTasks();
            res.status(200).json({
                success: true,
                count: tasks.length,
                data: tasks
            });
        } catch (error) {
            console.error('Erreur getAllTasks :', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la récupération des tâches'
            });
        }
    },


    getTaskById: async (req, res) => {
        try {
            const { id } = req.params;

            if (isNaN(id)) {
                return res.status(400).json({ success: false, message: 'Identifiant invalide' });
            }

            const task = await TaskModel.getTaskById(id);

            if (!task) {
                return res.status(404).json({ success: false, message: 'Tâche non trouvée' });
            }

            res.status(200).json({ success: true, data: task });
        } catch (error) {
            console.error('Erreur getTaskById :', error);
            res.status(500).json({ success: false, message: 'Erreur serveur' });
        }
    },


    addTask: async (req, res) => {
        try {
            const { titre, description, statut, date_creation } = req.body;

            // --------- Validation des données ---------
            if (!titre || titre.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'Le champ "titre" est obligatoire'
                });
            }

            if (titre.length > 100) {
                return res.status(400).json({
                    success: false,
                    message: 'Le champ "titre" ne doit pas dépasser 100 caractères'
                });
            }

            let statutFinal = 'En cours';
            if (statut) {
                if (!STATUTS_VALIDES.includes(statut)) {
                    return res.status(400).json({
                        success: false,
                        message: `Le champ "statut" doit être l'une des valeurs suivantes : ${STATUTS_VALIDES.join(', ')}`
                    });
                }
                statutFinal = statut;
            }

            const dateFinal = date_creation || new Date().toISOString().split('T')[0];

            const newTask = await TaskModel.createTask({
                titre: titre.trim(),
                description: description ? description.trim() : '',
                statut: statutFinal,
                date_creation: dateFinal
            });

            res.status(201).json({
                success: true,
                message: 'Tâche ajoutée avec succès',
                data: newTask
            });
        } catch (error) {
            console.error('Erreur addTask :', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de l\'ajout de la tâche'
            });
        }
    },

  
    updateTask: async (req, res) => {
        try {
            const { id } = req.params;
            const { titre, description, statut } = req.body;

            if (isNaN(id)) {
                return res.status(400).json({ success: false, message: 'Identifiant invalide' });
            }

           
            const existingTask = await TaskModel.getTaskById(id);
            if (!existingTask) {
                return res.status(404).json({ success: false, message: 'Tâche non trouvée' });
            }

            if (!titre || titre.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'Le champ "titre" est obligatoire'
                });
            }

            if (titre.length > 100) {
                return res.status(400).json({
                    success: false,
                    message: 'Le champ "titre" ne doit pas dépasser 100 caractères'
                });
            }

            if (statut && !STATUTS_VALIDES.includes(statut)) {
                return res.status(400).json({
                    success: false,
                    message: `Le champ "statut" doit être l'une des valeurs suivantes : ${STATUTS_VALIDES.join(', ')}`
                });
            }

            const updatedTask = {
                titre: titre.trim(),
                description: description !== undefined ? description.trim() : existingTask.description,
                statut: statut || existingTask.statut
            };

            await TaskModel.updateTask(id, updatedTask);

            res.status(200).json({
                success: true,
                message: 'Tâche mise à jour avec succès',
                data: { id: Number(id), ...updatedTask, date_creation: existingTask.date_creation }
            });
        } catch (error) {
            console.error('Erreur updateTask :', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la mise à jour de la tâche'
            });
        }
    },

    
    deleteTask: async (req, res) => {
        try {
            const { id } = req.params;

            if (isNaN(id)) {
                return res.status(400).json({ success: false, message: 'Identifiant invalide' });
            }

            const existingTask = await TaskModel.getTaskById(id);
            if (!existingTask) {
                return res.status(404).json({ success: false, message: 'Tâche non trouvée' });
            }

            await TaskModel.deleteTask(id);

            res.status(200).json({
                success: true,
                message: 'Tâche supprimée avec succès'
            });
        } catch (error) {
            console.error('Erreur deleteTask :', error);
            res.status(500).json({
                success: false,
                message: 'Erreur serveur lors de la suppression de la tâche'
            });
        }
    },

    
    getStats: async (req, res) => {
        try {
            const stats = await TaskModel.getStats();
            res.status(200).json({
                success: true,
                data: {
                    total: Number(stats.total) || 0,
                    terminees: Number(stats.terminees) || 0,
                    enCours: Number(stats.enCours) || 0
                }
            });
        } catch (error) {
            console.error('Erreur getStats :', error);
            res.status(500).json({ success: false, message: 'Erreur serveur' });
        }
    }
};

module.exports = TaskController;
