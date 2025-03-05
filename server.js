require('dotenv').config()
const express = require('express');
const db = require('./models');
const routes = require('./src/routes')
const swaggerDocs = require('./swaggerConfig');

const PORT = process.env.APP_PORT
const app = express();

app.use(express.json());

// Rutas
app.use('/api', routes);

// Cargar swagger
swaggerDocs(app);

// Sincronizar la base de datos y arrancar el servidor
db.sequelize.sync().then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
}).catch(error => {
    console.error('Error sincronizando la base de datos:', error);
});
