
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();


app.use(cors());                
app.use(express.json());         
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Bienvenue sur l\'API TaskManager 🚀',
        version: '1.0.0'
    });
});


app.use('/tasks', taskRoutes);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Serveur TaskManager démarré sur http://localhost:${PORT}`);
});
