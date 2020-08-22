const { response, json } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const { generarJWT } = require('../helpers/jwt');
const jwt = require('../helpers/jwt');

const create = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario solicitado ya existe, indicar otro por favor'
            });
        }

        user = new User(req.body);

        const salt = bcrypt.genSaltSync(12);
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generarJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(501).json({
            ok: false,
            message: 'Ocurrio un error al intentar agregar el usuario intente nuevamente'
        });
    }


};

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        // console.log(isPasswordValid);

        if (!isPasswordValid) {
            res.status(400).json({
                ok: false,
                msg: 'Credenciales no validas'
            });
        } else {

            const token = await generarJWT(user.id, user.name);

            res.json({
                ok: true,
                uid: user.id,
                name: user.name,
                token
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al validar las credenciales, intente nuevamente por favor'
        });
    }
};

const renew = async (req, res = response) => {

    const { jwtData: { uid, name } } = req;

    // console.log(uid, name);

    const token =  await jwt.generarJWT(uid, name);

    // console.log(token);
    res.json({
        ok: true,
        token
    });
};

module.exports = {
    create,
    login,
    renew
}