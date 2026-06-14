

import axios from 'axios';


const API_URL = 'http://localhost:5000/tasks';


const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const TaskService = {

   
    getAllTasks: () => apiClient.get('/'),

    
    getStats: () => apiClient.get('/stats'),

    
    addTask: (task) => apiClient.post('/addTask', task),

    
    updateTask: (id, task) => apiClient.put(`/updateTask/${id}`, task),

   
    deleteTask: (id) => apiClient.delete(`/deleteTask/${id}`)
};

export default TaskService;
