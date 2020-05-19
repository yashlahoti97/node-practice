const Joi = require('Joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength:5,
        maxlength: 50
    },
    email:{
        type: String,
        required:true,
        unique:true,
        minlength:5,
        maxlength: 255
    },
    password:{
        type: String,
        required:true,
        minlength:5,
        maxlength: 1024
    },
    isAdmin:{
        type:Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema); 

function validateUser(user) {
    const schema = {
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().required().min(5).max(255),
        isAdmin: Joi.boolean()
    };
    return Joi.validate(user,schema);
}

exports.User = User;
exports.validate = validateUser;
