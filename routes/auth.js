const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

// Nuevo Usuario
router.post('/new', [
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').isLength({min: 6}),
    validarCampos
] ,crearUsuario);

//Login Usuario
router.post('/',[
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el password es obligatorio').isLength({min: 6}),
    validarCampos
] , loginUsuario);

//Validar y revalidar Token
router.get('/renew', validarJWT ,revalidarToken)







module.exports = router;