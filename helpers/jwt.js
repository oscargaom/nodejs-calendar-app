const jwt = require('jsonwebtoken');


const generarJWT = (uid, name) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid,
            name
        };
        
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        }, (error, token) => {
            // console.log('generarJWT error');
            // console.log(error);
            // console.log('generarJWT token');
            // console.log(token)
            if (error) {
                console.log(error);
                reject('Error al generar el token, no se puedo generar');
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = {
    generarJWT
}