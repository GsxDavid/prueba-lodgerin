require('dotenv').config()
const express = require('express');
const path = require('path');
const db = require('./models');
const routes = require('./src/routes')
const swaggerDocs = require('./swaggerConfig');

const PORT = process.env.APP_PORT
const app = express();

app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rutas API
app.use('/api', routes);



// Cargar swagger
swaggerDocs(app);

// Middleware de 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});


// Sincronizar la base de datos y arrancar el servidor
db.sequelize.sync().then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => console.log(`El servidor se está ejecutando en el puerto ${PORT}`));
}).catch(error => {
    console.error('Error sincronizando la base de datos:', error);
});
