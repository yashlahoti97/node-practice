
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const customers = require('./routes/customers.js');
const genres = require('./routes/genres.js');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers)
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));

mongoose.connect('mongodb://localhost/vidly')
    .then( () => console.log("Connected to MongoDB..."))
    .catch( (err) => console.error("Couldn't connect to MongoDB..."));
