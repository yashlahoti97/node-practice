const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash'); 

router.get('/' , async (req, res) => {
    const user = await User
                .find()
                .sort('name');
    res.send(user);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send("Genere couldn't be found");
    res.send(genre);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send( _.pick(user, ['_id','name', 'email']));
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    },{new: true});
    
    if(!genre) return res.status(404).send("Genere couldn't be found");   

    return res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send("Genere couldn't be found");
    res.send(genre);
});

module.exports = router;