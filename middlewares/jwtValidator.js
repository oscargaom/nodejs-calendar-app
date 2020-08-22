const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const jwtValidator = async (req = request, res = response, next) => {

    try {
        const token = req.header('x-token');

        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no valido'
            });
        }

        const payload = await jwt.verify(token, process.env.JWT_SECRET);

        const {uid, name} = payload;

        const jwtData = {
            uid,
            name
        }

        req.jwtData = jwtData;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Ocurrio un error al validar el token, el token ha expirado'
        });
    }
};

module.exports = {
    jwtValidator
}