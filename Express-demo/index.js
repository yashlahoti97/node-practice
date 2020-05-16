const Joi = require('Joi');
const config = require('config');
const debug = require('debug')('app:startup');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/courses');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //default

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);
//configuration
console.log('Application Name: '+ config.get('name'));
console.log('Mail Server: '+ config.get('mail.host'));
console.log('Mail Password: '+ config.get('mail.password'));
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

if( app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan Enabled...');
}

app.use(logger);

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Listening to port ${port}....`);
});