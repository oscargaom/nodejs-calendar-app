/*
    HOST + /api/auth/
*/
const express = require('express');
const { response } = require('express');
const { check } = require('express-validator');

const { login, create, renew } = require('../controllers/auth');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');
const router = express.Router();

const middlewares = [
    check('email', 'El email no es valido').isEmail(),
    check('password', 'El password no es valido').isLength({ min: 6 })
];

router.post('/create',
    [ // middlewares
        ...middlewares,
        check('name', 'El nombre es requerido').notEmpty(),
        fieldsValidator
    ],
    create
);

router.post('/',
    [
        ...middlewares,
        fieldsValidator
    ],
    login);

router.get('/renew',
    jwtValidator,
    renew);

module.exports = router; 