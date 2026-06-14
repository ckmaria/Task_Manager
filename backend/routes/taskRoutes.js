

const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');


router.get('/stats', TaskController.getStats);


router.get('/', TaskController.getAllTasks);


router.get('/:id', TaskController.getTaskById);


router.post('/addTask', TaskController.addTask);


router.put('/updateTask/:id', TaskController.updateTask);


router.delete('/deleteTask/:id', TaskController.deleteTask);

module.exports = router;
