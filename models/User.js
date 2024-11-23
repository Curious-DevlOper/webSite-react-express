import { Schema as _Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
//create schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now 
    },
    role: {
    type: String,
    enum: ['user', 'artist', 'admin'],  // Define roles allowed
    default: 'user'            // Default to 'user' role
  }

});


// Export the User model
const User = model('users', UserSchema);
export default User;