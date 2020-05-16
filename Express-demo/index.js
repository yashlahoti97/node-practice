const express = require('express');
const app = express();

const courses = [
    { id:1, name:'course1'},
    { id:2, name:'course2'},
    { id:3, name:'course3'}
]
app.get('/', (req, res) => {
    res.send("Hello World!!!");
});

app.get('/api/course', (req, res) => {
    res.send(JSON.stringify([1,2,3]));
});

app.get('/api/course/:id', (req, res) => {
    courses.find( c => { return c.id === parseInt(req.params.id)});
});

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`Listening to port ${port}....`);
});