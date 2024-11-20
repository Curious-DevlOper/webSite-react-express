 import express from 'express';
import mongoose from 'mongoose';
import users from './routes/api/users.js';  // Make sure to add .js to the path
import profile from './routes/api/profile.js';  // Make sure to add .js to the path
import posts from './routes/api/posts.js';  // Make sure to add .js to the path
import bodyParser from 'body-parser';
import passport from 'passport';
import configurePassport from './config/passport.js';  // Make sure this path is correct




// DB config
import { mongoURI as db } from './config/keys.js';
// import passport from 'passport';

const app = express();
app.get('', (req, res) => {
    res.send('hi====iiiiiiiii');
});
// const users = require ('./routes/api/users');
// const profile = require ('./routes/api/profile');
// const posts = require ('./routes/api/posts');

//body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server running on port ${port}`));

// connect to mongoDB
mongoose
    .connect(db)
    .then(()=>console.log('MongoDB is connected'))
    .catch(err=> console.log(err));

// Passport middleware
app.use(passport.initialize());
// Configure Passport
configurePassport(passport);


//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);  