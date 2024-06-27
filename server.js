 import express from 'express';
import mongoose from 'mongoose';
import users from './routes/api/users.js';  // Make sure to add .js to the path
import profile from './routes/api/profile.js';  // Make sure to add .js to the path
import posts from './routes/api/posts.js';  // Make sure to add .js to the path



// DB config
import { mongoURI as db } from './config/keys.js';

const app = express();
app.get('', (req, res) => {
    res.send('hi====iiiiiiiii');
});
// const users = require ('./routes/api/users');
// const profile = require ('./routes/api/profile');
// const posts = require ('./routes/api/posts');



const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server running on port ${port}`));

// connect to mongoDB
mongoose
    .connect(db)
    .then(()=>console.log('MongoDB is connected'))
    .catch(err=> console.log(err));

app.get('/', (req, res) => res.send('Hello world'));
//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
