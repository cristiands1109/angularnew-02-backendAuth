const { response } = require('express');

const crearUsuario = (req, resp = response) => {

    const {name, email, password} = req.body
    console.log(name, email, password);

    return resp.json({
        ok: true,
        msg: 'Crear usuario / new'
    })
}

const loginUsuario = (req, resp = response) => {

    const {email, password} = req.body
    console.log(email, password);

    return resp.json({
        ok: true,
        msg: 'Login usuario'
    })

}

const revalidarToken = (req, resp = response) => {

    return resp.json({
        ok: true,
        msg: 'renueva token usuario'
    })

}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}