const mongoose = require('mongoose');
const Joi = require('Joi');

const Customer = mongoose.model('Customer', mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone:{
        type: String,
        required: true,
        minlength:5,
        maxlength:10
    },
    isGold: {
        type: Boolean,
        default: false
    }
}));

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().required().min(5).max(50),
        phone: Joi.string().required().min(5).max(10),
        isGold: Joi.boolean()
    }
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;