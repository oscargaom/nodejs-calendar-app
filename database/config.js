const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        console.log('Opening Database ...')

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Database is running')

    } catch (error) {
        console.log(error);
        throw new Error('Error al momento de realizar la conexión con la base de datos');
    }
};

module.exports = {
    dbConnection
}