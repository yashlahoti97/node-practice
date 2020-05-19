require('express-async-errors');

const express = require('express');
const Joi = require('joi');
const config = require('config');

Joi.objectId = require('joi-objectid')(Joi);

const app = express();

require('./startup/routes')(app);
require('./startup/db')();

if (!config.get('jwtPrivateKey')) {
    console.error("FATAL ERROR: jwtPrivateKey not defined");
    process.exit(1);
}
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));


