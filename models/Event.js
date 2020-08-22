const { Schema, model, SchemaTypes } = require('mongoose');

const EventSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

/*  Sobrescribe el método to JSON y nos permite personalizar el nombre de 
    las llaves de nuestros parámetros para que no se vean que son de sistema.
    Recordar que para poder acceder al objeto mediante this debemos hacerlo 
    mediante function ya que con arrow functions esto no funciona.
*/
EventSchema.method('toJSON', function () {
    const { __v, _id, ...obj } = this.toObject();
    obj.id = _id;
    return obj;
});

module.exports = model('Event', EventSchema);