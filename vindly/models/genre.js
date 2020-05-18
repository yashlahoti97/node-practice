const Joi = require('Joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength:5,
        maxlength: 50
    }
});
const Genre = mongoose.model('Genre', genreSchema); 

function validateGenere(genre) {
    const schema = {
        name: Joi.string().required().min(3)
    };
    return Joi.validate(genre,schema);
}

exports.Genre = Genre;
exports.validate = validateGenere;
exports.genreSchema = genreSchema;