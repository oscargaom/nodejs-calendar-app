const cors = require('cors');
const express = require('express');
require('dotenv').config();

const app = express();

const { dbConnection } = require('./database/config');

const { PORT } = process.env;


const corsOptions = {
    origin: 'https://www.hotmail.com',
    optionsSucessStatus: 200
}

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

dbConnection();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log('**** Iniciando backend ****');