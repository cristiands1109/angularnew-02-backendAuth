const {routes, Router} = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');


const router = Router();

// Nuevo Usuario
router.post('/new', crearUsuario);

//Login Usuario
router.post('/', loginUsuario);

//Validar y revalidar Token
router.get('/renew', revalidarToken)







module.exports = router;