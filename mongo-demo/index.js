const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then( () => console.log('Connected to DB...'))
    .catch( (err) => console.log('Couldn\'t connect to DB... ', err));

const courseSchema = new mongoose.Schema({
    name: {type: String, 
        required: true,
        minlength:5,
        maxlength:255
        // match:/pattern/
    },
    catrgory:{
        type: String,
        required: true,
        enum: ['web','mobile','network'],
        lowercase: tru,
        trim: true
    },
    author: String,
    tags:{
        type: Array,
        validate:{
            isAsync: true,
            validator: function(v, callback) {
                setTimeout( () => {
                    const result = v &&  v.length>0;
                    callback(result);
                }, 4000);
                return 
            },
            message: 'Atleast one tag required'
        }
    },
    date: { type: Date, default: Date.now},
    isPublished: Boolean,
    price:{
        type: Number,
        required: ()=>{return this.isPublished},
        min:10,
        max:200,
        get: v => round(v),
        set: v   => round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name:'Angular Course',
        author:'Yash',
        catrgory:'-',
        tags:[],
        isPublished: true,
        price: 10
    });
    try{
        const result = await course.save();
        console.log(result);
    }
    catch(err){
        for (field in err.errors){
            console.log(err.errors[field].message);
        }
        
    }
}
createCourse();

async function getCourses() {
    const result = await Course
        // .find({ author:'Yash', isPublished: true})
        // .find({price: { $gte:10, $lte:20}})
        // .find({price: { $in:[10,15,20] }})
        .limit(10)
        .sort({name:1, tags:-1})
        .select({name:1,tags:1});
    console.log(result)
}

// getCourses();

async function updateCourse(id){
    // const course = await Course.findById(id);
    // if(!course) return console.log('Course Not Found');
    // course.isPublished = true;
    // course.author = 'Another Author';
    // const result = await course.save();

    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            author:'Jason',
            isPublished: false
        }
    }, { new: true});
    console.log(result);
}
// updateCourse('5ec08034abb63d18c5c4d1f2');