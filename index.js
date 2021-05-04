const express = require('express'); // configuracion de express
const cors = require('cors'); // configuracion del cors
require('dotenv').config();
const {dbConeccion} = require('./DataBase/config')


// console.log(process.env);

// Config. y Crear Servidor Express
const app = express();

// Coneccion a la base de datos
dbConeccion();

// Config. CORS
app.use(cors());

// Directorio publico
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());
// app.use(express.urlencoded({extended:false}))


// rutas
app.use('/api/auth', require('./routes/auth'));



// Inicializacion del servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto: ${process.env.PORT}`);
});