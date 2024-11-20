 import express from 'express';

import User from '../../models/User.js';
import gravatar from 'gravatar';
//hash the pasword
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import { secretOrKey as key } from '../../config/keys.js';                                       
import passport from 'passport';
// load input validation
import validateRegisterInput  from '../../validation/register.js';
import  validateLoginInput  from '../../validation/login.js';

const router = express.Router();

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   GET api/users/register
// @desc    Register  user
// @access  Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    // check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    //find if the email exists, if so she can not register with it

    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            errors.email = 'email already exists.';
            return res.status(400).json(errors);
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', //size
                r: 'jpg', //ratiting
                d: 'mm', //Default
            });
        
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password

            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) =>  {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user) )
                        .catch(err => console.log(err));


                });
            });
            } 

});

});

// @route   GET api/users/login
// @desc    Login user, returning JWT token
// @access  Public
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput (req.body);
    // check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    // find user by email 
    User.findOne({email}).then(user => {
            //user matched
            if (!user) {
                //user matched
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }
            //check password 
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, name: user.name, avatar: user.avatar};
                        // sign token, pauload is what is included in the token
                        jwt.sign(payload, key, {expiresIn: 3600},
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        }); 
        
                    } else {
                        errors.password = 'password incorrect';
                        return res.status(400).json(errors);
                    }
            });
        });

});
// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email 
      });
    }
  );

export default  router;
