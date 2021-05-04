const jwt = require ('jsonwebtoken');



const generarJWT = (userID, name) => {

    const payload = {userID, name};


    return new Promise((resolve, reject) => {

        jwt.sign(payload, process.env.JWT_SECRET_SEED, {
            expiresIn: '24h'

        }, (error, token) => {

            if (error) {

                console.log(error);
                reject(error)

            } else {

                resolve(token)

            }

        })
    })

}

module.exports = {
    generarJWT
}


