const express = require('express'); // configuracion de express
const cors = require('cors'); // configuracion del cors
require('dotenv').config();


// console.log(process.env);

// Config. y Crear Servidor Express
const app = express();

// Config. CORS
app.use(cors());

// Directorio publico
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());



// rutas
app.use('/api/auth', require('./routes/auth'));



// Inicializacion del servidor
app.listen(4000, () => {
    console.log(`Servidor corriendo en puerto: ${4000}`);
});