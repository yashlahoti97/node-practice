const Joi = require('Joi');
const express = require('express');
const app = express();
const genres = require('./routes/genres.js');

app.use(express.json());
app.use('/api/genres', genres);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));

