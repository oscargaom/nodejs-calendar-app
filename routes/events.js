/*
    HOST + /api/events/
*/
const express = require('express');
const { check } = require('express-validator');

const { getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { jwtValidator } = require('../middlewares/jwtValidator');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { checkDate } = require('../helpers/checkDate');

const router = express.Router();

router.use(jwtValidator);

router.get('/', getEvent);

router.post('/',
    [
        check('title', 'El campo title es obligatorio').notEmpty(),
        check('start', 'El campo start no es valido').custom(checkDate),
        check('end', 'El campo end no es valido').custom(checkDate),
        fieldsValidator
    ],
    createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;