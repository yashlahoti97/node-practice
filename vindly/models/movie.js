const Joi = require('Joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');
const Movie = mongoose.model('Movies', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength:255
    },
    genre:{
        ref : genreSchema
    },
    numberInStock: {
        type: Number,
        required: true,
        min:0,
        max:255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min:0,
        max:255
    }
}));

function validateMovie(movie) {
    const schema = {
        title: Joi.string().required().min(5).max(255),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().required().min(5).max(255),
        dailyRentalRate: Joi.number().required().min(5).max(255),
    };
    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;