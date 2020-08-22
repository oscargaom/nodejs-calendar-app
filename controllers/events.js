const { request, respose } = require('express');

const Event = require('../models/Event');
const jwtValidator = require('../middlewares/jwtValidator');

const getEvent = async (req = request, res = respose) => {

    try {
        const events = await Event.find().populate('user', 'name');

        res.json({
            ok: true,
            events
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al obtener los eventos, intente nuevamente por favor'
        });
    }
};

const createEvent = async (req = request, res = respose) => {

    try {

        const event = new Event(req.body);
        // console.log(event);
        // console.log(req.jwtData);
        const { uid } = req.jwtData;
        event.user = uid;
        // console.log(event);
        const dbSaved = await event.save();

        res.json({
            ok: true,
            msg: 'createEvent',
            event: dbSaved
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'El evento no se pudo crear, intente nuevamente por favor'
        });
    }

};

const updateEvent = async (req = request, res = respose) => {

    try {

        const { id: _id } = req.params;
        const event = await Event.findById({ _id });

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento indicado no existe, validar información'
            });
        }

        const { user } = event;
        const { uid } = req.jwtData;

        // console.log(typeof user);
        // console.log(typeof uid);

        if (user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'El usuario no es propietario del evento solicitado'
            });
        }

        const newEventValues = {
            ...req.body,
            user: uid
        };

        // console.log(newEventValues);
        // console.log(event);
        const eventUpdated = await Event.findByIdAndUpdate(_id, newEventValues, { new: true });

        if (!eventUpdated) {
            return res.status(401).json({
                ok: false,
                msg: 'El registro indicado no fue actualizado, intente nuevamente por favor'
            });
        }

        res.json({
            ok: true,
            event: eventUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'El evento no se pudo actualizar, intente nuevamente por favor'
        });
    }
};

const deleteEvent = async (req = request, res = response) => {

    try {

        const { id: _id } = req.params;
        const event = await Event.findById({ _id });

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento indicado no existe, validar información'
            });
        }

        const { user } = event;
        const { uid } = req.jwtData;

        // console.log(typeof user);
        // console.log(typeof uid);

        if (user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'El usuario no es propietario del evento solicitado'
            });
        }

        // console.log(event);
        const eventDeleted = await Event.findByIdAndDelete(_id);
        // console.log(eventDeleted);
        if (!eventDeleted) {
            return res.status(401).json({
                ok: false,
                msg: 'El registro indicado no fue borrado, intente nuevamente por favor'
            });
        }

        res.json({
            ok: true,
            event: eventDeleted
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'El evento no se pudo eliminar, intente nuevamente por favor'
        });
    }
};

module.exports = {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
}