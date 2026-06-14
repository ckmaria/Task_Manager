

const db = require('../config/database');

const TaskModel = {


    getAllTasks: async () => {
        const [rows] = await db.query('SELECT * FROM Task ORDER BY date_creation DESC, id DESC');
        return rows;
    },


    getTaskById: async (id) => {
        const [rows] = await db.query('SELECT * FROM Task WHERE id = ?', [id]);
        return rows[0];
    },

    
    createTask: async (task) => {
        const { titre, description, statut, date_creation } = task;
        const [result] = await db.query(
            'INSERT INTO Task (titre, description, statut, date_creation) VALUES (?, ?, ?, ?)',
            [titre, description, statut, date_creation]
        );
        return { id: result.insertId, ...task };
    },

   
    updateTask: async (id, task) => {
        const { titre, description, statut } = task;
        const [result] = await db.query(
            'UPDATE Task SET titre = ?, description = ?, statut = ? WHERE id = ?',
            [titre, description, statut, id]
        );
        return result.affectedRows;
    },

   
    deleteTask: async (id) => {
        const [result] = await db.query('DELETE FROM Task WHERE id = ?', [id]);
        return result.affectedRows;
    },

   
    getStats: async () => {
        const [rows] = await db.query(`
            SELECT
                COUNT(*) AS total,
                SUM(CASE WHEN statut = 'Terminée' THEN 1 ELSE 0 END) AS terminees,
                SUM(CASE WHEN statut = 'En cours' THEN 1 ELSE 0 END) AS enCours
            FROM Task
        `);
        return rows[0];
    }
};

module.exports = TaskModel;
