const Joi = require('Joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength:5,
        maxlength: 50
    }
})); 

function validateGenere(genre) {
    const schema = {
        name: Joi.string().required().min(3)
    };
    return Joi.validate(genre,schema);
}

exports.Genre = Genre;
exports.validate = validateGenere;