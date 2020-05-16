const Joi = require('Joi');
const express = require('express');
const app = express();

app.use(express.json());
let genres = [
    { id:1, name:"romantic"},
    { id:2, name:"thriller"},
    { id:3, name:"horror"}
]
app.get('/api/genres' , (req, res) => {
    res.send(JSON.stringify(genres));
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => { return parseInt(req.params.id) === c.id; });
    if(!genre) return res.status(404).send("Genere couldn't be found");
    res.send(genre);
});

app.post('/api/genres', (req, res) => {
    const { error } = validateGenere(req.body);
    if(error) return res.send(error.details[0].message);
    const genre = {
        id: genres.length+1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    let genre = genres.find(c => { return parseInt(req.params.id) === c.id; });
    if(!genre) return res.status(404).send("Genere couldn't be found");
    
    const { error } = validateGenere(req.body);
    if(error) return res.send(error.details[0].message);
    
    genre.name = req.body.name;
    return res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    let genre = genres.find(c => { return parseInt(req.params.id) === c.id; });
    if(!genre) return res.status(404).send("Genere couldn't be found");
    
    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genres);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));

function validateGenere(genre) {
    const schema = {
        name: Joi.string().required().min(3)
    };
    return Joi.validate(genre,schema);
}