const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt');


// CREAR USUARIO

const crearUsuario = async (req, resp = response) => {

    
    const {name, email, password} = req.body

    try {

        // VERIFICAR SI EXISTE EL EMAIL IGUAL
        const usuario = await Usuario.findOne({email: email});

        if(usuario) {
            return resp.status(400).json({
                ok: false,
                msg: 'Error -  El email ya existe'
            })
        }

        // SI PASA LA VERIFICACION HAY QUE 
        // CREAR USUARIO UTILIZANADO EL MODELO 

        const dbUSER = new Usuario(req.body);

    
        // EN ESTE PUNTO UTILIZADMOS EL BCRYPT PARA ENCRIPTAR LA CONTRASENA
        const salt = bcrypt.genSaltSync();
        dbUSER.password = bcrypt.hashSync(password, salt);
    
    
    
        // GENERAR EL JW TOKEN

        const token = await generarJWT(dbUSER.id, dbUSER.name);
    
        
        // CREAR USUARIO DE BASE DE DATOS
        await dbUSER.save();

        return resp.status(201).json({
            ok: true,
            msg: ' registro creado exitosamente',
            userID: dbUSER.id,
            token
        })

    
        // GENERAR RESPUESTA EXITOSA
        
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Consultar con el administrador'
        })
    }


    console.log(name, email, password);

    
}

// LOGIN USUARIO

const loginUsuario = async (req, resp = response) => {

    const {email, password} = req.body
    // console.log(email, password);

    try {

        // verificamos si existe el email en la bd
        const dbUSER = await Usuario.findOne({ email: email})
        if(!dbUSER) {
            return resp.status(400).json({
                ok: false,
                msg: 'El correo invalido'
            })
        }

        // verificamos si la contrasena coincide
        const verificarPassword = bcrypt.compareSync(password, dbUSER.password);
        if(!verificarPassword) {
            return resp.status(400).json({
                ok: false,
                msg: 'La contrasena invalida'
            })
        }

        // en caso que pase ambas validaciones generamos el jwt
        const token = await generarJWT(dbUSER.id, dbUSER.name);

        // generar la respuesta
        return resp.status(200).json({
            ok: true,
            msg: ' logeado exitosamente',
            name: dbUSER.name,
            userID: dbUSER.id,
            token
        })


        
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Consultar con el administrador'
        })
    }

}

// REVALIDACION DE TOKEN

const revalidarToken = async (req, resp = response) => {

    const {userID, name} = req;

    const token = await generarJWT(userID, name);



    return resp.json({
        ok: true,
        userId: userID,
        nombre: name,
        token,
        msg: 'Autenticacion renovada',
    })

}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}