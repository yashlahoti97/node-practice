const express = require('express');
const router = express.Router();

let genres = [
    { id:1, name:"romantic"},
    { id:2, name:"thriller"},
    { id:3, name:"horror"}
]
router.get('/' , (req, res) => {
    res.send(JSON.stringify(genres));
});

router.get('/:id', (req, res) => {
    const genre = genres.find(c => { return parseInt(req.params.id) === c.id; });
    if(!genre) return res.status(404).send("Genere couldn't be found");
    res.send(genre);
});

router.post('/', (req, res) => {
    const { error } = validateGenere(req.body);
    if(error) return res.send(error.details[0].message);
    const genre = {
        id: genres.length+1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    let genre = genres.find(c => { return parseInt(req.params.id) === c.id; });
    if(!genre) return res.status(404).send("Genere couldn't be found");
    
    const { error } = validateGenere(req.body);
    if(error) return res.send(error.details[0].message);
    
    genre.name = req.body.name;
    return res.send(genre);
});

router.delete('/:id', (req, res) => {
    let genre = genres.find(c => { return parseInt(req.params.id) === c.id; });
    if(!genre) return res.status(404).send("Genere couldn't be found");
    
    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genres);
});

function validateGenere(genre) {
    const schema = {
        name: Joi.string().required().min(3)
    };
    return Joi.validate(genre,schema);
}

module.exports = router;