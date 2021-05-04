const { response } = require("express")
const jwt = require('jsonwebtoken')


const validarJWT = (req, resp = response, next) => { 

    const token = req.header( 'x-token' );

    if(!token) {
        return resp.status(401).json({
            ok: false,
            msg: 'error de autenticacion'
        });
    }


    try {

       const {userID, name} = jwt.verify(token, process.env.JWT_SECRET_SEED);
        req.userID = userID
        req.name = name
        
    } catch (error) {

        return resp.status(401).json({
            ok: false,
            msg: 'token no valido'
        })
        
    }

    next();

}


module.exports = {
    validarJWT
}