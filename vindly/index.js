const mongoose = require('mongoose');
const express = require('express');
const app = express();
const customers = require('./routes/customers');
const auth = require('./routes/auth');
const genres = require('./routes/genres');
const users = require('./routes/users');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/rentals', rentals);
app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api/auth', auth);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));

mongoose.connect('mongodb://localhost/vidly')
    .then( () => console.log("Connected to MongoDB..."))
    .catch( (err) => console.error("Couldn't connect to MongoDB..."));
