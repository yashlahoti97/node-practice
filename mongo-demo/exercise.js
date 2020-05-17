const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then( () => console.log('Connected to DB...'))
    .catch( (err) => console.log('Couldn\'t connect to DB... ', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags:[String],
    date: { type: Date, default: Date.now},
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
    .find({ isPublished: true, tags: {$in : ['backend', 'frontend']} })
    .sort({ price: -1 })
    .select({ name: 1, author: 1 })
}

async function run(){
    const courses = await getCourses();
    console.log(courses);
}
run();